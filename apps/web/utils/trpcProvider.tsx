'use client'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './trpc'
import { toast } from 'ui'
import superjson from 'superjson'

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = p => {
  const onError = (err: unknown) => {
    toast.error(err instanceof Error ? err.message : 'Unknown error')
  }

  function getBaseUrl() {
    if (typeof window !== 'undefined') {
      // browser should use relative path
      return ''
    }
    if (process.env.VERCEL_URL) {
      // reference for vercel.com
      return `https://${process.env.VERCEL_URL}`
    }

    if (process.env.RENDER_INTERNAL_HOSTNAME) {
      // reference for render.com
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
    }
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 9797}`
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: onError,
        }),
        mutationCache: new MutationCache({
          onError: onError,
        }),
      }),
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch: async (input, init?) => {
            const fetch = getFetch()
            return fetch(input, {
              ...init,
              credentials: 'include',
            })
          },
        }),
      ],
      transformer: superjson,
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
