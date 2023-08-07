import { UserMeOutput } from '~/server/schemas/users'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const userMeController = async ({ ctx }: any): Promise<UserMeOutput> => {
  const user = await prisma.user.findUnique({
    where: {
      userId: ctx.auth.userId,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      avatar: true,
      likes: true,
    },
  })
  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
  }

  return user
}
