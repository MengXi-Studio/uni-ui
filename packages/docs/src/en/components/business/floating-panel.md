# FloatingPanel

A bottom floating panel that can switch between multiple height anchors by dragging the handle. It aligns with the API and interactions of the Vant FloatingPanel.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Set the array of snap height anchors (from small to large) with `anchors`, bind the currently snapped height with `v-model`. After dragging and releasing the handle, the panel snaps to the nearest anchor.

<demo-live>
  <mx-floating-panel :model-value="100" :anchors="[60, 200, 400]">
    <view style="padding: 16px">
      <text>Drag the top handle to switch the panel height</text>
    </view>
  </mx-floating-panel>
</demo-live>

```vue
<template>
  <mx-floating-panel v-model="height" :anchors="[60, 200, 400]">
    <view style="padding: 16px">
      <text>Panel content</text>
    </view>
  </mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const height = ref(100)
</script>
```

## Custom Anchors and Top Offset

Use `offset-top` to limit the maximum expanded height of the panel (distance from the top of the screen), and `duration` to set the snapping animation duration.

```vue
<template>
  <mx-floating-panel
    v-model="height"
    :anchors="[100, 300, 560]"
    :offset-top="80"
    :duration="300"
    @height-change="onHeightChange"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <view style="padding: 16px">
      <text>Panel content</text>
    </view>
  </mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const height = ref(100)

const onHeightChange = (height) => console.log('Height changed', height)
const onDragStart = (height) => console.log('Drag started', height)
const onDragEnd = (height) => console.log('Drag ended', height)
</script>
```

## Calling Methods via ref

Jump to a specified anchor height with the `setAnchor` method, and get the current panel height with `getHeight`.

```vue
<template>
  <mx-floating-panel ref="panelRef" v-model="height" :anchors="[100, 300, 560]">
    <view style="padding: 16px">
      <mx-button type="primary" size="small" @click="expand">Expand Panel</mx-button>
    </view>
  </mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const panelRef = ref()
const height = ref(100)

const expand = () => {
  panelRef.value.setAnchor(560)
  console.log('Current height', panelRef.value.getHeight())
}
</script>
```

## Props

| Name           | Description                                                              | Type               | Default |
| -------------- | ------------------------------------------------------------------------ | ------------------ | ------- |
| v-model        | Currently snapped anchor (height of the panel exposed at the bottom, px) | `number`           | `100`   |
| anchors        | Array of snap height anchors (from small to large)                       | `array`            | `[]`    |
| content-height | Content height                                                           | `number`           | `0`     |
| offset-top     | Minimum offset from the top                                              | `number`           | `40`    |
| duration       | Snapping animation duration (ms)                                         | `number`           | `300`   |
| z-index        | z-index                                                                  | `number \| string` | `999`   |
| custom-class   | Custom class name                                                        | `string`           | `''`    |
| custom-style   | Custom style                                                             | `string \| object` | `''`    |

## Events

| Event             | Description                                  | Params               |
| ----------------- | -------------------------------------------- | -------------------- |
| update:modelValue | Triggered when the panel snap height changes | current panel height |
| height-change     | Triggered when the panel height changes      | current panel height |
| dragstart         | Triggered when dragging starts               | current panel height |
| dragend           | Triggered after snapping on drag end         | current panel height |

## Methods (called via ref)

| Method name | Description                       | Returns  |
| ----------- | --------------------------------- | -------- |
| setAnchor   | Jump to a specified anchor height | -        |
| getHeight   | Get the current panel height      | `number` |
