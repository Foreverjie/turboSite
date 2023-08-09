import prisma from '../../../prisma/prisma-client'
import { UserStatus } from '@prisma/client'
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

    const user = await prisma.user.upsert({
      create: {
        userId: userSync.id,
        email: userSync.email_addresses?.[0]?.email_address,
        name: userSync.username ?? userSync.email_addresses?.[0]?.email_address,
        createdAt: new Date(userSync.created_at),
        avatar: userSync.image_url,
        phone: userSync.phone_numbers?.[0]?.phone_numbers,
        gender: getUpdateData(userSync.gender),
      },
      update: {
        email: getUpdateData(userSync.email_addresses?.[0]?.email_address),
        name: getUpdateData(userSync.username),
        updatedAt: getUpdateData(new Date(userSync.updated_at)),
        avatar: getUpdateData(userSync.image_url),
        phone: getUpdateData(userSync.phone_numbers?.[0]?.phone_number),
        gender: getUpdateData(userSync.gender),
      },
      where: {
        userId: userSync.id,
      },
    })
    if (user.email && user.name) {
      if (!user.gender) {
        // information is not complete
        // inform user to update profile
        await prisma.user.update({
          data: {
            status: UserStatus.INFORMATION_INCOMPLETE,
          },
          where: {
            userId: user.userId,
          },
        })
      } else {
        // active user
        await prisma.user.update({
          data: {
            status: UserStatus.ACTIVE,
          },
          where: {
            userId: user.userId,
          },
        })
      }
    }
  } catch (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `sync user err ${error}`,
    })
  }

  return true
}
