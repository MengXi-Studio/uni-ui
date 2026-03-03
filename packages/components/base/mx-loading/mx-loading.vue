<template>
  <view
    class="mx-loading-wrapper"
    :class="{ 'mx-loading-wrapper--fullscreen': fullscreen }"
    :style="customStyle"
  >
    <view
      class="mx-loading"
      :class="[`mx-loading--${type}`, `mx-loading--${size}`, className]"
    >
      <!-- 圆形旋转 -->
      <view v-if="type === 'circle'" class="mx-loading__circle">
        <view class="mx-loading__circle-spinner"></view>
      </view>

      <!-- 点状跳动 -->
      <view v-else-if="type === 'dots'" class="mx-loading__dots">
        <view class="mx-loading__dot mx-loading__dot--1"></view>
        <view class="mx-loading__dot mx-loading__dot--2"></view>
        <view class="mx-loading__dot mx-loading__dot--3"></view>
      </view>

      <!-- 旋转器 -->
      <view v-else class="mx-loading__spinner">
        <view class="mx-loading__spinner-line"></view>
      </view>
    </view>

    <!-- 加载文字 -->
    <text v-if="text" class="mx-loading__text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import type { LoadingProps } from './types'

// 定义 Props
const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circle',
  size: 'medium',
  text: '',
  fullscreen: false,
  className: '',
  customStyle: '',
})
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-loading-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // 全屏模式
  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: $max-z-index;
  }
}

.mx-loading {
  display: inline-block;

  // 不同尺寸
  &--small {
    width: 32rpx;
    height: 32rpx;
  }

  &--medium {
    width: 48rpx;
    height: 48rpx;
  }

  &--large {
    width: 64rpx;
    height: 64rpx;
  }

  // 圆形旋转
  &__circle {
    position: relative;
    width: 100%;
    height: 100%;

    &-spinner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid var(--mx-border-color-light);
      border-top-color: var(--mx-primary-color);
      border-radius: 50%;
      animation: mx-spin 0.8s linear infinite;
    }
  }

  // 点状跳动
  &__dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
  }

  &__dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: var(--mx-primary-color);
    animation: mx-bounce 1.4s ease-in-out infinite both;

    &--1 {
      animation-delay: -0.32s;
    }

    &--2 {
      animation-delay: -0.16s;
    }

    &--3 {
      animation-delay: 0s;
    }
  }

  // 旋转器
  &__spinner {
    position: relative;
    width: 100%;
    height: 100%;

    &-line {
      position: absolute;
      top: 0;
      left: 50%;
      width: 10%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--mx-primary-color) 50%,
        transparent 100%
      );
      transform-origin: 50% 50%;
      animation: mx-spin 1.2s linear infinite;
    }
  }

  // 加载文字
  &__text {
    margin-top: $spacing-md;
    font-size: $font-size-sm;
    color: var(--mx-text-color-secondary);
  }
}

// 旋转动画
@keyframes mx-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 跳动动画
@keyframes mx-bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
