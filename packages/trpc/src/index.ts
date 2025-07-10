/**
 * Main entry point for tRPC configuration package
 */

// Type exports
export * from './types'

// Client exports  
export * from './client'

// React exports
export * from './react'

// Middleware exports
export * from './middlewares'

// Schema exports (shared validation schemas)
export * from './schemas'

// Controller exports (shared business logic)
export * from './controllers'

// Router exports (shared route definitions)
export * from './routers'

// Re-export common tRPC types and utilities
export type { TRPCError } from '@trpc/server'
export type { 
  CreateTRPCClientOptions,
  TRPCClientError,
  TRPCLink,
} from '@trpc/client'

export * from './context'
