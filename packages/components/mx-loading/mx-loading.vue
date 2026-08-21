<template>
  <view class="mx-loading" :class="{ 'mx-loading--vertical': vertical, customClass }" :style="customStyle">
    <!-- circular: 环形旋转 -->
    <view
      v-if="type === 'circular'"
      class="mx-loading__spinner mx-loading__spinner--circular"
      :style="{ color, width: sizeUnit, height: sizeUnit }"
      :aria-label="text || 'loading'"
    >
      <view class="mx-loading__circular" :style="{ width: sizeUnit, height: sizeUnit }">
        <view class="mx-loading__dot" style="top: 0; left: 50%; margin-left: -1px"></view>
        <view class="mx-loading__dot" style="top: 50%; left: calc(100% - 2px); margin-top: -1px"></view>
        <view class="mx-loading__dot" style="bottom: 0; left: 50%; margin-left: -1px"></view>
        <view class="mx-loading__dot" style="top: 50%; left: 0; margin-top: -1px"></view>
      </view>
    </view>

    <!-- spinner: 旋转圆环 -->
    <view
      v-else
      class="mx-loading__spinner mx-loading__spinner--spinner"
      :style="{ width: sizeUnit, height: sizeUnit }"
      :aria-label="text || 'loading'"
    >
      <view
        v-for="i in 12"
        :key="i"
        class="mx-loading__spinner-item"
        :style="spinnerItemStyle(i)"
      ></view>
    </view>

    <!-- 加载文字 -->
    <text v-if="text" class="mx-loading__text" :style="[textStyle]">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 加载图标类型: circular / spinner */
    type: makeStringProp<'circular' | 'spinner'>('circular'),
    /** 加载图标大小 */
    size: makeNumericProp<number | string>('30px'),
    /** 加载文字颜色 */
    color: makeStringProp('#c8c9cc'),
    /** 加载文字 */
    text: makeStringProp(''),
    /** 是否垂直排列图标和文字 */
    vertical: makeBooleanProp(false),
    /** 文字大小 */
    textSize: makeNumericProp<number | string>('14px'),
    /** 文字颜色 (优先于 color) */
    textColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    color: '#c8c9cc',
    size: '30px',
    type: 'circular',
  }
)

const sizeUnit = computed(() => addUnit(props.size))
const textStyle = computed(() => ({
  color: props.textColor || props.color,
  fontSize: addUnit(props.textSize),
}))

/** 计算 spinner 12 个条的位置与旋转角度 (线性扇形) */
const spinnerItemStyle = (i: number) => {
  const size = props.size
  const num = 12
  const animationDuration = 0.8
  const itemStyle: Record<string, unknown> = {
    width: '2px',
    height: `${(Number(size) || 30) / 6}px`,
    left: '50%',
    top: '0',
    marginLeft: '-1px',
    transform: `rotate(${(i - 1) * (360 / num)}deg)`,
    transformOrigin: '1px 15px',
    animation: `mx-spinner-rotate ${animationDuration}s steps(${num}) infinite`,
    animationDelay: `${((i - 1 - num) / num) * -0.8}s`,
    background: 'currentColor',
  }
  return itemStyle
}
</script>

<style lang="scss" scoped>
@keyframes mx-spinner-rotate {
  to {
    opacity: 0;
  }
}

.mx-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mx-text-color-3);

  &--vertical {
    flex-direction: column;
  }

  &__spinner {
    position: relative;
    display: inline-block;
    color: currentColor;
  }

  &__spinner--circular {
    animation: mx-loading-circular 0.8s linear infinite;
  }

  &__circular {
    position: relative;
    box-sizing: border-box;
  }

  &__dot {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: currentColor;
  }

  &__spinner--spinner {
    animation: mx-loading-spinner 0.8s steps(12) infinite;
  }

  &__text {
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
  }

  &--vertical .mx-loading__text {
    margin-left: 0;
    margin-top: 8px;
  }
}

@keyframes mx-loading-circular {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes mx-loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>