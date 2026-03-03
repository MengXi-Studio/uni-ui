<template>
  <text
    class="mx-icon"
    :class="[`mx-icon--${type}`, `mx-icon--${size}`, className]"
    :style="customStyle"
  >
    <!-- 使用 uni-app 内置图标 -->
    <text v-if="isBuiltIn" :class="name"></text>
    
    <!-- 使用 Unicode 字符 -->
    <text v-else-if="isUnicode">{{ getUnicode() }}</text>
    
    <!-- 使用图片 -->
    <image v-else-if="isImage" :src="name" mode="aspectFit" class="mx-icon__image" />
    
    <!-- 默认文本 -->
    <text v-else>{{ name }}</text>
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'

// 定义 Props
const props = withDefaults(defineProps<IconProps>(), {
  type: 'default',
  size: 'medium',
  color: '',
  className: '',
  customStyle: '',
})

// 判断是否为内置图标
const isBuiltIn = computed(() => {
  return props.name.startsWith('uniui-')
})

// 判断是否为 Unicode 字符
const isUnicode = computed(() => {
  return props.name.startsWith('\\u')
})

// 判断是否为图片
const isImage = computed(() => {
  return props.name.startsWith('http://') || props.name.startsWith('https://')
})

// 获取 Unicode 字符
const getUnicode = () => {
  return props.name.replace(/\\u/g, '%u')
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;

.mx-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  // 不同尺寸
  &--small {
    font-size: $font-size-sm;
    width: 32rpx;
    height: 32rpx;
  }

  &--medium {
    font-size: $font-size-base;
    width: 40rpx;
    height: 40rpx;
  }

  &--large {
    font-size: $font-size-lg;
    width: 48rpx;
    height: 48rpx;
  }

  // 不同类型
  &--default {
    color: var(--mx-text-color-regular);
  }

  &--primary {
    color: var(--mx-primary-color);
  }

  &--success {
    color: var(--mx-success-color);
  }

  &--warning {
    color: var(--mx-warning-color);
  }

  &--danger {
    color: var(--mx-danger-color);
  }

  &--info {
    color: var(--mx-info-color);
  }

  // 图片图标
  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
