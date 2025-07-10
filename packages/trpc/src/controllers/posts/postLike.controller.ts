import { PostLikeInput, PostLikeOutput } from '../../schemas/posts'

export const postLikeController = async ({
  input,
  ctx,
}: {
  input: PostLikeInput
  ctx: any
}): Promise<PostLikeOutput> => {
  const { id, like } = input
  try {
    
    return true
  } catch (e) {
    console.log('e', e)
    return false
  }
}
