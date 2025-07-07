# Flash Mobile App

基于 Expo 和 React Native 开发的移动端应用，与 Web 端保持一致的设计系统。

## 功能特性

- 🎨 **统一设计系统** - 与 Web 端共享设计令牌（颜色、间距、字体等）
- 📱 **跨平台支持** - iOS、Android 和 Web 平台
- 🔐 **用户认证** - 登录功能，支持密码显示/隐藏
- 🎯 **现代 UI** - 使用 React Native Reanimated 实现流畅动画
- 🏗️ **Monorepo 架构** - 与 Web 和 Server 项目共享代码和配置

## 快速开始

### 环境要求

- Node.js 18+
- pnpm
- Expo CLI
- 移动端开发环境（Xcode for iOS, Android Studio for Android）

### 安装和运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev:mobile

# 或者在 mobile 目录下
cd apps/mobile
pnpm start

# 运行在特定平台
pnpm ios      # iOS 模拟器
pnpm android  # Android 模拟器
pnpm web      # Web 浏览器
```

### 环境变量

复制 `.env.example` 到 `.env` 并配置：

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:3001
EXPO_PUBLIC_WEB_BASE_URL=http://localhost:3000
```

## 项目结构

```
apps/mobile/
├── src/
│   ├── components/     # 可重用组件
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Logo.tsx
│   ├── screens/        # 页面组件
│   │   └── SignInScreen.tsx
│   └── config/         # 配置文件
├── assets/            # 静态资源
├── App.tsx           # 应用入口
├── app.json          # Expo 配置
├── babel.config.js   # Babel 配置
└── metro.config.js   # Metro 配置
```

## 设计系统

使用共享的 `design-tokens` 包，包含：

- **颜色系统** - Primary、Gray、Success、Error、Warning
- **间距** - xs, sm, md, lg, xl, 2xl, 3xl
- **字体** - 大小和权重
- **边框半径** - none, sm, md, lg, xl, full
- **阴影** - sm, md, lg

## 组件库

### Button
```tsx
<Button
  title="登录"
  onPress={handleLogin}
  variant="primary"
  isLoading={loading}
/>
```

### Input
```tsx
<Input
  placeholder="邮箱"
  value={email}
  onChangeText={setEmail}
  isPassword={false}
/>
```

## 开发指南

### 添加新页面

1. 在 `src/screens/` 创建新组件
2. 在 `src/screens/index.ts` 导出
3. 在路由中配置（待实现导航）

### 添加新组件

1. 在 `src/components/` 创建组件
2. 使用设计令牌保持一致性
3. 在 `src/components/index.ts` 导出

### 样式指南

- 使用 `design-tokens` 包中的常量
- 遵循 React Native 样式最佳实践
- 保持与 Web 端设计一致

## 部署

### 开发构建

```bash
# 构建开发版本
expo build:android
expo build:ios
```

### 生产构建

```bash
# 使用 EAS Build
eas build --platform all
```

## 技术栈

- **React Native** - 跨平台移动开发
- **Expo** - 开发工具链和服务
- **TypeScript** - 类型安全
- **React Native Reanimated** - 高性能动画
- **React Native SVG** - SVG 支持
- **Expo Vector Icons** - 图标库

## 与 Web 端的差异

- 使用 React Native 组件而非 HTML 元素
- 样式使用 StyleSheet 而非 CSS
- 导航使用 React Navigation（计划中）
- 平台特定的 API 调用

## 未来计划

- [ ] 集成 React Navigation
- [ ] 添加更多页面（注册、忘记密码等）
- [ ] 集成推送通知
- [ ] 添加主题切换（深色模式）
- [ ] 集成 API 调用
- [ ] 添加单元测试
- [ ] 性能优化
