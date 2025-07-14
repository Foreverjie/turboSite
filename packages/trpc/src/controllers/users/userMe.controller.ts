import { TRPCError } from '@trpc/server'
import { User } from '@supabase/supabase-js'
import { Context } from '../..'

export const userMeController = async ({
  ctx,
}: {
  ctx: Context
}): Promise<User> => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authenticated',
    })
  }

  return ctx.user
}
