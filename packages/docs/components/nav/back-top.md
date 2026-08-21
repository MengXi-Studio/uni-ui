# BackTop 回到顶部

返回页面顶部的悬浮按钮，点击后回到页面顶部，对齐 Vant BackTop 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 控制显示隐藏，点击按钮自动回到页面顶部（内部调用 `uni.pageScrollTo`）：

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <mx-back-top v-model="visible" />
</template>
```

静态展示效果：

<demo-live>
  <mx-back-top :model-value="true" :right="40" :bottom="80" />
</demo-live>

```vue
<mx-back-top :model-value="true" />
```

## 自定义样式

支持自定义图标（Emoji 或字符）、文字及偏移位置：

<demo-live>
  <mx-back-top :model-value="true" icon="⬆" text="顶部" :right="120" :bottom="80" :z-index="1000" />
</demo-live>

```vue
<mx-back-top icon="⬆" text="顶部" :right="40" :bottom="80" :z-index="1000" />
```

## 自动监听滚动

开启 `teleport-on-scroll` 后自动监听页面滚动，滚动超过 `offset-top` 阈值时显示：

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <mx-back-top
    v-model="visible"
    teleport-on-scroll
    :offset-top="200"
    @click="onClick"
    @scroll="onScroll"
  />
</template>
```

## Props

| 参数               | 说明                               | 类型               | 默认值  |
| ------------------ | ---------------------------------- | ------------------ | ------- |
| model-value        | 是否显示（v-model）                | `boolean`          | `false` |
| right              | 距右偏移                           | `number \| string` | `30`    |
| bottom             | 距底偏移                           | `number \| string` | `40`    |
| z-index            | 元素 z-index                       | `number \| string` | `999`   |
| offset-top         | 出现阈值：页面滚动超过该高度时显示 | `number \| string` | `0`     |
| icon               | 图标（Emoji 或字符）               | `string`           | `''`    |
| text               | 文字                               | `string`           | `''`    |
| teleport-on-scroll | 是否自动监听页面滚动               | `boolean`          | `false` |
| custom-class       | 自定义类名                         | `string`           | `''`    |
| custom-style       | 自定义样式                         | `string \| object` | `''`    |

## Events

| 事件名             | 说明                                        | 回调参数                |
| ------------------ | ------------------------------------------- | ----------------------- |
| update:model-value | 显示状态变化时触发（v-model）               | value: boolean          |
| click              | 点击时触发（点击后自动回到页面顶部）        | -                       |
| scroll             | 页面滚动时触发（需开启 teleport-on-scroll） | `{ scrollTop: number }` |
