# ShareSheet

A share option panel that pops up from the bottom, commonly used to share content to third-party channels. It aligns with the API and interactions of the Vant ShareSheet.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Control the visibility with `v-model:show` and set share options with `options`.

```vue
<mx-share-sheet v-model:show="show" :options="options" @select="onSelect" />
```

```ts
const show = ref(false)

const options = [
  { name: '微信', icon: '💬' },
  { name: '朋友圈', icon: '🌈' },
  { name: '微博', icon: '📢' },
  { name: '复制链接', icon: '🔗' },
]

const onSelect = (option) => {
  show.value = false
}
```

## Title and Description

```vue
<mx-share-sheet
  v-model:show="show"
  title="立即分享给好友"
  description="描述信息"
  :options="options"
/>
```

## Custom Icon

`icon` supports an image URL (URL / dataURI) or a character (emoji). The color of character icons can be set via `color`.

```vue
<mx-share-sheet v-model:show="show" :options="options" />
```

```ts
const options = [
  { name: '微信', icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-wechat.png' },
  { name: '链接', icon: '🔗', color: '#07c160' },
]
```

## Hide Cancel Button

Pass an empty string to `cancel-text` to hide the cancel button.

```vue
<mx-share-sheet v-model:show="show" cancel-text="" :options="options" />
```

## Method Invocation

Control the visibility by calling the instance's `show` / `close` methods through ref.

```vue
<mx-share-sheet ref="shareSheetRef" :options="options" />
```

```ts
const shareSheetRef = ref()

shareSheetRef.value.show()
shareSheetRef.value.close()
```

## API

### Props

| Name         | Description                                            | Type               | Default |
| ------------ | ------------------------------------------------------ | ------------------ | ------- |
| show         | Whether to show (v-model:show)                         | `boolean`          | `false` |
| options      | Share options                                          | `ShareOption[]`    | `[]`    |
| title        | Top title                                              | `string`           | -       |
| description  | Description text below the title                       | `string`           | -       |
| cancel-text  | Cancel button text, hide it by passing an empty string | `string`           | `取消`  |
| custom-class | Custom class name                                      | `string`           | -       |
| custom-style | Custom style                                           | `string \| object` | -       |

### ShareOption Data Structure

| Key         | Description                         | Type     |
| ----------- | ----------------------------------- | -------- |
| name        | Share name                          | `string` |
| icon        | Icon (image URL or character/emoji) | `string` |
| description | Description                         | `string` |
| color       | Icon color (for character icons)    | `string` |

### Events

| Event       | Description                                 | Params                |
| ----------- | ------------------------------------------- | --------------------- |
| update:show | Show state update (v-model:show)            | `value: boolean`      |
| select      | Triggered when a share option is clicked    | `option: ShareOption` |
| cancel      | Triggered when the cancel button is clicked | -                     |

### Methods (call through ref)

Get the ShareSheet instance through ref:

| Name  | Description           | Type |
| ----- | --------------------- | ---- |
| show  | Show the share panel  | -    |
| close | Close the share panel | -    |
