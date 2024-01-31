'use client'

import { cn } from 'ui/src/utils'
import { useHeaderBgOpacity } from './hooks'
import { useState, useEffect, useContext } from 'react'
import { PageScrollInfoContext } from '~/providers/root/page-scroll-info-provider'

export const HeaderWithShadow: Component = ({ children }) => {
  const [showShadow, setShowShadow] = useState(false)
  const scrollInfo = useContext(PageScrollInfoContext)
  const { y } = scrollInfo ?? { y: 0 }
  const headerOpacity = useHeaderBgOpacity({ y })

  useEffect(() => {
    setShowShadow(y > 100)
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
