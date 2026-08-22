# SubmitBar 提交订单栏

底部提交订单栏，展示合计金额与提交按钮，常用于订单确认页，对齐 Vant SubmitBar 的 API 与交互。

## 基础用法

`price` 为合计金额（单位为分），默认保留两位小数展示。

<demo-live>
  <mx-submit-bar :price="3050" button-text="提交订单" />
</demo-live>

```vue
<mx-submit-bar :price="3050" button-text="提交订单" />
```

## 禁用与加载状态

通过 `disabled` 禁用提交按钮，通过 `loading` 显示加载中。

```vue
<mx-submit-bar :price="3050" disabled button-text="提交订单" />
<mx-submit-bar :price="3050" loading button-text="提交中" />
```

## 自定义样式

通过 `button-color` 自定义按钮颜色，`currency`、`label`、`decimal-length` 自定义金额展示。

<demo-live>
  <mx-submit-bar
    :price="1234500"
    label="总计"
    currency="$"
    :decimal-length="0"
    button-text="去支付"
    button-color="#7232dd"
  />
</demo-live>

```vue
<mx-submit-bar :price="1234500" label="总计" currency="$" :decimal-length="0" button-text="去支付" button-color="#7232dd" />
```

## 高级用法

通过插槽自定义顶部提示、左侧内容与按钮。

```vue
<template>
	<mx-submit-bar :price="3050" @submit="onSubmit">
		<template #top>
			<view style="padding: 8px 16px; font-size: 12px; color: #969799"> 收货地址：浙江省杭州市西湖区文三路 138 号 </view>
		</template>
		<template #left>
			<mx-checkbox>全选</mx-checkbox>
		</template>
		<template #button>
			<view class="my-submit-btn" @click="onSubmit">立即下单</view>
		</template>
	</mx-submit-bar>
</template>

<script setup>
const onSubmit = event => console.log('提交订单')
</script>
```

## 事件监听

```vue
<mx-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
```

```js
const onSubmit = event => console.log('提交订单')
```

## Props

| 参数                   | 说明                 | 类型               | 默认值     |
| ---------------------- | -------------------- | ------------------ | ---------- |
| price                  | 合计金额（单位为分） | `number \| string` | `0`        |
| label                  | 合计金额文案         | `string`           | `合计`     |
| currency               | 货币符号             | `string`           | `¥`        |
| button-text            | 按钮文字             | `string`           | `提交订单` |
| button-color           | 按钮自定义颜色       | `string`           | `''`       |
| disabled               | 是否禁用             | `boolean`          | `false`    |
| loading                | 是否加载中           | `boolean`          | `false`    |
| safe-area-inset-bottom | 是否适配底部安全区   | `boolean`          | `false`    |
| decimal-length         | 金额保留的小数位数   | `number`           | `2`        |
| custom-class           | 自定义类名           | `string`           | `''`       |
| custom-style           | 自定义样式           | `string \| object` | `''`       |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| submit | 点击提交按钮时触发 | event    |

## Slots

| 名称    | 说明                           |
| ------- | ------------------------------ |
| default | 左侧自定义内容（金额区域之后） |
| top     | 顶部自定义内容                 |
| left    | 左侧自定义内容（金额区域之前） |
| price   | 自定义价格内容                 |
| button  | 自定义按钮内容                 |
