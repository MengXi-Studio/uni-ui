# Image

Image component, built on the native `image` with loading placeholder, error placeholder and rounded/circle styles, aligned with Vant Image's API and interactions.

## Basic Usage

Set the image URL with `src`, and control the size with `width` / `height`.

<demo-live>
  <mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
```

## Modes

Set the crop / scale mode with `mode`, same as the `mode` attribute of the uni-app `image` component.

<demo-live>
  <mx-image width="100" height="100" mode="aspectFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" mode="aspectFit" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" mode="scaleToFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image width="100" height="100" mode="aspectFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
<mx-image width="100" height="100" mode="aspectFit" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
<mx-image width="100" height="100" mode="scaleToFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
```

## Rounded / Circle Image

Set the border radius with `radius`, or use `round` to directly display a circle image.

<demo-live>
  <mx-image width="100" height="100" radius="8" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image width="100" height="100" radius="8" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
<mx-image width="100" height="100" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
```

## Error Tip

When the image fails to load, a "load failed" placeholder is shown by default, which can be disabled with `show-error`.

<demo-live>
  <mx-image width="100" height="100" src="https://example.com/broken.png" />
  <mx-image width="100" height="100" :show-error="false" src="https://example.com/broken.png" />
</demo-live>

```vue
<mx-image width="100" height="100" src="https://example.com/broken.png" />
<mx-image :show-error="false" width="100" height="100" src="https://example.com/broken.png" />
```

## Custom Placeholder Content

Customize the loading and error placeholder content with the `loading` and `error` slots.

```vue
<mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
  <template #loading>
    <mx-loading type="spinner" size="20" />
  </template>
  <template #error>
    <text>Load failed</text>
  </template>
</mx-image>
```

## Props

| Name         | Description                             | Type               | Default      |
| ------------ | --------------------------------------- | ------------------ | ------------ |
| src          | Image URL                               | `string`           | `''`         |
| mode         | Crop / scale mode                       | `string`           | `aspectFill` |
| width        | Width                                   | `number \| string` | -            |
| height       | Height                                  | `number \| string` | -            |
| radius       | Border radius                           | `number \| string` | -            |
| round        | Whether it is a circle                  | `boolean`          | `false`      |
| show-loading | Whether to show the loading placeholder | `boolean`          | `true`       |
| show-error   | Whether to show the error placeholder   | `boolean`          | `true`       |
| custom-class | Custom class name                       | `string`           | `''`         |
| custom-style | Custom style                            | `string \| object` | `''`         |

## Events

| Event | Description                            | Params |
| ----- | -------------------------------------- | ------ |
| click | Triggered when the image is clicked    | -      |
| load  | Triggered when the image has loaded    | -      |
| error | Triggered when the image fails to load | -      |

## Slots

| Name    | Description                        |
| ------- | ---------------------------------- |
| loading | Custom loading placeholder content |
| error   | Custom error placeholder content   |
