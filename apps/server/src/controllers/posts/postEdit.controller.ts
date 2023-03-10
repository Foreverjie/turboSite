import { PostEditInput, PostEditOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postEditController = async ({
  input,
}: {
  input: PostEditInput
}): Promise<PostEditOutput> => {
  const { id, content, isBlocked } = input
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
      // files,
      isBlocked,
    },
    select: {
      // likeByIds: true,
      type: true,
      repost: {
        select: {
          content: true,
        },
      },
      content: true,
      // files: true,
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
