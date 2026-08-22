# Overlay 遮罩层

全屏遮罩层组件，常用于弹出内容的背景遮罩，对齐 Vant Overlay 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-overlay :show="show" @click="show = false" />
```

```ts
const show = ref(false)
```

## 嵌入内容

遮罩层上方可以嵌入任意内容，通过默认插槽实现。

```vue
<mx-overlay :show="show" @click="show = false">
  <view style="display: flex; align-items: center; justify-content: center; height: 100%">
    <text style="color: #fff">遮罩层内容</text>
  </view>
</mx-overlay>
```

## 禁止点击

设置 `clickable` 为 `false` 后，点击遮罩层不再触发 `click` 事件。

```vue
<mx-overlay :show="show" :clickable="false" />
```

## Props

| 参数         | 说明                     | 类型               | 默认值  |
| ------------ | ------------------------ | ------------------ | ------- |
| show         | 是否显示（v-model:show） | `boolean`          | `false` |
| z-index      | z-index 层级             | `number \| string` | `1`     |
| duration     | 过渡时长，单位毫秒       | `number \| string` | `300`   |
| clickable    | 是否可点击遮罩           | `boolean`          | `true`  |
| custom-class | 自定义类名               | `string`           | -       |
| custom-style | 自定义样式               | `string \| object` | -       |

## Events

| 事件名      | 说明                                   | 回调参数         |
| ----------- | -------------------------------------- | ---------------- |
| click       | 点击遮罩时触发（clickable 为 true 时） | -                |
| update:show | 显隐更新（v-model:show）               | `value: boolean` |

## Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 遮罩层上方的自定义内容 |
