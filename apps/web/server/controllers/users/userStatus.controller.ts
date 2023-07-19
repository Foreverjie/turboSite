import { UserStatusOutput } from '~/server/schemas/users'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const userStatusController = async ({
  ctx,
}: any): Promise<UserStatusOutput> => {
  const user = await prisma.user.findUnique({
    where: {
      id: ctx.req.cookies.userId,
    },
    select: {
      status: true,
    },
  })

  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND' })
  }

  return user
}
