import { TRPCError } from '@trpc/server'
import { User } from '@supabase/supabase-js'

export const userMeController = async ({ ctx }): Promise<User> => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Auth adapter not configured' })
  }

  return ctx.user
}
