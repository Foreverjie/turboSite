import { TRPCError } from '@trpc/server'

export const restrictTo =
  (allowedRoles: string[]) =>
  ({ ctx, next }: any) => {
    const user = ctx.res.locals.user
    if (!allowedRoles.includes(user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })
    }

    return next()
  }
