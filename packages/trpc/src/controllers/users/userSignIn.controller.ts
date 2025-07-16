import { AuthResponse } from '@supabase/supabase-js'
import { Context } from '../../context'
import {
  UserSignInOutput,
  UserSignInInput,
} from '../../schemas/users/userSignIn.schema'
import { TRPCError } from '@trpc/server'

export const userSignInController = async ({
  input: { email, password, otp },
  ctx,
}: {
  input: UserSignInInput
  ctx: Context
}): Promise<AuthResponse> => {
  const supabase = ctx.supabase
  let result: AuthResponse = {
    data: { user: null, session: null },
    error: null,
  }
  if (password) {
    result = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  } else if (otp) {
    result = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })
  }

  if (result?.error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: result.error.message,
    })
  }

  console.log('Sign in successful')
  return result
}
