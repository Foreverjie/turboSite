/**
 * Shared tRPC client configuration
 */
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'

/**
 * Base URL resolver function
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return ''
  }
  if (process.env.VERCEL_URL) {
    // Reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // Reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }
  // Assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

/**
 * Client configuration options
 */
export interface TRPCClientConfig {
  baseUrl?: string
  apiPath?: string
  transformer?: any
  enableLogger?: boolean
  headers?: Record<string, string>
  credentials?: 'include' | 'omit' | 'same-origin'
}

/**
 * Create tRPC client with default configuration
 */
export function createTRPCClient<TRouter = any>(
  config: TRPCClientConfig = {}
) {
  const {
    baseUrl = getBaseUrl(),
    apiPath = '/api/trpc',
    transformer = superjson,
    enableLogger = process.env.NODE_ENV === 'development',
    headers = {},
    credentials = 'include',
  } = config

  return createTRPCProxyClient<TRouter>({
    transformer,
    links: [
      ...(enableLogger ? [loggerLink()] : []),
      httpBatchLink({
        url: `${baseUrl}${apiPath}`,
        headers,
        fetch: async (input, init) => {
          const fetch = globalThis.fetch || require('node-fetch')
          return fetch(input, {
            ...init,
            credentials,
          })
        },
      }),
    ],
  })
}

/**
 * Default headers for different environments
 */
export const defaultHeaders = {
  development: {
    'x-trpc-source': 'development',
  },
  production: {
    'x-trpc-source': 'production',
  },
}

export { httpBatchLink, loggerLink } from '@trpc/client'
