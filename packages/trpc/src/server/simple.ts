/**
 * Simple tRPC server configuration 
 * Mirrors the web/server structure but as a reusable package
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

/**
 * Generic context type (to be extended by apps)
 */
interface GenericContext {
  user?: any
  [key: string]: any
}

/**
 * Create tRPC factory that apps can use
 */
export function createServerTRPC<TContext extends GenericContext>() {
  // Create tRPC instance
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

  // Authentication middleware
  const isAuthed = t.middleware(({ next, ctx }) => {
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

  // Role restriction middleware factory
  const restrictTo = (allowedRoles: string[]) =>
    t.middleware(({ ctx, next }) => {
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
    })

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
     */
    protectedProcedure: t.procedure.use(isAuthed),

    /**
     * Admin procedure - requires admin role
     */
    adminProcedure: t.procedure.use(isAuthed).use(restrictTo(['admin'])),

    /**
     * Create custom role procedure
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
