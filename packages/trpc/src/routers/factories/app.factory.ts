/**
 * 应用路由器工厂 - 创建完整的应用路由器
 */

import { z } from 'zod'
import { RouterTRPCConfig } from './user.factory'
import { createUserRouter } from './user.factory'
import { createPostRouter } from './post.factory'
import { createCatRouter } from './cat.factory'
import { createIpRouter } from './ip.factory'

/**
 * 创建完整的应用路由器
 */
export function createAppRouter(config: RouterTRPCConfig) {
  const { router, publicProcedure } = config

  // 创建各个子路由器
  const userRouter = createUserRouter(config)
  const postRouter = createPostRouter(config)
  const catRouter = createCatRouter(config)
  const ipRouter = createIpRouter(config)

  // 组合成完整的应用路由器
  return router({
    sayHello: publicProcedure
      .meta({
        description: 'Say hello',
      })
      .input(z.object({ name: z.string() }))
      .output(z.object({ greeting: z.string() }))
      .query(({ input }) => {
        return { greeting: `Hello ${input.name}!` }
      }),
    user: userRouter,
    post: postRouter,
    cat: catRouter,
    ip: ipRouter,
  })
}

/**
 * 推断路由器类型的辅助函数
 */
export function createAppRouterType<T extends RouterTRPCConfig>(config: T) {
  return createAppRouter(config)
}

// 导出类型推断辅助
export type AppRouterType<T extends RouterTRPCConfig> = ReturnType<typeof createAppRouter>
