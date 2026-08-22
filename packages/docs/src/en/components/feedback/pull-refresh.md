# PullRefresh

Used to refresh list content by pulling down. It aligns with the API and interactions of the Vant PullRefresh.

## Basic Usage

Control the loading state with `v-model:loading`. After the refresh is complete, set loading to false; a success hint will be shown first and then the header retracts.

```vue
<mx-pull-refresh v-model:loading="loading" @refresh="onRefresh">
  <view v-for="i in 3" :key="i">内容 {{ i }}</view>
</mx-pull-refresh>
```

```ts
const loading = ref(false)

const onRefresh = () => {
	setTimeout(() => {
		loading.value = false
	}, 1000)
}
```

## Success Text

The `success-text` hint is shown before the header retracts after the refresh completes. Its duration is controlled by `success-duration`.

```vue
<mx-pull-refresh v-model:loading="loading" success-text="刷新成功" @refresh="onRefresh">
  <view>内容</view>
</mx-pull-refresh>
```

## Custom Text

```vue
<mx-pull-refresh v-model:loading="loading" pulling-text="下拉即可刷新" loosing-text="释放即可刷新" loading-text="加载中..." @refresh="onRefresh">
  <view>内容</view>
</mx-pull-refresh>
```

## Custom Pull-Down Header

Customize the pull-down header content for each state through the `pulling` / `loosing` / `loading` / `success` slots.

```vue
<mx-pull-refresh v-model:loading="loading" @refresh="onRefresh">
  <template #pulling>
    <text>下拉即可刷新</text>
  </template>
  <template #loosing>
    <text>释放即可刷新</text>
  </template>
  <template #loading>
    <text>加载中...</text>
  </template>
  <template #success>
    <text>刷新成功</text>
  </template>
  <view>内容</view>
</mx-pull-refresh>
```

## Manually Trigger Refresh

Call the `refresh` method through ref to directly enter the loading state and trigger the `refresh` event.

```vue
<mx-pull-refresh ref="refreshRef" v-model:loading="loading" @refresh="onRefresh">
  <view>内容</view>
</mx-pull-refresh>
```

```ts
const refreshRef = ref()

refreshRef.value.refresh()
refreshRef.value.check() // whether can pull down to refresh
```

## API

### Props

| Name             | Description                                               | Type               | Default        |
| ---------------- | --------------------------------------------------------- | ------------------ | -------------- |
| loading          | Whether it is loading (v-model)                           | `boolean`          | `false`        |
| head-height      | The height of the header hint area                        | `number \| string` | `50`           |
| pulling-text     | The hint text during the pull-down process                | `string`           | `下拉即可刷新` |
| loosing-text     | The hint text during the release process                  | `string`           | `释放即可刷新` |
| loading-text     | The hint text during the loading process                  | `string`           | `加载中...`    |
| success-text     | The success hint text                                     | `string`           | `刷新成功`     |
| success-duration | The display duration of the success hint, in milliseconds | `number`           | `500`          |
| custom-class     | Custom class name                                         | `string`           | -              |
| custom-style     | Custom style                                              | `string \| object` | -              |

### Events

| Event          | Description                                                         | Params           |
| -------------- | ------------------------------------------------------------------- | ---------------- |
| refresh        | Triggered when refreshing (released the pull or refresh was called) | -                |
| update:loading | Loading state update (v-model:loading)                              | `value: boolean` |

### Slots

| Name    | Description                                 |
| ------- | ------------------------------------------- |
| default | List content                                |
| pulling | Header content during the pull-down process |
| loosing | Header content during the release process   |
| loading | Header content while loading                |
| success | Header content when the refresh succeeds    |

### Methods (call through ref)

Get the PullRefresh instance through ref:

| Name    | Description                                                                                                | Type      |
| ------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| refresh | Manually trigger a refresh, enter the loading state and trigger the refresh event                          | -         |
| check   | Check whether a pull-down refresh is currently possible (returns true when in the initial pull-down state) | `boolean` |
