import { PostAllOutput, PostAllInput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postAllController = async (
  input: {
    input: PostAllInput
    ctx: any
  },
  onlyMe: boolean = false,
): Promise<PostAllOutput> => {
  const { limit, cursor } = input.input ?? {
    limit: 20,
    cursor: undefined,
  }

  const posts = await prisma.post.findMany({
    take: (limit ?? 20) + 1, // get an extra item at the end which we'll use as next cursor
    orderBy: [
      {
        updatedAt: 'desc', // not unique key, so need to add another key to order by, otherwise it will be missing data
      },
      {
        id: 'desc',
      },
    ],
    cursor: cursor ? { postId: cursor } : undefined,
    where: {
      isBlocked: false,
      isDeleted: false,
      authorId: onlyMe ? input.ctx.auth.userId : undefined,
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
  })
  let nextCursor: string | undefined = undefined

  if (posts.length > (limit ?? 20)) {
    const nextPost = posts.pop()
    nextCursor = nextPost?.postId
  }
  return {
    posts,
    nextCursor,
  }
}
