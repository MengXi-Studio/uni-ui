# Watermark 水印

在页面上添加文字水印，以网格形式平铺展示，对齐 Vant Watermark 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

水印组件绝对定位铺满父容器，父容器需要设置 `position: relative` 及尺寸：

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

## 自定义样式

支持自定义字号、颜色、旋转角度、水印块尺寸与间隙：

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

## 全屏水印

设置 `full-screen` 后全屏铺满：

```vue
<mx-watermark text="梦溪工作室" full-screen />
```

## Props

| 参数         | 说明                         | 类型               | 默认值                |
| ------------ | ---------------------------- | ------------------ | --------------------- |
| text         | 水印文字                     | `string`           | `''`                  |
| width        | 单个水印块宽度               | `number \| string` | `120`                 |
| height       | 单个水印块高度               | `number \| string` | `64`                  |
| gap          | 每行/每列之间的间隙          | `number \| string` | `16`                  |
| font-size    | 文字字号（px / rpx）         | `number \| string` | `14`                  |
| color        | 文字颜色（建议带透明度）     | `string`           | `rgba(0, 0, 0, 0.12)` |
| rotate       | 旋转角度                     | `number \| string` | `-22`                 |
| full-screen  | 是否全屏铺满（默认铺满容器） | `boolean`          | `false`               |
| custom-class | 自定义类名                   | `string`           | `''`                  |
| custom-style | 自定义样式                   | `string \| object` | `''`                  |
