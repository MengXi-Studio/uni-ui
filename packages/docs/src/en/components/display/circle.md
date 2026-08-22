# Circle

A circular progress component that supports custom progress color, track color, size and stroke width. It aligns with the API and interactions of the Vant Circle.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

`value` represents the progress percentage (0 - 100).

<demo-live>
  <mx-circle :value="30" />
</demo-live>

```vue
<mx-circle :value="30" />
```

## Custom Style

Customize the circle style with `size`, `stroke-width`, `color` and `layer-color`.

<demo-live>
  <mx-circle
    :value="60"
    size="120px"
    :stroke-width="8"
    color="#ee0a24"
    layer-color="#ebedf0"
  />
</demo-live>

```vue
<mx-circle :value="60" size="120px" :stroke-width="8" color="#ee0a24" layer-color="#ebedf0" />
```

## Counterclockwise

<demo-live>
  <mx-circle :value="75" :clockwise="false" />
</demo-live>

```vue
<mx-circle :value="75" :clockwise="false" />
```

## Center Content

Display custom content in the center of the circle through the default slot.

<demo-live>
  <mx-circle :value="45" size="120px">
    <text>45%</text>
  </mx-circle>
</demo-live>

```vue
<mx-circle :value="45" size="120px">
  <text>45%</text>
</mx-circle>
```

## API

### Props

| Name         | Description                                              | Type               | Default |
| ------------ | -------------------------------------------------------- | ------------------ | ------- |
| value        | Current progress (0 - 100)                               | `number \| string` | `0`     |
| size         | Circle size                                              | `number \| string` | `100px` |
| stroke-width | Stroke width                                             | `number \| string` | `4`     |
| color        | Progress color, uses the theme color when not set        | `string`           | -       |
| layer-color  | Track color, uses the theme color when not set           | `string`           | -       |
| clockwise    | Whether to go clockwise                                  | `boolean`          | `true`  |
| speed        | Change speed (visual transition duration, API preserved) | `number \| string` | `0`     |
| custom-class | Custom class name                                        | `string`           | -       |
| custom-style | Custom style                                             | `string \| object` | -       |

### Events

| Event  | Description                               | Params          |
| ------ | ----------------------------------------- | --------------- |
| change | Triggered when the progress value changes | `value: number` |

### Slots

| Name    | Description                                |
| ------- | ------------------------------------------ |
| default | Custom content in the center of the circle |
