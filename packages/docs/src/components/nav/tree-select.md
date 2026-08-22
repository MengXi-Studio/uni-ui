# TreeSelect 分类选择

左侧为分类导航、右侧为分类选项的选择组件，支持单选与多选，对齐 Vant TreeSelect 的 API 与交互。

## 基础用法（单选）

`v-model` 绑定选中项 id，`v-model:main-active-index` 绑定左侧导航选中索引：

```vue
<script setup>
import { ref } from 'vue'

const activeId = ref(1)
const mainActiveIndex = ref(0)

const items = [
	{
		text: '浙江',
		children: [
			{ text: '杭州', id: 1 },
			{ text: '温州', id: 2 },
			{ text: '宁波', id: 3 }
		]
	},
	{
		text: '江苏',
		children: [
			{ text: '南京', id: 4 },
			{ text: '苏州', id: 5 },
			{ text: '无锡', id: 6 }
		]
	}
]
</script>

<template>
	<mx-tree-select v-model="activeId" v-model:main-active-index="mainActiveIndex" :items="items" height="300px" />
</template>
```

静态展示效果：

<demo-live>
  <mx-tree-select
    :model-value="1"
    :main-active-index="0"
    height="280px"
    :items="[
      { text: '浙江', children: [{ text: '杭州', id: 1 }, { text: '温州', id: 2 }, { text: '宁波', id: 3 }] },
      { text: '江苏', children: [{ text: '南京', id: 4 }, { text: '苏州', id: 5 }, { text: '无锡', id: 6 }] },
    ]"
  />
</demo-live>

## 多选模式

`v-model` 传入数组即为多选模式，可通过 `max` 限制可选中的最大数量：

```vue
<script setup>
import { ref } from 'vue'

const activeIds = ref([1, 2])
const mainActiveIndex = ref(0)

const items = [
	{
		text: '浙江',
		children: [
			{ text: '杭州', id: 1 },
			{ text: '温州', id: 2 },
			{ text: '宁波', id: 3 }
		]
	},
	{
		text: '江苏',
		children: [
			{ text: '南京', id: 4 },
			{ text: '苏州', id: 5 }
		]
	}
]
</script>

<template>
	<mx-tree-select v-model="activeIds" v-model:main-active-index="mainActiveIndex" :items="items" :max="2" height="300px" />
</template>
```

## 禁用选项

选项设置 `disabled` 后不可选择：

<demo-live>
  <mx-tree-select
    :model-value="1"
    :main-active-index="0"
    height="240px"
    :items="[
      { text: '浙江', children: [{ text: '杭州', id: 1 }, { text: '宁波', id: 3, disabled: true }] },
      { text: '江苏', children: [{ text: '南京', id: 4, disabled: true }] },
    ]"
  />
</demo-live>

```vue
<mx-tree-select
	:model-value="1"
	:items="[
		{
			text: '浙江',
			children: [
				{ text: '杭州', id: 1 },
				{ text: '宁波', id: 3, disabled: true }
			]
		}
	]" />
```

## Props

| 参数              | 说明                                 | 类型                                       | 默认值     |
| ----------------- | ------------------------------------ | ------------------------------------------ | ---------- |
| model-value       | 已选中的 id（v-model，字符串或数组） | `string \| number \| (string \| number)[]` | `''`       |
| items             | 树形数据                             | `TreeItem[]`                               | `[]`       |
| main-active-index | 左侧主栏选中索引                     | `number \| string`                         | `0`        |
| height            | 高度                                 | `string`                                   | `''`       |
| active-color      | 选中颜色                             | `string`                                   | `''`       |
| max               | 可选中的最大数量                     | `number \| string`                         | `Infinity` |
| custom-class      | 自定义类名                           | `string`                                   | `''`       |
| custom-style      | 自定义样式                           | `string \| object`                         | `''`       |

## Events

| 事件名                   | 说明                                                | 回调参数                                          |
| ------------------------ | --------------------------------------------------- | ------------------------------------------------- |
| update:model-value       | 选中值变化时触发（v-model）                         | value: `string \| number \| (string \| number)[]` |
| update:active-text       | 选中项文本变化时触发                                | value: `string \| (string \| object)[]`           |
| update:main-active-index | 左侧导航索引变化时触发（v-model:main-active-index） | index: number                                     |
| click-nav                | 点击左侧导航时触发                                  | index: number                                     |
| click-item               | 点击右侧选项时触发                                  | `{ text: string, value: string \| number }`       |

## Slots

| 名称 | 说明           | 插槽参数                                               |
| ---- | -------------- | ------------------------------------------------------ |
| item | 自定义选项内容 | item: 选项对象 / active: 是否选中 / disabled: 是否禁用 |

## 数据结构

`items` 为 `TreeItem[]` 树形数组，每个节点：

| 键名              | 说明                                                | 类型               |
| ----------------- | --------------------------------------------------- | ------------------ |
| text              | 标题                                                | `string`           |
| textValue         | 选项文本（用于回调，缺省取 text）                   | `string`           |
| value / id / name | 选项唯一标识（依次取 value、id、name，缺省取 text） | `string \| number` |
| children          | 子选项列表（仅一级节点需要）                        | `TreeItem[]`       |
| disabled          | 是否禁用                                            | `boolean`          |
