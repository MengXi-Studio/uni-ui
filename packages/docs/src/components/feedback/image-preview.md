# ImagePreview 图片预览

全屏图片预览组件，支持多图轮播切换、点击缩放、关闭按钮与索引显示，对齐 Vant ImagePreview 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model:show` 控制显隐，`images` 传入图片地址列表。

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

## 指定初始位置

`start-position` 指定初始展示第几张图片（从 0 开始）。

```vue
<mx-image-preview v-model:show="show" :images="images" :start-position="1" />
```

## 隐藏关闭按钮 / 索引

```vue
<mx-image-preview v-model:show="show" :images="images" :closeable="false" :show-index="false" />
```

## 点击缩放

点击图片可在原始大小与放大状态之间切换。

```vue
<mx-image-preview v-model:show="show" :images="images" />
```

## API

### Props

| 参数            | 说明                        | 类型               | 默认值  |
| --------------- | --------------------------- | ------------------ | ------- |
| show            | 是否显示（v-model:show）    | `boolean`          | `false` |
| images          | 图片地址列表                | `string[]`         | `[]`    |
| start-position  | 初始展示第几张（从 0 开始） | `number \| string` | `0`     |
| closeable       | 是否显示关闭按钮            | `boolean`          | `true`  |
| show-index      | 是否显示图片索引            | `boolean`          | `true`  |
| show-indicators | 是否显示轮播指示器          | `boolean`          | `false` |
| overlay         | 是否显示遮罩                | `boolean`          | `true`  |
| z-index         | z-index 层级                | `number \| string` | `2000`  |
| duration        | 过渡时长，单位毫秒          | `number \| string` | `300`   |
| custom-class    | 自定义类名                  | `string`           | -       |
| custom-style    | 自定义样式                  | `string \| object` | -       |

### Events

| 事件名      | 说明                     | 回调参数         |
| ----------- | ------------------------ | ---------------- |
| update:show | 显隐更新（v-model:show） | `value: boolean` |
| close       | 关闭预览时触发           | -                |
| change      | 切换当前图片时触发       | `index: number`  |
