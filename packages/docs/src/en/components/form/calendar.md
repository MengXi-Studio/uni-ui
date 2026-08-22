# Calendar

Calendar component, popped up from the bottom, supports three modes: single, multiple and range, aligned with Vant Calendar's API and interactions.

## Basic Usage

```vue
<mx-calendar v-model:show="show" v-model="date" @confirm="onConfirm" />
```

`v-model` binds a timestamp (`number`) in `single` mode, and an array of timestamps in `multiple` / `range` mode.

## Multiple Date Selection

When `type` is set to `multiple`, you can click to select multiple dates, and click again on a selected date to deselect it.

```vue
<mx-calendar v-model:show="show" v-model="dates" type="multiple" />
```

## Range Selection

When `type` is set to `range`, you can select a start and end date, and the dates in between are highlighted.

```vue
<mx-calendar v-model:show="show" v-model="range" type="range" />
```

## Custom Date Range

Limit the selectable range with `min-date` and `max-date` (pass timestamps). Months outside the range cannot be switched to.

```vue
<mx-calendar v-model:show="show" v-model="date" :min-date="minDate" :max-date="maxDate" />
```

```js
const minDate = new Date(2025, 7, 1).getTime()
const maxDate = new Date(2025, 8, 30).getTime()
```

## Custom First Day of Week

When `first-day-of-week` is set to `1`, Monday is used as the first day of each week.

```vue
<mx-calendar v-model:show="show" v-model="date" :first-day-of-week="1" />
```

## Hide the Confirm Button

When `show-confirm` is set to `false`, the confirm button at the bottom is hidden. In `single` mode, a date is confirmed and the popup closes immediately after it is clicked.

```vue
<mx-calendar v-model:show="show" v-model="date" :show-confirm="false" />
```

## Props

| Name               | Description                                                                            | Type                          | Default       |
| ------------------ | -------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| show               | Whether to show (v-model:show)                                                         | `boolean`                     | `false`       |
| title              | Title                                                                                  | `string`                      | `Date Select` |
| type               | Selection mode                                                                         | `single \| multiple \| range` | `single`      |
| model-value        | Selected dates (v-model), a timestamp or an array of timestamps                        | `number \| array`             | `null`        |
| default-date       | Default selected dates (timestamps, `number` for single, `array` for multiple / range) | `number \| array`             | `null`        |
| min-date           | Minimum selectable date timestamp                                                      | `number`                      | `null`        |
| max-date           | Maximum selectable date timestamp                                                      | `number`                      | `null`        |
| show-confirm       | Whether to show the bottom confirm button                                              | `boolean`                     | `true`        |
| round              | Whether to use rounded corners                                                         | `boolean`                     | `true`        |
| cancel-button-text | Text of the cancel button                                                              | `string`                      | `Cancel`      |
| first-day-of-week  | First day of the week (0 = Sunday, 1 = Monday)                                         | `number \| string`            | `0`           |
| z-index            | Popup z-index level                                                                    | `number \| string`            | `1000`        |
| custom-class       | Custom class name                                                                      | `string`                      | `''`          |
| custom-style       | Custom style                                                                           | `string \| object`            | `''`          |

## Events

| Event   | Description                                                                                                                            | Params                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| confirm | Triggered when the date selection is complete (clicking confirm, or selecting a date when the confirm button is hidden in single mode) | The selected value serialized according to the current `type` |
| select  | Triggered when any date is clicked and selected                                                                                        | The selected value serialized according to the current `type` |
| cancel  | Triggered when clicking cancel                                                                                                         | -                                                             |

Selected value format: `single` is a timestamp, `multiple` is an array of timestamps, `range` is `[startTimestamp, endTimestamp]`.
