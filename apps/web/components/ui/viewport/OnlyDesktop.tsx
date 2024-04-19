'use client'

import { useIsClient } from '~/hooks/common/use-is-client'
import { useViewport } from '../../../utils/viewport'

// const selector = (v: ExtractAtomValue<typeof viewportAtom>) => v.lg && v.w !== 0
export const OnlyDesktop: Component = ({ children }) => {
  const isClient = useIsClient()
  const viewport = useViewport()
  const isLg = viewport.lg && viewport.w !== 0
  if (!isClient) return null
  if (!isLg) return null

  return children
}
