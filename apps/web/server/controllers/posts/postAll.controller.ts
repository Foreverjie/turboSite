import { PostAllOutput, PostAllInput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postAllController = async (input: {
  input: PostAllInput
}): Promise<PostAllOutput> => {
  const { limit, cursor } = input.input ?? {
    limit: 20,
    cursor: undefined,
  }

  const posts = await prisma.post.findMany({
    take: (limit ?? 20) + 1, // get an extra item at the end which we'll use as next cursor
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
      postId: true,
      content: true,
      files: true,
      createdAt: true,
      updatedAt: true,
    },
    cursor: cursor ? { postId: cursor } : undefined,
  })
  let nextCursor: string | undefined = undefined

  console.log('posts', posts.length)
  if (posts.length > (limit ?? 20)) {
    const nextPost = posts.pop()
    console.log('nextPost', nextPost)
    nextCursor = nextPost?.postId
  }
  return {
    posts,
    nextCursor,
  }
}
