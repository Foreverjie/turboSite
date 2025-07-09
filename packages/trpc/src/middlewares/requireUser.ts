/**
 * Authentication middleware - requires user to be logged in
 */
import { TRPCError } from '@trpc/server'

export function createRequireUserMiddleware<TContext = any>(
  t: any // tRPC instance
) {
  return t.middleware(({ ctx, next }: { ctx: TContext; next: any }) => {
    const user = (ctx as any).user || (ctx as any).session?.user
    
    if (!user) {
      throw new TRPCError({ 
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to perform this action'
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
export const requireUser = ({ ctx, next }: any) => {
  const user = ctx.user || ctx.session?.user
  
  if (!user) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action'
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
