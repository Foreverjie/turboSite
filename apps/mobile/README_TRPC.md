# Mobile App tRPC Integration

这个文档描述了如何在 React Native mobile app 中使用 tRPC 与后端 API 通信。

## 架构概述

Mobile app 使用共享的 `trpc-config` 包来与 Web 应用保持 API 一致性：

```
packages/trpc/          # 共享 tRPC 配置包
├── src/
│   ├── schemas/        # 输入/输出验证 schemas
│   ├── controllers/    # 业务逻辑控制器
│   ├── routers/        # 路由定义
│   └── react/          # React 客户端配置
```

```
apps/mobile/            # React Native 应用
├── src/
│   ├── utils/
│   │   ├── trpc.ts           # tRPC 客户端
│   │   └── trpcProvider.tsx  # Provider 组件
│   ├── hooks/
│   │   └── useTRPC.ts        # 自定义 tRPC hooks
│   ├── config/
│   │   └── api.ts            # API 配置
│   └── components/
│       └── PostsList.tsx     # 示例组件
```

## 设置步骤

### 1. 安装依赖

已在 `package.json` 中添加了必要的依赖：

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.56.2",
    "@trpc/client": "^10.45.2",
    "@trpc/react-query": "^10.45.2",
    "superjson": "^2.2.1",
    "trpc-config": "workspace:*"
  }
}
```

运行安装命令：

```bash
cd apps/mobile
pnpm install
```

### 2. 配置开发环境

更新 `src/config/api.ts` 中的开发环境 URL：

```typescript
development: {
  // 更新为你的本地机器 IP 地址
  baseUrl: 'http://192.168.1.100:9797', // 替换为实际 IP
}
```

### 3. App 配置

`App.tsx` 已被更新以包含 `TRPCProvider`：

```tsx
import { TRPCProvider } from './src/utils/trpcProvider'

export default function App() {
  return <TRPCProvider>{/* 你的应用组件 */}</TRPCProvider>
}
```

## 使用方法

### 基本查询

```tsx
import { trpc } from '../utils/trpcProvider'

function MyComponent() {
  const {
    data: posts,
    isLoading,
    error,
  } = trpc.post.all.useQuery({
    page: 1,
    limit: 10,
  })

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <FlatList
      data={posts?.posts || []}
      renderItem={({ item }) => <PostItem post={item} />}
    />
  )
}
```

### 变更 (Mutations)

```tsx
import { trpc } from '../utils/trpcProvider'

function SignInForm() {
  const signInMutation = trpc.user.signIn.useMutation({
    onSuccess: data => {
      console.log('Sign in successful:', data)
      // 导航到主页面或更新状态
    },
    onError: error => {
      Alert.alert('Error', error.message)
    },
  })

  const handleSignIn = () => {
    signInMutation.mutate({
      email,
      password,
    })
  }

  return (
    <Button
      title="Sign In"
      onPress={handleSignIn}
      disabled={signInMutation.isLoading}
    />
  )
}
```

### 自定义 Hooks

使用 `src/hooks/useTRPC.ts` 中的预构建 hooks：

```tsx
import { useAuth, usePosts } from '../hooks/useTRPC'

function ProfileScreen() {
  const { user, isAuthenticated, signOut } = useAuth()
  const { posts, isLoading } = usePosts()

  if (!isAuthenticated) {
    return <SignInScreen />
  }

  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
      <PostsList posts={posts} isLoading={isLoading} />
    </View>
  )
}
```

## 可用的 API 端点

基于共享的 tRPC 配置，以下端点可用：

### 用户认证

- `trpc.user.signIn.useMutation()` - 用户登录
- `trpc.user.signUp.useMutation()` - 用户注册
- `trpc.user.signOut.useMutation()` - 用户登出
- `trpc.user.me.useQuery()` - 获取当前用户信息
- `trpc.user.sendOtp.useMutation()` - 发送 OTP

### 帖子管理

- `trpc.post.all.useQuery()` - 获取所有帖子
- `trpc.post.new.useMutation()` - 创建新帖子
- `trpc.post.like.useMutation()` - 点赞帖子
- `trpc.post.getById.useQuery()` - 根据 ID 获取帖子

### 实用工具

- `trpc.ip.info.useQuery()` - 获取 IP 信息

## 调试

### 开发模式下的日志

tRPC 客户端配置了开发模式下的详细日志记录。检查 Metro 日志以查看 API 调用：

```bash
npx expo start
```

### 网络调试

在开发中，确保：

1. 你的后端服务器在 `http://localhost:9797` 上运行
2. 如果在真实设备上测试，更新 `api.ts` 中的 IP 地址
3. 确保防火墙允许移动设备访问开发服务器

### 常见问题

**网络错误：**

- 检查 API URL 配置
- 确保后端服务器正在运行
- 验证网络连接

**类型错误：**

- 确保 `trpc-config` 包已正确安装
- 检查导入路径是否正确

## 生产部署

更新 `src/config/api.ts` 中的生产 URL：

```typescript
production: {
  baseUrl: 'https://your-production-api.com',
}
```

## 扩展

### 添加新的 API 调用

1. 在 `packages/trpc/src/schemas/` 中定义新的 schema
2. 在 `packages/trpc/src/controllers/` 中实现控制器
3. 在 `packages/trpc/src/routers/` 中添加路由
4. 在移动应用中使用新的 API

### 自定义错误处理

在 `trpcProvider.tsx` 中扩展错误处理：

```tsx
const [trpcClient] = useState(() =>
  trpc.createClient({
    links: [
      httpBatchLink({
        // ... 其他配置
        fetch: async (input, init) => {
          try {
            const response = await fetch(input, init)
            if (!response.ok) {
              // 自定义错误处理
              throw new Error(`API Error: ${response.status}`)
            }
            return response
          } catch (error) {
            // 记录错误或显示通知
            console.error('API Call Failed:', error)
            throw error
          }
        },
      }),
    ],
  }),
)
```

这样就完成了 mobile app 的 tRPC 集成！现在你可以使用类型安全的 API 调用，这些调用与 Web 应用保持一致。
