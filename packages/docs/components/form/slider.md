# Slider 滑块

滑块组件，支持拖动选择数值，可自定义范围、步长与样式，对齐 Vant Slider 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <mx-slider :model-value="50" />
</demo-live>

```vue
<mx-slider v-model="value" @change="onChange" />
```

## 指定范围与步长

<demo-live>
  <mx-slider :model-value="0" :min="-10" :max="10" :step="5" />
</demo-live>

```vue
<mx-slider v-model="value" :min="-10" :max="10" :step="5" />
```

## 自定义样式

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

## 禁用状态

<demo-live>
  <mx-slider :model-value="60" disabled />
</demo-live>

```vue
<mx-slider v-model="value" disabled />
```

## 垂直方向

`vertical` 模式下需通过 `custom-style` 指定容器高度。

```vue
<mx-slider v-model="value" vertical custom-style="height: 120px" />
```

## 反向

`reversed` 设为 `true` 时不显示已填充色条，进度从右侧 / 顶部起算。

```vue
<mx-slider v-model="value" reversed />
```

## Props

| 参数           | 说明                     | 类型               | 默认值   |
| -------------- | ------------------------ | ------------------ | -------- |
| model-value    | 当前进度（v-model）      | `number \| string` | `0`      |
| min            | 最小值                   | `number \| string` | `0`      |
| max            | 最大值                   | `number \| string` | `100`    |
| step           | 步长                     | `number \| string` | `1`      |
| disabled       | 是否禁用                 | `boolean`          | `false`  |
| bar-height     | 轨道高度                 | `number \| string` | `'2px'`  |
| active-color   | 已填充颜色（默认主题色） | `string`           | `''`     |
| inactive-color | 未填充颜色（默认占位色） | `string`           | `''`     |
| button-size    | 滑块直径                 | `number \| string` | `'24px'` |
| reversed       | 是否反向                 | `boolean`          | `false`  |
| vertical       | 是否垂直                 | `boolean`          | `false`  |
| custom-class   | 自定义类名               | `string`           | `''`     |
| custom-style   | 自定义样式               | `string \| object` | `''`     |

## Events

| 事件名     | 说明           | 回调参数   |
| ---------- | -------------- | ---------- |
| change     | 进度变化时触发 | 当前进度值 |
| drag-start | 开始拖动时触发 | -          |
| drag-end   | 拖动结束时触发 | -          |
