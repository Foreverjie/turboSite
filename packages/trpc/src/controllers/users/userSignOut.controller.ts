import { UserSignOutOutput } from '../../schemas/users/userSignOut.schema'

export const userSignOutController = async ({ctx}): Promise<UserSignOutOutput> => {
  const supabase = ctx.supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: { message: error.message } }
  }

  console.log('Sign out successful')

  return { error: null }
}
