import { UserStatusOutput } from '~/server/schemas/users'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const userStatusController = async ({
  ctx,
}: any): Promise<UserStatusOutput> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        status: true,
      },
    })

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    return user
  } catch (err) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Failed to get user status. ${err}`,
    })
  }
}
