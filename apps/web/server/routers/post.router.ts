import { protectedProcedure, publicProcedure, router } from '../trpc'
import {
  postAllMeta,
  postAllInputSchema,
  postAllOutputSchema,
  postNewMeta,
  postNewInputSchema,
  postNewOutputSchema,
} from '../schemas/posts'
import { postAllController, postNewController } from '../controllers/posts'

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
})
