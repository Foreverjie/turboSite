import { TRPCError } from '@trpc/server'

export const restrictTo =
  (allowedRoles: string[]) =>
  ({ ctx, next }: any) => {
    if (!allowedRoles.includes(ctx.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })
    }

    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    })
  }
