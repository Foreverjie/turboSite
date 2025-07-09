/**
 * Web-specific tRPC configuration extracted directly from apps/web/server
 * This mirrors the existing structure and can be used by the web app
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

// We'll use a generic interface that the web app can extend
export interface BaseContext {
  user?: any
  [key: string]: any
}

/**
 * Create tRPC configuration that matches the web app structure
 */
export function createWebTRPC<TContext extends BaseContext>() {
  // Initialize tRPC with the exact same config as web/server/trpc.ts
  const t = initTRPC.context<TContext>().create({
    transformer: superjson,
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

  // Authentication middleware - exact copy from web/server/trpc.ts
  const isAuthed = t.middleware(({ next, ctx }: any) => {
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

  return {
    /**
     * Create a router
     * @see https://trpc.io/docs/v10/router
     */
    router: t.router,

    /**
     * Create an unprotected procedure
     * @see https://trpc.io/docs/v10/procedures
     */
    publicProcedure: t.procedure,

    /**
     * @see https://trpc.io/docs/v10/middlewares
     */
    middleware: t.middleware,

    /**
     * @see https://trpc.io/docs/v10/merging-routers
     */
    mergeRouters: t.mergeRouters,

    /**
     * Protected (auth) procedure
     * 
     * If you want a query or mutation to ONLY be accessible to logged in users, use
     * this. It verifies the session is valid and guarantees ctx.user is not null
     * 
     * @see https://trpc.io/docs/procedures
     */
    protectedProcedure: t.procedure.use(isAuthed),

    /**
     * Admin procedure - requires admin role
     * This matches the web app's adminProcedure exactly
     */
    adminProcedure: t.procedure.use(isAuthed).use(restrictTo(['admin'])),

    /**
     * Create custom role-based procedures
     */
    createRoleProcedure: (roles: string[]) => 
      t.procedure.use(isAuthed).use(restrictTo(roles)),

    /**
     * Export the base tRPC instance and middleware for advanced usage
     */
    t,
    isAuthed,
    restrictTo,
  }
}

export { TRPCError }
