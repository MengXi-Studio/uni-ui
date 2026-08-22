# Space

Sets the spacing between components. It aligns with the API and interactions of the Vant Space.

## Basic Usage

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

## Vertical Direction

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

## Custom Spacing

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

## Alignment

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

## Auto Wrap

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

| Name         | Description         | Type                                                                                                | Default      |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------- | ------------ |
| gap          | Spacing size        | `number \| string`                                                                                  | `8`          |
| direction    | Layout direction    | `horizontal \| vertical`                                                                            | `horizontal` |
| wrap         | Whether to wrap     | `boolean`                                                                                           | `false`      |
| align        | Alignment           | `start \| center \| end \| baseline \| flex-start \| flex-end`                                      | `flex-start` |
| justify      | Main-axis alignment | `start \| center \| end \| space-between \| space-around \| space-evenly \| flex-start \| flex-end` | `flex-start` |
| custom-class | Custom class name   | `string`                                                                                            | `''`         |
| custom-style | Custom style        | `string \| object`                                                                                  | `''`         |
