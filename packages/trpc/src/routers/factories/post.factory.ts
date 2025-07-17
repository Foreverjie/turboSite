/**
 * 帖子路由器工厂 - 创建可配置的帖子相关路由
 */

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
} from '../../schemas/posts'
import {
  postAllController,
  postLikeController,
  postNewController,
  postIdController,
  postEditController,
  postNewHookController,
} from '../../controllers/posts'
import { RouterTRPCConfig } from './user.factory'

/**
 * 创建帖子路由器
 */
export function createPostRouter(config: RouterTRPCConfig) {
  const { router, publicProcedure, protectedProcedure } = config

  return router({
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
    id: publicProcedure
      .meta(postIdMeta)
      .input(postIdInputSchema)
      .output(postIdOutputSchema)
      .query(postIdController),
    edit: protectedProcedure
      .meta(postEditMeta)
      .input(postEditInputSchema)
      .output(postEditOutputSchema)
      .mutation(postEditController),
    webhook: publicProcedure
      .mutation(postNewHookController),
  })
}
