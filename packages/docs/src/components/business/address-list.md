# AddressList 地址列表

收货地址列表，支持选中、编辑与新增，对齐 Vant AddressList 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定当前选中地址的 id，`list` 传入地址数组，点击列表项选中、点击"编辑"触发 `edit` 事件、点击"新增地址"触发 `add` 事件。

```vue
<template>
  <mx-address-list v-model="chosenId" :list="list" @add="onAdd" @edit="onEdit" @select="onSelect" />
</template>

<script setup>
import { ref } from 'vue'

const chosenId = ref('1')

const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '13100000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
])

const onAdd = () => console.log('新增地址')
const onEdit = (item, index) => console.log('编辑地址', item, index)
const onSelect = (item, index) => console.log('选中地址', item, index)
</script>
```

## 禁用选中

通过 `selectable` 关闭点击选中（单选）行为。

```vue
<mx-address-list v-model="chosenId" :list="list" :selectable="false" />
```

## 自定义底部

通过 `footer` 插槽自定义底部区域；默认显示"+ 新增地址"按钮，可通过 `show-add` 控制是否触发 `add` 事件。

```vue
<mx-address-list v-model="chosenId" :list="list" :show-add="false">
  <template #footer>
    <mx-button type="primary" block>自定义底部按钮</mx-button>
  </template>
</mx-address-list>
```

## 自定义列表内容

默认插槽可完全接管列表内容渲染。

```vue
<mx-address-list v-model="chosenId">
  <view v-for="item in list" :key="item.id" class="my-address-item">
    <text>{{ item.name }} {{ item.tel }}</text>
    <text>{{ item.address }}</text>
  </view>
</mx-address-list>
```

## Props

| 参数             | 说明                       | 类型               | 默认值 |
| ---------------- | -------------------------- | ------------------ | ------ |
| v-model          | 当前选中地址 id            | `string \| number` | `''`   |
| list             | 地址列表                   | `array`            | `[]`   |
| default-tag-text | 默认标签文字               | `string`           | `默认` |
| selectable       | 是否为单选模式（点击选中） | `boolean`          | `true` |
| show-add         | 是否显示新增按钮           | `boolean`          | `true` |
| custom-class     | 自定义类名                 | `string`           | `''`   |
| custom-style     | 自定义样式                 | `string \| object` | `''`   |

## Events

| 事件名            | 说明               | 回调参数                    |
| ----------------- | ------------------ | --------------------------- |
| update:modelValue | 选中地址变化时触发 | 选中的地址 id               |
| select            | 点击地址项时触发   | `item, index`（地址与索引） |
| edit              | 点击编辑按钮时触发 | `item, index`（地址与索引） |
| add               | 点击新增按钮时触发 | -                           |

## Slots

| 名称    | 说明                                     |
| ------- | ---------------------------------------- |
| default | 自定义列表内容                           |
| footer  | 自定义底部内容（默认为新增地址按钮区域） |
