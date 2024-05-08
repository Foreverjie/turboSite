import type { ReactEventHandler } from 'react'

export const stopPropagation: ReactEventHandler<any> = e => e.stopPropagation()

export const preventDefault: ReactEventHandler<any> = e => e.preventDefault()

export const transitionViewIfSupported = (updateCb: () => any) => {
  if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    updateCb()
    return
  }
  // @ts-ignore
  if (document.startViewTransition) {
    // @ts-ignore
    document.startViewTransition(updateCb)
  } else {
    updateCb()
  }
}

export function escapeSelector(selector: string) {
  return selector.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&')
}
