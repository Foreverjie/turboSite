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
              avatar: true,
            },
          },
          content: true,
          files: true,
          type: true,
        },
      })
    },
  })
  .query('All', {
    async resolve() {
      return await prisma.post.findMany({
        select: {
          isBlocked: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          id: true,
          content: true,
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
        },
      })
    },
  })
  .middleware(restrictTo(['admin']))
  .mutation('Edit', {
    input: z.object({
      id: z.string(),
      content: z.string().optional(),
      isBlocked: z.boolean().optional(),
      files: z.string().array().optional(),
    }),
    async resolve({ input }: any) {
      const { id, content, isBlocked, files } = input
      const post = await prisma.post.update({
        where: {
          id,
        },
        data: {
          content,
          files,
          isBlocked,
        },
        select: {
          type: true,
          repost: {
            select: {
              content: true,
            },
          },
          content: true,
          files: true,
          author: {
            select: {
              name: true,
              avatar: true,
            },
          },
          isBlocked: true,
          updatedAt: true,
        },
      })
      return post
    },
  })
