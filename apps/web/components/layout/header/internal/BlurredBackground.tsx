'use client'

import { cn } from 'ui/src/utils'

import { useHeaderBgOpacity } from './hooks'

export const BlurredBackground = () => {
  const headerOpacity = useHeaderBgOpacity()
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
