import { TRPCError } from '@trpc/server'
import { UserUpdateInput } from '../../schemas/users'
import { db } from '../../drizzle/client'
import { usersTable } from '../../drizzle/schema'
import { sql } from 'drizzle-orm'
import { Context } from '../../context'

export const userUpdateController = async (input: {
  input: UserUpdateInput
  ctx: Context
}) => {
  const { name, image, handle } = input.input

  // To search if any user's user_meta_data contains the given handle:
  if (handle) {
    // Only search if a handle is provided for update
    const searchCriteriaJsonString = JSON.stringify({ handle: handle })

    // Get the current authenticated user's ID to potentially exclude them from the search
    // if you're checking if the handle is taken by *another* user.
    const tempSupabaseClient = input.ctx.supabase // Temporary client to get user ID
    const {
      data: { user: currentUser },
    } = await tempSupabaseClient.auth.getUser()

    if (!currentUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated.',
      })
    }

    const existingUserWithHandle = await db.query.usersTable.findFirst({
      where: sql`${usersTable.user_meta_data} @> ${searchCriteriaJsonString}::jsonb AND ${usersTable.user_id} != ${currentUser.id}`,
      columns: {
        user_id: true, // We only need to know if such a user exists
      },
    })

    if (existingUserWithHandle) {
      // Another user already has this handle in their user_meta_data.
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Handle '${handle}' is already taken by another user.`,
      })
    }
  }

  // Create Supabase client
  const supabase = input.ctx.supabase

  // Update the user with Supabase
  const { data, error } = await supabase.auth.updateUser({
    data: {
      name,
      image,
      handle,
    },
  })
  if (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
    })
  }

  return {
    error: null,
  }
}
