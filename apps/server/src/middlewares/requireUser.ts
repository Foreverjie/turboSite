import { TRPCError } from '@trpc/server'

export const requireUser = async ({ ctx, next }: any) => {
  const accessToken = ctx.res.locals.accessToken
  let user = ctx.res.locals.user

  if (user) {
    return next()
  }

  if (!accessToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not logged in',
    })
  }

  return next()
}
