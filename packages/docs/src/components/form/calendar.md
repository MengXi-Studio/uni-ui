# Calendar 日历

日历组件，底部弹出，支持单选 / 多选 / 区间三种模式，对齐 Vant Calendar 的 API 与交互。

## 基础用法

```vue
<mx-calendar v-model:show="show" v-model="date" @confirm="onConfirm" />
```

`v-model` 在 `single` 模式下绑定时间戳（`number`），在 `multiple` / `range` 模式下绑定时间戳数组。

## 多选日期

`type` 设为 `multiple` 后可点击选择多个日期，再次点击已选日期取消选择。

```vue
<mx-calendar v-model:show="show" v-model="dates" type="multiple" />
```

## 区间选择

`type` 设为 `range` 后可选择起止日期，中间日期高亮显示。

```vue
<mx-calendar v-model:show="show" v-model="range" type="range" />
```

## 自定义日期范围

通过 `min-date`、`max-date` 限制可选范围（传时间戳），范围外的月份不可切换。

```vue
<mx-calendar v-model:show="show" v-model="date" :min-date="minDate" :max-date="maxDate" />
```

```js
const minDate = new Date(2025, 7, 1).getTime()
const maxDate = new Date(2025, 8, 30).getTime()
```

## 自定义周起始日

`first-day-of-week` 设为 `1` 时以周一作为每周第一天。

```vue
<mx-calendar v-model:show="show" v-model="date" :first-day-of-week="1" />
```

## 隐藏确认按钮

`show-confirm` 设为 `false` 时隐藏底部确定按钮，`single` 模式下点选日期后直接确认并关闭。

```vue
<mx-calendar v-model:show="show" v-model="date" :show-confirm="false" />
```

## Props

| 参数               | 说明                                                              | 类型                          | 默认值     |
| ------------------ | ----------------------------------------------------------------- | ----------------------------- | ---------- |
| show               | 是否显示（v-model:show）                                          | `boolean`                     | `false`    |
| title              | 标题                                                              | `string`                      | `日期选择` |
| type               | 选择模式                                                          | `single \| multiple \| range` | `single`   |
| model-value        | 选中日期（v-model），时间戳或时间戳数组                           | `number \| array`             | `null`     |
| default-date       | 默认选中日期（时间戳，single 为 number，multiple / range 为数组） | `number \| array`             | `null`     |
| min-date           | 可选择的最小日期时间戳                                            | `number`                      | `null`     |
| max-date           | 可选择的最大日期时间戳                                            | `number`                      | `null`     |
| show-confirm       | 是否显示底部确定按钮                                              | `boolean`                     | `true`     |
| round              | 是否圆角                                                          | `boolean`                     | `true`     |
| cancel-button-text | 取消按钮文字                                                      | `string`                      | `取消`     |
| first-day-of-week  | 每周起始日（0 = 周日，1 = 周一）                                  | `number \| string`            | `0`        |
| z-index            | 弹层层级                                                          | `number \| string`            | `1000`     |
| custom-class       | 自定义类名                                                        | `string`                      | `''`       |
| custom-style       | 自定义样式                                                        | `string \| object`            | `''`       |

## Events

| 事件名  | 说明                                                                 | 回调参数                   |
| ------- | -------------------------------------------------------------------- | -------------------------- |
| confirm | 日期选择完成后触发（点击确定，或 single 模式隐藏确定按钮时点选日期） | 按当前 type 序列化的选中值 |
| select  | 点击并选中任意日期时触发                                             | 按当前 type 序列化的选中值 |
| cancel  | 点击取消时触发                                                       | -                          |

选中值格式：`single` 为时间戳，`multiple` 为时间戳数组，`range` 为 `[开始时间戳, 结束时间戳]`。
