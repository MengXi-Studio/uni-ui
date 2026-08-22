# FloatingPanel 浮动面板

底部浮动面板，可通过拖拽把手在多个高度锚点之间吸附切换，对齐 Vant FloatingPanel 的 API 与交互。

## 基础用法

通过 `anchors` 设置可吸附的高度锚点数组（从小到大），`v-model` 绑定当前吸附的高度，拖动把手松手后面板吸附到最近锚点。

<demo-live>
  <mx-floating-panel :model-value="100" :anchors="[60, 200, 400]">
    <view style="padding: 16px">
      <text>拖动顶部把手切换面板高度</text>
    </view>
  </mx-floating-panel>
</demo-live>

```vue
<template>
	<mx-floating-panel v-model="height" :anchors="[60, 200, 400]">
		<view style="padding: 16px">
			<text>面板内容</text>
		</view>
	</mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const height = ref(100)
</script>
```

## 自定义锚点与顶部偏移

通过 `offset-top` 限制面板展开的最大高度（距屏幕顶部），`duration` 设置吸附动画时长。

```vue
<template>
	<mx-floating-panel v-model="height" :anchors="[100, 300, 560]" :offset-top="80" :duration="300" @height-change="onHeightChange" @dragstart="onDragStart" @dragend="onDragEnd">
		<view style="padding: 16px">
			<text>面板内容</text>
		</view>
	</mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const height = ref(100)

const onHeightChange = height => console.log('高度变化', height)
const onDragStart = height => console.log('开始拖拽', height)
const onDragEnd = height => console.log('结束拖拽', height)
</script>
```

## 通过 ref 调用方法

通过 `setAnchor` 方法跳转到指定锚点高度，`getHeight` 获取当前面板高度。

```vue
<template>
	<mx-floating-panel ref="panelRef" v-model="height" :anchors="[100, 300, 560]">
		<view style="padding: 16px">
			<mx-button type="primary" size="small" @click="expand">展开面板</mx-button>
		</view>
	</mx-floating-panel>
</template>

<script setup>
import { ref } from 'vue'

const panelRef = ref()
const height = ref(100)

const expand = () => {
	panelRef.value.setAnchor(560)
	console.log('当前高度', panelRef.value.getHeight())
}
</script>
```

## Props

| 参数           | 说明                                       | 类型               | 默认值 |
| -------------- | ------------------------------------------ | ------------------ | ------ |
| v-model        | 当前吸附的锚点（面板在底部露出的高度，px） | `number`           | `100`  |
| anchors        | 可吸附的高度锚点数组（从小到大）           | `array`            | `[]`   |
| content-height | 内容高度                                   | `number`           | `0`    |
| offset-top     | 距顶部最小偏移                             | `number`           | `40`   |
| duration       | 吸附动画时长（ms）                         | `number`           | `300`  |
| z-index        | z-index                                    | `number \| string` | `999`  |
| custom-class   | 自定义类名                                 | `string`           | `''`   |
| custom-style   | 自定义样式                                 | `string \| object` | `''`   |

## Events

| 事件名            | 说明                   | 回调参数     |
| ----------------- | ---------------------- | ------------ |
| update:modelValue | 面板吸附高度变化时触发 | 当前面板高度 |
| height-change     | 面板高度变化时触发     | 当前面板高度 |
| dragstart         | 开始拖拽时触发         | 当前面板高度 |
| dragend           | 拖拽结束吸附后触发     | 当前面板高度 |

## 方法（通过 ref 调用）

| 方法名    | 说明               | 返回值   |
| --------- | ------------------ | -------- |
| setAnchor | 跳转到指定锚点高度 | -        |
| getHeight | 获取当前面板高度   | `number` |
