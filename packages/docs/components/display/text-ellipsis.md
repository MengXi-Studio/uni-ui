# TextEllipsis 文本省略

对长文本进行省略，支持展开/收起，对齐 Vant TextEllipsis 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <mx-text-ellipsis
    :rows="2"
    text="在一个真正的设计体系中，组件库需要覆盖绝大多数业务场景，同时保持足够的灵活性。梦溪工作室致力于打造多端统一的 uni-app 组件库，帮助开发者快速构建美观、易用的应用界面。"
  />
</demo-live>

```vue
<mx-text-ellipsis
  :rows="2"
  text="在一个真正的设计体系中，组件库需要覆盖绝大多数业务场景，同时保持足够的灵活性。梦溪工作室致力于打造多端统一的 uni-app 组件库，帮助开发者快速构建美观、易用的应用界面。"
/>
```

`rows` 为省略行数，默认 2 行；点击「展开/收起」可切换显示全部内容。

## 自定义操作文案

<demo-live>
  <mx-text-ellipsis
    :rows="1"
    expand-text="查看全部"
    collapse-text="收起内容"
    text="梦溪工作室致力于打造多端统一的 uni-app 组件库，帮助开发者快速构建美观、易用的应用界面，覆盖布局、表单、反馈、导航等常见场景。"
  />
</demo-live>

```vue
<mx-text-ellipsis
  :rows="1"
  expand-text="查看全部"
  collapse-text="收起内容"
  text="梦溪工作室致力于打造多端统一的 uni-app 组件库，帮助开发者快速构建美观、易用的应用界面，覆盖布局、表单、反馈、导航等常见场景。"
/>
```

## 自定义内容

通过默认插槽传入自定义内容（传入后 `text` 不再生效）：

```vue
<mx-text-ellipsis :rows="2">
  <view>自定义内容…</view>
</mx-text-ellipsis>
```

## 受控展开

配合 `v-model:expanded` 受控使用：

```vue
<script setup>
import { ref } from 'vue'

const expanded = ref(false)
</script>

<template>
  <mx-text-ellipsis v-model:expanded="expanded" :rows="2" :text="text" @change="onChange" />
</template>
```

## Props

| 参数             | 说明           | 类型               | 默认值  |
| ---------------- | -------------- | ------------------ | ------- |
| text             | 需要省略的文本 | `string`           | `''`    |
| width            | 容器宽度       | `string`           | `''`    |
| rows             | 省略行数       | `number \| string` | `2`     |
| expand-text      | 展开文案       | `string`           | `展开`  |
| collapse-text    | 收起文案       | `string`           | `收起`  |
| expand-trigger   | 展开触发方式   | `click \| none`    | `click` |
| default-expanded | 初始是否展开   | `boolean`          | `false` |
| custom-class     | 自定义类名     | `string`           | `''`    |
| custom-style     | 自定义样式     | `string \| object` | `''`    |

## Events

| 事件名          | 说明                                        | 回调参数       |
| --------------- | ------------------------------------------- | -------------- |
| change          | 展开/收起状态变化时触发                     | value: boolean |
| update:expanded | 展开/收起状态变化时触发（v-model:expanded） | value: boolean |

## Slots

| 名称    | 说明                               |
| ------- | ---------------------------------- |
| default | 自定义内容（传入后 text 不再生效） |
