<template>
  <view
    class="mx-card"
    :class="[
      `mx-card--${size}`,
      {
        'mx-card--bordered': bordered,
        'mx-card--hoverable': hoverable,
      },
      className,
    ]"
    :style="customStyle"
    @click="handleClick"
  >
    <!-- 卡片头部 -->
    <view v-if="title || $slots.header" class="mx-card__header">
      <slot name="header">
        <view class="mx-card__title">{{ title }}</view>
        <view v-if="subtitle" class="mx-card__subtitle">{{ subtitle }}</view>
      </slot>
    </view>

    <!-- 卡片内容 -->
    <view class="mx-card__body">
      <slot></slot>
    </view>

    <!-- 卡片底部 -->
    <view v-if="$slots.footer" class="mx-card__footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CardProps, CardEmits } from './types'

// 定义 Props
const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  subtitle: '',
  size: 'medium',
  bordered: true,
  hoverable: false,
  className: '',
  customStyle: '',
})

// 定义 Emits
const emit = defineEmits<CardEmits>()

// 点击事件处理
const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-card {
  position: relative;
  background-color: var(--mx-bg-color-base);
  transition: all $animation-duration-fast $ease-in-out;

  // 不同尺寸
  &--small {
    padding: $spacing-md;
  }

  &--medium {
    padding: $spacing-lg;
  }

  &--large {
    padding: $spacing-xl;
  }

  // 边框
  &--bordered {
    border: 1px solid var(--mx-border-color-light);
    border-radius: $border-radius-lg;
  }

  // 悬浮效果
  &--hoverable {
    &:active {
      box-shadow: $shadow-md;
      transform: translateY(-2rpx);
    }
  }

  // 卡片头部
  &__header {
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid var(--mx-border-color-light);
  }

  // 卡片标题
  &__title {
    font-size: $font-size-lg;
    font-weight: 500;
    color: var(--mx-text-color-primary);
    line-height: 1.5;
  }

  // 卡片副标题
  &__subtitle {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: var(--mx-text-color-secondary);
    line-height: 1.5;
  }

  // 卡片内容
  &__body {
    color: var(--mx-text-color-regular);
    font-size: $font-size-base;
    line-height: 1.6;
  }

  // 卡片底部
  &__footer {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid var(--mx-border-color-light);
  }
}
</style>
