# ContactEdit

A contact info editing form that includes name, phone and a contact type radio. It aligns with the API and interactions of the Vant ContactEdit.

## Basic Usage

Bind the contact info object with `v-model`. Tapping the save button validates first and then triggers the `save` event.

```vue
<template>
	<mx-contact-edit v-model="contact" @save="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const contact = ref({
	name: '',
	tel: '',
	type: 'company'
})

const onSave = value => console.log('Save contact', value)
</script>
```

## Show Contact Type

Show the "Company / Enterprise" type radio with `show-contact-type`; the selected value is synced to the `type` field of the contact info.

```vue
<template>
	<mx-contact-edit v-model="contact" show-contact-type @save="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const contact = ref({ name: '', tel: '', type: 'company' })
const onSave = value => console.log('Save contact', value)
</script>
```

## Custom Max Length

Limit the maximum input length of the name and phone with `name-maxlength`, `tel-maxlength`.

```vue
<mx-contact-edit v-model="contact" :name-maxlength="10" :tel-maxlength="11" @save="onSave" />
```

## Custom Button Content

Customize the save button text with the `button` slot.

```vue
<mx-contact-edit v-model="contact" @save="onSave">
  <template #button>Save contact</template>
</mx-contact-edit>
```

## Validation

Call the `save` method through a ref to validate and save from outside. On validation failure, an error message is shown inside the component and `false` is returned.

```vue
<template>
	<mx-contact-edit ref="editRef" v-model="contact" />
</template>

<script setup>
import { ref } from 'vue'

const editRef = ref()

const onSubmit = () => {
	const success = editRef.value.save()
	console.log('Save result', success)
}
</script>
```

## Props

| Name              | Description                            | Type               | Default |
| ----------------- | -------------------------------------- | ------------------ | ------- |
| v-model           | Contact info object                    | `object`           | `{}`    |
| tel-maxlength     | Max length of the phone                | `number \| string` | `11`    |
| name-maxlength    | Max length of the name                 | `number \| string` | `20`    |
| show-contact-type | Whether to show the contact type radio | `boolean`          | `false` |
| custom-class      | Custom class name                      | `string`           | `''`    |
| custom-style      | Custom style                           | `string \| object` | `''`    |

## Events

| Event             | Description                               | Params              |
| ----------------- | ----------------------------------------- | ------------------- |
| update:modelValue | Syncs the info on successful save         | contact info object |
| save              | Triggered on save after validation passes | contact info object |

## Slots

| Name   | Description                |
| ------ | -------------------------- |
| button | Custom save button content |

## Methods (called via ref)

| Method name | Description                                                     | Returns   |
| ----------- | --------------------------------------------------------------- | --------- |
| save        | Validate and save, shows an error message on validation failure | `boolean` |
