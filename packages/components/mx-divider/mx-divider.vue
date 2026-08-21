<template>
  <view
    class="mx-divider"
    :class="[`mx-divider--${contentPosition}`, { 'mx-divider--dashed': dashed }, customClass]"
    :style="customStyle"
  >
    <view class="mx-divider__content"><slot /></view>
  </view>
</template>

<script setup lang="ts">
import { makeStringProp, makeBooleanProp } from '../../shared/props'

defineProps({
  /** 虚线 */
  dashed: makeBooleanProp(false),
  /** 内容位置: left / center / right */
  contentPosition: makeStringProp<'left' | 'center' | 'right'>('center'),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

defineSlots<{ default?: () => unknown }>()
</script>

<style lang="scss">
.mx-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: var(--mx-text-color-2);
  font-size: 14px;
  line-height: 24px;

  &::before,
  &::after {
    content: '';
    display: block;
    flex: 1;
    box-sizing: border-box;
    border-top-style: solid;
    border-top-width: var(--mx-border-width-base);
    border-color: var(--mx-border-color);
    transform: scaleY(0.5);
  }

  &--dashed {
    &::before,
    &::after {
      border-top-style: dashed;
    }
  }

  &--center {
    .mx-divider__content {
      padding: 0 16px;
    }
  }

  &--left {
    &::before {
      display: none;
    }
    .mx-divider__content {
      padding-right: 16px;
    }
  }

  &--right {
    &::after {
      display: none;
    }
    .mx-divider__content {
      padding-left: 16px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }
}
</style>