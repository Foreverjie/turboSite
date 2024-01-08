import { useIsomorphicLayoutEffect } from 'foxact/use-isomorphic-layout-effect'
import { throttle } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

export const useViewport = () => {
  const [screenSize, setScreenSize] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    h: 0,
    w: 0,
  })

  useIsomorphicLayoutEffect(() => {
    const readViewport = throttle(() => {
      const { innerWidth: w, innerHeight: h } = window
      const sm = w >= 640
      const md = w >= 768
      const lg = w >= 1024
      const xl = w >= 1280
      const _2xl = w >= 1536
      setScreenSize({ sm, md, lg, xl, '2xl': _2xl, h, w })
    }, 16)

    readViewport()
    window.addEventListener('resize', readViewport)
    return () => window.removeEventListener('resize', readViewport)
  }, [])

  return screenSize
}

export const useIsMobile = () => {
  const { lg } = useViewport()
  return !lg
}
