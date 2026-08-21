# PullRefresh 下拉刷新

用于下拉刷新列表内容，对齐 Vant PullRefresh 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model:loading` 控制加载状态，刷新完成后将 loading 设为 false，会先展示成功提示再收起。

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

## 成功提示

刷新完成收起前展示 `success-text` 提示，时长由 `success-duration` 控制。

```vue
<mx-pull-refresh v-model:loading="loading" success-text="刷新成功" @refresh="onRefresh">
  <view>内容</view>
</mx-pull-refresh>
```

## 自定义提示文案

```vue
<mx-pull-refresh
  v-model:loading="loading"
  pulling-text="下拉即可刷新"
  loosing-text="释放即可刷新"
  loading-text="加载中..."
  @refresh="onRefresh"
>
  <view>内容</view>
</mx-pull-refresh>
```

## 自定义下拉头部

通过 `pulling` / `loosing` / `loading` / `success` 插槽自定义各状态的下拉头部内容。

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

## 手动触发刷新

通过 ref 调用 `refresh` 方法，可以直接进入加载状态并触发 `refresh` 事件。

```vue
<mx-pull-refresh ref="refreshRef" v-model:loading="loading" @refresh="onRefresh">
  <view>内容</view>
</mx-pull-refresh>
```

```ts
const refreshRef = ref()

refreshRef.value.refresh()
refreshRef.value.check() // 是否可下拉刷新
```

## API

### Props

| 参数             | 说明                       | 类型               | 默认值         |
| ---------------- | -------------------------- | ------------------ | -------------- |
| loading          | 是否处于加载中（v-model）  | `boolean`          | `false`        |
| head-height      | 头部提示区域高度           | `number \| string` | `50`           |
| pulling-text     | 下拉过程提示文案           | `string`           | `下拉即可刷新` |
| loosing-text     | 释放过程提示文案           | `string`           | `释放即可刷新` |
| loading-text     | 加载过程提示文案           | `string`           | `加载中...`    |
| success-text     | 刷新成功提示文案           | `string`           | `刷新成功`     |
| success-duration | 成功提示展示时长，单位毫秒 | `number`           | `500`          |
| custom-class     | 自定义类名                 | `string`           | -              |
| custom-style     | 自定义样式                 | `string \| object` | -              |

### Events

| 事件名         | 说明                                 | 回调参数         |
| -------------- | ------------------------------------ | ---------------- |
| refresh        | 触发刷新时（下拉释放或调用 refresh） | -                |
| update:loading | 加载状态更新（v-model:loading）      | `value: boolean` |

### Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 列表内容             |
| pulling | 下拉过程中的头部内容 |
| loosing | 释放过程中的头部内容 |
| loading | 加载中的头部内容     |
| success | 刷新成功时的头部内容 |

### 方法（通过 ref 调用）

通过 ref 获取 PullRefresh 实例：

| 名称    | 说明                                                  | 类型      |
| ------- | ----------------------------------------------------- | --------- |
| refresh | 手动触发刷新，进入加载状态并触发 refresh 事件         | -         |
| check   | 校验当前是否可下拉刷新（处于下拉初始状态时返回 true） | `boolean` |
