# Progress 进度条

用于展示操作的当前进度，支持线形与环形两种类型，对齐 Vant Progress 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <mx-progress :percentage="50" pivot-text="50%" />
</demo-live>

```vue
<mx-progress :percentage="50" pivot-text="50%" />
```

`percentage` 表示进度百分比（0-100），进度文字通过 `pivot-text` 自定义。

## 自定义样式

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

## 隐藏进度文字

<demo-live>
  <mx-progress :percentage="50" :show-pivot="false" />
</demo-live>

```vue
<mx-progress :percentage="50" :show-pivot="false" />
```

## 环形进度

<demo-live>
  <mx-progress type="circle" :percentage="75" />
</demo-live>

```vue
<mx-progress type="circle" :percentage="75" />
```

环形进度中间的内容可通过默认插槽自定义：

```vue
<mx-progress type="circle" :percentage="75" text-color="#ee0a24">
  <text style="font-size: 12px;">75 分</text>
</mx-progress>
```

## Props

| 参数         | 说明                   | 类型               | 默认值 |
| ------------ | ---------------------- | ------------------ | ------ |
| percentage   | 进度百分比（0-100）    | `number \| string` | `0`    |
| type         | 类型                   | `line \| circle`   | `line` |
| stroke-width | 进度条粗细             | `number \| string` | `4`    |
| color        | 进度条颜色             | `string`           | `''`   |
| track-color  | 轨道颜色               | `string`           | `''`   |
| show-pivot   | 是否显示进度文字       | `boolean`          | `true` |
| pivot-text   | 进度文字内容           | `string`           | `''`   |
| pivot-color  | 进度文字背景色         | `string`           | `''`   |
| text-color   | 进度文字颜色           | `string`           | `''`   |
| show-text    | 是否显示进度百分比文案 | `boolean`          | `true` |
| custom-class | 自定义类名             | `string`           | `''`   |
| custom-style | 自定义样式             | `string \| object` | `''`   |

## Slots

| 名称    | 说明                       | 插槽参数 |
| ------- | -------------------------- | -------- |
| pivot   | 自定义进度文字内容（线形） | -        |
| default | 自定义环形进度中间的内容   | -        |
