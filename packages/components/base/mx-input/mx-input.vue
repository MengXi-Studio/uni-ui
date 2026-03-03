<template>
  <view
    class="mx-input"
    :class="[`mx-input--${size}`, { 'mx-input--disabled': disabled }, className]"
    :style="customStyle"
  >
    <!-- 前置图标 -->
    <view v-if="prefixIcon" class="mx-input__prefix">
      <text class="mx-input__icon">{{ prefixIcon }}</text>
    </view>

    <!-- 输入框 -->
    <input
      class="mx-input__inner"
      :type="getInputType()"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- 清除按钮 -->
    <view
      v-if="clearable && modelValue && !disabled"
      class="mx-input__clear"
      @click="handleClear"
    >
      <text class="mx-input__icon">×</text>
    </view>

    <!-- 后置图标 -->
    <view v-else-if="suffixIcon" class="mx-input__suffix">
      <text class="mx-input__icon">{{ suffixIcon }}</text>
    </view>

    <!-- 字数统计 -->
    <view v-if="showCount && maxlength" class="mx-input__count">
      <text>{{ String(modelValue).length }}/{{ maxlength }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from './types'

// 定义 Props
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
  modelValue: '',
  placeholder: '请输入内容',
  disabled: false,
  readonly: false,
  maxlength: 140,
  clearable: false,
  showCount: false,
  prefixIcon: '',
  suffixIcon: '',
  className: '',
  customStyle: '',
})

// 定义 Emits
const emit = defineEmits<InputEmits>()

// 获取输入框类型
const getInputType = () => {
  const typeMap: Record<string, string> = {
    text: 'text',
    number: 'number',
    digit: 'digit',
    idcard: 'idcard',
    nickname: 'nickname',
  }
  return typeMap[props.type] || 'text'
}

// 输入事件处理
const handleInput = (e: any) => {
  const value = e.detail.value
  emit('update:modelValue', value)
  emit('input', value)
}

// 聚焦事件处理
const handleFocus = () => {
  emit('focus')
}

// 失焦事件处理
const handleBlur = () => {
  emit('blur')
}

// 清除事件处理
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: $border-radius-base;
  transition: all $animation-duration-fast $ease-in-out;

  // 不同尺寸
  &--small {
    height: $input-height-sm;
  }

  &--medium {
    height: $input-height-base;
  }

  &--large {
    height: $input-height-lg;
  }

  // 禁用状态
  &--disabled {
    opacity: $disabled-opacity;
    background-color: $bg-color-light;
  }

  // 前置图标
  &__prefix {
    display: flex;
    align-items: center;
    padding-left: $spacing-md;
    color: $text-color-secondary;
  }

  // 输入框
  &__inner {
    flex: 1;
    height: 100%;
    padding: 0 $spacing-md;
    font-size: $font-size-base;
    line-height: 1.5;
    background: transparent;

    &::placeholder {
      color: $text-color-placeholder;
    }
  }

  // 清除按钮
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40rpx;
    height: 40rpx;
    margin-right: $spacing-sm;
    color: $text-color-secondary;
    cursor: pointer;
    @include mx-click-effect;
  }

  // 后置图标
  &__suffix {
    display: flex;
    align-items: center;
    padding-right: $spacing-md;
    color: $text-color-secondary;
  }

  // 图标
  &__icon {
    font-size: $font-size-md;
    line-height: 1;
  }

  // 字数统计
  &__count {
    position: absolute;
    right: $spacing-md;
    bottom: -$spacing-lg;
    font-size: $font-size-xs;
    color: $text-color-secondary;
  }
}
</style>
