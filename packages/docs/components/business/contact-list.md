# ContactList 联系人列表

联系人选择列表，单选联系人并支持新增入口，对齐 Vant ContactList 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定选中联系人的 id，`list` 传入联系人数组，点击列表项触发选中，点击底部按钮触发 `add` 事件。

```vue
<template>
  <mx-contact-list v-model="chosenId" :list="list" @add="onAdd" @select="onSelect" />
</template>

<script setup>
import { ref } from 'vue'

const chosenId = ref('1')

const list = ref([
  { id: '1', name: '张三', tel: '13000000000' },
  { id: '2', name: '李四', tel: '13100000000' },
])

const onAdd = () => console.log('新增联系人')
const onSelect = (item) => console.log('选中联系人', item)
</script>
```

## 自定义按钮文字

通过 `add-text` 自定义底部添加按钮的文字补充。

```vue
<mx-contact-list v-model="chosenId" :list="list" add-text="客户" @add="onAdd" />
```

## Props

| 参数         | 说明                 | 类型               | 默认值   |
| ------------ | -------------------- | ------------------ | -------- |
| v-model      | 选中的联系人 id      | `string \| number` | `''`     |
| list         | 联系人列表           | `array`            | `[]`     |
| add-text     | 底部添加按钮文字补充 | `string`           | `联系人` |
| custom-class | 自定义类名           | `string`           | `''`     |
| custom-style | 自定义样式           | `string \| object` | `''`     |

## Events

| 事件名            | 说明                 | 回调参数           |
| ----------------- | -------------------- | ------------------ |
| update:modelValue | 选中联系人变化时触发 | 选中的联系人 id    |
| select            | 点击联系人时触发     | item（联系人对象） |
| add               | 点击添加按钮时触发   | -                  |
