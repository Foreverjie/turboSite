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
  postIdMeta,
  postIdInputSchema,
  postIdOutputSchema,
  postEditMeta,
  postEditInputSchema,
  postEditOutputSchema,
  postNewHookMeta,
  postNewHookInputSchema,
  postNewHookOutputSchema,
} from '../schemas/posts'
import {
  postAllController,
  postLikeController,
  postNewController,
  postIdController,
  postEditController,
  postNewHookController,
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
  newHook: publicProcedure
    // .meta(postNewHookMeta)
    .input(postNewHookInputSchema)
    .output(postNewHookOutputSchema)
    .mutation(postNewHookController),
  like: protectedProcedure
    .meta(postLikeMeta)
    .input(postLikeInputSchema)
    .output(postLikeOutputSchema)
    .mutation(postLikeController),
  meAll: protectedProcedure
    .meta(postAllMeta)
    .input(postAllInputSchema)
    .output(postAllOutputSchema)
    .query((...args) => postAllController(...args, true)),
  getById: publicProcedure
    .meta(postIdMeta)
    .input(postIdInputSchema)
    .output(postIdOutputSchema)
    .query(postIdController),
  edit: protectedProcedure
    .meta(postEditMeta)
    .input(postEditInputSchema)
    .output(postEditOutputSchema)
    .mutation(postEditController),
})
