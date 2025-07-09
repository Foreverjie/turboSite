/**
 * Web application tRPC configuration
 * This file sets up tRPC specifically for the web application using shared package
 */
import { createWebTRPC } from 'trpc-config/src/server/web'
import { type Context } from './context'

// Create tRPC instance with web-specific configuration using shared package
const trpcConfig = createWebTRPC<Context>()

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = trpcConfig.router

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = trpcConfig.publicProcedure

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = trpcConfig.middleware

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = trpcConfig.mergeRouters

/**
 * Protected (auth) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = trpcConfig.protectedProcedure

/**
 * Admin procedure - requires admin role
 */
export const adminProcedure = trpcConfig.adminProcedure

/**
 * Export the base tRPC instance for advanced usage
 */
export { trpcConfig as t }
