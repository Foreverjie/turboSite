import { createContext } from 'react'

export const ScrollElementContext = createContext<HTMLElement | null>(
  typeof document !== 'undefined' ? document.documentElement : null,
)
