'use client'

import { createContext, use } from 'react'

export const useRootPortal = () => {
  const ctx = use(RootPortalContext)

  if (ctx) {
    return ctx
  }

  // Only access document.body on the client side
  if (typeof document !== 'undefined' && document.body) {
    return document.body
  }

  return null // Fallback for server-side rendering when no context is found
}

export const RootPortalContext = createContext<HTMLElement | undefined>(
  undefined,
)
