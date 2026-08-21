# Sidebar 侧边导航

垂直展示的导航栏，用于在不同内容区域之间进行切换，对齐 Vant Sidebar 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定当前选中索引，默认插槽中的每个直接子节点即为一个选项：

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mx-sidebar v-model="active">
    <view>选项一</view>
    <view>选项二</view>
    <view>选项三</view>
    <view>选项四</view>
  </mx-sidebar>
</template>
```

静态展示效果：

<demo-live>
  <mx-sidebar :model-value="0">
    <view>选项一</view>
    <view>选项二</view>
    <view>选项三</view>
    <view>选项四</view>
  </mx-sidebar>
</demo-live>

```vue
<mx-sidebar :model-value="0">
  <view>选项一</view>
  <view>选项二</view>
  <view>选项三</view>
  <view>选项四</view>
</mx-sidebar>
```

## 监听切换事件

```vue
<mx-sidebar v-model="active" @change="onChange" @click="onClick">
  <view>选项一</view>
  <view>选项二</view>
</mx-sidebar>
```

## Props

| 参数         | 说明                    | 类型               | 默认值 |
| ------------ | ----------------------- | ------------------ | ------ |
| model-value  | 当前选中索引（v-model） | `number \| string` | `0`    |
| custom-class | 自定义类名              | `string`           | `''`   |
| custom-style | 自定义样式              | `string \| object` | `''`   |

## Events

| 事件名             | 说明                          | 回调参数      |
| ------------------ | ----------------------------- | ------------- |
| update:model-value | 选中索引变化时触发（v-model） | index: number |
| change             | 切换选项时触发                | index: number |
| click              | 点击选项时触发                | index: number |

## Slots

| 名称    | 说明                               |
| ------- | ---------------------------------- |
| default | 选项内容，每个直接子节点为一个选项 |
