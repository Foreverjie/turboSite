import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { z } from 'zod'
import prisma from '../../prisma/prisma-client'

// export default router
export const user = createRouter()
  .middleware(deserializeUser)
  .middleware(requireUser)
  .query('Me', {
    output: z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
      avatar: z.string(),
      likes: z.array(
        z.object({
          content: z.string(),
        }),
      ),
      // Post: z.array(
      //   z.object({
      //     content: z.string(),
      //   }),
      // ),
    }),
    async resolve({ ctx }: any) {
      console.log('user', ctx.res.locals.user)
      return ctx.res.locals.user
    },
  })
  .mutation('Update', {
    input: z.object({
      name: z.string().optional(),
      avatar: z.string().optional(),
    }),
    output: z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
      avatar: z.string(),
    }),
    async resolve({ input, ctx }: any) {
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
    },
  })
  .middleware(restrictTo(['admin']))
  .query('All', {
    output: z
      .object({ name: z.string(), email: z.string(), role: z.string() })
      .array(),
    async resolve() {
      return await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          role: true,
        },
      })
    },
  })
