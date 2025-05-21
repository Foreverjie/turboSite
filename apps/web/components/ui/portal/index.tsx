'use client'

import { useEffect, useState, type FC, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { useRootPortal } from './provider'

export const RootPortal: FC<
  {
    to?: HTMLElement | null
  } & PropsWithChildren
> = props => {
  const to = useRootPortal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (props.to === null) return props.children

  if (!mounted) return null

  return createPortal(props.children, props.to || to || document.body)
}
