import { TRPCError } from '@trpc/server'
import { createClient } from '~/utils/supabase/server'
import { User } from '@supabase/supabase-js'

export const userMeController = async ({ ctx }: any): Promise<User> => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (!data.user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
  }

  return data.user
}
