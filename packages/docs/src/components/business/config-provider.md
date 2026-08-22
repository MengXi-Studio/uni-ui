# ConfigProvider 全局配置

全局配置组件，用于包裹页面内容实现深色模式切换与 CSS 主题变量定制，对齐 Vant ConfigProvider 的 API 与交互。

## 基础用法

将 `mx-config-provider` 包裹在页面内容外层，为其内部的组件提供主题配置。

```vue
<template>
	<mx-config-provider>
		<view class="page">
			<mx-button type="primary">主要按钮</mx-button>
		</view>
	</mx-config-provider>
</template>
```

## 深色模式

通过 `theme="dark"` 开启深色模式，组件会应用内置的深色主题变量。

<demo-live>
  <mx-config-provider theme="dark">
    <view style="padding: 8px">
      <mx-cell title="单元格" value="内容" label="深色模式下的单元格" />
    </view>
  </mx-config-provider>
</demo-live>

```vue
<mx-config-provider theme="dark">
  <view style="padding: 8px">
    <mx-cell title="单元格" value="内容" label="深色模式下的单元格" />
  </view>
</mx-config-provider>
```

## 定制主题变量

通过 `theme-vars` 传入以 CSS 变量名为 key 的对象，覆盖默认主题变量，仅对包裹范围内的组件生效。

<demo-live>
  <mx-config-provider :theme-vars="{ '--mx-primary-color': '#7232dd' }">
    <mx-button type="primary" style="margin-right: 8px">主要按钮</mx-button>
    <mx-tag type="primary" style="margin-right: 8px">标签</mx-tag>
    <mx-cell title="单元格" value="内容" style="margin-top: 8px" />
  </mx-config-provider>
</demo-live>

```vue
<mx-config-provider :theme-vars="{ '--mx-primary-color': '#7232dd' }">
  <mx-button type="primary">主要按钮</mx-button>
  <mx-tag type="primary">标签</mx-tag>
  <mx-cell title="单元格" value="内容" />
</mx-config-provider>
```

常用主题变量：

| 变量名             | 说明       |
| ------------------ | ---------- |
| --mx-primary-color | 主题色     |
| --mx-success-color | 成功色     |
| --mx-warning-color | 警告色     |
| --mx-danger-color  | 危险色     |
| --mx-text-color    | 主文本色   |
| --mx-text-color-2  | 次要文本色 |
| --mx-text-color-3  | 弱文本色   |
| --mx-background    | 页面背景色 |
| --mx-background-2  | 组件背景色 |
| --mx-border-color  | 边框色     |

## 分主题配置变量

`theme-vars-light` 与 `theme-vars-dark` 分别在浅色、深色主题下生效，`theme-vars` 始终生效（优先级最高）。

```vue
<template>
	<mx-config-provider :theme="theme" :theme-vars-light="{ '--mx-primary-color': '#1989fa' }" :theme-vars-dark="{ '--mx-primary-color': '#7232dd' }">
		<mx-button type="primary">主题按钮</mx-button>
	</mx-config-provider>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>
```

## Props

| 参数             | 说明                             | 类型               | 默认值  |
| ---------------- | -------------------------------- | ------------------ | ------- |
| theme            | 主题：`light` 浅色 / `dark` 深色 | `light \| dark`    | `light` |
| theme-vars       | 主题变量（key 为 CSS 变量名）    | `object`           | `{}`    |
| theme-vars-dark  | 深色主题变量                     | `object`           | `{}`    |
| theme-vars-light | 浅色主题变量                     | `object`           | `{}`    |
| custom-class     | 自定义类名                       | `string`           | `''`    |
| custom-style     | 自定义样式                       | `string \| object` | `''`    |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 包裹的页面内容 |
