'use client'

import { forwardRef, memo, useMemo } from 'react'
import { m } from 'framer-motion'
import type {
  HTMLMotionProps,
  Spring,
  Target,
  TargetAndTransition,
} from 'framer-motion'
import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from 'react'
import type { BaseTransitionProps } from './type'
import { microDampingPreset, microReboundPreset } from './spring'

interface TransitionViewParams {
  from: Target
  to: Target
  initial?: Target
  preset?: Spring
}

export const createTransitionView = ({
  from,
  to,
  initial,
  preset,
}: TransitionViewParams) => {
  const TransitionView = forwardRef<
    HTMLElement,
    PropsWithChildren<BaseTransitionProps>
  >((props, ref) => {
    const {
      timeout = {},
      duration = 0.5,
      animation = {},
      as = 'div',
      delay = 0,
      ...rest
    } = props

    const { enter = delay, exit = delay } = timeout

    const MotionComponent = m[as] as ForwardRefExoticComponent<
      HTMLMotionProps<any> & RefAttributes<HTMLElement>
    >

    return (
      <MotionComponent
        ref={ref}
        initial={initial || from}
        animate={{
          ...to,
          transition: {
            duration,
            ...(preset || microReboundPreset),
            ...animation.enter,
            delay: enter / 1000,
          },
        }}
        exit={{
          ...from,
          transition: {
            duration,
            ...animation.exit,
            delay: exit / 1000,
          } as TargetAndTransition['transition'],
        }}
        transition={{
          duration,
        }}
        {...rest}
      >
        {props.children}
      </MotionComponent>
    )
  })

  TransitionView.displayName = `forwardRef(TransitionView)`
  const MemoedTransitionView = memo(TransitionView)
  MemoedTransitionView.displayName = `MemoedTransitionView`
  return MemoedTransitionView
}
