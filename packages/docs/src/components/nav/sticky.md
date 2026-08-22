# Sticky 粘性布局

使内容在滚动时吸附在顶部或底部，基于 CSS `position: sticky` 实现，对齐 Vant Sticky 的 API 与交互。

## 基础用法

默认吸顶，吸附效果需在可滚动的容器或页面中体现：

<demo-live>
  <scroll-view scroll-y style="height: 200px; width: 100%; overflow: auto; border: 1px solid #ebedf0; border-radius: 8px;">
    <view style="height: 500px; padding-top: 60px;">
      <mx-sticky>
        <mx-button type="primary" size="small">吸顶按钮</mx-button>
      </mx-sticky>
      <view style="padding: 16px; color: #969799; font-size: 12px;">向下滚动查看吸附效果</view>
    </view>
  </scroll-view>
</demo-live>

```vue
<mx-sticky>
  <mx-button type="primary">吸顶按钮</mx-button>
</mx-sticky>
```

## 吸顶距离

通过 `offset-top` 设置与顶部的吸附距离：

<demo-live>
  <scroll-view scroll-y style="height: 200px; width: 100%; overflow: auto; border: 1px solid #ebedf0; border-radius: 8px;">
    <view style="height: 500px; padding-top: 60px;">
      <mx-sticky :offset-top="40">
        <mx-button type="primary" size="small">距顶 40px 吸附</mx-button>
      </mx-sticky>
      <view style="padding: 16px; color: #969799; font-size: 12px;">向下滚动查看吸附效果</view>
    </view>
  </scroll-view>
</demo-live>

```vue
<mx-sticky :offset-top="40">
  <mx-button type="primary">距顶 40px 吸附</mx-button>
</mx-sticky>
```

## 吸底距离

设置 `offset-bottom` 后改为吸底：

```vue
<mx-sticky :offset-bottom="60">
  <mx-button type="primary">吸底按钮</mx-button>
</mx-sticky>
```

## Props

| 参数          | 说明                               | 类型               | 默认值 |
| ------------- | ---------------------------------- | ------------------ | ------ |
| offset-top    | 吸顶距离                           | `number \| string` | `0`    |
| offset-bottom | 吸底距离（设置后吸底，不设则吸顶） | `number \| string` | -      |
| z-index       | 吸附时的 z-index                   | `number \| string` | `99`   |
| custom-class  | 自定义类名                         | `string`           | `''`   |
| custom-style  | 自定义样式                         | `string \| object` | `''`   |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 吸附的内容 |
