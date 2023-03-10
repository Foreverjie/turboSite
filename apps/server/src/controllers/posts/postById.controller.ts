import { PostByIdInput, PostByIdOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const postByIdController = async ({
  input,
  ctx,
}: {
  input: PostByIdInput
  ctx: any
}): Promise<PostByIdOutput> => {
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
      // files: true,
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
  if (post.isBlocked === true && ctx.res.locals.user?.id !== post.author.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Post can not be reached',
    })
  }
  return post
}
