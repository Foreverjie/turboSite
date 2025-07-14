/**
 * tRPC React client configuration for web application
 */
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc-config'

// Create tRPC React client with type safety using shared utilities
export const trpc = createTRPCReact<AppRouter>()
