import { useRef } from 'react'

export const useBeforeMounted = (fn: () => any) => {
  const mounted = useRef(false)

  if (!mounted.current) {
    mounted.current = true
    fn?.()
  }
}
