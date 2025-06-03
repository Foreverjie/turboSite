import { createClient } from '~/utils/supabase/server'
import {
  UserSignInOutput,
  UserSignInInput,
} from '../../schemas/users/userSignIn.schema'
import { TRPCError } from '@trpc/server'

export const userSignInController = async ({
  input: { email, password, otp },
}: {
  input: UserSignInInput
}): Promise<UserSignInOutput> => {
  const supabase = await createClient()
  let error
  if (password) {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    error = result.error
  } else if (otp) {
    const result = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })
    error = result.error
  }

  if (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
    })
  }

  console.log('Sign in successful')

  return { error: null }
}
