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
  postRefreshMeta,
  postRefreshInputSchema,
  postRefreshOutputSchema,
} from '../schemas/posts'
import {
  postAllController,
  postLikeController,
  postNewController,
  postIdController,
  postEditController,
  postRefreshController,
} from '../controllers'

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
  meAll: protectedProcedure
    .meta(postAllMeta)
    .input(postAllInputSchema)
    .output(postAllOutputSchema)
    .query(postAllController),
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
  refresh: protectedProcedure
    .meta(postRefreshMeta)
    .input(postRefreshInputSchema)
    .output(postRefreshOutputSchema)
    .mutation(postRefreshController),
})
