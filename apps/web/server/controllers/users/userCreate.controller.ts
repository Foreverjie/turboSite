import prisma from '../../../prisma/prisma-client'
import { UserCreateOutput } from '~/server/schemas/users'

export const userCreateController = async ({
  ctx,
}: {
  ctx: any
}): Promise<UserCreateOutput> => {
  console.log('user', ctx)
  //   const user = await prisma.user.create({})
  return true
}
