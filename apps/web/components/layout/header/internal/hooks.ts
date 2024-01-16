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

export const useMenuOpacity = () => {
  const headerOpacity = useHeaderBgOpacity()

  return 1 - headerOpacity
}

export const useHeaderMetaShouldShow = () => {
  const v = useMenuOpacity() > 0
  const { title, description } = useHeaderMetaInfo()

  return title !== '' && description !== '' && !v
}

export const useHeaderMetaInfo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')

  return {
    title,
    setTitle,
    description,
    setDescription,
    slug,
    setSlug,
  }
}
