/**
 * Shared tRPC server configuration
 * This file re-exports the working components for the web app to use
 */

// Re-export the working web configuration
export * from './web'

// Also export context helpers
export * from '../context'

// Export utility types
export * from '../types'

// Re-export common tRPC utilities
export { TRPCError } from '@trpc/server'
