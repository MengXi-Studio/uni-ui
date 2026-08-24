# @mengxi/uni-ui 组件库

基于 **Vue 3 + TypeScript** 的高质量 uni-app 组件库，按 **Vant 4** 规范划分组件，多端兼容（H5 / 微信小程序 / App）。

## ✨ 特性

- 🎯 **Vue 3 + TypeScript**：Composition API，完整类型推导
- 🚀 **Easycom 自动导入**：按需加载，无需手动注册
- 🎨 **主题定制**：SCSS 变量 + CSS 变量双层主题（`--mx-*`），支持运行时覆盖
- 📦 **pnpm monorepo**：`core / docs / playground / uni-app` 四子包统一管理
- 📱 **多端兼容**：H5、微信小程序、支付宝小程序、App
- 📖 **官网文档**：VitePress 驱动，参考 Vant 官网结构

## 📦 安装

```bash
# 消费方（uni-app CLI 项目）
pnpm add @mengxi/uni-ui
```

## 🔨 使用

在 `pages.json` 配置 easycom：

```json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
		}
	}
}
```

组件：

```vue
<template>
	<mx-button type="primary">主要按钮</mx-button>
	<mx-cell title="单元格" value="内容" is-link />
	<mx-switch v-model="switched" />
</template>
```

在 `App.vue` 引入全局样式：

```vue
<style lang="scss">
@use '@mengxi/uni-ui/src/styles/index.scss';
</style>
```

## 📁 目录结构（pnpm monorepo）

```
uni-ui/
├── packages/
│   ├── core/          # 组件库全部源码（组件/组合式函数/工具/样式/类型）
│   ├── docs/          # VitePress 官网文档
│   ├── playground/    # 示例项目（uni-app CLI 方式）
│   └── uni-app/       # 示例项目（HBuilderX 方式）
├── pnpm-workspace.yaml
└── tsconfig.base.json # 各子包共享的 TS 基础配置
```

## 🔧 本地开发

```bash
pnpm install                         # 安装全部依赖
pnpm --filter @mengxi/uni-ui run build   # 构建组件库（packages/core）
pnpm --filter @mengxi/uni-ui-docs run dev # 启动官网文档（packages/docs）
pnpm --filter @mengxi/uni-ui-playground run dev:h5 # 启动 CLI 示例（packages/playground）
```

## 🧩 组件列表

按 **Vant 4** 六大分类，命名统一 `mx-` 前缀。

- **基础**：Button、Icon、Image、Cell、CellGroup、Tag、Badge、Divider、Space、Skeleton、Loading、Switch、Row/Col、ConfigProvider、Sticky、Overlay、Popup
- **表单**：Field、Form、Checkbox(+Group)、Radio(+Group)、Rate、Stepper、Search、Slider、Picker、PickerGroup、Cascader、Calendar、Uploader、NumberKeyboard
- **反馈**：Toast、Notify、Dialog、ActionSheet、ShareSheet、Empty、CountDown、Circle、PullRefresh、DropdownMenu、ImagePreview、Lazyload、FloatingBubble、FloatingPanel、SwipeCell、BackTop
- **展示**：Collapse(+Item)、Progress、TextEllipsis、Watermark
- **导航**：Grid(+Item)、IndexBar(+Anchor)、NavBar、Pagination、Sidebar、Tab/Tabs/TabPane、Tabbar(+Item)、TreeSelect
- **业务**：Card、GoodsAction(+Button/Icon)、SubmitBar、ContactCard/Edit/List、Coupon(+Cell/List)、AddressList/Edit、Area、SignBoard、Signature

## 📖 文档

官网文档见 `packages/docs`，或在线访问：[@mengxi/uni-ui 文档](https://github.com/MengXi-Studio/mengxi-uni-ui/wiki)。

## 📄 License

MIT License © 2024 MengXi Studio
