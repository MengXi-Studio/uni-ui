<template>
  <view
    class="mx-submit-bar"
    :class="[{ 'mx-submit-bar--safe-bottom': safeAreaInsetBottom }, customClass]"
    :style="customStyle"
  >
    <slot name="top" />

    <view class="mx-submit-bar__bar">
      <view class="mx-submit-bar__left">
        <slot name="left" />
        <view class="mx-submit-bar__price-area">
          <text v-if="label" class="mx-submit-bar__label">{{ label }}</text>
          <slot name="price">
            <view v-if="price" class="mx-submit-bar__price-value">
              <text class="mx-submit-bar__currency">{{ currency }}</text>
              <text class="mx-submit-bar__amount">{{ amount }}</text>
            </view>
          </slot>
        </view>
        <slot />
      </view>

      <slot name="button">
        <view
          class="mx-submit-bar__button"
          :class="{ 'mx-submit-bar__button--disabled': disabled || loading }"
          :style="{ backgroundColor: buttonColor || '' }"
          :hover-class="!disabled && !loading ? 'mx-submit-bar__button--hover' : ''"
          @click="onSubmit"
        >
          <mx-loading v-if="loading" size="18px" color="#fff" />
          <text v-else class="mx-submit-bar__button-text">{{ buttonText }}</text>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import MxLoading from '../mx-loading/mx-loading.vue'

const props = withDefaults(
  defineProps({
    /** 合计金额 */
    price: makeNumericProp<number | string>(0),
    /** 合计金额文案 (比例 "合计") */
    label: makeStringProp('合计'),
    /** 货币符号 */
    currency: makeStringProp('¥'),
    /** 按钮文字 */
    buttonText: makeStringProp('提交订单'),
    /** 按钮自定义颜色 */
    buttonColor: makeStringProp(''),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 是否加载中 */
    loading: makeBooleanProp(false),
    /** 是否适配底部安全区 */
    safeAreaInsetBottom: makeBooleanProp(false),
    /** 金额保留的小数位数 */
    decimalLength: makeNumericProp<number>(2),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    price: 0,
    label: '合计',
    currency: '¥',
    buttonText: '提交订单',
    decimalLength: 2,
  }
)

const emit = defineEmits<{ (e: 'submit', event: Event): void }>()

const amount = computed(() => {
  const num = Number(props.price)
  const fixed = Number.isFinite(num)
    ? num.toFixed(Number(props.decimalLength) || 0)
    : (0).toFixed(Number(props.decimalLength) || 0)
  return fixed
})

const onSubmit = (event: Event) => {
  if (props.disabled || props.loading) return
  emit('submit', event)
}
</script>

<style lang="scss">
.mx-submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 500;

  &--safe-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__bar {
    display: flex;
    align-items: center;
    height: 50px;
    box-sizing: border-box;
    padding: 0 12px;
    background: var(--mx-background-2);
    box-shadow: 0 -1px 0 var(--mx-border-color);
  }

  &__left {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  &__price-area {
    display: flex;
    align-items: baseline;
  }

  &__label {
    margin-right: 4px;
    color: var(--mx-text-color);
    font-size: 14px;
  }

  &__price-value {
    display: inline-flex;
    align-items: baseline;
    color: var(--mx-danger-color);
    font-weight: var(--mx-font-weight-bold);
  }

  &__currency {
    font-size: var(--mx-font-size-sm);
  }

  &__amount {
    font-size: 18px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 96px;
    height: 40px;
    padding: 0 16px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    background: var(--mx-danger-color);
    border-radius: var(--mx-radius-max);
    transition: opacity var(--mx-duration-fast);

    &--hover {
      opacity: var(--mx-active-opacity);
    }

    &--disabled {
      opacity: var(--mx-disabled-opacity);
      cursor: not-allowed;
    }

    &-text {
      white-space: nowrap;
    }
  }
}
</style>