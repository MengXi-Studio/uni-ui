<template>
  <view
    class="mx-coupon-cell"
    :class="[{ 'mx-coupon-cell--editable': editable }, customClass]"
    :style="customStyle"
    :hover-class="'mx-coupon-cell--hover'"
    @click="onClickCell"
  >
    <slot name="left-icon" />
    <text class="mx-coupon-cell__label">{{ title }}</text>

    <view class="mx-coupon-cell__value">
      <slot>
        <text v-if="chosenCoupon" class="mx-coupon-cell__desc">{{ descText }}</text>
        <text v-else class="mx-coupon-cell__empty">暂无可用优惠券</text>
      </slot>
    </view>

    <view v-if="editable" class="mx-coupon-cell__arrow" @click.stop="onClickCell">›</view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'

/** 优惠券数据结构 (与 mx-coupon 对齐) */
interface CouponInfo {
  id?: string | number
  value?: number | string
  condition?: number | string
  name?: string
  description?: string
  startAt?: number
  endAt?: number
  available?: boolean
}

const props = defineProps({
  /** 单元格标题 */
  title: makeStringProp('优惠券'),
  /** 当前选中的优惠券 */
  coupon: { type: Object as any, default: null },
  /** 货币符号 */
  currency: makeStringProp('¥'),
  /** 是否可编辑(显示右侧箭头) */
  editable: makeBooleanProp(true),
  /** 是否已选中 */
  chosen: makeBooleanProp(false),
  /** 是否显示底部边框 */
  border: makeBooleanProp(true),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
  (e: 'change', value: boolean): void
}>()

const chosenCoupon = computed(() => (props.coupon ? (props.coupon as CouponInfo) : null))

/** 券说明: 满 X 元减 Y 元 -> '¥X 满...减...' */
const descText = computed(() => {
  const c = chosenCoupon.value
  if (!c) return ''
  const value = Number(c.value)
  const condition = Number(c.condition)
  const valueStr = Number.isFinite(value) ? value : 0
  if (Number.isFinite(condition) && condition > 0) {
    return `满${condition}元减${valueStr}元`
  }
  return `${props.currency}${valueStr}${c.name ? ` ${c.name}` : ''}`
})

/** 切换选中状态 */
const onClickCell = (event: Event) => {
  emit('click', event)
  emit('change', !props.chosen)
}
</script>

<style lang="scss">
.mx-coupon-cell {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 14px 16px;
  color: var(--mx-text-color);
  font-size: 14px;
  line-height: 24px;
  background: var(--mx-background-2);
  cursor: pointer;

  &::after {
    position: absolute;
    content: ' ';
    box-sizing: border-box;
    right: 16px;
    bottom: 0;
    left: 16px;
    transform: scaleY(0.5);
    transform-origin: center;
    border-bottom: 1px solid var(--mx-border-color);
  }

  &--hover {
    opacity: var(--mx-active-opacity);
  }

  &__label {
    flex-shrink: 0;
    margin-right: 12px;
  }

  &__value {
    flex: 1;
    min-width: 0;
    text-align: right;
    color: var(--mx-text-color);
  }

  &__desc {
    color: var(--mx-danger-color);
  }

  &__empty {
    color: var(--mx-text-color-2);
  }

  &__arrow {
    display: flex;
    align-items: center;
    margin-left: 4px;
    color: var(--mx-text-color-3);
    font-size: 18px;
    line-height: 1;
  }
}
</style>
