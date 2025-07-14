import { TRPCError } from '@trpc/server'
import { PostEditInput, PostEditOutput } from '../../schemas/posts'

export const postEditController = async ({
  input,
  ctx,
}: {
  input: PostEditInput
  ctx: any
}): Promise<PostEditOutput> => {
  throw new TRPCError({
    code: 'NOT_IMPLEMENTED',
    message: 'Post edit functionality is not implemented yet.',
  })
}
