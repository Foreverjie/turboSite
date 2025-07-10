import { TRPCError } from '@trpc/server'
import { UserSignUpInput } from '../../schemas/users'

export const userSignUpController = async (input: {
  input: UserSignUpInput
  ctx: any
}) => {
  const { email, password, passwordConfirmation } = input.input
  const { supabase } = input.ctx

  // Validate password confirmation
  if (password !== passwordConfirmation) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: "Passwords don't match",
    })
  }

  // Sign up the user with Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) {
    return { error: { message: error.message } }
  }

  return { error: null }
}
