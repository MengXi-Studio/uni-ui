# Circle 环形进度条

圆形进度条组件，支持进度颜色、轨道颜色、尺寸与环宽自定义，对齐 Vant Circle 的 API 与交互。

## 基础用法

`value` 表示进度百分比（0 - 100）。

<demo-live>
  <mx-circle :value="30" />
</demo-live>

```vue
<mx-circle :value="30" />
```

## 自定义样式

通过 `size`、`stroke-width`、`color`、`layer-color` 自定义圆环样式。

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

## 逆时针

<demo-live>
  <mx-circle :value="75" :clockwise="false" />
</demo-live>

```vue
<mx-circle :value="75" :clockwise="false" />
```

## 中央内容

通过默认插槽在圆环中央展示自定义内容。

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

| 参数         | 说明                               | 类型               | 默认值  |
| ------------ | ---------------------------------- | ------------------ | ------- |
| value        | 当前进度（0 - 100）                | `number \| string` | `0`     |
| size         | 圆环大小                           | `number \| string` | `100px` |
| stroke-width | 圆环宽度                           | `number \| string` | `4`     |
| color        | 进度颜色，不设置时用主题色         | `string`           | -       |
| layer-color  | 轨道颜色，不设置时用主题色         | `string`           | -       |
| clockwise    | 是否顺时针                         | `boolean`          | `true`  |
| speed        | 变化速度（视觉过渡时长，保留 API） | `number \| string` | `0`     |
| custom-class | 自定义类名                         | `string`           | -       |
| custom-style | 自定义样式                         | `string \| object` | -       |

### Events

| 事件名 | 说明             | 回调参数        |
| ------ | ---------------- | --------------- |
| change | 进度值变化时触发 | `value: number` |

### Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 圆环中央的自定义内容 |
