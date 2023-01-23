import {
  PostDislikeInput,
  PostDislikeOutput,
  PostLikeInput,
  PostLikeOutput,
} from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postLikeController = async ({
  input,
  ctx,
}: {
  input: PostLikeInput
  ctx: any
}): Promise<PostLikeOutput> => {
  const { id } = input
  try {
    await prisma.user.update({
      where: {
        id: ctx.res.locals.user.id,
      },
      data: {
        likes: {
          connect: { id },
        },
      },
    })
    return true
  } catch (e) {
    console.error('Like post failed', e)
    return false
  }
}

export const postDislikeController = async ({
  input,
  ctx,
}: {
  input: PostDislikeInput
  ctx: any
}): Promise<PostDislikeOutput> => {
  const { id } = input
  try {
    await prisma.user.update({
      where: {
        id: ctx.res.locals.user.id,
      },
      data: {
        likes: {
          disconnect: { id },
        },
      },
    })
    return true
  } catch (e) {
    console.error('Like post failed', e)
    return false
  }
}
