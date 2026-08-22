# Space 间距

设置组件之间的间距，对齐 Vant Space 的 API 与交互。

## 基础用法

<demo-live>
  <mx-space>
    <mx-button type="primary">按钮</mx-button>
    <mx-button type="primary">按钮</mx-button>
    <mx-button type="primary">按钮</mx-button>
  </mx-space>
</demo-live>

```vue
<mx-space>
  <mx-button type="primary">按钮</mx-button>
  <mx-button type="primary">按钮</mx-button>
  <mx-button type="primary">按钮</mx-button>
</mx-space>
```

## 垂直方向

<demo-live>
  <mx-space direction="vertical" custom-style="width: 220px;">
    <mx-button block type="primary">按钮</mx-button>
    <mx-button block type="primary">按钮</mx-button>
    <mx-button block type="primary">按钮</mx-button>
  </mx-space>
</demo-live>

```vue
<mx-space direction="vertical" custom-style="width: 220px;">
  <mx-button block type="primary">按钮</mx-button>
  <mx-button block type="primary">按钮</mx-button>
  <mx-button block type="primary">按钮</mx-button>
</mx-space>
```

## 自定义间距

<demo-live>
  <mx-space :gap="24">
    <mx-button type="primary">按钮</mx-button>
    <mx-button type="primary">按钮</mx-button>
    <mx-button type="primary">按钮</mx-button>
  </mx-space>
</demo-live>

```vue
<mx-space :gap="24">
  <mx-button type="primary">按钮</mx-button>
  <mx-button type="primary">按钮</mx-button>
  <mx-button type="primary">按钮</mx-button>
</mx-space>
```

## 对齐方式

<demo-live>
  <mx-space align="center" justify="space-between" custom-style="width: 360px;">
    <mx-tag>标签</mx-tag>
    <mx-tag>标签</mx-tag>
    <mx-tag>标签</mx-tag>
  </mx-space>
</demo-live>

```vue
<mx-space align="center" justify="space-between" custom-style="width: 360px;">
  <mx-tag>标签</mx-tag>
  <mx-tag>标签</mx-tag>
  <mx-tag>标签</mx-tag>
</mx-space>
```

## 自动换行

<demo-live>
  <mx-space wrap :gap="16" custom-style="width: 320px;">
    <mx-tag>标签一</mx-tag>
    <mx-tag>标签二</mx-tag>
    <mx-tag>标签三</mx-tag>
    <mx-tag>标签四</mx-tag>
    <mx-tag>标签五</mx-tag>
    <mx-tag>标签六</mx-tag>
  </mx-space>
</demo-live>

```vue
<mx-space wrap :gap="16">
  <mx-tag>标签一</mx-tag>
  <mx-tag>标签二</mx-tag>
  <mx-tag>标签三</mx-tag>
  <mx-tag>标签四</mx-tag>
  <mx-tag>标签五</mx-tag>
  <mx-tag>标签六</mx-tag>
</mx-space>
```

## Props

| 参数         | 说明         | 类型                                                                                                | 默认值       |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------- | ------------ |
| gap          | 间距大小     | `number \| string`                                                                                  | `8`          |
| direction    | 排列方向     | `horizontal \| vertical`                                                                            | `horizontal` |
| wrap         | 是否换行     | `boolean`                                                                                           | `false`      |
| align        | 对齐方式     | `start \| center \| end \| baseline \| flex-start \| flex-end`                                      | `flex-start` |
| justify      | 主轴对齐方式 | `start \| center \| end \| space-between \| space-around \| space-evenly \| flex-start \| flex-end` | `flex-start` |
| custom-class | 自定义类名   | `string`                                                                                            | `''`         |
| custom-style | 自定义样式   | `string \| object`                                                                                  | `''`         |
