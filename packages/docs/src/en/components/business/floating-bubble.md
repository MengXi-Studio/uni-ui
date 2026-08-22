# FloatingBubble

A draggable floating bubble based on `movable-area` / `movable-view`, supporting edge magnetic snapping. It aligns with the API and interactions of the Vant FloatingBubble.

## Basic Usage

Shows an icon bubble by default, draggable in both directions; on release it automatically snaps to the nearest horizontal edge.

<demo-live>
  <mx-floating-bubble icon="✚" />
</demo-live>

```vue
<mx-floating-bubble icon="✚" />
```

## Custom Text

Show a text bubble with `text`; when neither `icon` nor `text` is passed, the default slot can be used to customize the content.

<demo-live>
  <mx-floating-bubble text="Support" />
</demo-live>

```vue
<mx-floating-bubble text="Support" />
```

## Control Drag Direction

Restrict the drag direction with `axis`: `x` horizontal only, `y` vertical only, `both` both directions.

```vue
<mx-floating-bubble text="Menu" axis="x" />
<mx-floating-bubble text="Menu" axis="y" />
<mx-floating-bubble text="Menu" axis="both" />
```

## Disable Magnetic Snapping and Custom Position

Use `magnetic` to disable snapping to an edge on release, `right` / `bottom` to set the initial position, and `size` to set the bubble size.

<demo-live>
  <mx-floating-bubble text="📋" :magnetic="false" :right="24" :bottom="160" :size="56" />
</demo-live>

```vue
<mx-floating-bubble text="📋" :magnetic="false" :right="24" :bottom="160" :size="56" />
```

## Event Listening

```vue
<template>
	<mx-floating-bubble v-model="show" icon="✚" @click="onClick" @offset-change="onOffsetChange" />
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)

const onClick = () => console.log('Tap bubble')
const onOffsetChange = ({ x, y }) => console.log('Position changed', x, y)
</script>
```

## Props

| Name         | Description                                                 | Type               | Default |
| ------------ | ----------------------------------------------------------- | ------------------ | ------- |
| v-model      | Whether visible                                             | `boolean`          | `true`  |
| icon         | Icon text                                                   | `string`           | `''`    |
| text         | Text                                                        | `string`           | `''`    |
| axis         | Draggable axis: `x` horizontal / `y` vertical / `both` both | `x \| y \| both`   | `both`  |
| magnetic     | Whether to snap to an edge on release                       | `boolean`          | `true`  |
| size         | Bubble size                                                 | `number \| string` | `48`    |
| right        | Distance from the right edge (drag-start x)                 | `number \| string` | `16`    |
| bottom       | Distance from the bottom (drag-start y)                     | `number \| string` | `80`    |
| z-index      | z-index                                                     | `number \| string` | `1000`  |
| custom-class | Custom class name                                           | `string`           | `''`    |
| custom-style | Custom style                                                | `string \| object` | `''`    |

## Events

| Event             | Description                           | Params                    |
| ----------------- | ------------------------------------- | ------------------------- |
| update:modelValue | Triggered when the visibility changes | `value` (whether visible) |
| click             | Triggered when tapping the bubble     | -                         |
| offset-change     | Triggered when the position changes   | `{ x, y }`                |

## Slots

| Name    | Description                                           |
| ------- | ----------------------------------------------------- |
| default | Custom bubble content (lower priority than icon/text) |
