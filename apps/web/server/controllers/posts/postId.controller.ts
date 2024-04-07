import { PostIdInput, PostIdOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const postIdController = async ({
  input,
  ctx,
}: {
  input: PostIdInput
  ctx: any
}): Promise<PostIdOutput> => {
  if (!input.id) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Post ID is required' })
  }

  const post = await prisma.post.findUnique({
    where: {
      postId: input.id,
    },
    select: {
      id: true,
      postId: true,
      content: true,
      files: true,
      likeBy: {
        select: {
          userId: true,
        },
      },
      type: true,
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
  return post
}
