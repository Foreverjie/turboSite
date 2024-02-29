import { useEffect, useRef, useState } from 'react'

import { useEventCallback } from '../common/use-event-callback'
import { useViewport } from '../../utils/viewport'
import { cn } from 'ui/src/utils'

const THRESHOLD = 0
export const useMaskScrollArea = <T extends HTMLElement = HTMLElement>() => {
  const containerRef = useRef<T>(null)
  const [isScrollToBottom, setIsScrollToBottom] = useState(false)
  const [isScrollToTop, setIsScrollToTop] = useState(false)
  const [canScroll, setCanScroll] = useState(false)
  const { h } = useViewport()

  const eventHandler = useEventCallback(() => {
    const $ = containerRef.current

    if (!$) return

    // if $ can not scroll
    if ($.scrollHeight <= $.clientHeight + 2) {
      setCanScroll(false)
      setIsScrollToBottom(false)
      setIsScrollToTop(false)
      return
    }

    setCanScroll(true)

    // if $ can scroll
    const isScrollToBottom =
      $.scrollTop + $.clientHeight >= $.scrollHeight - THRESHOLD
    const isScrollToTop = $.scrollTop <= THRESHOLD
    setIsScrollToBottom(isScrollToBottom)
    setIsScrollToTop(isScrollToTop)
  })
  useEffect(() => {
    const $ = containerRef.current
    if (!$) return
    $.addEventListener('scroll', eventHandler)

    return () => {
      $.removeEventListener('scroll', eventHandler)
    }
  }, [eventHandler])

  useEffect(() => {
    eventHandler()
  }, [eventHandler, h])

  return [
    containerRef,
    canScroll
      ? cn(
          isScrollToBottom && 'mask-t',
          isScrollToTop && 'mask-b',
          !isScrollToBottom && !isScrollToTop && 'mask-both',
        )
      : '',
  ] as const
}
