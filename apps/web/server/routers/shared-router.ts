/**
 * Web 应用路由器 - 使用共享路由器工厂
 */

import { createAppRouter, RouterTRPCConfig } from 'trpc-config/src/routers/factories'
import { 
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from '../trpc'

// 配置 Web 应用的 tRPC 配置
const webTRPCConfig: RouterTRPCConfig = {
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
}

// 使用共享工厂创建应用路由器
export const appRouter = createAppRouter(webTRPCConfig)

export type AppRouter = typeof appRouter
