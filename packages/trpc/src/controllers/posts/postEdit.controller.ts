import { TRPCError } from '@trpc/server'
import { PostEditInput, PostEditOutput } from '../../schemas/posts'
import prisma from '~/prisma/prisma-client'

export const postEditController = async ({
  input,
  ctx,
}: {
  input: PostEditInput
  ctx: any
}): Promise<PostEditOutput> => {
  const { postId, content, isBlocked, files } = input
  if (!postId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Post ID is required',
    })
  }
  const postExists = await prisma.post.findUnique({
    where: {
      postId,
    },
  })
  if (!postExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Post does not exist',
    })
  }
  if (postExists.authorId !== ctx.auth.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to edit this post',
    })
  }
  const post = await prisma.post.update({
    where: {
      postId,
    },
    data: {
      content,
      files,
      isBlocked,
    },
    select: {
      id: true,
      postId: true,
      likeBy: true,
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
          id: true,
          name: true,
          avatar: true,
        },
      },
      isBlocked: true,
      updatedAt: true,
    },
  })
  return post
}
