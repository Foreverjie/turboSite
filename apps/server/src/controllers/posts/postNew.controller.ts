import { PostNewInput, PostNewOutput } from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'

export const postNewController = async ({
  input,
  ctx,
}: {
  input: PostNewInput
  ctx: any
}): Promise<PostNewOutput> => {
  const post = await prisma.post.create({
    data: {
      content: input.content,
      files: input.files,
      author: {
        connect: { id: ctx.res.locals.user.id },
      },
    },
  })
  return post
}
