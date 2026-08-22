# Sidebar

A vertically displayed navigation bar used to switch between different content areas. It aligns with the API and interactions of the Vant Sidebar.

## Basic Usage

Bind the currently selected index with `v-model`; each direct child node in the default slot is an option:

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
	<mx-sidebar v-model="active">
		<view>Option 1</view>
		<view>Option 2</view>
		<view>Option 3</view>
		<view>Option 4</view>
	</mx-sidebar>
</template>
```

A static preview:

<demo-live>
  <mx-sidebar :model-value="0">
    <view>Option 1</view>
    <view>Option 2</view>
    <view>Option 3</view>
    <view>Option 4</view>
  </mx-sidebar>
</demo-live>

```vue
<mx-sidebar :model-value="0">
  <view>Option 1</view>
  <view>Option 2</view>
  <view>Option 3</view>
  <view>Option 4</view>
</mx-sidebar>
```

## Listening to Switch Events

```vue
<mx-sidebar v-model="active" @change="onChange" @click="onClick">
  <view>Option 1</view>
  <view>Option 2</view>
</mx-sidebar>
```

## Props

| Name         | Description                      | Type               | Default |
| ------------ | -------------------------------- | ------------------ | ------- |
| model-value  | Current selected index (v-model) | `number \| string` | `0`     |
| custom-class | Custom class name                | `string`           | `''`    |
| custom-style | Custom style                     | `string \| object` | `''`    |

## Events

| Event              | Description                                         | Params        |
| ------------------ | --------------------------------------------------- | ------------- |
| update:model-value | Triggered when the selected index changes (v-model) | index: number |
| change             | Triggered when switching options                    | index: number |
| click              | Triggered when tapping an option                    | index: number |

## Slots

| Name    | Description                                    |
| ------- | ---------------------------------------------- |
| default | Option content; each direct child is an option |
