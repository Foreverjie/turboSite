'use client'

import { cn } from 'ui/src/utils'

import { useHeaderBgOpacity } from './hooks'
import { useContext } from 'react'
import { PageScrollInfoContext } from '~/providers/root/page-scroll-info-provider'

export const BlurredBackground = () => {
  const { y } = useContext(PageScrollInfoContext) ?? { y: 0 }

  const headerOpacity = useHeaderBgOpacity({ y })
  return (
    <div
      className={cn(
        'absolute inset-0 transform-gpu [-webkit-backdrop-filter:saturate(180%)_blur(20px)] [backdrop-filter:saturate(180%)_blur(20px)] [backface-visibility:hidden]',
        'bg-themed-bg_opacity [border-bottom:1px_solid_rgb(187_187_187_/_20%)]',
      )}
      style={{
        opacity: headerOpacity,
      }}
    />
  )
}
