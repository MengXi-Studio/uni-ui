# Pagination

Data pagination display. Ellipses are shown automatically when there are more than 7 pages. It aligns with the API and interactions of the Vant Pagination.

## Basic Usage

Bind the current page number with `v-model`:

```vue
<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
	<mx-pagination v-model="currentPage" :total-items="50" />
</template>
```

A static preview:

<demo-live>
  <mx-pagination :model-value="3" :total-items="50" />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" />
```

The total page count is computed from `total-items` / `page-size` by default, or can be specified directly via `page-count`.

## Show Total Items

<demo-live>
  <mx-pagination :model-value="3" :total-items="50" show-page-size />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" show-page-size />
```

## Custom Text

<demo-live>
  <mx-pagination
    :model-value="3"
    :total-items="50"
    prev-text="Previous"
    next-text="Next"
  />
</demo-live>

```vue
<mx-pagination :model-value="3" :total-items="50" prev-text="Previous" next-text="Next" />
```

## Custom Page Content

Customize the previous page, next page and page number content through slots:

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

| Name           | Description                                       | Type               | Default    |
| -------------- | ------------------------------------------------- | ------------------ | ---------- |
| model-value    | Current page (v-model)                            | `number \| string` | `1`        |
| total-items    | Total items                                       | `number \| string` | `0`        |
| page-size      | Items per page                                    | `number \| string` | `10`       |
| page-count     | Number of pages (takes priority over total items) | `number \| string` | `0`        |
| show-page-size | Whether to show total items                       | `boolean`          | `false`    |
| force-ellipses | Whether to always show ellipses                   | `boolean`          | `true`     |
| prev-text      | Previous page text                                | `string`           | `Previous` |
| next-text      | Next page text                                    | `string`           | `Next`     |
| custom-class   | Custom class name                                 | `string`           | `''`       |
| custom-style   | Custom style                                      | `string \| object` | `''`       |

## Events

| Event              | Description                                      | Params          |
| ------------------ | ------------------------------------------------ | --------------- |
| update:model-value | Triggered when the page number changes (v-model) | current: number |
| change             | Triggered when the page number changes           | current: number |

## Slots

| Name      | Description                         | Slot Props   |
| --------- | ----------------------------------- | ------------ |
| prev-text | Custom previous page button content | -            |
| next-text | Custom next page button content     | -            |
| page      | Custom page number content          | page: number |
| page-size | Custom total items area content     | -            |
