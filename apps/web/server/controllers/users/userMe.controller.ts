import { UserMeOutput } from '~/schemas/users'
import prisma from '../../../prisma/prisma-client'

export const userMeController = async ({ ctx }: any): Promise<UserMeOutput> => {
  console.log('user', ctx.res.locals.user)
  return ctx.res.locals.user
}
