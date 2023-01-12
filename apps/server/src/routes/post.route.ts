import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { z } from 'zod'
import prisma from '../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

const sleep = () => new Promise((res, rej) => setTimeout(res, 5000))

// export default router
export const post = createRouter()
  .mutation('Post', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }: any) {
      const { id } = input
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
        select: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          content: true,
          files: true,
          type: true,
          isBlocked: true,
          isDeleted: true,
        },
      })
      if (!post || post.isDeleted === true) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Post doesn't exist",
        })
      }
      if (
        post.isBlocked === true &&
        ctx.res.locals.user?.id !== post.author.id
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Post can not be reached',
        })
      }
      return post
    },
  })
  .query('All', {
    async resolve() {
      return await prisma.post.findMany({
        // where: {
        //   isBlocked: false,
        //   isDeleted: false,
        // },
        select: {
          isBlocked: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          likeByIds: true,
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
  .mutation('Like', {
    input: z.object({
      id: z.string(),
    }),
    output: z.boolean(),
    async resolve({ ctx, input }: any) {
      const { id } = input
      try {
        await prisma.user.update({
          where: {
            id: ctx.res.locals.user.id,
          },
          data: {
            likes: {
              connect: { id },
            },
          },
        })
        return true
      } catch (e) {
        console.error('Like post failed', e)
        return false
      }
    },
  })
  .mutation('Dislike', {
    input: z.object({
      id: z.string(),
    }),
    output: z.boolean(),
    async resolve({ ctx, input }: any) {
      const { id } = input
      try {
        await prisma.user.update({
          where: {
            id: ctx.res.locals.user.id,
          },
          data: {
            likes: {
              disconnect: { id },
            },
          },
        })
        return true
      } catch (e) {
        console.error('Like post failed', e)
        return false
      }
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
