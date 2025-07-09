/**
 * Shared tRPC server configuration
 * This file contains the base tRPC setup that can be used across different applications
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { BaseTRPCContext, TRPCConfig, WebTRPCContext } from '../types'

/**
 * Create a tRPC instance with default configuration
 */
export function createTRPCInstance<TContext extends BaseTRPCContext = BaseTRPCContext>(
  config: TRPCConfig<TContext> = {}
) {
  const t = initTRPC.context<TContext>().create({
    transformer: config.transformer || superjson,
    errorFormatter: config.errorFormatter || (({ shape, error }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      }
    }),
  })

  return t
}

/**
 * Create authentication middleware
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
        ...ctx,
        user: ctx.user,
      },
    })
  })
}

/**
 * Create role-based middleware
 */
export function createRoleMiddleware<TContext extends BaseTRPCContext>(
  t: ReturnType<typeof createTRPCInstance<TContext>>,
  allowedRoles: string[]
) {
  return t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to Sign In first.',
      })
    }

    const userRoles = ctx.user.roles || []
    const hasValidRole = allowedRoles.some(role => userRoles.includes(role))

    if (!hasValidRole) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this resource.',
      })
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    })
  })
}

/**
 * Default tRPC factory with common procedures
 * This can be used with any context type that extends BaseTRPCContext
 */
export function createTRPCFactory<TContext extends BaseTRPCContext = BaseTRPCContext>(
  config: TRPCConfig<TContext> = {}
) {
  const t = createTRPCInstance<TContext>(config)
  const authMiddleware = createAuthMiddleware(t)

  return {
    t,
    router: t.router,
    middleware: t.middleware,
    mergeRouters: t.mergeRouters,
    publicProcedure: t.procedure,
    protectedProcedure: t.procedure.use(authMiddleware),
    createRoleProcedure: (roles: string[]) => 
      t.procedure.use(createRoleMiddleware(t, roles)),
  }
}

/**
 * Web-specific tRPC factory with proper typing
 */
export function createWebTRPCFactory(config: TRPCConfig<WebTRPCContext> = {}) {
  return createTRPCFactory<WebTRPCContext>(config)
}

export { TRPCError }
