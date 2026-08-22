# AddressList

A list of shipping addresses that supports selection, editing and adding. It aligns with the API and interactions of the Vant AddressList.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Bind the id of the currently selected address with `v-model`, pass the address array via `list`. Tapping a list item selects it, tapping "Edit" triggers the `edit` event, and tapping "Add Address" triggers the `add` event.

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
    name: 'Zhang San',
    tel: '13000000000',
    address: 'No. 138 Wensan Road, Xihu District, Hangzhou, Zhejiang',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Li Si',
    tel: '13100000000',
    address: 'No. 50 Moganshan Road, Gongshu District, Hangzhou, Zhejiang',
  },
])

const onAdd = () => console.log('Add address')
const onEdit = (item, index) => console.log('Edit address', item, index)
const onSelect = (item, index) => console.log('Select address', item, index)
</script>
```

## Disable Selection

Disable tap-to-select (single selection) behavior with `selectable`.

```vue
<mx-address-list v-model="chosenId" :list="list" :selectable="false" />
```

## Custom Footer

Customize the footer area with the `footer` slot; by default the "+ Add Address" button is shown, and `show-add` controls whether the `add` event is triggered.

```vue
<mx-address-list v-model="chosenId" :list="list" :show-add="false">
  <template #footer>
    <mx-button type="primary" block>Custom Footer Button</mx-button>
  </template>
</mx-address-list>
```

## Custom List Content

The default slot can fully take over the list content rendering.

```vue
<mx-address-list v-model="chosenId">
  <view v-for="item in list" :key="item.id" class="my-address-item">
    <text>{{ item.name }} {{ item.tel }}</text>
    <text>{{ item.address }}</text>
  </view>
</mx-address-list>
```

## Props

| Name             | Description                                         | Type               | Default   |
| ---------------- | --------------------------------------------------- | ------------------ | --------- |
| v-model          | id of the currently selected address                | `string \| number` | `''`      |
| list             | Address list                                        | `array`            | `[]`      |
| default-tag-text | Default tag text                                    | `string`           | `Default` |
| selectable       | Whether single selection is enabled (tap to select) | `boolean`          | `true`    |
| show-add         | Whether to show the add button                      | `boolean`          | `true`    |
| custom-class     | Custom class name                                   | `string`           | `''`      |
| custom-style     | Custom style                                        | `string \| object` | `''`      |

## Events

| Event             | Description                                 | Params                            |
| ----------------- | ------------------------------------------- | --------------------------------- |
| update:modelValue | Triggered when the selected address changes | id of the selected address        |
| select            | Triggered when tapping an address item      | `item, index` (address and index) |
| edit              | Triggered when tapping the edit button      | `item, index` (address and index) |
| add               | Triggered when tapping the add button       | -                                 |

## Slots

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| default | Custom list content                                             |
| footer  | Custom footer content (defaults to the add address button area) |
