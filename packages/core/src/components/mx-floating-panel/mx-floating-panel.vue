<template>
  <view class="mx-floating-panel" :class="customClass" :style="panelStyle">
    <!-- 拖拽把手 -->
    <view
      class="mx-floating-panel__handle-bar"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view class="mx-floating-panel__handle" />
    </view>

    <!-- 内容区 -->
    <view class="mx-floating-panel__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { makeNumericProp, makeStringProp } from '../shared/props'

const props = defineProps({
  /** 当前吸附的锚点 (v-model, 数字 = 面板在底部露出的高度) */
  modelValue: makeNumericProp<number>(100),
  /** 可吸附的高度锚点数组 (从小到大) */
  anchors: { type: Array as any, default: () => [] },
  /** 内容高度 */
  contentHeight: makeNumericProp<number>(0),
  /** 距顶部最小偏移 */
  offsetTop: makeNumericProp<number>(40),
  /** 吸附动画时长 (ms) */
  duration: makeNumericProp<number>(300),
  /** z-index */
  zIndex: makeNumericProp<number | string>(999),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'heightChange', value: number): void
  (e: 'dragstart', value: number): void
  (e: 'dragend', value: number): void
}>()

/** 面板可视高度 (px) */
const height = ref(Number(props.modelValue))

/** 候选锚点 (至少包含默认值) */
const anchorList = computed<number[]>(() => {
  const list: number[] =
    Array.isArray(props.anchors) && props.anchors.length
      ? (props.anchors as number[]).map(Number)
      : []
  if (!list.length) list.push(Number(props.modelValue))
  return list.sort((a, b) => a - b)
})

const panelStyle = computed(() => {
  const h = clampHeight(height.value)
  const style: Record<string, string> = {
    zIndex: String(props.zIndex),
    height: `${h}px`,
  }
  if (typeof props.customStyle === 'string' && props.customStyle) {
    Object.assign(style, parseStyle(props.customStyle))
  } else if (props.customStyle) {
    Object.assign(style, props.customStyle as Record<string, string>)
  }
  return style
})

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

/** 限制高度范围: 不超出页面顶部 offsetTop */
const clampHeight = (v: number): number => {
  let cap = v
  const maxH = getScreenHeight() - Number(props.offsetTop)
  if (cap > maxH) cap = maxH
  if (cap < 40) cap = 40
  return Math.round(cap)
}

const getScreenHeight = () => {
  try {
    return uni.getSystemInfoSync().windowHeight || 667
  } catch (e) {
    return 667
  }
}

// ---------- 拖拽 ----------
const startY = ref(0)
const startHeight = ref(0)
let currentTouch: { x: number; y: number } | null = null

const onTouchStart = (event: unknown) => {
  const touch = (event as any).touches && (event as any).touches[0]
  currentTouch = touch
  if (touch) {
    startY.value = touch.clientY
    startHeight.value = height.value
  }
}

const onTouchMove = (event: unknown) => {
  const touch = (event as any).touches && (event as any).touches[0]
  if (!touch || !currentTouch) return
  // 上滑 (clientY 减小) => 高度增大
  const delta = startY.value - touch.clientY
  height.value = clampHeight(startHeight.value + delta)
}

const onTouchEnd = () => {
  currentTouch = null
  snap()
}

/** 吸附到最近的锚点 */
const snap = () => {
  const h = height.value
  const list = anchorList.value
  let target = list[list.length - 1]
  let minD = Infinity
  for (const a of list) {
    const d = Math.abs(a - h)
    if (d < minD) {
      minD = d
      target = a
    }
  }
  height.value = clampHeight(target)
  emit('update:modelValue', height.value)
  emit('heightChange', height.value)
  emit('dragend', height.value)
}

/** 跳转到指定锚点 */
const setAnchor = (value: number) => {
  height.value = clampHeight(Number(value))
  emit('update:modelValue', height.value)
  emit('heightChange', height.value)
}

defineExpose({ setAnchor, getHeight: () => height.value })
</script>

<style lang="scss">
.mx-floating-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: var(--mx-radius-lg) var(--mx-radius-lg) 0 0;
  background: var(--mx-background-2);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  transition: height var(--mx-duration-base) var(--mx-ease-in-out);

  &__handle-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding-top: 12px;
    box-sizing: border-box;
  }

  &__handle {
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: var(--mx-border-color);
  }

  &__content {
    padding: 0 16px 16px;
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }
}
</style>
