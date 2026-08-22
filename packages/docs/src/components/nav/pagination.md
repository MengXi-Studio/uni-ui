# Pagination 分页

数据分页展示，超过 7 页时自动显示省略号，对齐 Vant Pagination 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定当前页码：

```vue
<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <mx-pagination v-model="currentPage" :total-items="50" />
</template>
```

静态展示效果：

<demo-live>
  <mx-pagination :model-value="3" :total-items="50" />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" />
```

总页数默认由 `total-items` / `page-size` 计算，也可通过 `page-count` 直接指定。

## 显示总条数

<demo-live>
  <mx-pagination :model-value="3" :total-items="50" show-page-size />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" show-page-size />
```

## 自定义文案

<demo-live>
  <mx-pagination
    :model-value="3"
    :total-items="50"
    prev-text="上一页"
    next-text="下一页"
  />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" prev-text="上一页" next-text="下一页" />
```

## 自定义页码内容

通过插槽自定义上一页、下一页及页码内容：

```vue
<mx-pagination :model-value="3" :total-items="50">
  <template #prev-text>
    <text>←</text>
  </template>
  <template #next-text>
    <text>→</text>
  </template>
  <template #page="{ page }">
    <text style="color: #1989fa;">{{ page }}</text>
  </template>
</mx-pagination>
```

## Props

| 参数           | 说明                       | 类型               | 默认值   |
| -------------- | -------------------------- | ------------------ | -------- |
| model-value    | 当前页（v-model）          | `number \| string` | `1`      |
| total-items    | 总条数                     | `number \| string` | `0`      |
| page-size      | 每页条数                   | `number \| string` | `10`     |
| page-count     | 页码数（优先于总条数计算） | `number \| string` | `0`      |
| show-page-size | 是否显示总条数             | `boolean`          | `false`  |
| force-ellipses | 是否强制显示省略号         | `boolean`          | `true`   |
| prev-text      | 上一页文案                 | `string`           | `上一页` |
| next-text      | 下一页文案                 | `string`           | `下一页` |
| custom-class   | 自定义类名                 | `string`           | `''`     |
| custom-style   | 自定义样式                 | `string \| object` | `''`     |

## Events

| 事件名             | 说明                      | 回调参数        |
| ------------------ | ------------------------- | --------------- |
| update:model-value | 页码变化时触发（v-model） | current: number |
| change             | 页码变化时触发            | current: number |

## Slots

| 名称      | 说明                 | 插槽参数     |
| --------- | -------------------- | ------------ |
| prev-text | 自定义上一页按钮内容 | -            |
| next-text | 自定义下一页按钮内容 | -            |
| page      | 自定义页码内容       | page: number |
| page-size | 自定义总条数区域内容 | -            |
