import { UserStatusOutput } from '~/server/schemas/users'
import prisma from '../../../prisma/prisma-client'

export const userStatusController = async ({
  ctx,
}: any): Promise<UserStatusOutput> => {
  console.log('user', ctx.res.locals.user)
  return ctx.res.locals.user
}
