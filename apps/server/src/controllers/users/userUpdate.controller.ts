import prisma from '../../../prisma/prisma-client'
import { UserUpdateInput, UserUpdateOutput } from '~/schemas/users'

export const userUpdateController = async ({
  input,
  ctx,
}: {
  input: UserUpdateInput
  ctx: any
}): Promise<UserUpdateOutput> => {
  const { name, avatar } = input
  const user = await prisma.user.update({
    where: {
      id: ctx.res.locals.user.id,
    },
    data: {
      name,
      avatar,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  })
  return user
}
