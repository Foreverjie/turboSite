/**
 * Shared type definitions for tRPC package
 */

/**
 * Base context interface that can be extended by applications
 */
export interface BaseTRPCContext {
  user?: any
  session?: any
  headers?: Headers
}

/**
 * Web application context interface
 */
export interface WebTRPCContext extends BaseTRPCContext {
  user: any | null
  headers: Headers
}

/**
 * Configuration options for tRPC initialization
 */
export interface TRPCConfig<TContext = BaseTRPCContext> {
  transformer?: any
  errorFormatter?: (opts: {
    shape: any
    error: any
  }) => any
  context?: () => TContext | Promise<TContext>
}
