'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './trpc'
import SuperJSON from 'superjson'

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = p => {
  function getBaseUrl() {
    if (typeof window !== 'undefined')
      // browser should use relative path
      return ''
    if (process.env.VERCEL_URL)
      // reference for vercel.com
      return `https://${process.env.VERCEL_URL}`
    if (process.env.RENDER_INTERNAL_HOSTNAME)
      // reference for render.com
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 9797}`
  }

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: SuperJSON,
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
