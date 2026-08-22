# Signature

A signature component for handwritten signatures based on canvas. It includes two components, `mx-signature` and `mx-sign-board`, and aligns with the API and interactions of the Vant Signature.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

`mx-signature` binds the temporary path of the generated signature image with `v-model`. Tapping the "Confirm" button exports the image and triggers the `submit` event; tapping the "Clear" button clears the canvas.

```vue
<template>
  <mx-signature v-model="signature" @submit="onSubmit" @clear="onClear" />
</template>

<script setup>
import { ref } from 'vue'

const signature = ref('')

const onSubmit = (value) => {
  // value is the temporary file path of the signature image
  console.log('Signature image', value)
}

const onClear = () => console.log('Clear signature')
</script>
```

## Custom Style

Customize the stroke and canvas style with `color`, `pen-size`, `bg-color`, `height`, and set the hint text when empty with `tip-text`.

```vue
<mx-signature
  v-model="signature"
  color="#1989fa"
  :pen-size="5"
  bg-color="#f7f8fa"
  :height="240"
  tip-text="Please sign here"
  close-button-text="Redo"
  confirm-button-text="Done"
  @submit="onSubmit"
/>
```

## Calling Methods via ref

```vue
<template>
  <mx-signature ref="signRef" v-model="signature" />
  <mx-button type="primary" @click="onDataURL">Get base64</mx-button>
</template>

<script setup>
import { ref } from 'vue'

const signRef = ref()
const signature = ref('')

const onDataURL = async () => {
  // the dataURL method returns the signature image as a base64 string
  const data = await signRef.value.dataURL()
  console.log('base64 signature', data)
}
</script>
```

## SignBoard

`mx-sign-board` is the basic version of `mx-signature`; its API is the same (without the out-of-bounds and redundant stroke control parameters).

```vue
<template>
  <mx-sign-board v-model="signature" @submit="onSubmit" @clear="onClear" />
</template>

<script setup>
import { ref } from 'vue'

const signature = ref('')

const onSubmit = (value) => console.log('Signature image', value)
const onClear = () => console.log('Clear signature')
</script>
```

## Signature Props

| Name                | Description                                                   | Type               | Default   |
| ------------------- | ------------------------------------------------------------- | ------------------ | --------- |
| v-model             | Generated image (temporary path of the exported signature)    | `string`           | `''`      |
| color               | Stroke color                                                  | `string`           | `#000`    |
| pen-size            | Stroke line width                                             | `number \| string` | `3`       |
| bg-color            | Background color                                              | `string`           | `#fff`    |
| tip-text            | Hint text when empty                                          | `string`           | `''`      |
| close-button-text   | Clear button text; hidden when empty                          | `string`           | `Clear`   |
| confirm-button-text | Confirm button text                                           | `string`           | `Confirm` |
| confirm             | Whether to show the confirm button                            | `boolean`          | `false`   |
| allow-midnight-ink  | Whether to allow continuing to write below the signature area | `boolean`          | `false`   |
| allow-duplicate-pen | Whether to allow duplicate strokes (redundancy compatibility) | `boolean`          | `true`    |
| height              | Signature area height (px)                                    | `number \| string` | `200`     |
| custom-class        | Custom class name                                             | `string`           | `''`      |
| custom-style        | Custom style                                                  | `string \| object` | `''`      |

## SignBoard Props

| Name                | Description                          | Type               | Default   |
| ------------------- | ------------------------------------ | ------------------ | --------- |
| v-model             | Generated image                      | `string`           | `''`      |
| color               | Stroke color                         | `string`           | `#000`    |
| pen-size            | Stroke line width                    | `number \| string` | `3`       |
| bg-color            | Background color                     | `string`           | `#fff`    |
| tip-text            | Hint text when empty                 | `string`           | `''`      |
| close-button-text   | Clear button text; hidden when empty | `string`           | `Clear`   |
| confirm-button-text | Confirm button text                  | `string`           | `Confirm` |
| confirm             | Whether to show the confirm button   | `boolean`          | `false`   |
| height              | Signature area height (px)           | `number \| string` | `200`     |
| custom-class        | Custom class name                    | `string`           | `''`      |
| custom-style        | Custom style                         | `string \| object` | `''`      |

## Events

The events of the two components are the same.

| Event             | Description                                                          | Params                         |
| ----------------- | -------------------------------------------------------------------- | ------------------------------ |
| update:modelValue | Triggered when the signature is exported or cleared                  | signature image path / `''`    |
| submit            | Triggered when exporting the signature on tapping the confirm button | temporary signature image path |
| clear             | Triggered when tapping the clear button                              | -                              |
| start             | Triggered when starting to write                                     | -                              |
| end               | Triggered when ending a stroke                                       | -                              |

## Methods (called via ref)

The two components expose the same methods.

| Method name | Description                                           | Returns           |
| ----------- | ----------------------------------------------------- | ----------------- |
| clear       | Clear the canvas                                      | -                 |
| submit      | Submit the signature (export the temporary file path) | `Promise<void>`   |
| dataURL     | Get the signature image in base64 (dataURL) format    | `Promise<string>` |
