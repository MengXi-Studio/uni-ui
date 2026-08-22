# Overlay

A fullscreen overlay component, commonly used as the background overlay for popup content. It aligns with the API and interactions of the Vant Overlay.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-overlay :show="show" @click="show = false" />
```

```ts
const show = ref(false)
```

## Embed Content

Any content can be embedded above the overlay through the default slot.

```vue
<mx-overlay :show="show" @click="show = false">
  <view style="display: flex; align-items: center; justify-content: center; height: 100%">
    <text style="color: #fff">遮罩层内容</text>
  </view>
</mx-overlay>
```

## Disable Click

After setting `clickable` to `false`, the `click` event is no longer triggered when clicking the overlay.

```vue
<mx-overlay :show="show" :clickable="false" />
```

## Props

| Name         | Description                          | Type               | Default |
| ------------ | ------------------------------------ | ------------------ | ------- |
| show         | Whether to show (v-model:show)       | `boolean`          | `false` |
| z-index      | z-index level                        | `number \| string` | `1`     |
| duration     | Transition duration, in milliseconds | `number \| string` | `300`   |
| clickable    | Whether the overlay is clickable     | `boolean`          | `true`  |
| custom-class | Custom class name                    | `string`           | -       |
| custom-style | Custom style                         | `string \| object` | -       |

## Events

| Event       | Description                                                  | Params           |
| ----------- | ------------------------------------------------------------ | ---------------- |
| click       | Triggered when clicking the overlay (when clickable is true) | -                |
| update:show | Show state update (v-model:show)                             | `value: boolean` |

## Slots

| Name    | Description                      |
| ------- | -------------------------------- |
| default | Custom content above the overlay |
