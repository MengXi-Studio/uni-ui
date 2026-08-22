# Coupon

A collection of coupon components, including the coupon card `mx-coupon`, the coupon cell `mx-coupon-cell` and the coupon list `mx-coupon-list`. It aligns with the API and interactions of the Vant Coupon series.

## CouponCell Basic Usage

`mx-coupon-cell` is used on pages such as the order confirmation page to display the currently selected coupon. Passing a `coupon` object shows its description; otherwise it shows "No available coupons".

<demo-live>
  <mx-coupon-cell />
  <mx-coupon-cell
    title="Coupon"
    :coupon="{ id: 1, value: 10, condition: 50, name: 'Discount coupon' }"
  />
</demo-live>

```vue
<mx-coupon-cell />
<mx-coupon-cell title="Coupon" :coupon="{ id: 1, value: 10, condition: 50, name: 'Discount coupon' }" />
```

## CouponList

`mx-coupon-list` is usually used with `mx-popup`. Bind the array of selected coupon ids with `v-model`. The list is divided into "Available" and "Unavailable" groups by the `available` field, and supports exchange code
input and a close button.

```vue
<template>
	<mx-popup v-model:show="showCouponList" position="bottom">
		<mx-coupon-list v-model="chosenIds" :coupons="coupons" close-button-text="No coupon used" @exchange="onExchange" @change="onChange" @close="showCouponList = false" />
	</mx-popup>
	<mx-coupon-cell :coupon="chosenCoupon" @click="showCouponList = true" />
</template>

<script setup>
import { ref, computed } from 'vue'

const showCouponList = ref(false)
const chosenIds = ref([])

const coupons = ref([
	{
		id: 1,
		value: 10,
		condition: 50,
		name: 'Discount coupon',
		startAt: 1767225600,
		endAt: 1798761600
	},
	{
		id: 2,
		value: 5,
		condition: 0,
		name: 'No minimum coupon',
		startAt: 1767225600,
		endAt: 1798761600
	},
	{ id: 3, value: 20, condition: 100, name: 'Unavailable coupon', available: false }
])

const chosenCoupon = computed(() => coupons.value.find(c => chosenIds.value.includes(c.id)))

const onExchange = code => console.log('Exchange code', code)
const onChange = ids => console.log('Selection changed', ids)
</script>
```

## Coupon Single Card

Used alone, `mx-coupon` shows a single coupon card, with `chosen` marking it selected and `disabled` marking it disabled.

<demo-live>
  <mx-coupon
    :coupon="{ value: 10, condition: 50, name: 'Discount coupon', startAt: 1767225600, endAt: 1798761600 }"
  />
  <mx-coupon
    :coupon="{ value: 5, name: 'No minimum coupon', description: 'Valid for all', endAt: 1798761600 }"
    chosen
  />
  <mx-coupon
    :coupon="{ value: 20, condition: 100, name: 'Unavailable coupon', endAt: 1798761600 }"
    disabled
  />
</demo-live>

```vue
<mx-coupon
	:coupon="{
		value: 10,
		condition: 50,
		name: 'Discount coupon',
		startAt: 1767225600,
		endAt: 1798761600
	}" />
<mx-coupon :coupon="{ value: 5, name: 'No minimum coupon', description: 'Valid for all', endAt: 1798761600 }" chosen />
<mx-coupon :coupon="{ value: 20, condition: 100, name: 'Unavailable coupon', endAt: 1798761600 }" disabled />
```

## Coupon Data Structure

The fields of the coupon object passed in via `coupon` / `coupons`:

| Field       | Description                                       | Type               |
| ----------- | ------------------------------------------------- | ------------------ |
| id          | Coupon id                                         | `string \| number` |
| value       | Discount amount (face value)                      | `number \| string` |
| condition   | Usage threshold: available above `condition` yuan | `number \| string` |
| name        | Coupon name                                       | `string`           |
| description | Description                                       | `string`           |
| startAt     | Start time timestamp (seconds)                    | `number`           |
| endAt       | End time timestamp (seconds)                      | `number`           |
| available   | Whether available (used for list grouping)        | `boolean`          |

## Coupon Props

| Name         | Description       | Type               | Default |
| ------------ | ----------------- | ------------------ | ------- |
| coupon       | Coupon data       | `object`           | `{}`    |
| chosen       | Whether selected  | `boolean`          | `false` |
| disabled     | Whether disabled  | `boolean`          | `false` |
| currency     | Currency symbol   | `string`           | `¥`     |
| custom-class | Custom class name | `string`           | `''`    |
| custom-style | Custom style      | `string \| object` | `''`    |

## Coupon Events

| Event | Description                       | Params |
| ----- | --------------------------------- | ------ |
| click | Triggered when tapping the coupon | event  |

## CouponCell Props

| Name         | Description                              | Type               | Default  |
| ------------ | ---------------------------------------- | ------------------ | -------- |
| title        | Cell title                               | `string`           | `Coupon` |
| coupon       | Currently selected coupon                | `object`           | `null`   |
| currency     | Currency symbol                          | `string`           | `¥`      |
| editable     | Whether editable (shows the right arrow) | `boolean`          | `true`   |
| chosen       | Whether selected                         | `boolean`          | `false`  |
| border       | Whether to show the bottom border        | `boolean`          | `true`   |
| custom-class | Custom class name                        | `string`           | `''`     |
| custom-style | Custom style                             | `string \| object` | `''`     |

## CouponCell Events

| Event  | Description                                       | Params                               |
| ------ | ------------------------------------------------- | ------------------------------------ |
| click  | Triggered when tapping the cell                   | event                                |
| change | Triggered when toggling the selected state on tap | `value` (the toggled selected state) |

## CouponCell Slots

| Name      | Description          |
| --------- | -------------------- |
| default   | Custom right content |
| left-icon | Custom left icon     |

## CouponList Props

| Name                 | Description                                 | Type               | Default                          |
| -------------------- | ------------------------------------------- | ------------------ | -------------------------------- |
| v-model              | Array of selected coupon ids                | `array`            | `[]`                             |
| coupons              | Coupon list                                 | `array`            | `[]`                             |
| currency             | Currency symbol                             | `string`           | `¥`                              |
| show-exchange-bar    | Whether to show the exchange code input bar | `boolean`          | `true`                           |
| exchange-btn-text    | Exchange button text                        | `string`           | `Exchange`                       |
| exchange-placeholder | Exchange code input placeholder             | `string`           | `Please enter the exchange code` |
| close-button-text    | Bottom close button text                    | `string`           | `''`                             |
| custom-class         | Custom class name                           | `string`           | `''`                             |
| custom-style         | Custom style                                | `string \| object` | `''`                             |

## CouponList Events

| Event             | Description                                | Params                             |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| update:modelValue | Triggered when the selected coupons change | array of selected coupon ids       |
| change            | Triggered when the selected coupons change | array of selected coupon ids       |
| exchange          | Triggered when tapping the exchange button | `code` (the entered exchange code) |
| click-coupon      | Triggered when tapping a coupon            | coupon (coupon object)             |
| close             | Triggered when tapping close               | -                                  |
