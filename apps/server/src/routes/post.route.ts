import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { z } from 'zod'
import prisma from '../../prisma/prisma-client'

// export default router
export const post = createRouter()
  .mutation('Post', {
    input: z.object({ id: z.string() }),
    async resolve({ input }: any) {
      const { id } = input
      return await prisma.post.findUnique({
        where: {
          id,
        },
        select: {
          author: {
            select: {
              name: true,
            },
          },
          content: true,
          files: true,
          type: true,
        },
      })
    },
  })
  .middleware(deserializeUser)
  .middleware(requireUser)
  .mutation('New', {
    input: z.object({
      content: z.string(),
      files: z.string().array().optional(),
    }),
    output: z.object({
      content: z.string(),
      files: z.string().array().optional(),
    }),
    async resolve({ ctx, input }: any) {
      return await prisma.post.create({
        data: {
          content: input.content,
          files: input.files,
          author: {
            connect: { id: ctx.res.locals.user.id },
          },
          // authorId
        },
      })
    },
  })
  .middleware(restrictTo(['admin']))
  .query('All', {
    async resolve() {
      return await prisma.post.findMany({
        select: {
          id: true,
          content: true,
        },
      })
    },
  })
