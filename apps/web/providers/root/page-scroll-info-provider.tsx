'use client'

import { useIsomorphicLayoutEffect } from 'foxact/use-isomorphic-layout-effect'
import { throttle } from 'lodash'
import {
  FC,
  PropsWithChildren,
  createContext,
  startTransition,
  useContext,
  useRef,
  useState,
} from 'react'

type PageScrollInfoContextType = {
  y: number
  direction: 'up' | 'down' | null
}

export const PageScrollInfoContext = createContext<PageScrollInfoContextType>({
  y: 0,
  direction: null,
})

export const PageScrollInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [y, setY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down' | null>('down')
  const prevScrollY = useRef(0)
  const setIsInteractiveOnceRef = useRef(false)

  useIsomorphicLayoutEffect(() => {
    const scrollHandler = throttle(
      () => {
        if (!setIsInteractiveOnceRef.current) {
          // setIsInteractive(true)
          setIsInteractiveOnceRef.current = true
        }
        const currentTop = document.documentElement.scrollTop

        setDirection(prevScrollY.current - currentTop > 0 ? 'up' : 'down')
        prevScrollY.current = currentTop
        startTransition(() => {
          setY(prevScrollY.current)
        })
      },
      16,
      {
        leading: false,
      },
    )

    window.addEventListener('scroll', scrollHandler)

    scrollHandler()

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageScrollInfoContext.Provider
      value={{
        y,
        direction,
      }}
    >
      {children}
    </PageScrollInfoContext.Provider>
  )
}

export const useIsScrollUpAndPageIsOver = (threshold: number) => {
  const { y, direction } = useContext(PageScrollInfoContext)

  return direction === 'up' && y > threshold
}
