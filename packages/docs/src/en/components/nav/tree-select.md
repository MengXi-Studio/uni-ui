# TreeSelect

A selection component with category navigation on the left and category options on the right. It supports single and multiple selection and aligns with the API and interactions of the Vant TreeSelect.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage (Single Selection)

`v-model` binds the id of the selected item, and `v-model:main-active-index` binds the selected index of the left navigation:

```vue
<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
  {
    text: 'Zhejiang',
    children: [
      { text: 'Hangzhou', id: 1 },
      { text: 'Wenzhou', id: 2 },
      { text: 'Ningbo', id: 3 },
    ],
  },
  {
    text: 'Jiangsu',
    children: [
      { text: 'Nanjing', id: 4 },
      { text: 'Suzhou', id: 5 },
      { text: 'Wuxi', id: 6 },
    ],
  },
]
</script>

<template>
  <mx-tree-select
    v-model="activeId"
    v-model:main-active-index="mainActiveIndex"
    :items="items"
    height="300px"
  />
</template>
```

A static preview:

<demo-live>
  <mx-tree-select
    :model-value="1"
    :main-active-index="0"
    height="280px"
    :items="[
      { text: 'Zhejiang', children: [{ text: 'Hangzhou', id: 1 }, { text: 'Wenzhou', id: 2 }, { text: 'Ningbo', id: 3 }] },
      { text: 'Jiangsu', children: [{ text: 'Nanjing', id: 4 }, { text: 'Suzhou', id: 5 }, { text: 'Wuxi', id: 6 }] },
    ]"
  />
</demo-live>

## Multiple Selection

Passing an array to `v-model` enables multiple selection. Use `max` to limit the maximum number of selected items:

```vue
<script setup>
import { ref } from 'vue'

const activeIds = ref([1, 2])
const mainActiveIndex = ref(0)

const items = [
  {
    text: 'Zhejiang',
    children: [
      { text: 'Hangzhou', id: 1 },
      { text: 'Wenzhou', id: 2 },
      { text: 'Ningbo', id: 3 },
    ],
  },
  {
    text: 'Jiangsu',
    children: [
      { text: 'Nanjing', id: 4 },
      { text: 'Suzhou', id: 5 },
    ],
  },
]
</script>

<template>
  <mx-tree-select
    v-model="activeIds"
    v-model:main-active-index="mainActiveIndex"
    :items="items"
    :max="2"
    height="300px"
  />
</template>
```

## Disabled Items

An option cannot be selected when `disabled` is set:

<demo-live>
  <mx-tree-select
    :model-value="1"
    :main-active-index="0"
    height="240px"
    :items="[
      { text: 'Zhejiang', children: [{ text: 'Hangzhou', id: 1 }, { text: 'Ningbo', id: 3, disabled: true }] },
      { text: 'Jiangsu', children: [{ text: 'Nanjing', id: 4, disabled: true }] },
    ]"
  />
</demo-live>

```vue
<mx-tree-select
  :model-value="1"
  :items="[
    {
      text: 'Zhejiang',
      children: [
        { text: 'Hangzhou', id: 1 },
        { text: 'Ningbo', id: 3, disabled: true },
      ],
    },
  ]"
/>
```

## Props

| Name              | Description                            | Type                                       | Default    |
| ----------------- | -------------------------------------- | ------------------------------------------ | ---------- |
| model-value       | Selected id (v-model, string or array) | `string \| number \| (string \| number)[]` | `''`       |
| items             | Tree data                              | `TreeItem[]`                               | `[]`       |
| main-active-index | Selected index of the left main column | `number \| string`                         | `0`        |
| height            | Height                                 | `string`                                   | `''`       |
| active-color      | Active color                           | `string`                                   | `''`       |
| max               | Maximum number of selectable items     | `number \| string`                         | `Infinity` |
| custom-class      | Custom class name                      | `string`                                   | `''`       |
| custom-style      | Custom style                           | `string \| object`                         | `''`       |

## Events

| Event                    | Description                                                                  | Params                                            |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------- |
| update:model-value       | Triggered when the selected value changes (v-model)                          | value: `string \| number \| (string \| number)[]` |
| update:active-text       | Triggered when the text of the selected item changes                         | value: `string \| (string \| object)[]`           |
| update:main-active-index | Triggered when the left navigation index changes (v-model:main-active-index) | index: number                                     |
| click-nav                | Triggered when tapping the left navigation                                   | index: number                                     |
| click-item               | Triggered when tapping an option on the right                                | `{ text: string, value: string \| number }`       |

## Slots

| Name | Description           | Slot Props                                                                  |
| ---- | --------------------- | --------------------------------------------------------------------------- |
| item | Custom option content | item: option object / active: whether selected / disabled: whether disabled |

## Data Structure

`items` is a `TreeItem[]` tree array, each node:

| Key               | Description                                                          | Type               |
| ----------------- | -------------------------------------------------------------------- | ------------------ |
| text              | Title                                                                | `string`           |
| textValue         | Option text (used for callbacks, defaults to text)                   | `string`           |
| value / id / name | Unique identifier (takes value, id, name in order, defaults to text) | `string \| number` |
| children          | Child option list (only needed for first-level nodes)                | `TreeItem[]`       |
| disabled          | Whether disabled                                                     | `boolean`          |
