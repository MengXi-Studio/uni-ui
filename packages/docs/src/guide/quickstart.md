# 快速上手

@mengxi/uni-ui 是面向 uni-app 的多端组件库，支持 H5、微信小程序、支付宝小程序、App。

## 安装

```bash
# 在 uni-app CLI 项目（或本仓库 playground 子包）中
pnpm add @mengxi/uni-ui
```

## 配置 easycom

在 `pages.json` 中添加：

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

配置后无需手动注册组件，直接使用 `<mx-button>` 等即可。

## 引入全局样式

在 `App.vue` 中引入一次全局样式（reset + CSS 变量 + 过渡动画）：

```vue
<style lang="scss">
@use '@mengxi/uni-ui/src/styles/index.scss';
</style>
```

## 使用组件

```vue
<template>
	<view>
		<mx-button type="primary">主要按钮</mx-button>
		<mx-cell title="单元格" value="内容" is-link />
		<mx-switch v-model="switched" />
		<mx-field v-model="value" label="输入框" placeholder="请输入" clearable />
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const switched = ref(true)
const value = ref('')
</script>
```

## 运行示例

```bash
# 本仓库：CLI 方式示例（packages/playground）
pnpm --filter @mengxi/uni-ui-playground run dev:h5
```

> HBuilderX 方式示例见 `packages/uni-app`。
