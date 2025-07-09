/**
 * Context factories for different environments
 */
import { NextRequest } from 'next/server'

/**
 * Base context interface
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
  user: any | null // Using any for now to avoid Supabase dependency
  headers: Headers
}

/**
 * Inner context for web application
 */
interface InnerWebContext {
  user: any | null
  headers: Headers
}

/**
 * Create inner tRPC context for web application
 */
export const createInnerWebTRPCContext = async ({ user, headers }: InnerWebContext) => {
  return {
    user,
    headers,
  }
}

/**
 * Web tRPC context factory
 * This should be called with the appropriate user fetching function
 */
export const createWebTRPCContextFactory = (getUser: () => Promise<any | null>) => {
  return async (opts: { req: NextRequest }): Promise<WebTRPCContext> => {
    const { req } = opts
    const user = await getUser()

    return createInnerWebTRPCContext({
      user,
      headers: req.headers,
    })
  }
}
