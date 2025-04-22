import { createClient } from '~/utils/supabase/server'
import {
  UserSignInOutput,
  UserSignInInput,
} from '../../schemas/users/userSignIn.schema'

export const userSignInController = async ({
  input: { email, password },
}: {
  input: UserSignInInput
}): Promise<UserSignInOutput> => {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: { message: error.message } }
  }

  console.log('Sign in successful')

  return { error: null }
}
