import { PostLikeInput, PostLikeOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postLikeController = async ({
  input,
  ctx,
}: {
  input: PostLikeInput
  ctx: any
}): Promise<PostLikeOutput> => {
  const { id, like } = input
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        likeBy: like
          ? {
              connect: {
                userId: ctx.auth.userId,
              },
            }
          : {
              disconnect: {
                userId: ctx.auth.userId,
              },
            },
      },
    })
    return true
  } catch (e) {
    console.log('e', e)
    return false
  }
}
