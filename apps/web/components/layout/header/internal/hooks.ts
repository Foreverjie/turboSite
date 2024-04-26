import { useContext, useEffect, useState } from 'react'
import { PageScrollInfoContext } from '../../../../providers/root/page-scroll-info-provider'

export const useHeaderBgOpacity = ({ y }: { y: number }) => {
  const threshold = 50
  const headerShouldShowBg = true

  const [bgOpacity, setBgOpacity] = useState(0)

  useEffect(() => {
    const opacity = headerShouldShowBg
      ? y >= threshold
        ? 1
        : Math.floor((y / threshold) * 100) / 100
      : 0
    setBgOpacity(opacity)
  }, [headerShouldShowBg, y])

  return bgOpacity
}

export const useMenuOpacity = () => {
  const { y } = useContext(PageScrollInfoContext)
  const headerOpacity = useHeaderBgOpacity({ y })

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

export const useHeaderShouldShowBg = () => {
  const [shouldShow, setShouldShow] = useState(true)

  return {
    shouldShow,
    setShouldShow,
  }
}
