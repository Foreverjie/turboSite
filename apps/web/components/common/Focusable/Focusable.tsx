import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useEventListener } from 'usehooks-ts'

import {
  FocusableContainerRefContext,
  FocusableContext,
  FocusActionsContext,
  FocusTargetRefContext,
} from './context'
import { highlightElement } from './utils'

export const Focusable = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { onBlur, onFocus, ...rest } = props
  const [isFocusWithIn, setIsFocusWithIn] = useState(false)
  const focusTargetRef = useRef<HTMLElement | undefined>(void 0)

  const containerRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => containerRef.current!)

  const highlightBoundary = useCallback(() => {
    const { activeElement } = document
    if (!containerRef.current?.contains(activeElement as Node)) {
      return
    }
    const element = containerRef.current
    if (!element) return

    highlightElement(element)
  }, [])

  useEventListener('focusin', e => {
    if (containerRef.current?.contains(e.target as Node)) {
      setIsFocusWithIn(true)
      focusTargetRef.current = e.target as HTMLElement
      //   if (import.meta.env.DEV) {
      //     highlightElement(containerRef.current!, '14, 165, 233')
      //   }
    } else {
      setIsFocusWithIn(false)
      focusTargetRef.current = undefined
    }
  })
  useEffect(() => {
    if (!containerRef.current) return
    setIsFocusWithIn(
      containerRef.current.contains(document.activeElement as Node),
    )
  }, [containerRef])

  return (
    <FocusableContext.Provider value={isFocusWithIn}>
      <FocusTargetRefContext.Provider value={focusTargetRef}>
        <FocusActionsContext.Provider
          value={useMemo(() => ({ highlightBoundary }), [highlightBoundary])}
        >
          <FocusableContainerRefContext.Provider value={containerRef}>
            <div tabIndex={-1} role="region" ref={containerRef} {...rest} />
          </FocusableContainerRefContext.Provider>
        </FocusActionsContext.Provider>
      </FocusTargetRefContext.Provider>
    </FocusableContext.Provider>
  )
})
