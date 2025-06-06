'use client'

import clsx from 'clsx'
import { m } from 'motion/react'
import type { FC } from 'react'
import type { ToastProps, TypeOptions } from 'react-toastify/dist/types'

import { ButtonMotionBase } from '..'

const typeMap: Record<TypeOptions, JSX.Element> = {
  success: <i className="i-mingcute--check-fill text-uk-green-light" />,
  error: <i className="i-mingcute--close-fill text-uk-red-light" />,
  info: <i className="i-mingcute--information-fill text-uk-blue-light" />,
  warning: <i className="i-mingcute--alert-fill text-uk-orange-light" />,
  default: <i className="i-mingcute--information-fill text-uk-blue-light" />,
}

export const ToastCard: FC<{
  message: string
  toastProps?: ToastProps
  iconElement?: JSX.Element
  closeToast?: () => void
  onClick?: () => void
}> = props => {
  const { iconElement, message, closeToast, onClick } = props

  const MotionTag = onClick ? m.button : m.div

  return (
    <MotionTag
      layout="position"
      className={clsx(
        'relative w-full overflow-hidden rounded-xl card-shadow',
        'my-4 mr-4 px-4 py-5 pr-7',
        'bg-zinc-50/90 backdrop-blur-sm dark:bg-neutral-900/90',
        'border border-slate-100/80 dark:border-neutral-900/80',
        'space-x-4',
        'flex items-center',
        'select-none',
        '[&>i]:shrink-0',
        '[&>svg]:shrink-0',
      )}
      onClick={onClick}
    >
      {iconElement ?? typeMap[props.toastProps?.type ?? 'default']}
      <span className="text-left">{message}</span>

      <ButtonMotionBase
        aria-label="Close toast"
        className="absolute inset-y-0 right-3 flex items-center text-sm text-base-content/40 duration-200 hover:text-base-content/80"
        onClick={e => {
          e.stopPropagation()
          closeToast?.()
        }}
      >
        <i className="i-mingcute--close-fill p-2" />
      </ButtonMotionBase>
    </MotionTag>
  )
}
