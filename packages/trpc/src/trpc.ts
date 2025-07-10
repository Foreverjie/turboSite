/**
 * Web application tRPC configuration
 * This file sets up tRPC specifically for the web application using shared package
 */
import { initTRPC, TRPCError } from '@trpc/server'
import { type Context } from './context'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'

// Create tRPC instance with web-specific configuration using shared package
const trpcConfig = initTRPC.context<Context>().create({
    transformer: SuperJSON,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      }
    },
})

const isAuthed = trpcConfig.middleware(({ next, ctx }: any) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to Sign In first.',
      })
    }
    return next({
      ctx: {
        user: ctx.user,
      },
    })
  })

  // Role restriction middleware factory - from web/server/middlewares/restrictTo.ts
  const restrictTo = (allowedRoles: string[]) =>
    ({ ctx, next }: any) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You need to Sign In first.',
        })
      }

      const userRole = ctx.user.role
      const userRoles = ctx.user.roles || (userRole ? [userRole] : [])
      
      if (!allowedRoles.some(role => userRoles.includes(role))) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to perform this action',
        })
      }

      return next({
        ctx: {
          user: ctx.user,
        },
      })
    }

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = trpcConfig.router

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = trpcConfig.procedure

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
export const protectedProcedure = trpcConfig.procedure.use(isAuthed)

/**
 * Admin procedure - requires admin role
 */
export const adminProcedure = protectedProcedure.use(restrictTo(['admin']))

/**
 * Export the base tRPC instance for advanced usage
 */
export { trpcConfig as t }
