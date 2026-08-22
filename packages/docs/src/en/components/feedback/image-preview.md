# ImagePreview

A fullscreen image preview component that supports multi-image carousel switching, click-to-zoom, a close button and index display. It aligns with the API and interactions of the Vant ImagePreview.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Control the visibility with `v-model:show` and pass the list of image URLs with `images`.

```vue
<mx-image-preview v-model:show="show" :images="images" />
```

```ts
const show = ref(false)

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
]
```

## Set Initial Position

`start-position` specifies which image is shown initially (starting from 0).

```vue
<mx-image-preview v-model:show="show" :images="images" :start-position="1" />
```

## Hide Close Button / Index

```vue
<mx-image-preview v-model:show="show" :images="images" :closeable="false" :show-index="false" />
```

## Click to Zoom

Click the image to toggle between its original size and the zoomed state.

```vue
<mx-image-preview v-model:show="show" :images="images" />
```

## API

### Props

| Name            | Description                                 | Type               | Default |
| --------------- | ------------------------------------------- | ------------------ | ------- |
| show            | Whether to show (v-model:show)              | `boolean`          | `false` |
| images          | The list of image URLs                      | `string[]`         | `[]`    |
| start-position  | The initial image to show (starting from 0) | `number \| string` | `0`     |
| closeable       | Whether to show the close button            | `boolean`          | `true`  |
| show-index      | Whether to show the image index             | `boolean`          | `true`  |
| show-indicators | Whether to show the carousel indicators     | `boolean`          | `false` |
| overlay         | Whether to show the overlay                 | `boolean`          | `true`  |
| z-index         | z-index level                               | `number \| string` | `2000`  |
| duration        | Transition duration, in milliseconds        | `number \| string` | `300`   |
| custom-class    | Custom class name                           | `string`           | -       |
| custom-style    | Custom style                                | `string \| object` | -       |

### Events

| Event       | Description                                  | Params           |
| ----------- | -------------------------------------------- | ---------------- |
| update:show | Show state update (v-model:show)             | `value: boolean` |
| close       | Triggered when the preview is closed         | -                |
| change      | Triggered when the current image is switched | `index: number`  |
