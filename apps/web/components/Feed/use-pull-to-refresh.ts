import { RefObject, useEffect, useState } from 'react'

const TRIGGER_THRESHOLD = 100
const SHOW_REFRESH_THRESHOLD = 50

const MAX = 128
const k = 0.4
function appr(x: number) {
  return MAX * (1 - Math.exp((-k * x) / MAX))
}

export const usePullToRefresh = (
  ref: RefObject<HTMLDivElement>,
  onTrigger: () => void,
) => {
  const [showRefresh, setShowRefresh] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleTouchStart = (startEvent: TouchEvent) => {
      const el = ref.current
      if (!el) return

      const initialY = startEvent.touches[0].clientY

      const handleTouchMove = (moveEvent: TouchEvent) => {
        const el = ref.current
        if (!el) return

        const currentY = moveEvent.touches[0].clientY
        // get the difference
        const dy = currentY - initialY

        // update the element's transform
        el.style.transform = `translateY(${appr(dy)}px)`

        // if the element is below the threshold, show the refresh
        setShowRefresh(dy > SHOW_REFRESH_THRESHOLD)
      }

      const handleTouchEnd = (endEvent: TouchEvent) => {
        const el = ref.current
        if (!el) return

        el.style.transform = 'translateY(0)'
        setShowRefresh(false)

        // add transition
        el.style.transition = 'transform 0.2s ease'

        const y = endEvent.changedTouches[0].clientY
        const dy = y - initialY
        if (dy > TRIGGER_THRESHOLD) {
          onTrigger()
        }

        el.addEventListener(
          'transitionend',
          () => {
            el.style.transition = ''
          },
          { once: true },
        )
        el.removeEventListener('touchmove', handleTouchMove)
        el.removeEventListener('touchend', handleTouchEnd)
      }

      el.addEventListener('touchmove', handleTouchMove)
      el.addEventListener('touchend', handleTouchEnd)
    }

    // attach the event listener
    el.addEventListener('touchstart', handleTouchStart)

    return () => {
      // don't forget to cleanup
      el.removeEventListener('touchstart', handleTouchStart)
    }
    // disable the rule because we want to run this only ref.current changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return { showRefresh }
}
