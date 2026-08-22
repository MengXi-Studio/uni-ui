# Watermark

Adds a text watermark to the page, tiled in a grid pattern. It aligns with the API and interactions of the Vant Watermark.

## Basic Usage

The watermark component is absolutely positioned to fill the parent container. The parent container needs to set `position: relative` and a size:

<demo-live>
  <view style="position: relative; height: 160px; width: 100%; background: #fff; border-radius: 8px; overflow: hidden;">
    <mx-watermark text="梦溪工作室" />
  </view>
</demo-live>

```vue
<view style="position: relative; height: 160px;">
  <mx-watermark text="梦溪工作室" />
</view>
```

## Custom Style

Supports custom font size, color, rotation angle, watermark block size and gap:

<demo-live>
  <view style="position: relative; height: 160px; width: 100%; background: #fff; border-radius: 8px; overflow: hidden;">
    <mx-watermark
      text="禁止转载"
      :font-size="16"
      color="rgba(238, 10, 36, 0.15)"
      :rotate="-30"
      :width="140"
      :height="70"
      :gap="24"
    />
  </view>
</demo-live>

```vue
<view style="position: relative; height: 160px;">
  <mx-watermark
    text="禁止转载"
    :font-size="16"
    color="rgba(238, 10, 36, 0.15)"
    :rotate="-30"
    :width="140"
    :height="70"
    :gap="24"
  />
</view>
```

## Fullscreen Watermark

Set `full-screen` to fill the whole screen:

```vue
<mx-watermark text="梦溪工作室" full-screen />
```

## Props

| Name         | Description                                                       | Type               | Default               |
| ------------ | ----------------------------------------------------------------- | ------------------ | --------------------- |
| text         | Watermark text                                                    | `string`           | `''`                  |
| width        | Single watermark block width                                      | `number \| string` | `120`                 |
| height       | Single watermark block height                                     | `number \| string` | `64`                  |
| gap          | The gap between each row/column                                   | `number \| string` | `16`                  |
| font-size    | Text font size (px / rpx)                                         | `number \| string` | `14`                  |
| color        | Text color (recommended with transparency)                        | `string`           | `rgba(0, 0, 0, 0.12)` |
| rotate       | Rotation angle                                                    | `number \| string` | `-22`                 |
| full-screen  | Whether to fill the whole screen (fills the container by default) | `boolean`          | `false`               |
| custom-class | Custom class name                                                 | `string`           | `''`                  |
| custom-style | Custom style                                                      | `string \| object` | `''`                  |
