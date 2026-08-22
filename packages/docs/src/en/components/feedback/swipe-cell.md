# SwipeCell

A cell component that can be swiped left or right to reveal action buttons. It aligns with the API and interactions of the Vant SwipeCell.

## Basic Usage

Set the width of the left/right extension areas with `left-width` / `right-width`, and fill the action content with the `left` / `right` slots.

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

## Only One Side

Only set the width of the required side; the other side is not rendered.

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

## Disable Swipe

```vue
<mx-swipe-cell disabled :right-width="65">
  <view>单元格内容</view>
  <template #right>
    <view>删除</view>
  </template>
</mx-swipe-cell>
```

## Open and Close

Control the expanded state by calling the `open` / `close` methods through ref.

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

## Controlled Expansion

Bind the expanded state with `v-model`. The optional values are `left`, `right`, `close`.

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

| Name         | Description                      | Type               | Default |
| ------------ | -------------------------------- | ------------------ | ------- |
| left-width   | Left extension area width        | `number \| string` | `0`     |
| right-width  | Right extension area width       | `number \| string` | `0`     |
| disabled     | Whether to disable swipe         | `boolean`          | `false` |
| model-value  | Expanded state control (v-model) | `string`           | -       |
| custom-class | Custom class name                | `string`           | -       |
| custom-style | Custom style                     | `string \| object` | -       |

### Events

| Event              | Description                                      | Params                         |
| ------------------ | ------------------------------------------------ | ------------------------------ |
| open               | Triggered when the cell opens                    | `direction: 'left' \| 'right'` |
| close              | Triggered when the cell closes                   | -                              |
| click              | Triggered when the cell is clicked               | -                              |
| change             | Triggered when the offset changes during swiping | `offsetX: number`              |
| update:model-value | Expanded state update (v-model)                  | `value: string`                |

### Slots

| Name    | Description                  |
| ------- | ---------------------------- |
| default | Custom display content       |
| left    | Left extension area content  |
| right   | Right extension area content |

### Methods (call through ref)

Get the SwipeCell instance through ref:

| Name       | Description                   | Type                                     |
| ---------- | ----------------------------- | ---------------------------------------- |
| open       | Open the cell                 | `(direction: 'left' \| 'right') => void` |
| open-left  | Open the left extension area  | -                                        |
| open-right | Open the right extension area | -                                        |
| close      | Close the cell                | -                                        |
