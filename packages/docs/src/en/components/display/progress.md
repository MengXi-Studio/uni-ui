# Progress

Used to display the current progress of an operation, supporting both line and circle types. It aligns with the API and interactions of the Vant Progress.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-progress :percentage="50" pivot-text="50%" />
</demo-live>

```vue
<mx-progress :percentage="50" pivot-text="50%" />
```

`percentage` represents the progress percentage (0-100). The progress text is customized with `pivot-text`.

## Custom Style

<demo-live>
  <mx-progress
    :percentage="70"
    pivot-text="70%"
    color="#ee0a24"
    track-color="#f5f5f5"
    :stroke-width="8"
  />
</demo-live>

```vue
<mx-progress
  :percentage="70"
  pivot-text="70%"
  color="#ee0a24"
  track-color="#f5f5f5"
  :stroke-width="8"
/>
```

## Hide Progress Text

<demo-live>
  <mx-progress :percentage="50" :show-pivot="false" />
</demo-live>

```vue
<mx-progress :percentage="50" :show-pivot="false" />
```

## Circle Progress

<demo-live>
  <mx-progress type="circle" :percentage="75" />
</demo-live>

```vue
<mx-progress type="circle" :percentage="75" />
```

The content in the middle of the circle progress can be customized through the default slot:

```vue
<mx-progress type="circle" :percentage="75" text-color="#ee0a24">
  <text style="font-size: 12px;">75 分</text>
</mx-progress>
```

## Props

| Name         | Description                                  | Type               | Default |
| ------------ | -------------------------------------------- | ------------------ | ------- |
| percentage   | Progress percentage (0-100)                  | `number \| string` | `0`     |
| type         | Type                                         | `line \| circle`   | `line`  |
| stroke-width | Stroke width                                 | `number \| string` | `4`     |
| color        | Progress bar color                           | `string`           | `''`    |
| track-color  | Track color                                  | `string`           | `''`    |
| show-pivot   | Whether to show the progress text            | `boolean`          | `true`  |
| pivot-text   | The progress text content                    | `string`           | `''`    |
| pivot-color  | The background color of the progress text    | `string`           | `''`    |
| text-color   | The color of the progress text               | `string`           | `''`    |
| show-text    | Whether to show the progress percentage text | `boolean`          | `true`  |
| custom-class | Custom class name                            | `string`           | `''`    |
| custom-style | Custom style                                 | `string \| object` | `''`    |

## Slots

| Name    | Description                                         | Slot Params |
| ------- | --------------------------------------------------- | ----------- |
| pivot   | Custom progress text content (line)                 | -           |
| default | Custom content in the middle of the circle progress | -           |
