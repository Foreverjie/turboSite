'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import { toast } from 'ui'
import superjson from 'superjson'
import type { AppRouter } from '~/server/routers'
import { getBaseUrl as getSharedBaseUrl } from 'trpc-config/src/client'

/**
 * Create tRPC React client with enhanced configuration
 */
export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn()
        await opts.queryClient.invalidateQueries()
      },
    },
  },
})

/**
 * Get base URL for different environments (web app specific)
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost with web app port
  return `http://localhost:${process.env.PORT ?? 9797}`
}

/**
 * Enhanced error handler with toast notifications
 */
const onError = (error: any) => {
  const message = error?.message || 'Something went wrong'
  toast.error(`Error: ${message}`)

  // You can add more specific error handling here
  if (error.data?.code === 'UNAUTHORIZED') {
    // Handle unauthorized access
    console.warn('Unauthorized access detected')
  }
}

/**
 * Client Provider component with enhanced configuration
 */
export function ClientProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              return failureCount < 3
            },
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => process.env.NODE_ENV === 'development',
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers: {
            'x-trpc-source': 'client',
          },
        }),
      ],
      transformer: superjson,
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
