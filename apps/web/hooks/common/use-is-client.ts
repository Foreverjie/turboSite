'use client'

import { startTransition, useEffect, useState } from 'react'

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}
