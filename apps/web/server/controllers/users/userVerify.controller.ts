import { TRPCError } from '@trpc/server'
import { UserVerifyInput } from '~/server/schemas/users'
import { createClient } from '~/utils/supabase/server'

export const userVerifyController = async (input: {
  input: UserVerifyInput
}) => {
  const { email, verificationCode } = input.input

  // Create Supabase client
  const supabase = await createClient()
  // Verify the user with Supabase
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: verificationCode,
    type: 'signup',
  })
  if (error) {
    return { error: { message: error.message } }
  }

  return { error: null }
}
