import { useIsMobile } from '~/utils/viewport'
import { usePageScrollLocationSelector } from '~/providers/root/page-scroll-info-provider'
import { useEffect, useState } from 'react'

export const useHeaderBgOpacity = () => {
  const threshold = 50
  const isMobile = useIsMobile()
  //   const headerShouldShowBg = useHeaderShouldShowBg() || isMobile
  const headerShouldShowBg = true

  const { y } = usePageScrollLocationSelector()

  const [bgOpacity, setBgOpacity] = useState(0)

  useEffect(() => {
    const opacity = headerShouldShowBg
      ? y >= threshold
        ? 1
        : Math.floor(((y / threshold) * 100) / 100)
      : 0
    setBgOpacity(opacity)
  }, [headerShouldShowBg, y])

  return bgOpacity
}
