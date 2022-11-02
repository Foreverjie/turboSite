import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'

import withDefaults from '../utils/with-defaults'
import { CSS } from '../theme/stitches.config'
import clsx from '../utils/clsx'
import { __DEV__ } from '../utils/assertion'

import { Props, defaultProps } from './input-props'
import PrivateIcon from './private-icon'
import Input from './input'

interface PrivateProps extends Props {
  hideToggle?: boolean
  visibleIcon?: React.ReactNode
  hiddenIcon?: React.ReactNode
}

const privateDefaultProps = {
  ...defaultProps,
  hideToggle: false,
  visibleIcon: <PrivateIcon visible />,
  hiddenIcon: <PrivateIcon visible={false} />,
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof PrivateProps>
export type InputPrivateProps = PrivateProps &
  typeof privateDefaultProps &
  NativeAttrs & { css?: CSS }

const InputPrivate = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPrivateProps>
>(
  (
    { hideToggle, visibleIcon, hiddenIcon, children, ...props },
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    useImperativeHandle(ref, () => inputRef.current)

    const iconClickHandler = () => {
      setVisible(v => !v)
    }

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        className: clsx('nextui-input-private', props.className),
        contentClickable: true,
        onContentClick: iconClickHandler,
        type: visible ? 'text' : 'private',
      }),
      [props, iconClickHandler, visible, inputRef],
    )
    const icon = useMemo(() => {
      if (hideToggle) return null

      return visible ? visibleIcon : hiddenIcon
    }, [hideToggle, visible, visibleIcon, hiddenIcon])

    return (
      <Input contentRight={icon} {...inputProps}>
        {children}
      </Input>
    )
  },
)

if (__DEV__) {
  InputPrivate.displayName = 'NextUI.InputPrivate'
}

InputPrivate.toString = () => '.nextui-input-private'

export default withDefaults(InputPrivate, privateDefaultProps)
