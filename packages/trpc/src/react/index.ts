/**
 * Shared tRPC React configuration
 */
'use client'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import superjson from 'superjson'
import { getBaseUrl } from '../client'

/**
 * React Query configuration options
 */
export interface ReactQueryConfig {
  onError?: (error: unknown) => void
  defaultOptions?: {
    queries?: any
    mutations?: any
  }
}

/**
 * tRPC React provider configuration
 */
export interface TRPCReactConfig {
  baseUrl?: string
  apiPath?: string
  transformer?: any
  enableLogger?: boolean
  headers?: Record<string, string>
  credentials?: 'include' | 'omit' | 'same-origin'
  reactQuery?: ReactQueryConfig
}

/**
 * Create tRPC React client
 */
export function createTRPCReact<TRouter = any>() {
  return createTRPCReact<TRouter>({
    unstable_overrides: {
      useMutation: {
        async onSuccess(opts) {
          await opts.originalFn()
          await opts.queryClient.invalidateQueries()
        },
      },
    },
  })
}

/**
 * Create tRPC React Provider component
 */
export function createTRPCProvider<TRouter = any>(
  trpc: ReturnType<typeof createTRPCReact<TRouter>>,
  config: TRPCReactConfig = {}
) {
  const {
    baseUrl = getBaseUrl(),
    apiPath = '/api/trpc',
    transformer = superjson,
    enableLogger = process.env.NODE_ENV === 'development',
    headers = {},
    credentials = 'include',
    reactQuery = {},
  } = config

  return function TRPCProvider({ children }: { children: React.ReactNode }) {
    const { onError } = reactQuery

    const [queryClient] = useState(() =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: onError,
        }),
        mutationCache: new MutationCache({
          onError: onError,
        }),
        defaultOptions: reactQuery.defaultOptions,
      })
    )

    const [trpcClient] = useState(() =>
      trpc.createClient({
        links: [
          ...(enableLogger ? [loggerLink({ enabled: () => true })] : []),
          httpBatchLink({
            url: `${baseUrl}${apiPath}`,
            headers,
            fetch: async (input, init?) => {
              const fetch = getFetch()
              return fetch(input, {
                ...init,
                credentials,
              })
            },
          }),
        ],
        transformer,
      })
    )

    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    )
  }
}

/**
 * Default error handler
 */
export function createDefaultErrorHandler(toast?: {
  error: (message: string) => void
}) {
  return (error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (toast) {
      toast.error(message)
    } else {
      console.error('tRPC Error:', message)
    }
  }
}

export { createTRPCReact as createTRPCReactClient }
