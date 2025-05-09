import { TRPCError } from '@trpc/server'
import { UserSignUpInput } from '~/server/schemas/users'
import { createClient } from '~/utils/supabase/server'

export const userSignUpController = async (input: {
  input: UserSignUpInput
}) => {
  const { email, password, passwordConfirmation } = input.input

  // Validate password confirmation
  if (password !== passwordConfirmation) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: "Passwords don't match",
    })
  }

  // Create Supabase client
  const supabase = await createClient()
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
