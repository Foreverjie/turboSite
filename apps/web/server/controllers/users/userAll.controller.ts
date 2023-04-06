import { UserAllOutput, UserMeOutput } from '~/schemas/users'
import prisma from '../../../prisma/prisma-client'

export const userALlController = async (): Promise<UserAllOutput> => {
  return await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
    },
  })
}
