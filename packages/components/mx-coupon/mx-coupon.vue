<template>
  <view
    class="mx-coupon"
    :class="[
      { 'mx-coupon--chosen': chosen, 'mx-coupon--disabled': disabled },
      customClass,
    ]"
    :style="customStyle"
    :hover-class="'mx-coupon--hover'"
    @click="onClick"
  >
    <view class="mx-coupon__body">
      <view class="mx-coupon__left">
        <text class="mx-coupon__currency">{{ currency }}</text>
        <text class="mx-coupon__value">{{ valueText }}</text>
      </view>
      <view class="mx-coupon__right">
        <text class="mx-coupon__condition">{{ conditionText }}</text>
        <text class="mx-coupon__name">{{ couponData.name }}</text>
        <text v-if="couponData.description" class="mx-coupon__desc">{{ couponData.description }}</text>
        <text class="mx-coupon__time">{{ timeText }}</text>
      </view>
    </view>

    <view class="mx-coupon__corner">
      <text v-if="chosen" class="mx-coupon__corner-check">✓</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../../shared/props'

/** 优惠券数据结构 */
interface CouponInfo {
  id?: string | number
  /** 优惠金额 (面值) */
  value?: number | string
  /** 使用门槛: 满 condition 元可用 */
  condition?: number | string
  /** 优惠券名称 */
  name?: string
  /** 描述 */
  description?: string
  /** 开始时间时间戳(秒) */
  startAt?: number
  /** 结束时间时间戳(秒) */
  endAt?: number
  /** 是否可用 (用于列表分组) */
  available?: boolean
}

const props = withDefaults(
  defineProps({
    /** 优惠券数据 */
    coupon: { type: Object as any, default: () => ({}) as CouponInfo },
    /** 是否选中 */
    chosen: makeBooleanProp(false),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 货币符号 */
    currency: makeStringProp('¥'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const couponData = computed(() => props.coupon as CouponInfo)

const valueText = computed(() => {
  const v = Number(couponData.value.value)
  return Number.isFinite(v) ? String(v) : '0'
})

const conditionText = computed(() => {
  const condition = Number(couponData.value.condition)
  if (Number.isFinite(condition) && condition > 0) return `满${condition}元可用`
  return '无门槛'
})

const timeText = computed(() => {
  const { startAt, endAt } = couponData.value
  if (startAt && endAt) return `${formatTime(startAt)} 至 ${formatTime(endAt)}`
  if (endAt) return `有效期至 ${formatTime(endAt)}`
  return ''
})

function formatTime(ts: number): string {
  const date = new Date(ts * 1000)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

const onClick = (event: Event) => emit('click', event)
</script>

<style lang="scss">
.mx-coupon {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin: 4px 16px;
  color: var(--mx-text-color);
  background: var(--mx-background-2);
  border-radius: var(--mx-radius-lg);
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: '';
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    left: -6px;
    border-radius: 50%;
    background: var(--mx-background);
    box-shadow: -6px 0 0 -4px var(--mx-background-2);
  }
  &::before {
    top: -6px;
  }
  &::after {
    bottom: -6px;
  }

  &--hover {
    opacity: var(--mx-active-opacity);
  }

  &--chosen {
    box-shadow: 0 0 0 1px var(--mx-primary-color);
  }

  &--disabled {
    opacity: var(--mx-disabled-opacity);
    cursor: not-allowed;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: 88px;
    padding: 12px 16px;
  }

  &__left {
    display: flex;
    align-items: baseline;
    flex-shrink: 0;
    min-width: 84px;
    color: var(--mx-danger-color);
  }

  &__currency {
    font-size: var(--mx-font-size-sm);
  }

  &__value {
    font-size: 32px;
    font-weight: var(--mx-font-weight-bold);
    line-height: 1;
  }

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-left: 12px;
  }

  &__condition {
    color: var(--mx-text-color);
    font-size: 14px;
    font-weight: var(--mx-font-weight-bold);
  }

  &__name {
    margin-top: 2px;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-sm);
    line-height: var(--mx-line-height-sm);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__desc {
    margin-top: 2px;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-xs);
  }

  &__time {
    margin-top: 4px;
    color: var(--mx-text-color-3);
    font-size: var(--mx-font-size-xs);
  }

  &__corner {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #fff;
    font-size: 14px;
    background: var(--mx-primary-color);
    border-radius: 50%;
  }
}
</style>