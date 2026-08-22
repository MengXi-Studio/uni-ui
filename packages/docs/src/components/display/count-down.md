# CountDown 倒计时

用于实时展示倒计时数值，支持自定义格式与毫秒级渲染，对齐 Vant CountDown 的 API 与交互。

## 基础用法

<demo-live>
  <mx-count-down :time="3600000" />
</demo-live>

```vue
<mx-count-down :time="3600000" />
```

`time` 为倒计时总时长，单位为毫秒，默认自动开始倒计时。

## 自定义格式

<demo-live>
  <mx-count-down :time="86400000" format="DD 天 HH 时 mm 分 ss 秒" />
</demo-live>

```vue
<mx-count-down :time="86400000" format="DD 天 HH 时 mm 分 ss 秒" />
```

## 毫秒级渲染

<demo-live>
  <mx-count-down :time="3600000" millisecond format="HH:mm:ss:SS" />
</demo-live>

```vue
<mx-count-down :time="3600000" millisecond format="HH:mm:ss:SS" />
```

## 自定义样式

通过以格式片段命名的插槽自定义片段渲染，分隔符仍按 `format` 输出：

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

| 参数         | 说明                                               | 类型               | 默认值     |
| ------------ | -------------------------------------------------- | ------------------ | ---------- |
| time         | 倒计时总时长（毫秒）                               | `number \| string` | `0`        |
| format       | 时间格式化，支持 `DD`/`HH`/`mm`/`ss`/`S`/`SS` 片段 | `string`           | `HH:mm:ss` |
| auto-start   | 是否自动开始                                       | `boolean`          | `true`     |
| millisecond  | 是否以毫秒为单位展示（显示 `S`/`SS` 片段）         | `boolean`          | `false`    |
| custom-class | 自定义类名                                         | `string`           | `''`       |
| custom-style | 自定义样式                                         | `string \| object` | `''`       |

## Events

| 事件名 | 说明             | 回调参数                                                                |
| ------ | ---------------- | ----------------------------------------------------------------------- |
| change | 倒计时变化时触发 | `{ total, days, hours, minutes, seconds, millisecond }`（各值均为数字） |
| finish | 倒计时结束时触发 | -                                                                       |

## Slots

| 名称                       | 说明                                     | 插槽参数            |
| -------------------------- | ---------------------------------------- | ------------------- |
| DD / HH / mm / ss / S / SS | 与格式片段同名的插槽，自定义该片段的渲染 | value: 片段展示文本 |

## 方法（通过 ref 调用）

| 方法名    | 说明                                 | 参数           | 返回值 |
| --------- | ------------------------------------ | -------------- | ------ |
| start     | 开始倒计时                           | -              | -      |
| pause     | 暂停倒计时                           | -              | -      |
| reset     | 重置倒计时，可传入新的总时长（毫秒） | total?: number | -      |
| remaining | 剩余时间（毫秒）                     | -              | number |
