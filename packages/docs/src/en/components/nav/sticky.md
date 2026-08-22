# Sticky

Makes content stick to the top or bottom while scrolling. It is based on the CSS `position: sticky` implementation and aligns with the API and interactions of the Vant Sticky.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Sticks to the top by default; the effect works within a scrollable container or page:

<demo-live>
  <scroll-view scroll-y style="height: 200px; width: 100%; overflow: auto; border: 1px solid #ebedf0; border-radius: 8px;">
    <view style="height: 500px; padding-top: 60px;">
      <mx-sticky>
        <mx-button type="primary" size="small">Sticky Button</mx-button>
      </mx-sticky>
      <view style="padding: 16px; color: #969799; font-size: 12px;">Scroll down to see the sticky effect</view>
    </view>
  </scroll-view>
</demo-live>

```vue
<mx-sticky>
  <mx-button type="primary">Sticky Button</mx-button>
</mx-sticky>
```

## Offset from Top

Set the offset distance from the top with `offset-top`:

<demo-live>
  <scroll-view scroll-y style="height: 200px; width: 100%; overflow: auto; border: 1px solid #ebedf0; border-radius: 8px;">
    <view style="height: 500px; padding-top: 60px;">
      <mx-sticky :offset-top="40">
        <mx-button type="primary" size="small">40px from top</mx-button>
      </mx-sticky>
      <view style="padding: 16px; color: #969799; font-size: 12px;">Scroll down to see the sticky effect</view>
    </view>
  </scroll-view>
</demo-live>

```vue
<mx-sticky :offset-top="40">
  <mx-button type="primary">40px from top</mx-button>
</mx-sticky>
```

## Offset from Bottom

Sticks to the bottom once `offset-bottom` is set:

```vue
<mx-sticky :offset-bottom="60">
  <mx-button type="primary">Sticky Button</mx-button>
</mx-sticky>
```

## Props

| Name          | Description                                                    | Type               | Default |
| ------------- | -------------------------------------------------------------- | ------------------ | ------- |
| offset-top    | Offset from the top                                            | `number \| string` | `0`     |
| offset-bottom | Offset from the bottom (sticks bottom when set, otherwise top) | `number \| string` | -       |
| z-index       | z-index when sticking                                          | `number \| string` | `99`    |
| custom-class  | Custom class name                                              | `string`           | `''`    |
| custom-style  | Custom style                                                   | `string \| object` | `''`    |

## Slots

| Name    | Description        |
| ------- | ------------------ |
| default | The sticky content |
