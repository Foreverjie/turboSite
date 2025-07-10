/**
 * 使用共享路由器的示例
 * 这展示了如何在现有 Web 应用中逐步迁移到共享路由器
 */

import { createAppRouter, RouterTRPCConfig } from 'trpc-config/src/routers/factories'
import { 
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from '../trpc'

// ===== 方式一：使用工厂模式创建完整路由器 =====

const webTRPCConfig: RouterTRPCConfig = {
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
}

// 使用共享工厂创建完整的应用路由器
export const sharedAppRouter = createAppRouter(webTRPCConfig)

// ===== 方式二：混合使用 - 部分使用工厂，部分自定义 =====

import { createUserRouter, createPostRouter } from 'trpc-config/src/routers/factories'
import { z } from 'zod'

export const hybridRouter = router({
  // 使用共享的用户和帖子路由器
  user: createUserRouter(webTRPCConfig),
  post: createPostRouter(webTRPCConfig),
  
  // 自定义的本地路由
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.name} from hybrid router!` }
    }),
  
  // 可以添加更多自定义路由...
})

// ===== 方式三：传统方式 - 手动导入 schemas 和 controllers =====

import { 
  userMeController,
  userSignInController 
} from 'trpc-config/src/controllers/users'
import { 
  userMeInputSchema,
  userSignInInputSchema 
} from 'trpc-config/src/schemas/users'

export const traditionalRouter = router({
  user: router({
    me: protectedProcedure
      .input(userMeInputSchema)
      .query(userMeController),
    signIn: publicProcedure
      .input(userSignInInputSchema)
      .mutation(userSignInController),
    // 可以添加更多手动配置的路由...
  }),
  
  // 其他路由...
})

// 选择其中一种方式作为主要的 appRouter
export const appRouter = sharedAppRouter // 推荐使用工厂模式

export type AppRouter = typeof appRouter
