# Coupon 优惠券

优惠券相关组件集合，包含优惠券卡片 `mx-coupon`、优惠券单元格 `mx-coupon-cell` 与优惠券列表 `mx-coupon-list`，对齐 Vant Coupon 系列的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## CouponCell 基础用法

`mx-coupon-cell` 用于订单确认页等场景展示当前选中的优惠券，传入 `coupon` 对象显示券说明，否则显示"暂无可用优惠券"。

<demo-live>
  <mx-coupon-cell />
  <mx-coupon-cell
    title="优惠券"
    :coupon="{ id: 1, value: 10, condition: 50, name: '满减券' }"
  />
</demo-live>

```vue
<mx-coupon-cell />
<mx-coupon-cell title="优惠券" :coupon="{ id: 1, value: 10, condition: 50, name: '满减券' }" />
```

## CouponList 优惠券列表

`mx-coupon-list` 通常配合 `mx-popup` 使用，通过 `v-model` 绑定选中的优惠券 id 数组，列表按 `available` 字段分为"可用券"和"不可用"两组，并支持兑换码输入与关闭按钮。

```vue
<template>
  <mx-popup v-model:show="showCouponList" position="bottom">
    <mx-coupon-list
      v-model="chosenIds"
      :coupons="coupons"
      close-button-text="不使用优惠券"
      @exchange="onExchange"
      @change="onChange"
      @close="showCouponList = false"
    />
  </mx-popup>
  <mx-coupon-cell :coupon="chosenCoupon" @click="showCouponList = true" />
</template>

<script setup>
import { ref, computed } from 'vue'

const showCouponList = ref(false)
const chosenIds = ref([])

const coupons = ref([
  { id: 1, value: 10, condition: 50, name: '满减券', startAt: 1767225600, endAt: 1798761600 },
  { id: 2, value: 5, condition: 0, name: '无门槛券', startAt: 1767225600, endAt: 1798761600 },
  { id: 3, value: 20, condition: 100, name: '不可用券', available: false },
])

const chosenCoupon = computed(() => coupons.value.find((c) => chosenIds.value.includes(c.id)))

const onExchange = (code) => console.log('兑换码', code)
const onChange = (ids) => console.log('选中变化', ids)
</script>
```

## Coupon 单个优惠券卡片

`mx-coupon` 单独使用时展示一张优惠券卡片，通过 `chosen` 标记选中、`disabled` 标记禁用。

<demo-live>
  <mx-coupon
    :coupon="{ value: 10, condition: 50, name: '满减券', startAt: 1767225600, endAt: 1798761600 }"
  />
  <mx-coupon
    :coupon="{ value: 5, name: '无门槛券', description: '全场通用', endAt: 1798761600 }"
    chosen
  />
  <mx-coupon
    :coupon="{ value: 20, condition: 100, name: '不可用券', endAt: 1798761600 }"
    disabled
  />
</demo-live>

```vue
<mx-coupon
  :coupon="{ value: 10, condition: 50, name: '满减券', startAt: 1767225600, endAt: 1798761600 }"
/>
<mx-coupon
  :coupon="{ value: 5, name: '无门槛券', description: '全场通用', endAt: 1798761600 }"
  chosen
/>
<mx-coupon :coupon="{ value: 20, condition: 100, name: '不可用券', endAt: 1798761600 }" disabled />
```

## 优惠券数据结构

`coupon` / `coupons` 中传入的优惠券对象字段如下：

| 字段        | 说明                          | 类型               |
| ----------- | ----------------------------- | ------------------ |
| id          | 优惠券 id                     | `string \| number` |
| value       | 优惠金额（面值）              | `number \| string` |
| condition   | 使用门槛：满 condition 元可用 | `number \| string` |
| name        | 优惠券名称                    | `string`           |
| description | 描述                          | `string`           |
| startAt     | 开始时间时间戳（秒）          | `number`           |
| endAt       | 结束时间时间戳（秒）          | `number`           |
| available   | 是否可用（用于列表分组）      | `boolean`          |

## Coupon Props

| 参数         | 说明       | 类型               | 默认值  |
| ------------ | ---------- | ------------------ | ------- |
| coupon       | 优惠券数据 | `object`           | `{}`    |
| chosen       | 是否选中   | `boolean`          | `false` |
| disabled     | 是否禁用   | `boolean`          | `false` |
| currency     | 货币符号   | `string`           | `¥`     |
| custom-class | 自定义类名 | `string`           | `''`    |
| custom-style | 自定义样式 | `string \| object` | `''`    |

## Coupon Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| click  | 点击优惠券时触发 | event    |

## CouponCell Props

| 参数         | 说明                       | 类型               | 默认值   |
| ------------ | -------------------------- | ------------------ | -------- |
| title        | 单元格标题                 | `string`           | `优惠券` |
| coupon       | 当前选中的优惠券           | `object`           | `null`   |
| currency     | 货币符号                   | `string`           | `¥`      |
| editable     | 是否可编辑（显示右侧箭头） | `boolean`          | `true`   |
| chosen       | 是否已选中                 | `boolean`          | `false`  |
| border       | 是否显示底部边框           | `boolean`          | `true`   |
| custom-class | 自定义类名                 | `string`           | `''`     |
| custom-style | 自定义样式                 | `string \| object` | `''`     |

## CouponCell Events

| 事件名 | 说明                   | 回调参数                    |
| ------ | ---------------------- | --------------------------- |
| click  | 点击单元格时触发       | event                       |
| change | 点击时切换选中状态触发 | `value`（切换后的选中状态） |

## CouponCell Slots

| 名称      | 说明           |
| --------- | -------------- |
| default   | 自定义右侧内容 |
| left-icon | 自定义左侧图标 |

## CouponList Props

| 参数                 | 说明                 | 类型               | 默认值         |
| -------------------- | -------------------- | ------------------ | -------------- |
| v-model              | 选中的优惠券 id 数组 | `array`            | `[]`           |
| coupons              | 优惠券列表           | `array`            | `[]`           |
| currency             | 货币符号             | `string`           | `¥`            |
| show-exchange-bar    | 是否显示兑换码输入栏 | `boolean`          | `true`         |
| exchange-btn-text    | 兑换按钮文字         | `string`           | `兑换`         |
| exchange-placeholder | 兑换码输入框占位     | `string`           | `请输入兑换码` |
| close-button-text    | 底部关闭按钮文字     | `string`           | `''`           |
| custom-class         | 自定义类名           | `string`           | `''`           |
| custom-style         | 自定义样式           | `string \| object` | `''`           |

## CouponList Events

| 事件名            | 说明                 | 回调参数               |
| ----------------- | -------------------- | ---------------------- |
| update:modelValue | 选中优惠券变化时触发 | 选中的优惠券 id 数组   |
| change            | 选中优惠券变化时触发 | 选中的优惠券 id 数组   |
| exchange          | 点击兑换按钮时触发   | `code`（输入的兑换码） |
| click-coupon      | 点击优惠券时触发     | coupon（优惠券对象）   |
| close             | 点击关闭时触发       | -                      |
