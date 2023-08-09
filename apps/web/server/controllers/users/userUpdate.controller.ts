import prisma from '../../../prisma/prisma-client'
import { UserUpdateInput, UserUpdateOutput } from '~/server/schemas/users'

export const userUpdateController = async ({
  input,
  ctx,
}: {
  input: UserUpdateInput
  ctx: any
}): Promise<UserUpdateOutput> => {
  const user = await prisma.user.update({
    where: {
      userId: ctx.auth.userId,
    },
    data: input,
    select: {
      // id: true,
      gender: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  })
  return user
}
