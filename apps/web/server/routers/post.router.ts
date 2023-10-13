import { protectedProcedure, publicProcedure, router } from '../trpc'
import {
  postAllMeta,
  postAllInputSchema,
  postAllOutputSchema,
  postNewMeta,
  postNewInputSchema,
  postNewOutputSchema,
  postLikeMeta,
  postLikeInputSchema,
  postLikeOutputSchema,
} from '../schemas/posts'
import {
  postAllController,
  postLikeController,
  postNewController,
} from '../controllers/posts'

export const post = router({
  all: publicProcedure
    .meta(postAllMeta)
    .input(postAllInputSchema)
    .output(postAllOutputSchema)
    .query(postAllController),
  new: protectedProcedure
    .meta(postNewMeta)
    .input(postNewInputSchema)
    .output(postNewOutputSchema)
    .mutation(postNewController),
  like: protectedProcedure
    .meta(postLikeMeta)
    .input(postLikeInputSchema)
    .output(postLikeOutputSchema)
    .mutation(postLikeController),
})
