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
      gender: true,
      createdAt: true,
      lastLoginIp: true,
      lastLoginTime: true,
      Post: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          files: true,
          type: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          likeBy: {
            select: {
              userId: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
  })
  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
  }

  return user
}
