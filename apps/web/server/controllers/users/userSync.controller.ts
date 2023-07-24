import { update } from 'cypress/types/lodash'
import prisma from '../../../prisma/prisma-client'
import { UserSyncInput, UserSyncOutput } from '~/server/schemas/users'
import { TRPCError } from '@trpc/server'

export const userSyncController = async ({
  input,
}: {
  input: UserSyncInput
}): Promise<UserSyncOutput> => {
  const getUpdateData = (data: any) => {
    if (data) {
      return data
    }
    return undefined
  }

  try {
    const userSync = input.data

    await prisma.user.upsert({
      create: {
        userId: userSync.id,
        email: userSync.email_addresses[0].email_address,
        name: userSync.username,
        createdAt: new Date(userSync.created_at),
        avatar: userSync.image_url,
        phone: userSync.phone_numbers[0].phone_numbers,
        gender: userSync.gender,
      },
      update: {
        email: getUpdateData(userSync.email_addresses[0].email_address),
        name: getUpdateData(userSync.username),
        updatedAt: getUpdateData(new Date(userSync.updated_at)),
        avatar: getUpdateData(userSync.image_url),
        phone: getUpdateData(userSync.phone_numbers[0].phone_numbers),
        gender: getUpdateData(userSync.gender),
      },
      where: {
        userId: userSync.id,
      },
    })
  } catch (error) {
    console.log('sync user err', error)
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'sync user err' })
  }

  // const user = await prisma.user.Sync({})
  return true
}
