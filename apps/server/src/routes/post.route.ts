import {
  postAllInputSchema,
  postAllMeta,
  postAllOutputSchema,
  postByIdInputSchema,
  postByIdMeta,
  postByIdOutputSchema,
  postDislikeInputSchema,
  postDislikeMeta,
  postDislikeOutputSchema,
  postEditInputSchema,
  postEditMeta,
  postEditOutputSchema,
  postLikeInputSchema,
  postLikeMeta,
  postLikeOutputSchema,
  postNewInputSchema,
  postNewMeta,
  postNewOutputSchema,
} from '../schemas/posts'
import { deserializeUser, requireUser, restrictTo } from '../middlewares'
import { router, publicProcedure } from '../trpc'
import {
  postAllController,
  postByIdController,
  postDislikeController,
  postEditController,
  postLikeController,
  postNewController,
} from '../controllers/posts'

// export default router
export const post = router({
  postById: publicProcedure
    .meta(postByIdMeta)
    .input(postByIdInputSchema)
    .output(postByIdOutputSchema)
    .query(postByIdController), // can not get params through /trpc
  all: publicProcedure
    .meta(postAllMeta)
    .input(postAllInputSchema)
    .output(postAllOutputSchema)
    .query(postAllController),
  new: publicProcedure
    .meta(postNewMeta)
    .use(deserializeUser)
    .use(requireUser)
    .input(postNewInputSchema)
    .output(postNewOutputSchema)
    .mutation(postNewController),
  like: publicProcedure
    .meta(postLikeMeta)
    .use(deserializeUser)
    .use(requireUser)
    .input(postLikeInputSchema)
    .output(postLikeOutputSchema)
    .mutation(postLikeController),
  dislike: publicProcedure
    .meta(postDislikeMeta)
    .use(deserializeUser)
    .use(requireUser)
    .input(postDislikeInputSchema)
    .output(postDislikeOutputSchema)
    .mutation(postDislikeController),
  edit: publicProcedure
    .meta(postEditMeta)
    .use(deserializeUser)
    .use(requireUser)
    .use(restrictTo(['admin']))
    .input(postEditInputSchema)
    .output(postEditOutputSchema)
    .mutation(postEditController),
})
