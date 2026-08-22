# Slider

Slider component, supports dragging to select a value, with customizable range, step and style, aligned with Vant Slider's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-slider :model-value="50" />
</demo-live>

```vue
<mx-slider v-model="value" @change="onChange" />
```

## Range and Step

<demo-live>
  <mx-slider :model-value="0" :min="-10" :max="10" :step="5" />
</demo-live>

```vue
<mx-slider v-model="value" :min="-10" :max="10" :step="5" />
```

## Custom Style

<demo-live>
  <mx-slider
    :model-value="40"
    active-color="#ee0a24"
    inactive-color="#ffe1e1"
    bar-height="4px"
    :button-size="20"
  />
</demo-live>

```vue
<mx-slider
  v-model="value"
  active-color="#ee0a24"
  inactive-color="#ffe1e1"
  bar-height="4px"
  :button-size="20"
/>
```

## Disabled State

<demo-live>
  <mx-slider :model-value="60" disabled />
</demo-live>

```vue
<mx-slider v-model="value" disabled />
```

## Vertical Direction

In `vertical` mode, specify the container height via `custom-style`.

```vue
<mx-slider v-model="value" vertical custom-style="height: 120px" />
```

## Reverse

When `reversed` is set to `true`, the filled color bar is not shown, and the progress counts from the right / top.

```vue
<mx-slider v-model="value" reversed />
```

## Props

| Name           | Description                                | Type               | Default  |
| -------------- | ------------------------------------------ | ------------------ | -------- |
| model-value    | Current progress (v-model)                 | `number \| string` | `0`      |
| min            | Minimum value                              | `number \| string` | `0`      |
| max            | Maximum value                              | `number \| string` | `100`    |
| step           | Step                                       | `number \| string` | `1`      |
| disabled       | Whether disabled                           | `boolean`          | `false`  |
| bar-height     | Track height                               | `number \| string` | `'2px'`  |
| active-color   | Filled color (default theme color)         | `string`           | `''`     |
| inactive-color | Unfilled color (default placeholder color) | `string`           | `''`     |
| button-size    | Slider button diameter                     | `number \| string` | `'24px'` |
| reversed       | Whether reversed                           | `boolean`          | `false`  |
| vertical       | Whether vertical                           | `boolean`          | `false`  |
| custom-class   | Custom class name                          | `string`           | `''`     |
| custom-style   | Custom style                               | `string \| object` | `''`     |

## Events

| Event      | Description                         | Params                     |
| ---------- | ----------------------------------- | -------------------------- |
| change     | Triggered when the progress changes | The current progress value |
| drag-start | Triggered when dragging starts      | -                          |
| drag-end   | Triggered when dragging ends        | -                          |
