# ContactList

A contact selection list for selecting a single contact, with an add entry. It aligns with the API and interactions of the Vant ContactList.

## Basic Usage

Bind the id of the selected contact with `v-model`, pass the contact array via `list`. Tapping a list item selects it, and tapping the bottom button triggers the `add` event.

```vue
<template>
	<mx-contact-list v-model="chosenId" :list="list" @add="onAdd" @select="onSelect" />
</template>

<script setup>
import { ref } from 'vue'

const chosenId = ref('1')

const list = ref([
	{ id: '1', name: 'Zhang San', tel: '13000000000' },
	{ id: '2', name: 'Li Si', tel: '13100000000' }
])

const onAdd = () => console.log('Add contact')
const onSelect = item => console.log('Select contact', item)
</script>
```

## Custom Button Text

Customize the text complement of the bottom add button with `add-text`.

```vue
<mx-contact-list v-model="chosenId" :list="list" add-text="Customer" @add="onAdd" />
```

## Props

| Name         | Description                              | Type               | Default   |
| ------------ | ---------------------------------------- | ------------------ | --------- |
| v-model      | id of the selected contact               | `string \| number` | `''`      |
| list         | Contact list                             | `array`            | `[]`      |
| add-text     | Text complement of the bottom add button | `string`           | `Contact` |
| custom-class | Custom class name                        | `string`           | `''`      |
| custom-style | Custom style                             | `string \| object` | `''`      |

## Events

| Event             | Description                                 | Params                     |
| ----------------- | ------------------------------------------- | -------------------------- |
| update:modelValue | Triggered when the selected contact changes | id of the selected contact |
| select            | Triggered when tapping a contact            | item (contact object)      |
| add               | Triggered when tapping the add button       | -                          |
