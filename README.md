# MengXi Uni-UI 组件库

基于 Vue 3 + TypeScript 的高质量 uni-app 组件库，支持多端运行（H5、小程序、App）。

## ✨ 特性

- 🎯 **Vue 3 + TypeScript**: 使用最新的 Vue 3 Composition API，提供完整的类型推导
- 🚀 **Easycom 自动导入**: 支持组件自动导入，无需手动注册
- 🎨 **主题定制**: 支持 SCSS 变量和 CSS Variables，轻松自定义主题
- 📦 **按需引入**: 支持 Tree Shaking，减小打包体积
- 🔧 **丰富的工具函数**: 内置常用工具函数和组合式函数
- 📱 **多端兼容**: 完美支持 H5、微信小程序、支付宝小程序、App 等平台
- 📖 **完善的文档**: 每个组件都提供详细的文档和示例

## 📦 安装

### npm 安装

```bash
npm install @mengxi/uni-ui
```

### 手动安装

从 [uni-app 插件市场](https://ext.dcloud.net.cn/) 下载组件包，放入项目根目录。

## 🔨 使用示例

### 在 pages.json 中配置 easycom

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^mx-(.*)": "@mengxi/uni-ui/components/mx-$1/mx-$1.vue"
    }
  }
}
```

### 使用组件

```vue
<template>
  <view>
    <mx-button type="primary">主要按钮</mx-button>
    <mx-input v-model="value" placeholder="请输入内容" />
    <mx-card title="卡片标题">
      <p>卡片内容</p>
    </mx-card>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

## 📁 目录结构

```
mengxi-uni-ui/
├── packages/              # 主包目录
│   ├── components/       # 组件源码
│   │   ├── base/        # 基础 UI 组件
│   │   └── business/    # 业务组件
│   ├── composables/      # 组合式函数
│   ├── utils/           # 工具函数
│   └── styles/          # 样式文件
├── example/             # 示例项目
├── docs/                # 文档
└── dist/                # 打包输出
```

## 🧩 组件列表

### 基础组件
- ✅ MX Button - 按钮
- ✅ MX Input - 输入框
- ✅ MX Card - 卡片
- ✅ MX Icon - 图标
- ✅ MX Loading - 加载

### 业务组件
- ✅ MX Product Card - 商品卡片
- ✅ MX User Info - 用户信息

## 📖 文档

详细文档请查看：[文档地址](https://github.com/MengXi-Studio/mengxi-uni-ui/wiki)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License © 2024 MengXi Studio
