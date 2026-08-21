<template>
  <view class="mx-progress" :class="customClass" :style="progressStyle">
    <!-- 线形 -->
    <view v-if="type === 'line'" class="mx-progress__line" :style="lineWrapStyle">
      <view class="mx-progress__track" :style="{ background: trackColor || '', height: strokeWidthPx }">
        <view class="mx-progress__bar" :style="barStyle" />
      </view>
      <view v-if="showPivot && hasPivot" class="mx-progress__pivot" :style="pivotStyle" :data-percent="percentage">
        <slot name="pivot">
          <text class="mx-progress__pivot-text" :style="pivotTextStyle">{{ pivotText }}</text>
        </slot>
      </view>
    </view>

    <!-- 环形 -->
    <view v-else class="mx-progress__circle" :style="circleStyle">
      <view class="mx-progress__circle-ring" :style="ringStyle">
        <view class="mx-progress__circle-content" :style="{ color: textColor || '' }">
          <slot>{{ percentageText }}</slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeNumericProp, makeStringProp, makeBooleanProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

type ProgressType = 'line' | 'circle'

const props = withDefaults(
  defineProps({
    /** 进度百分比 (0-100) */
    percentage: makeNumericProp<number | string>(0),
    /** 类型: line / circle */
    type: makeStringProp<ProgressType>('line'),
    /** 轨道宽度 */
    strokeWidth: makeNumericProp<number | string>(4),
    /** 进度条颜色 */
    color: makeStringProp(''),
    /** 轨道颜色 */
    trackColor: makeStringProp(''),
    /** 是否显示进度文字 */
    showPivot: makeBooleanProp(true),
    /** 进度文字定制 */
    pivotText: makeStringProp(''),
    /** 进度文字背景色 */
    pivotColor: makeStringProp(''),
    /** 进度文字颜色 */
    textColor: makeStringProp(''),
    /** 是否显示进度百分比文案 */
    showText: makeBooleanProp(true),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    percentage: 0,
    type: 'line',
    strokeWidth: 4,
    showPivot: true,
  }
)

// 修正比例: percentage 归一化到 0-100
const percent = computed(() => {
  const v = Number(props.percentage)
  if (Number.isNaN(v)) return 0
  return Math.min(100, Math.max(0, v))
})

const percentValue = computed(() => `${percent.value}%`)

const percentageText = computed(() => `${Math.round(percent.value)}%`)

const strokeWidthPx = computed(() => {
  const w = addUnit(props.strokeWidth)
  return w || '4px'
})

const hasPivot = computed(() => props.type === 'line')

const barStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {
    width: percentValue.value,
  }
  if (props.color) style.background = props.color
  return style
})

const lineWrapStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = { position: 'relative' }
  return style
})

const pivotStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  if (props.pivotColor) style.background = props.pivotColor
  if (props.color && !props.pivotColor) style.background = props.color
  // 将 pivot 定位到百分比处
  style.left = percentValue.value
  return style
})

const pivotTextStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  if (props.textColor) style.color = props.textColor
  if (!props.textColor) style.color = '#fff'
  return style
})

// ------- 环形进度 (角度近似) -------
const circleSize = 88

const circleStyle = computed<Record<string, string>>(() => ({
  width: `${circleSize}px`,
  height: `${circleSize}px`,
}))

const ringStyle = computed<Record<string, string>>(() => {
  const threshold = percent.value
  const background = props.color || 'var(--mx-primary-color)'
  const track = props.trackColor || 'var(--mx-border-color)'
  // 使用 conic-gradient 按角度近似绘制环形进度
  return {
    borderRadius: '50%',
    background: `conic-gradient(${background} 0deg, ${background} ${threshold * 3.6}deg, ${track} ${threshold * 3.6}deg, ${track} 360deg)`,
  }
})

const progressStyle = props.customStyle
void trackColor
void showPivot
void showText
</script>

<style lang="scss">
.mx-progress {
  box-sizing: border-box;

  &__track {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 999px;
    background: var(--mx-border-color);
  }

  &__bar {
    position: relative;
    height: 100%;
    border-radius: 999px;
    background: var(--mx-primary-color);
    transition: width 0.3s var(--mx-ease-in-out);
  }

  &__pivot {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    padding: 2px 5px;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: var(--mx-primary-color);
    white-space: nowrap;

    &-text {
      font-size: 12px;
      line-height: 1;
    }
  }

  &__circle {
    position: relative;
    margin: 0 auto;

    &-ring {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }
  }
}
</style>