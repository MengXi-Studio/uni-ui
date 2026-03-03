<template>
  <button
    class="mx-button"
    :class="[
      `mx-button--${type}`,
      `mx-button--${size}`,
      `mx-button--${shape}`,
      {
        'mx-button--plain': plain,
        'mx-button--disabled': disabled,
        'mx-button--loading': loading,
      },
      className,
    ]"
    :style="customStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 加载图标 -->
    <view v-if="loading" class="mx-button__loading">
      <view class="mx-loading mx-loading--spin"></view>
    </view>
    
    <!-- 按钮文字 -->
    <text class="mx-button__text">{{ text }}</text>
    
    <!-- 插槽内容 -->
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from './types'

// 定义 Props
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  shape: 'square',
  plain: false,
  disabled: false,
  loading: false,
  text: '',
  className: '',
  customStyle: '',
})

// 定义 Emits
const emit = defineEmits<ButtonEmits>()

// 点击事件处理
const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  line-height: 1.5;
  transition: all $animation-duration-fast $ease-in-out;
  @include mx-click-effect;

  // 不同尺寸
  &--small {
    height: $button-height-sm;
    padding: 0 $spacing-sm;
    font-size: $font-size-sm;
  }

  &--medium {
    height: $button-height-base;
    padding: 0 $spacing-md;
    font-size: $font-size-base;
  }

  &--large {
    height: $button-height-lg;
    padding: 0 $spacing-lg;
    font-size: $font-size-md;
  }

  // 不同类型
  &--default {
    background-color: $bg-color-base;
    color: $text-color-regular;
    border: 1px solid $border-color-base;

    &.mx-button--plain {
      background-color: transparent;
    }
  }

  &--primary {
    background-color: var(--mx-primary-color);
    color: #fff;

    &.mx-button--plain {
      color: var(--mx-primary-color);
      border: 1px solid currentColor;
    }
  }

  &--success {
    background-color: var(--mx-success-color);
    color: #fff;

    &.mx-button--plain {
      color: var(--mx-success-color);
      border: 1px solid currentColor;
    }
  }

  &--warning {
    background-color: var(--mx-warning-color);
    color: #fff;

    &.mx-button--plain {
      color: var(--mx-warning-color);
      border: 1px solid currentColor;
    }
  }

  &--danger {
    background-color: var(--mx-danger-color);
    color: #fff;

    &.mx-button--plain {
      color: var(--mx-danger-color);
      border: 1px solid currentColor;
    }
  }

  // 不同形状
  &--square {
    border-radius: $border-radius-base;
  }

  &--round {
    border-radius: 999px;
  }

  &--circle {
    width: auto;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 0;
  }

  // 禁用状态
  &--disabled {
    opacity: $disabled-opacity;
    cursor: not-allowed;
  }

  // 加载状态
  &--loading {
    cursor: wait;
  }

  // 加载图标
  &__loading {
    display: inline-flex;
    margin-right: $spacing-xs;
  }

  // 按钮文字
  &__text {
    display: inline-block;
  }
}
</style>
