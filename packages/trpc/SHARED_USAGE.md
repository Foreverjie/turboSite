# tRPC 共享包使用指南

这个包提供了跨平台的 tRPC 配置、schemas、controllers 和适配器，可以在 Web 和 Mobile 应用之间共享。

## 功能特性

### 1. 共享 Schemas
- 输入/输出验证 schemas
- 支持 users、posts、cats、ip 等模块
- 使用 Zod 进行类型安全验证

### 2. 共享 Controllers  
- 业务逻辑控制器
- 抽象化的数据库和认证接口
- 支持不同环境的适配器注入

### 3. 适配器系统
- 认证适配器 (AuthAdapter)
- 数据库适配器 (DatabaseAdapter)  
- 支持 Supabase、其他后端服务

### 4. 平台特定配置
- Web 端配置 (Next.js + Supabase)
- Mobile 端配置 (React Native + 可配置后端)

## 使用方法

### Web 应用 (Next.js)

```typescript
// server/context.ts
import { createWebContext } from 'trpc-config/src/adapters/web'

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const adapterContext = await createWebContext()
  return {
    user: adapterContext.user,
    auth: adapterContext.auth,
    db: adapterContext.db,
  }
}

// server/routers/shared-router.ts - 使用共享路由器工厂
import { createAppRouter, RouterTRPCConfig } from 'trpc-config/src/routers/factories'
import { 
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from '../trpc'

const webTRPCConfig: RouterTRPCConfig = {
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
}

export const appRouter = createAppRouter(webTRPCConfig)
export type AppRouter = typeof appRouter

// server/router.ts - 传统方式（仍然支持）
import { 
  userMeController,
  userSignInController 
} from 'trpc-config/src/controllers/users'
import { 
  userMeInputSchema,
  userSignInInputSchema 
} from 'trpc-config/src/schemas/users'

export const userRouter = router({
  me: protectedProcedure
    .input(userMeInputSchema)
    .query(userMeController),
  signIn: publicProcedure
    .input(userSignInInputSchema)
    .mutation(userSignInController),
})
```

### Mobile 应用 (React Native)

```typescript
// adapters/mobile.ts
import { AuthAdapter, DatabaseAdapter } from 'trpc-config/src/adapters'

class MobileAuthAdapter implements AuthAdapter {
  // 实现移动端特定的认证逻辑
  async getUser() {
    // 使用 AsyncStorage 或其他移动端存储
  }
}

// context/mobile.ts
import { createMobileContext } from './adapters/mobile'

export const createMobileContext = () => {
  return {
    auth: new MobileAuthAdapter(),
    db: new MobileDatabaseAdapter(),
  }
}

// routers/mobile-router.ts - 使用共享路由器工厂
import { createAppRouter, RouterTRPCConfig } from 'trpc-config/src/routers/factories'
import { 
  router,
  publicProcedure,
  protectedProcedure,
} from '../trpc' // 移动端的 tRPC 配置

const mobileTRPCConfig: RouterTRPCConfig = {
  router,
  publicProcedure,
  protectedProcedure,
  // 移动端可能不需要 admin procedures
}

export const appRouter = createAppRouter(mobileTRPCConfig)
export type AppRouter = typeof appRouter

// routers/user.ts - 传统方式（仍然支持）
import { 
  userMeController,
  userSignInController 
} from 'trpc-config/src/controllers/users'
import { 
  userMeInputSchema,
  userSignInInputSchema 
} from 'trpc-config/src/schemas/users'

// 使用相同的 schemas 和 controllers
export const userRouter = router({
  me: protectedProcedure
    .input(userMeInputSchema)
    .query(userMeController),
  signIn: publicProcedure
    .input(userSignInInputSchema)
    .mutation(userSignInController),
})
```

## 目录结构

```
packages/trpc/src/
├── adapters/           # 适配器接口和实现
│   ├── index.ts       # 基础接口
│   ├── supabase.ts    # Supabase 适配器
│   └── web.ts         # Web 应用适配器
├── schemas/           # 共享验证 schemas
│   ├── users/         # 用户相关 schemas
│   ├── posts/         # 帖子相关 schemas
│   └── ...
├── controllers/       # 共享业务逻辑
│   ├── users/         # 用户控制器
│   ├── posts/         # 帖子控制器
│   └── ...
├── routers/           # 共享路由定义
│   ├── factories/     # 路由器工厂
│   │   ├── app.factory.ts    # 应用路由器工厂
│   │   ├── user.factory.ts   # 用户路由器工厂
│   │   ├── post.factory.ts   # 帖子路由器工厂
│   │   └── ...
│   ├── user.router.ts # 原始路由器文件（参考用）
│   └── ...
├── server/           # 服务端配置
├── client/           # 客户端配置
├── react/            # React 配置
└── middlewares/      # 中间件
```

## 优势

1. **代码复用**: Web 和 Mobile 应用共享相同的业务逻辑和路由定义
2. **类型安全**: 完整的 TypeScript 类型支持
3. **模块化**: 可以按需导入所需功能
4. **扩展性**: 易于添加新的适配器和平台支持
5. **维护性**: 集中管理 API 定义和业务逻辑
6. **灵活性**: 支持工厂模式和传统导入两种方式

## 迁移指南

### 从 Web 应用迁移

1. 安装共享包依赖
2. 更新导入路径，使用 `trpc-config/*` 
3. 修改 context 创建使用适配器系统
4. 选择迁移方式：
   - **工厂模式**: 使用 `createAppRouter` 快速创建完整路由器
   - **传统模式**: 逐步替换 schemas 和 controllers 导入

### 移动应用集成

1. 安装共享包
2. 实现移动端特定的适配器
3. 选择集成方式：
   - **工厂模式**: 使用路由器工厂快速创建相同的 API 结构
   - **选择性导入**: 只导入需要的 schemas 和 controllers
4. 配置移动端 tRPC 客户端

### 两种使用方式对比

**工厂模式** (推荐)
- ✅ 快速集成，一次性获得完整 API
- ✅ 自动保持 Web/Mobile API 一致性  
- ✅ 易于维护和更新
- ❌ 可能包含不需要的路由

**传统模式** (灵活)
- ✅ 精确控制需要的功能
- ✅ 更小的包体积
- ✅ 渐进式迁移
- ❌ 需要手动保持一致性
