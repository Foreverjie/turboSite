/**
 * 猫咪路由器工厂 - 创建可配置的猫咪相关路由
 */

import {
  catCreateInputSchema,
  catCreateMeta,
  catCreateOutputSchema,
  catListInputSchema,
  catListMeta,
  catListOutputSchema,
} from '../../schemas/cats'
import { catListController, catCreateController } from '../../controllers/cats'
import { RouterTRPCConfig } from './user.factory'
import { z } from 'zod'

/**
 * 创建猫咪路由器
 */
export function createCatRouter(config: RouterTRPCConfig) {
  const { router, publicProcedure, protectedProcedure } = config

  return router({
    getSecretCat: protectedProcedure
      .meta({
        description: 'Get a secret cat',
      })
      .input(z.void())
      .output(z.string())
      .query(() => {
        return 'you can now see this secret cat! Meow!'
      }),
    list: publicProcedure
      .meta(catListMeta)
      .input(catListInputSchema)
      .output(catListOutputSchema)
      .query(catListController),
    create: publicProcedure
      .meta(catCreateMeta)
      .input(catCreateInputSchema)
      .output(catCreateOutputSchema)
      .mutation(catCreateController),
  })
}
