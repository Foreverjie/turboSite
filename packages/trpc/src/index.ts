/**
 * Main entry point for tRPC configuration package
 */

// Type exports
export * from './types'

// Server exports
export * from './server'

// Client exports  
export * from './client'

// React exports
export * from './react'

// Middleware exports
export * from './middlewares'

// Utility exports
export * from './utils'

// Re-export common tRPC types and utilities
export type { TRPCError } from '@trpc/server'
export type { 
  CreateTRPCClientOptions,
  TRPCClientError,
  TRPCLink,
} from '@trpc/client'
