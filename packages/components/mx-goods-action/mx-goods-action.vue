<template>
  <view
    class="mx-goods-action"
    :class="[{ 'mx-goods-action--safe-bottom': safeAreaInsetBottom }, customClass]"
    :style="customStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { makeBooleanProp, makeStringProp } from '../../shared/props'

withDefaults(
  defineProps({
    /** 是否适配底部安全区 */
    safeAreaInsetBottom: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  { safeAreaInsetBottom: false }
)
</script>

<style lang="scss">
.mx-goods-action {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  box-sizing: content-box;
  background: var(--mx-background-2);

  &--safe-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>