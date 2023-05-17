import { TRPCError } from '@trpc/server'
// import { t } from '../trpc'
/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
export const requireUser = ({ ctx, next }: any) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
}
