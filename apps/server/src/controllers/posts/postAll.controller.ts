import { PostAllOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postAllController = async (): Promise<PostAllOutput> => {
  const posts = await prisma.post.findMany({
    where: {
      isBlocked: false,
      isDeleted: false,
    },
    select: {
      type: true,
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
      files: true,
    },
  })
  return posts
}
