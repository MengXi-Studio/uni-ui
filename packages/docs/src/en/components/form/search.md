# Search

Search component for search scenarios.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-search v-model="value" placeholder="Please enter a search keyword" />
```

## Search Action

```vue
<mx-search v-model="value" @search="onSearch" />
```

## Shape / Disabled / Clearable

```vue
<mx-search v-model="value" shape="square" />
<mx-search v-model="value" disabled />
<mx-search v-model="value" clearable />
```

## API

### Props

| Name        | Description               | Type              | Default |
| ----------- | ------------------------- | ----------------- | ------- |
| model-value | The input value (v-model) | `string`          | -       |
| placeholder | Placeholder               | `string`          | -       |
| shape       | Shape                     | `round \| square` | `round` |
| disabled    | Disabled                  | `boolean`         | `false` |
| clearable   | Whether clearable         | `boolean`         | `false` |
| background  | Background color          | `string`          | -       |

### Events

| Event             | Description            |
| ----------------- | ---------------------- |
| update:modelValue | When the value updates |
| search            | Search                 |
| clear             | Clear                  |
| cancel            | Cancel                 |
| focus / blur      | Focus / blur           |
