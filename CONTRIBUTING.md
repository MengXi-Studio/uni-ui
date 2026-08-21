# 贡献指南

欢迎为 @mengxi/uni-ui 做出贡献！

## 开发环境设置

### 1. Fork 并克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/@mengxi/uni-ui.git
cd @mengxi/uni-ui
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行示例项目

```bash
npm run dev
```

### 4. 开发组件

在 `packages/components` 目录下创建新组件。

## 代码规范

### Commit 信息格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型:**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建/工具链相关

**示例:**

```
feat(button): 添加新的按钮类型

添加了 danger 类型的按钮支持

Closes #123
```

### 代码风格

- 使用 TypeScript 编写所有组件
- 使用 Vue 3 Composition API
- 遵循 ESLint 和 Prettier 配置
- 组件以 `mx-` 前缀命名

## 提交 Pull Request

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 2. 开发和测试

确保：

- 代码通过 ESLint 检查
- 编写必要的测试
- 更新文档

### 3. 提交更改

```bash
git add .
git commit -m "feat: your feature description"
```

### 4. 推送分支

```bash
git push origin feature/your-feature-name
```

### 5. 创建 PR

在 GitHub 上创建 Pull Request 到 `main` 分支。

## 组件开发指南

### 1. 创建组件目录结构

```
components/
└── mx-your-component/
    ├── mx-your-component.vue    # 组件实现
    ├── types.ts                 # 类型定义
    └── README.md                # 组件文档
```

### 2. 编写组件

```vue
<template>
  <view class="mx-your-component">
    <!-- 组件内容 -->
  </view>
</template>

<script setup lang="ts">
import type { YourComponentProps } from './types'

const props = withDefaults(defineProps<YourComponentProps>(), {
  // 默认值
})
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;

.mx-your-component {
  // 样式
}
</style>
```

### 3. 导出组件

在 `packages/components/index.ts` 中添加导出：

```typescript
export { default as MxYourComponent } from './mx-your-component/mx-your-component.vue'
```

### 4. 编写文档

在组件的 README.md 中说明：

- Props
- Events
- Slots
- 使用示例

## 问题反馈

发现问题？请提交 [Issue](https://github.com/MengXi-Studio/mengxi-uni-ui/issues)。

## 问题讨论

有任何问题都可以在 [Discussions](https://github.com/MengXi-Studio/mengxi-uni-ui/discussions) 中讨论。

## 感谢

感谢所有为这个项目做出贡献的人！
