# TextEllipsis

Truncates long text and supports expand/collapse. It aligns with the API and interactions of the Vant TextEllipsis.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

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

`rows` is the number of truncated lines, 2 by default; click "Expand/Collapse" to toggle showing the full content.

## Custom Action Text

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

## Custom Content

Pass custom content through the default slot (when passed, `text` no longer takes effect):

```vue
<mx-text-ellipsis :rows="2">
  <view>自定义内容…</view>
</mx-text-ellipsis>
```

## Controlled Expansion

Used in a controlled way with `v-model:expanded`:

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

| Name             | Description                      | Type               | Default |
| ---------------- | -------------------------------- | ------------------ | ------- |
| text             | The text to truncate             | `string`           | `''`    |
| width            | Container width                  | `string`           | `''`    |
| rows             | Number of truncated lines        | `number \| string` | `2`     |
| expand-text      | Expand text                      | `string`           | `展开`  |
| collapse-text    | Collapse text                    | `string`           | `收起`  |
| expand-trigger   | Expand trigger method            | `click \| none`    | `click` |
| default-expanded | Whether to be expanded initially | `boolean`          | `false` |
| custom-class     | Custom class name                | `string`           | `''`    |
| custom-style     | Custom style                     | `string \| object` | `''`    |

## Events

| Event           | Description                                                         | Params         |
| --------------- | ------------------------------------------------------------------- | -------------- |
| change          | Triggered when the expand/collapse state changes                    | value: boolean |
| update:expanded | Triggered when the expand/collapse state changes (v-model:expanded) | value: boolean |

## Slots

| Name    | Description                                               |
| ------- | --------------------------------------------------------- |
| default | Custom content (when passed, text no longer takes effect) |
