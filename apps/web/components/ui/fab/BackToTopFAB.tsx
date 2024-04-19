'use client'

import { springScrollToTop } from 'ui/src/scroller'
import { PageScrollInfoContext } from '~/providers/root/page-scroll-info-provider'

import { FABPortable } from './FABContainer'
import { useViewport } from '../../../utils/viewport'
import { useContext, useEffect, useState } from 'react'

export const BackToTopFAB = () => {
  const { h: windowHeight } = useViewport()
  const { y } = useContext(PageScrollInfoContext) || { y: 0 }
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    setShouldShow(y > windowHeight / 5)
  }, [y, windowHeight])

  return (
    <FABPortable onClick={springScrollToTop} show={shouldShow}>
      <i className="icon-[mingcute--arow-to-up-line]" />
    </FABPortable>
  )
}
