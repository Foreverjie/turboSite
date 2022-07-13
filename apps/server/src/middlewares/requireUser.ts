import { TRPCError } from '@trpc/server'

export const requireUser = ({ ctx, next }: any) => {
  const user = ctx.res.locals.user
  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token or session has expired',
    })
  }

  return next()
}
