'use client'

import { cn } from 'ui/src/utils'
import { useHeaderBgOpacity } from './hooks'
import { usePageScrollLocationSelector } from '~/providers/root/page-scroll-info-provider'
import { useState, useEffect } from 'react'

export const HeaderWithShadow: Component = ({ children }) => {
  const headerOpacity = useHeaderBgOpacity()
  const [showShadow, setShowShadow] = useState(false)
  const { y } = usePageScrollLocationSelector()

  useEffect(() => {
    setShowShadow(y > 100 && headerOpacity > 0.8)
  }, [y, headerOpacity])

  return (
    <header
      data-hide-print
      className={cn(
        'fixed left-0 right-0 top-0 z-[9] h-[4.5rem] overflow-hidden transition-shadow duration-200 lg:ml-[calc(100vw-100%)]',
        showShadow &&
          'shadow-none shadow-neutral-100 dark:shadow-neutral-800/50 lg:shadow-sm',
      )}
    >
      {children}
    </header>
  )
}
