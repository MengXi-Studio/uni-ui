# Signature 签名

签名组件，基于 canvas 实现手写签名，包含 `mx-signature` 与 `mx-sign-board` 两个组件，对齐 Vant Signature 的 API 与交互。

## 基础用法

`mx-signature` 通过 `v-model` 绑定签名生成图片的临时路径，点击"确认"按钮后导出图片并触发 `submit` 事件，点击"清除"按钮清空画布。

```vue
<template>
	<mx-signature v-model="signature" @submit="onSubmit" @clear="onClear" />
</template>

<script setup>
import { ref } from 'vue'

const signature = ref('')

const onSubmit = value => {
	// value 为签名图片的临时文件路径
	console.log('签名图片', value)
}

const onClear = () => console.log('清空签名')
</script>
```

## 自定义样式

通过 `color`、`pen-size`、`bg-color`、`height` 自定义笔迹与画布样式，`tip-text` 设置空白时的提示文字。

```vue
<mx-signature v-model="signature" color="#1989fa" :pen-size="5" bg-color="#f7f8fa" :height="240" tip-text="请在此处签名" close-button-text="重写" confirm-button-text="完成" @submit="onSubmit" />
```

## 通过 ref 调用方法

```vue
<template>
	<mx-signature ref="signRef" v-model="signature" />
	<mx-button type="primary" @click="onDataURL">获取 base64</mx-button>
</template>

<script setup>
import { ref } from 'vue'

const signRef = ref()
const signature = ref('')

const onDataURL = async () => {
	// dataURL 方法返回 base64 格式的图片字符串
	const data = await signRef.value.dataURL()
	console.log('base64 签名', data)
}
</script>
```

## SignBoard 签名板

`mx-sign-board` 是 `mx-signature` 的基础版本，API 与其保持一致（不含越界与冗余笔画控制参数）。

```vue
<template>
	<mx-sign-board v-model="signature" @submit="onSubmit" @clear="onClear" />
</template>

<script setup>
import { ref } from 'vue'

const signature = ref('')

const onSubmit = value => console.log('签名图片', value)
const onClear = () => console.log('清空签名')
</script>
```

## Signature Props

| 参数                | 说明                                 | 类型               | 默认值  |
| ------------------- | ------------------------------------ | ------------------ | ------- |
| v-model             | 生成图片（签名导出的临时路径）       | `string`           | `''`    |
| color               | 笔画颜色                             | `string`           | `#000`  |
| pen-size            | 笔迹线宽                             | `number \| string` | `3`     |
| bg-color            | 背景色                               | `string`           | `#fff`  |
| tip-text            | 空白时的提示文字                     | `string`           | `''`    |
| close-button-text   | 清除按钮文字，为空则不显示           | `string`           | `清除`  |
| confirm-button-text | 确认按钮文字                         | `string`           | `确认`  |
| confirm             | 是否显示确认按钮                     | `boolean`          | `false` |
| allow-midnight-ink  | 是否允许在签名区域外下方继续书写     | `boolean`          | `false` |
| allow-duplicate-pen | 是否允许重复笔画产生冗余（冗余兼容） | `boolean`          | `true`  |
| height              | 签名区高度（px）                     | `number \| string` | `200`   |
| custom-class        | 自定义类名                           | `string`           | `''`    |
| custom-style        | 自定义样式                           | `string \| object` | `''`    |

## SignBoard Props

| 参数                | 说明                       | 类型               | 默认值  |
| ------------------- | -------------------------- | ------------------ | ------- |
| v-model             | 生成图片                   | `string`           | `''`    |
| color               | 笔画颜色                   | `string`           | `#000`  |
| pen-size            | 笔迹线宽                   | `number \| string` | `3`     |
| bg-color            | 背景色                     | `string`           | `#fff`  |
| tip-text            | 空白时的提示文字           | `string`           | `''`    |
| close-button-text   | 清除按钮文字，为空则不显示 | `string`           | `清除`  |
| confirm-button-text | 确认按钮文字               | `string`           | `确认`  |
| confirm             | 是否显示确认按钮           | `boolean`          | `false` |
| height              | 签名区高度（px）           | `number \| string` | `200`   |
| custom-class        | 自定义类名                 | `string`           | `''`    |
| custom-style        | 自定义样式                 | `string \| object` | `''`    |

## Events

两个组件的事件一致。

| 事件名            | 说明                       | 回调参数            |
| ----------------- | -------------------------- | ------------------- |
| update:modelValue | 签名导出或清空时触发       | 签名图片路径 / `''` |
| submit            | 点击确认按钮导出签名时触发 | 签名图片临时路径    |
| clear             | 点击清除按钮时触发         | -                   |
| start             | 开始书写时触发             | -                   |
| end               | 结束一笔书写时触发         | -                   |

## 方法（通过 ref 调用）

两个组件暴露的方法一致。

| 方法名  | 说明                                  | 返回值            |
| ------- | ------------------------------------- | ----------------- |
| clear   | 清空画布                              | -                 |
| submit  | 提交签名（导出临时文件路径）          | `Promise<void>`   |
| dataURL | 获取 base64 格式（dataURL）的签名图片 | `Promise<string>` |
