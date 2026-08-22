# AddressEdit

A shipping address editing form that includes name, phone, region selection, detailed address, postal code and a default address switch. It aligns with the API and interactions of the Vant AddressEdit.

## Basic Usage

Bind the address info object with `v-model`, pass the region data via `area-list` (`province_list` / `city_list` / `county_list`). Tapping Save triggers the `save` event.

```vue
<template>
	<mx-address-edit v-model="address" :area-list="areaList" @save="onSave" @change-area="onChangeArea" />
</template>

<script setup>
import { ref } from 'vue'

const address = ref({
	name: '',
	tel: '',
	province: '',
	city: '',
	county: '',
	areaCode: '',
	addressDetail: '',
	postalCode: '',
	isDefault: false
})

const areaList = {
	province_list: { 110000: 'Beijing', 330000: 'Zhejiang' },
	city_list: { 110100: 'Beijing', 330100: 'Hangzhou', 330200: 'Ningbo' },
	county_list: {
		110101: 'Dongcheng District',
		110102: 'Xicheng District',
		330102: 'Shangcheng District',
		330105: 'Gongshu District',
		330203: 'Haishu District'
	}
}

const onSave = value => console.log('Save', value)
const onChangeArea = values => console.log('Region changed', values)
</script>
```

## Hide Fields

Control whether the corresponding fields are shown with `show-detail`, `show-postal`, `show-set-default`.

```vue
<mx-address-edit v-model="address" :area-list="areaList" :show-detail="false" :show-postal="false" :show-set-default="false" />
```

## Custom Text

Supports customizing the placeholders of each input, the region bar title and the save button text.

```vue
<mx-address-edit
	v-model="address"
	:area-list="areaList"
	name-placeholder="Consignee name"
	tel-placeholder="Mobile phone number"
	detail-placeholder="Street, building number, etc."
	area-title="Select region"
	save-button-text="Save address" />
```

## Validation

Call the `validate` method through a ref to validate the form (name and phone must not be empty); it passes by returning `true`.

```vue
<template>
	<mx-address-edit ref="editRef" v-model="address" :area-list="areaList" />
</template>

<script setup>
import { ref } from 'vue'

const editRef = ref()

const onValidate = () => {
	const valid = editRef.value.validate()
	console.log('Validation result', valid)
}
</script>
```

## Props

| Name               | Description                          | Type               | Default                                   |
| ------------------ | ------------------------------------ | ------------------ | ----------------------------------------- |
| v-model            | Address info object                  | `object`           | `{}`                                      |
| area-list          | Region data                          | `object`           | `{}`                                      |
| show-detail        | Whether to show the detailed address | `boolean`          | `true`                                    |
| show-postal        | Whether to show the postal code      | `boolean`          | `true`                                    |
| show-set-default   | Whether to show "set as default"     | `boolean`          | `true`                                    |
| show-search-result | Whether to show search results       | `boolean`          | `false`                                   |
| name-placeholder   | Name placeholder                     | `string`           | `Please enter the consignee name`         |
| tel-placeholder    | Phone placeholder                    | `string`           | `Please enter the mobile phone number`    |
| detail-placeholder | Detailed address placeholder         | `string`           | `Street, door number, etc.`               |
| detail-maxlength   | Max length of the detailed address   | `number \| string` | `200`                                     |
| area-placeholder   | Region placeholder                   | `string`           | `Province / City / District`              |
| area-title         | Region selector title                | `string`           | `Region`                                  |
| postal-placeholder | Postal code placeholder              | `string`           | `Please enter the postal code`            |
| save-button-text   | Save button text                     | `string`           | `Save`                                    |
| error-message      | Validation failure message           | `string`           | `Please fill in the complete information` |
| custom-class       | Custom class name                    | `string`           | `''`                                      |
| custom-style       | Custom style                         | `string \| object` | `''`                                      |

## Events

| Event             | Description                                      | Params                      |
| ----------------- | ------------------------------------------------ | --------------------------- |
| update:modelValue | Triggered when the address info changes          | current address info object |
| save              | Triggered when tapping the save button           | current address info object |
| change            | Triggered when any field changes                 | current address info object |
| change-area       | Triggered when the region selection is confirmed | updated address info object |

## Methods (called via ref)

| Method name | Description                                          | Returns   |
| ----------- | ---------------------------------------------------- | --------- |
| validate    | Validate the form (name and phone must not be empty) | `boolean` |
