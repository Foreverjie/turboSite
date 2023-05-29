import { protectedProcedure, publicProcedure, router } from '../trpc'
import {
  postAllMeta,
  postAllInputSchema,
  postAllOutputSchema,
} from '../schemas/posts'
import { postAllController } from '../controllers/posts'

export const post = router({
  all: publicProcedure
    .meta(postAllMeta)
    .input(postAllInputSchema)
    .output(postAllOutputSchema)
    .query(postAllController),
})
