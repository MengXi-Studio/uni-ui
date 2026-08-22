# Lazyload

Loads the image only when it enters the viewport. It is implemented based on `uni.createIntersectionObserver` and is compatible across H5, miniprogram and App.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-lazyload
    image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
    width="100"
    height="100"
  />
</demo-live>

```vue
<mx-lazyload
  image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
  width="100"
  height="100"
/>
```

## Custom Placeholder

<demo-live>
  <mx-lazyload
    image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
    width="100"
    height="100"
    placeholder="#ebedf0"
  >
    <template #placeholder>
      <text style="color: #969799; font-size: 12px;">加载中…</text>
    </template>
  </mx-lazyload>
</demo-live>

```vue
<mx-lazyload image="xxx.jpeg" width="100" height="100" placeholder="#ebedf0">
  <template #placeholder>
    <text>加载中…</text>
  </template>
</mx-lazyload>
```

## Props

| Name         | Description                  | Type               | Default   |
| ------------ | ---------------------------- | ------------------ | --------- |
| image        | Image URL                    | `string`           | `''`      |
| width        | Width                        | `number \| string` | -         |
| height       | Height                       | `number \| string` | -         |
| placeholder  | Placeholder background color | `string`           | `#f2f3f5` |
| custom-class | Custom class name            | `string`           | `''`      |
| custom-style | Custom style                 | `string \| object` | `''`      |

## Events

| Event | Description                                                                  | Params |
| ----- | ---------------------------------------------------------------------------- | ------ |
| load  | Triggered when entering the viewport to load / when the image load completes | -      |
| error | Triggered when the image fails to load                                       | -      |
| click | Triggered when clicked                                                       | -      |

## Slots

| Name        | Description                        |
| ----------- | ---------------------------------- |
| placeholder | Placeholder content before loading |

## Methods (call through ref)

| Method | Description                                   | Params | Returns |
| ------ | --------------------------------------------- | ------ | ------- |
| flush  | Trigger loading                               | -      | -       |
| load   | Trigger loading                               | -      | -       |
| resize | Kept for compatibility (empty implementation) | -      | -       |
