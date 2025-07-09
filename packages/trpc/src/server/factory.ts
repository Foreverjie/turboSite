/**
 * Shared tRPC server configuration extracted from web/server
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { BaseTRPCContext, WebTRPCContext } from '../types'

/**
 * Create tRPC instance similar to web/server/trpc.ts
 */
export function createTRPCInstance<TContext extends BaseTRPCContext = BaseTRPCContext>() {
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

  return t
}

/**
 * Authentication middleware - matches web/server/trpc.ts
 */
export function createAuthMiddleware<TContext extends BaseTRPCContext>(
  t: ReturnType<typeof createTRPCInstance<TContext>>
) {
  return t.middleware(({ next, ctx }) => {
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
}

/**
 * Role restriction middleware similar to web/server/middlewares/restrictTo.ts
 */
export function createRoleMiddleware<TContext extends BaseTRPCContext>(
  t: ReturnType<typeof createTRPCInstance<TContext>>,
  allowedRoles: string[]
) {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to Sign In first.',
      })
    }

    // Support both role (string) and roles (array) formats
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
}

/**
 * Main tRPC factory that matches web/server/trpc.ts structure
 */
export function createTRPCFactory<TContext extends BaseTRPCContext = BaseTRPCContext>() {
  const t = createTRPCInstance<TContext>()
  const isAuthed = createAuthMiddleware(t)

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
     * If you want a query or mutation to ONLY be accessible to logged in users, use this.
     * @see https://trpc.io/docs/procedures
     */
    protectedProcedure: t.procedure.use(isAuthed),

    /**
     * Create role-based procedure
     */
    createRoleProcedure: (roles: string[]) => 
      t.procedure.use(createRoleMiddleware(t, roles)),

    /**
     * Export the base tRPC instance for advanced usage
     */
    t,
  }
}

/**
 * Web-specific factory for easier usage
 */
export function createWebTRPCFactory() {
  return createTRPCFactory<WebTRPCContext>()
}

/**
 * Admin procedure helper (matches web app usage)
 */
export function createAdminProcedure<TContext extends BaseTRPCContext>(
  factory: ReturnType<typeof createTRPCFactory<TContext>>
) {
  return factory.createRoleProcedure(['admin'])
}

export { TRPCError }
