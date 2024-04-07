import { TRPCError } from '@trpc/server'
import { PostEditInput, PostEditOutput } from '../../schemas/posts'
import prisma from '~/prisma/prisma-client'

export const postEditController = async ({
  input,
}: {
  input: PostEditInput
}): Promise<PostEditOutput> => {
  const { id, content, isBlocked, files } = input
  if (!id) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Post ID is required',
    })
  }
  const post = await prisma.post.update({
    where: {
      postId: id,
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
