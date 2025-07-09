/**
 * Context factory utilities for tRPC
 */
import { type inferAsyncReturnType } from '@trpc/server'

/**
 * Base context interface
 */
export interface BaseContext {
  user?: any
  headers?: Headers | Record<string, string>
  req?: any
  res?: any
}

/**
 * Create a context factory function
 */
export function createContextFactory<T extends BaseContext>(
  createInnerContext: (opts: any) => T | Promise<T>
) {
  return async (opts: any) => {
    return await createInnerContext(opts)
  }
}

/**
 * Helper to infer context type from context factory
 */
export type InferContextType<T> = T extends (opts: any) => infer R
  ? R extends Promise<infer U>
    ? U
    : R
  : never

/**
 * Common context patterns
 */
export interface WebContext extends BaseContext {
  user: any | null
  headers: Headers
}

export interface APIContext extends BaseContext {
  user: any | null
  req: any
  res: any
}

/**
 * Create a simple context with user and headers
 */
export function createSimpleContext(opts: {
  user?: any
  headers?: Headers | Record<string, string>
}): BaseContext {
  return {
    user: opts.user || null,
    headers: opts.headers,
  }
}
