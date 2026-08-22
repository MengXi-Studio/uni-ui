# Image 图片

图片组件，在原生 `image` 基础上提供加载中、加载失败占位与圆角/圆形能力，对齐 Vant Image 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `src` 设置图片地址，`width` / `height` 控制尺寸。

<demo-live>
  <mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
```

## 多种模式

通过 `mode` 设置图片裁剪、缩放模式，同 uni-app `image` 组件的 mode 属性。

<demo-live>
  <mx-image width="100" height="100" mode="aspectFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" mode="aspectFit" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" mode="scaleToFill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image
  width="100"
  height="100"
  mode="aspectFill"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
<mx-image
  width="100"
  height="100"
  mode="aspectFit"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
<mx-image
  width="100"
  height="100"
  mode="scaleToFill"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
```

## 圆角 / 圆形图片

通过 `radius` 设置圆角大小，或通过 `round` 直接显示圆形图片。

<demo-live>
  <mx-image width="100" height="100" radius="8" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <mx-image width="100" height="100" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
</demo-live>

```vue
<mx-image
  width="100"
  height="100"
  radius="8"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
<mx-image
  width="100"
  height="100"
  round
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
```

## 加载失败提示

图片加载失败时默认显示"加载失败"占位，可通过 `show-error` 关闭。

<demo-live>
  <mx-image width="100" height="100" src="https://example.com/broken.png" />
  <mx-image width="100" height="100" :show-error="false" src="https://example.com/broken.png" />
</demo-live>

```vue
<mx-image width="100" height="100" src="https://example.com/broken.png" />
<mx-image :show-error="false" width="100" height="100" src="https://example.com/broken.png" />
```

## 自定义占位内容

通过 `loading` 和 `error` 插槽自定义加载中、加载失败的占位内容。

```vue
<mx-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
  <template #loading>
    <mx-loading type="spinner" size="20" />
  </template>
  <template #error>
    <text>加载失败</text>
  </template>
</mx-image>
```

## Props

| 参数         | 说明              | 类型               | 默认值       |
| ------------ | ----------------- | ------------------ | ------------ |
| src          | 图片地址          | `string`           | `''`         |
| mode         | 图片裁剪/缩放模式 | `string`           | `aspectFill` |
| width        | 宽度              | `number \| string` | -            |
| height       | 高度              | `number \| string` | -            |
| radius       | 圆角              | `number \| string` | -            |
| round        | 是否圆形          | `boolean`          | `false`      |
| show-loading | 是否显示加载占位  | `boolean`          | `true`       |
| show-error   | 是否显示错误占位  | `boolean`          | `true`       |
| custom-class | 自定义类名        | `string`           | `''`         |
| custom-style | 自定义样式        | `string \| object` | `''`         |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击图片时触发     | -        |
| load   | 图片加载完毕时触发 | -        |
| error  | 图片加载失败时触发 | -        |

## Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| loading | 自定义加载中的提示内容   |
| error   | 自定义加载失败的提示内容 |
