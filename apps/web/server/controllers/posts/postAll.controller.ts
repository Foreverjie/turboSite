import { PostAllOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postAllController = async (): Promise<PostAllOutput> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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
      likeBy: {
        select: {
          userId: true,
        },
      },
      id: true,
      content: true,
      files: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return posts
}
