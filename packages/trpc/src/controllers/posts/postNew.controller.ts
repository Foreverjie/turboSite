import {
  PostNewInput,
  PostNewOutput,
  PostNewHookInput,
  PostNewHookOutput,
} from '../../schemas/posts'
import { TRPCError } from '@trpc/server'

export const postNewController = async ({
  input,
  ctx,
}: {
  input: PostNewInput
  ctx: any
}) => {
  throw new TRPCError({
    code: 'NOT_IMPLEMENTED',
    message: 'Post creation not implemented',
  })
}