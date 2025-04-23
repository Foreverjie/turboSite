import { createClient } from '~/utils/supabase/server'
import { UserSignOutOutput } from '../../schemas/users/userSignOut.schema'

export const userSignOutController = async (): Promise<UserSignOutOutput> => {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: { message: error.message } }
  }

  console.log('Sign out successful')

  return { error: null }
}
