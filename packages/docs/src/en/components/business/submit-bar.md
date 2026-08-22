# SubmitBar

A bottom submit order bar showing the total amount and a submit button, commonly used on the order confirmation page. It aligns with the API and interactions of the Vant SubmitBar.

## Basic Usage

`price` is the total amount (in cents), displayed with two decimal places by default.

<demo-live>
  <mx-submit-bar :price="3050" button-text="Submit Order" />
</demo-live>

```vue
<mx-submit-bar :price="3050" button-text="Submit Order" />
```

## Disabled and Loading States

Disable the submit button with `disabled`, and show a loading state with `loading`.

```vue
<mx-submit-bar :price="3050" disabled button-text="Submit Order" />
<mx-submit-bar :price="3050" loading button-text="Submitting" />
```

## Custom Style

Customize the button color with `button-color`, and customize the amount display with `currency`, `label`, `decimal-length`.

<demo-live>
  <mx-submit-bar
    :price="1234500"
    label="Total"
    currency="$"
    :decimal-length="0"
    button-text="Go to Pay"
    button-color="#7232dd"
  />
</demo-live>

```vue
<mx-submit-bar :price="1234500" label="Total" currency="$" :decimal-length="0" button-text="Go to Pay" button-color="#7232dd" />
```

## Advanced Usage

Customize the top tip, left content and button with slots.

```vue
<template>
	<mx-submit-bar :price="3050" @submit="onSubmit">
		<template #top>
			<view style="padding: 8px 16px; font-size: 12px; color: #969799"> Shipping address: No. 138 Wensan Road, Xihu District, Hangzhou, Zhejiang </view>
		</template>
		<template #left>
			<mx-checkbox>Select all</mx-checkbox>
		</template>
		<template #button>
			<view class="my-submit-btn" @click="onSubmit">Order now</view>
		</template>
	</mx-submit-bar>
</template>

<script setup>
const onSubmit = event => console.log('Submit order')
</script>
```

## Event Listening

```vue
<mx-submit-bar :price="3050" button-text="Submit Order" @submit="onSubmit" />
```

```js
const onSubmit = event => console.log('Submit order')
```

## Props

| Name                   | Description                              | Type               | Default        |
| ---------------------- | ---------------------------------------- | ------------------ | -------------- |
| price                  | Total amount (in cents)                  | `number \| string` | `0`            |
| label                  | Total amount label                       | `string`           | `Total`        |
| currency               | Currency symbol                          | `string`           | `¥`            |
| button-text            | Button text                              | `string`           | `Submit Order` |
| button-color           | Custom button color                      | `string`           | `''`           |
| disabled               | Whether disabled                         | `boolean`          | `false`        |
| loading                | Whether loading                          | `boolean`          | `false`        |
| safe-area-inset-bottom | Whether to adapt to the bottom safe area | `boolean`          | `false`        |
| decimal-length         | Number of decimal places for the amount  | `number`           | `2`            |
| custom-class           | Custom class name                        | `string`           | `''`           |
| custom-style           | Custom style                             | `string \| object` | `''`           |

## Events

| Event  | Description                              | Params |
| ------ | ---------------------------------------- | ------ |
| submit | Triggered when tapping the submit button | event  |

## Slots

| Name    | Description                                  |
| ------- | -------------------------------------------- |
| default | Custom left content (after the amount area)  |
| top     | Custom top content                           |
| left    | Custom left content (before the amount area) |
| price   | Custom price content                         |
| button  | Custom button content                        |
