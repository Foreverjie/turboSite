import { PostIdInput, PostIdOutput } from '../../schemas/posts'
import { TRPCError } from '@trpc/server'

export const postIdController = async ({
  input,
  ctx,
}: {
  input: PostIdInput
  ctx: any
}): Promise<PostIdOutput> => {
  throw new TRPCError({ code: 'BAD_REQUEST', message: 'Not implemented' })
}
