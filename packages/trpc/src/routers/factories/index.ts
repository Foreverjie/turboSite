/**
 * 路由器工厂导出
 */

export * from './app.factory'
export * from './user.factory'
export * from './post.factory'
export * from './cat.factory'
export * from './ip.factory'

// 导出主要的工厂函数
export { createAppRouter, createAppRouterType, type AppRouterType } from './app.factory'
export { createUserRouter, type RouterTRPCConfig } from './user.factory'
export { createPostRouter } from './post.factory'
export { createCatRouter } from './cat.factory'
export { createIpRouter } from './ip.factory'
