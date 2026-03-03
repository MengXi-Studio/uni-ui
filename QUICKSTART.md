# 快速开始

## 📦 安装依赖

如果还没有安装依赖，请运行：

```bash
npm install --legacy-peer-deps
```

## 🚀 运行示例项目

### 方式一：H5 开发模式

```bash
cd example
npm install --legacy-peer-deps
npm run dev:h5
```

然后在浏览器中访问 http://localhost:5173 查看组件演示。

### 方式二：微信小程序开发模式

```bash
cd example
npm install --legacy-peer-deps
npm run dev:mp-weixin
```

然后在微信开发者工具中打开 `example/dist/dev/mp-weixin` 目录。

## 🛠️ 开发新组件

### 1. 创建组件目录

在 `packages/components/base/`（基础组件）或 `packages/components/business/`（业务组件）下创建：

```bash
packages/components/
└── mx-your-component/
    ├── mx-your-component.vue    # 组件实现
    ├── types.ts                 # 类型定义
    └── README.md                # 组件文档
```

### 2. 编写组件代码

参考现有组件的实现方式。

### 3. 导出组件

在 `packages/components/index.ts` 中添加：

```typescript
export { default as MxYourComponent } from './mx-your-component/mx-your-component.vue'
```

## 📦 构建组件库

```bash
npm run build
```

构建完成后，会在 `dist/` 目录生成打包文件。

## 📝 代码检查

```bash
# ESLint 检查
npm run lint

# Prettier 格式化
npm run format
```

## 🎯 常用命令

```bash
# 开发模式（运行示例项目）
npm run dev

# 构建组件库
npm run build

# 构建示例项目
npm run build:example

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm test
```

## 📖 文档

- [README.md](./README.md) - 项目介绍
- [GUIDE.md](./GUIDE.md) - 详细使用指南
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 贡献指南
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 项目架构总结

## ❓ 常见问题

### Q: 遇到依赖冲突怎么办？

A: 使用 `--legacy-peer-deps` 参数安装依赖：
```bash
npm install --legacy-peer-deps
```

### Q: 如何预览组件效果？

A: 运行 example 示例项目，里面包含了所有组件的演示。

### Q: 如何发布到 npm？

A: 
1. 更新版本号：`npm version patch`
2. 构建：`npm run build`
3. 发布：`npm publish --access public`

## 🔗 相关链接

- [Vue 3 文档](https://vuejs.org/)
- [uni-app 文档](https://uniapp.dcloud.net.cn/)
- [TypeScript 文档](https://www.typescriptlang.org/)

---

祝你开发愉快！🎉
