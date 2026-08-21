<template>
  <view class="mx-circle" :class="customClass" :style="circleStyle">
    <!-- 进度环: 用 conic-gradient 绘制圆弧 (H5/App/小程序 WebView 均支持) -->
    <view class="mx-circle__ring" :style="ringStyle" />
    <!-- 内圈掏孔形成环 -->
    <view class="mx-circle__inner" :style="innerStyle" />
    <!-- 中央内容 -->
    <view class="mx-circle__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { makeNumericProp, makeStringProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 进度值 (0 - 100) */
    value: makeNumericProp<number>(0),
    /** 圆环大小 */
    size: makeNumericProp<number | string>('100px'),
    /** 圆环宽度 */
    strokeWidth: makeNumericProp<number | string>(4),
    /** 进度颜色 */
    color: makeStringProp(''),
    /** 轨道颜色 */
    layerColor: makeStringProp(''),
    /** 是否顺时针转动 */
    clockwise: { type: Boolean, default: true },
    /** 变化速度 (视觉过渡时长 ms, conic-gradient 不支持平滑过渡, 保留 API) */
    speed: makeNumericProp<number | string>(0),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    value: 0,
    size: '100px',
    strokeWidth: 4,
    clockwise: true,
    speed: 0,
  }
)

const emit = defineEmits<{ (e: 'change', value: number): void }>()

const sizeUnit = computed(() => addUnit(props.size) as string)
const strokeUnit = computed(() => addUnit(props.strokeWidth) as string)

const pieColor = computed(() => props.color || 'var(--mx-primary-color)')
const trackColor = computed(() => props.layerColor || 'var(--mx-border-color)')

/** 角度 (deg) */
const angle = computed(() => {
  const v = Math.min(100, Math.max(0, Number(props.value) || 0))
  return v * 3.6
})

const circleStyle = computed(() => {
  const style: Record<string, string> = { width: sizeUnit.value, height: sizeUnit.value }
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const ringStyle = computed(() => {
  const deg = angle.value
  const sweep = props.clockwise ? deg : 360 - deg
  return {
    background: `conic-gradient(${pieColor.value} ${sweep}deg, ${trackColor.value} ${sweep}deg 360deg)`,
  }
})

const innerStyle = computed(() => {
  const inset = strokeUnit.value
  return {
    top: inset,
    left: inset,
    width: `calc(100% - ${inset} * 2)`,
    height: `calc(100% - ${inset} * 2)`,
    background: 'var(--mx-background-2)',
  }
})

// value 变化触发 change 事件
watch(angle, (val) => emit('change', Number(props.value) || 0))

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}
</script>

<style lang="scss">
.mx-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &__ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__inner {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mx-text-color);
  }
}
</style>