import prisma from '../../../prisma/prisma-client'
import { UserSyncInput, UserSyncOutput } from '~/server/schemas/users'

export const userSyncController = async ({
  ctx,
  input,
}: {
  input: UserSyncInput
  ctx: any
}): Promise<UserSyncOutput> => {
  console.log('user data', input)
  //   const user = await prisma.user.Sync({})
  return true
}
