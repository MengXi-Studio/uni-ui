# BackTop

A floating button to return to the top of the page. Tap it to scroll back to the top. It aligns with the API and interactions of the Vant BackTop.

## Basic Usage

Control visibility with `v-model`; tapping the button automatically returns to the top of the page (internally calls `uni.pageScrollTo`):

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
	<mx-back-top v-model="visible" />
</template>
```

A static preview:

<demo-live>
  <mx-back-top :model-value="true" :right="40" :bottom="80" />
</demo-live>

```vue
<mx-back-top :model-value="true" />
```

## Custom Style

Supports custom icon (Emoji or character), text and offset position:

<demo-live>
  <mx-back-top :model-value="true" icon="⬆" text="Top" :right="120" :bottom="80" :z-index="1000" />
</demo-live>

```vue
<mx-back-top icon="⬆" text="Top" :right="40" :bottom="80" :z-index="1000" />
```

## Auto Listening to Scrolling

Enable `teleport-on-scroll` to automatically listen to the page scroll and show when the scroll exceeds the `offset-top` threshold:

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
	<mx-back-top v-model="visible" teleport-on-scroll :offset-top="200" @click="onClick" @scroll="onScroll" />
</template>
```

## Props

| Name               | Description                                                    | Type               | Default |
| ------------------ | -------------------------------------------------------------- | ------------------ | ------- |
| model-value        | Whether to show (v-model)                                      | `boolean`          | `false` |
| right              | Offset from the right                                          | `number \| string` | `30`    |
| bottom             | Offset from the bottom                                         | `number \| string` | `40`    |
| z-index            | z-index of the element                                         | `number \| string` | `999`   |
| offset-top         | Show threshold: shown when the page scroll exceeds this height | `number \| string` | `0`     |
| icon               | Icon (Emoji or character)                                      | `string`           | `''`    |
| text               | Text                                                           | `string`           | `''`    |
| teleport-on-scroll | Whether to automatically listen to the page scroll             | `boolean`          | `false` |
| custom-class       | Custom class name                                              | `string`           | `''`    |
| custom-style       | Custom style                                                   | `string \| object` | `''`    |

## Events

| Event              | Description                                                       | Params                  |
| ------------------ | ----------------------------------------------------------------- | ----------------------- |
| update:model-value | Triggered when the visibility changes (v-model)                   | value: boolean          |
| click              | Triggered on tap (automatically returns to the top after tapping) | -                       |
| scroll             | Triggered on page scroll (requires `teleport-on-scroll`)          | `{ scrollTop: number }` |
