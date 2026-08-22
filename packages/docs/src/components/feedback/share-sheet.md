# ShareSheet 分享面板

底部弹出的分享选项面板，常用于分享内容到第三方渠道，对齐 Vant ShareSheet 的 API 与交互。

## 基础用法

通过 `v-model:show` 控制显隐，`options` 设置分享选项。

```vue
<mx-share-sheet v-model:show="show" :options="options" @select="onSelect" />
```

```ts
const show = ref(false)

const options = [
	{ name: '微信', icon: '💬' },
	{ name: '朋友圈', icon: '🌈' },
	{ name: '微博', icon: '📢' },
	{ name: '复制链接', icon: '🔗' }
]

const onSelect = option => {
	show.value = false
}
```

## 标题与描述

```vue
<mx-share-sheet v-model:show="show" title="立即分享给好友" description="描述信息" :options="options" />
```

## 自定义图标

`icon` 支持图片地址（URL / dataURI）或字符（emoji），字符图标可通过 `color` 设置颜色。

```vue
<mx-share-sheet v-model:show="show" :options="options" />
```

```ts
const options = [
	{ name: '微信', icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-wechat.png' },
	{ name: '链接', icon: '🔗', color: '#07c160' }
]
```

## 隐藏取消按钮

`cancel-text` 传空字符串时隐藏取消按钮。

```vue
<mx-share-sheet v-model:show="show" cancel-text="" :options="options" />
```

## 方法调用

通过 ref 调用实例的 `show` / `close` 方法控制显隐。

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

| 参数         | 说明                         | 类型               | 默认值  |
| ------------ | ---------------------------- | ------------------ | ------- |
| show         | 是否显示（v-model:show）     | `boolean`          | `false` |
| options      | 分享选项                     | `ShareOption[]`    | `[]`    |
| title        | 顶部标题                     | `string`           | -       |
| description  | 标题下方的描述文案           | `string`           | -       |
| cancel-text  | 取消按钮文案，传空字符串隐藏 | `string`           | `取消`  |
| custom-class | 自定义类名                   | `string`           | -       |
| custom-style | 自定义样式                   | `string \| object` | -       |

### ShareOption 数据结构

| 键名        | 说明                         | 类型     |
| ----------- | ---------------------------- | -------- |
| name        | 分享名称                     | `string` |
| icon        | 图标（图片地址或字符/emoji） | `string` |
| description | 描述                         | `string` |
| color       | 图标颜色（字符图标用）       | `string` |

### Events

| 事件名      | 说明                     | 回调参数              |
| ----------- | ------------------------ | --------------------- |
| update:show | 显隐更新（v-model:show） | `value: boolean`      |
| select      | 点击分享选项时触发       | `option: ShareOption` |
| cancel      | 点击取消按钮时触发       | -                     |

### 方法（通过 ref 调用）

通过 ref 获取 ShareSheet 实例：

| 名称  | 说明         | 类型 |
| ----- | ------------ | ---- |
| show  | 显示分享面板 | -    |
| close | 关闭分享面板 | -    |
