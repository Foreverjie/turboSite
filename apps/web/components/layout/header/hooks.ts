'use client'

import { useEffect } from 'react'

import {
  useHeaderMetaInfo,
  useHeaderShouldShowBg,
} from '~/components/layout/header/internal/hooks'

export const useHideHeaderBgInRoute = () => {
  const { setShouldShow } = useHeaderShouldShowBg()
  useEffect(() => {
    setShouldShow(false)
    return () => {
      setShouldShow(true)
    }
  }, [setShouldShow])
}

export const HeaderHideBg = () => {
  useHideHeaderBgInRoute()
  return null
}

export { useHeaderMetaInfo }
