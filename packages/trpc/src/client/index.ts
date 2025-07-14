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
