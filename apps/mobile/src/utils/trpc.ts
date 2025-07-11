/**
 * Mobile tRPC client configuration
 * This configures tRPC for React Native using the shared trpc-config package
 */

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'trpc-config'

// Create tRPC React client with type safety
export const trpc = createTRPCReact<AppRouter>()

export type { AppRouter }
