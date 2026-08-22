# FloatingBubble 悬浮气泡

可拖动悬浮气泡，基于 `movable-area` / `movable-view` 实现，支持边缘磁吸，对齐 Vant FloatingBubble 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

默认显示图标气泡，可双向拖动，松手后自动吸附到最近的水平边缘。

<demo-live>
  <mx-floating-bubble icon="✚" />
</demo-live>

```vue
<mx-floating-bubble icon="✚" />
```

## 自定义文案

通过 `text` 显示文字气泡，未传 `icon` 与 `text` 时可通过默认插槽自定义内容。

<demo-live>
  <mx-floating-bubble text="客服" />
</demo-live>

```vue
<mx-floating-bubble text="客服" />
```

## 控制拖动方向

通过 `axis` 限制拖动方向：`x` 仅水平、`y` 仅垂直、`both` 双向。

```vue
<mx-floating-bubble text="菜单" axis="x" />
<mx-floating-bubble text="菜单" axis="y" />
<mx-floating-bubble text="菜单" axis="both" />
```

## 关闭磁吸与自定义位置

通过 `magnetic` 关闭松手吸边，`right` / `bottom` 设置初始位置，`size` 设置气泡尺寸。

<demo-live>
  <mx-floating-bubble text="📋" :magnetic="false" :right="24" :bottom="160" :size="56" />
</demo-live>

```vue
<mx-floating-bubble text="📋" :magnetic="false" :right="24" :bottom="160" :size="56" />
```

## 事件监听

```vue
<template>
  <mx-floating-bubble v-model="show" icon="✚" @click="onClick" @offset-change="onOffsetChange" />
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)

const onClick = () => console.log('点击气泡')
const onOffsetChange = ({ x, y }) => console.log('位置变化', x, y)
</script>
```

## Props

| 参数         | 说明                                        | 类型               | 默认值 |
| ------------ | ------------------------------------------- | ------------------ | ------ |
| v-model      | 是否可见                                    | `boolean`          | `true` |
| icon         | 图标文本                                    | `string`           | `''`   |
| text         | 文案                                        | `string`           | `''`   |
| axis         | 可拖动轴：`x` 水平 / `y` 垂直 / `both` 双向 | `x \| y \| both`   | `both` |
| magnetic     | 松手是否吸附边缘                            | `boolean`          | `true` |
| size         | 气泡尺寸                                    | `number \| string` | `48`   |
| right        | 距离右边缘（拖动起始 x）                    | `number \| string` | `16`   |
| bottom       | 距离底部（拖动起始 y）                      | `number \| string` | `80`   |
| z-index      | z-index                                     | `number \| string` | `1000` |
| custom-class | 自定义类名                                  | `string`           | `''`   |
| custom-style | 自定义样式                                  | `string \| object` | `''`   |

## Events

| 事件名            | 说明               | 回调参数            |
| ----------------- | ------------------ | ------------------- |
| update:modelValue | 可见状态变化时触发 | `value`（是否可见） |
| click             | 点击气泡时触发     | -                   |
| offset-change     | 位置变化时触发     | `{ x, y }`          |

## Slots

| 名称    | 说明                                   |
| ------- | -------------------------------------- |
| default | 自定义气泡内容（优先级低于 icon/text） |
