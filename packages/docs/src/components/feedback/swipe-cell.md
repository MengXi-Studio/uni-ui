# SwipeCell 滑动单元格

可以左右滑动来展示操作按钮的单元格组件，对齐 Vant SwipeCell 的 API 与交互。

## 基础用法

通过 `left-width` / `right-width` 设置左右扩展区宽度，配合 `left` / `right` 插槽填充操作内容。

<demo-live>
  <mx-swipe-cell :left-width="65" :right-width="65">
    <template #left>
      <view style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 14px; width: 65px">选择</view>
    </template>
    <view style="padding: 20px 16px; background: #fff">单元格内容</view>
    <template #right>
      <view style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 14px; width: 65px">删除</view>
    </template>
  </mx-swipe-cell>
</demo-live>

```vue
<mx-swipe-cell :left-width="65" :right-width="65">
  <template #left>
    <view>选择</view>
  </template>
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

## 仅一侧操作

只设置需要的一侧宽度，另一侧不渲染。

<demo-live>
  <mx-swipe-cell :right-width="65">
    <view style="padding: 20px 16px; background: #fff">单元格内容</view>
    <template #right>
      <view style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; font-size: 14px; width: 65px">删除</view>
    </template>
  </mx-swipe-cell>
</demo-live>

```vue
<mx-swipe-cell :right-width="65">
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

## 禁用滑动

```vue
<mx-swipe-cell disabled :right-width="65">
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

## 打开与关闭

通过 ref 调用 `open` / `close` 方法控制展开状态。

```vue
<mx-swipe-cell ref="cellRef" :right-width="65">
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

```ts
const cellRef = ref()

cellRef.value.open('left')
cellRef.value.openLeft()
cellRef.value.openRight()
cellRef.value.close()
```

## 受控展开

`v-model` 绑定展开状态，可选值为 `left`、`right`、`close`。

```vue
<mx-swipe-cell v-model="state" :right-width="65">
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

## API

### Props

| 参数         | 说明                    | 类型               | 默认值  |
| ------------ | ----------------------- | ------------------ | ------- |
| left-width   | 左侧扩展区宽度          | `number \| string` | `0`     |
| right-width  | 右侧扩展区宽度          | `number \| string` | `0`     |
| disabled     | 是否禁用滑动            | `boolean`          | `false` |
| model-value  | 展开状态控制（v-model） | `string`           | -       |
| custom-class | 自定义类名              | `string`           | -       |
| custom-style | 自定义样式              | `string \| object` | -       |

### Events

| 事件名             | 说明                       | 回调参数                       |
| ------------------ | -------------------------- | ------------------------------ |
| open               | 打开单元格时触发           | `direction: 'left' \| 'right'` |
| close              | 关闭单元格时触发           | -                              |
| click              | 点击单元格时触发           | -                              |
| change             | 滑动过程中偏移量变化时触发 | `offsetX: number`              |
| update:model-value | 展开状态更新（v-model）    | `value: string`                |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义显示内容 |
| left    | 左侧扩展区内容 |
| right   | 右侧扩展区内容 |

### 方法（通过 ref 调用）

通过 ref 获取 SwipeCell 实例：

| 名称       | 说明           | 类型                                     |
| ---------- | -------------- | ---------------------------------------- |
| open       | 打开单元格     | `(direction: 'left' \| 'right') => void` |
| open-left  | 打开左侧扩展区 | -                                        |
| open-right | 打开右侧扩展区 | -                                        |
| close      | 收起单元格     | -                                        |
