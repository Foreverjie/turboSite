/**
 * Role-based access control middleware
 */
import { TRPCError } from '@trpc/server'

export function createRestrictToMiddleware<TContext = any>(
  t: any, // tRPC instance
  allowedRoles: string[]
) {
  return t.middleware(({ ctx, next }: { ctx: TContext; next: any }) => {
    const user = (ctx as any).user || (ctx as any).session?.user
    
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to perform this action'
      })
    }

    const userRole = user.role || user.roles?.[0]
    const userRoles = user.roles || (user.role ? [user.role] : [])
    
    // Check if user has any of the allowed roles
    const hasValidRole = allowedRoles.some(role => 
      userRoles.includes(role) || userRole === role
    )

    if (!hasValidRole) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })
    }

    return next({
      ctx: {
        ...ctx,
        user,
        session: (ctx as any).session ? { ...(ctx as any).session, user } : undefined,
      },
    })
  })
}

/**
 * Legacy support - direct middleware function
 */
export const restrictTo = (allowedRoles: string[]) => ({ ctx, next }: any) => {
  const user = ctx.user || ctx.session?.user
  
  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action'
    })
  }

  const userRole = user.role || user.roles?.[0]
  const userRoles = user.roles || (user.role ? [user.role] : [])
  
  // Check if user has any of the allowed roles
  const hasValidRole = allowedRoles.some(role => 
    userRoles.includes(role) || userRole === role
  )

  if (!hasValidRole) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You are not allowed to perform this action',
    })
  }

  return next({
    ctx: {
      ...ctx,
      user,
      session: ctx.session ? { ...ctx.session, user } : undefined,
    },
  })
}
