import { UserMeOutput } from '~/schemas/users'
import prisma from '../../../prisma/prisma-client'

export const userMeController = async ({ ctx }: any): Promise<UserMeOutput> => {
  return ctx.res.locals.user
}
