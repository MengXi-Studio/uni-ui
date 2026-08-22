# CountDown

Used to display the countdown value in real time, with support for custom formats and millisecond rendering. It aligns with the API and interactions of the Vant CountDown.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-count-down :time="3600000" />
</demo-live>

```vue
<mx-count-down :time="3600000" />
```

`time` is the total countdown duration, in milliseconds. It starts counting down automatically by default.

## Custom Format

<demo-live>
  <mx-count-down :time="86400000" format="DD 天 HH 时 mm 分 ss 秒" />
</demo-live>

```vue
<mx-count-down :time="86400000" format="DD 天 HH 时 mm 分 ss 秒" />
```

## Millisecond Rendering

<demo-live>
  <mx-count-down :time="3600000" millisecond format="HH:mm:ss:SS" />
</demo-live>

```vue
<mx-count-down :time="3600000" millisecond format="HH:mm:ss:SS" />
```

## Custom Style

Customize the rendering of each segment with slots named after the format segments. Separators are still output according to `format`:

<demo-live>
  <mx-count-down :time="3600000">
    <template #HH="{ value }">
      <text style="color: #fff; background: #ee0a24; border-radius: 4px; padding: 2px 4px;">{{ value }}</text>
    </template>
    <template #mm="{ value }">
      <text style="color: #fff; background: #ee0a24; border-radius: 4px; padding: 2px 4px;">{{ value }}</text>
    </template>
    <template #ss="{ value }">
      <text style="color: #fff; background: #ee0a24; border-radius: 4px; padding: 2px 4px;">{{ value }}</text>
    </template>
  </mx-count-down>
</demo-live>

```vue
<mx-count-down :time="3600000">
  <template #HH="{ value }">
    <text class="count-down-block">{{ value }}</text>
  </template>
  <template #mm="{ value }">
    <text class="count-down-block">{{ value }}</text>
  </template>
  <template #ss="{ value }">
    <text class="count-down-block">{{ value }}</text>
  </template>
</mx-count-down>
```

## Props

| Name         | Description                                                  | Type               | Default    |
| ------------ | ------------------------------------------------------------ | ------------------ | ---------- |
| time         | Total countdown duration (milliseconds)                      | `number \| string` | `0`        |
| format       | Time format, supports `DD`/`HH`/`mm`/`ss`/`S`/`SS` segments  | `string`           | `HH:mm:ss` |
| auto-start   | Whether to start automatically                               | `boolean`          | `true`     |
| millisecond  | Whether to display in milliseconds (shows `S`/`SS` segments) | `boolean`          | `false`    |
| custom-class | Custom class name                                            | `string`           | `''`       |
| custom-style | Custom style                                                 | `string \| object` | `''`       |

## Events

| Event  | Description                          | Params                                                                           |
| ------ | ------------------------------------ | -------------------------------------------------------------------------------- |
| change | Triggered when the countdown changes | `{ total, days, hours, minutes, seconds, millisecond }` (all values are numbers) |
| finish | Triggered when the countdown ends    | -                                                                                |

## Slots

| Name                       | Description                                                                            | Slot Params                              |
| -------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------- |
| DD / HH / mm / ss / S / SS | Slots with the same name as format segments, customizing the rendering of that segment | value: the displayed text of the segment |

## Methods (call through ref)

| Method    | Description                                                                   | Params         | Returns |
| --------- | ----------------------------------------------------------------------------- | -------------- | ------- |
| start     | Start the countdown                                                           | -              | -       |
| pause     | Pause the countdown                                                           | -              | -       |
| reset     | Reset the countdown, optionally passing the new total duration (milliseconds) | total?: number | -       |
| remaining | Remaining time (milliseconds)                                                 | -              | number  |
