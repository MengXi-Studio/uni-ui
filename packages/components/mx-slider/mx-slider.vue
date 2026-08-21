<template>
  <view
    class="mx-slider"
    :class="{ 'mx-slider--disabled': disabled, 'mx-slider--vertical': vertical }, customClass"
    :style="containerStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <!-- 轨道 -->
    <view class="mx-slider__track" :style="trackStyle">
      <!-- 已填充部分 -->
      <view v-if="!reversed" class="mx-slider__bar" :style="barStyle" />
      <!-- 滑块 -->
      <view class="mx-slider__thumb" :style="thumbStyle" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../../shared/props'
import { addUnit, toNumber } from '../../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 当前进度 */
    modelValue: makeNumericProp(0),
    /** 最小值 */
    min: makeNumericProp(0),
    /** 最大值 */
    max: makeNumericProp(100),
    /** 步长 */
    step: makeNumericProp(1),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 轨道高度 */
    barHeight: makeNumericProp<number | string>('2px'),
    /** 已填充颜色 */
    activeColor: makeStringProp(''),
    /** 未填充颜色 */
    inactiveColor: makeStringProp(''),
    /** 滑块直径 */
    buttonSize: makeNumericProp<number | string>('24px'),
    /** 是否反向 */
    reversed: makeBooleanProp(false),
    /** 是否垂直 */
    vertical: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    barHeight: '2px',
    buttonSize: '24px',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'drag-start'): void
  (e: 'drag-end'): void
}>()

type RangePosition = { start: number; size: number }

const instance = getCurrentInstance()

const min = computed(() => toNumber(props.min, 0))
const max = computed(() => {
  const n = toNumber(props.max, 100)
  return n < min.value ? min.value : n
})
const step = computed(() => {
  const n = toNumber(props.step, 1)
  return n < 1 ? 1 : n
})

const current = computed(() => {
  let v = toNumber(props.modelValue, min.value)
  if (v > max.value) v = max.value
  if (v < min.value) v = min.value
  return v
})

const percent = computed(() => {
  const range = max.value - min.value
  if (!range) return 0
  return ((current.value - min.value) / range) * 100
})

const activeColor = computed(() => props.activeColor || 'var(--mx-primary-color)')
const inactiveColor = computed(() => props.inactiveColor || 'var(--mx-text-color-3)')
const buttonSize = computed(() => addUnit(props.buttonSize) as string)

const containerStyle = computed(() => {
  if (!props.vertical) {
    return { width: '100%', paddingTop: '11px', paddingBottom: '11px' }
  }
  return { height: '100%', paddingLeft: '11px', paddingRight: '11px' }
})

const trackStyle = computed(() => {
  const size = props.vertical ? { bottom: '0', top: '0', width: addUnit(props.barHeight) } : { left: '0', right: '0', height: addUnit(props.barHeight) }
  return {
    ...(size as Record<string, string>),
    background: inactiveColor.value,
  }
})

const barStyle = computed(() => {
  const fill = props.vertical
    ? { bottom: '0', height: `${percent.value}%` }
    : { top: '0', width: `${percent.value}%` }
  return {
    ...(fill as Record<string, string>),
    background: activeColor.value,
  }
})

const thumbStyle = computed(() => {
  const pos = props.vertical
    ? { bottom: `calc(${percent.value}% - ${buttonSize.value} / 2)`, top: 'auto', left: '50%' }
    : { left: `calc(${percent.value}% - ${buttonSize.value} / 2)`, top: '50%' }
  return {
    ...(pos as Record<string, string>),
    width: buttonSize.value,
    height: buttonSize.value,
  }
})

let range: RangePosition | null = null

const queryRange = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!instance) {
      resolve()
      return
    }
    const query = (uni as any).createSelectorQuery()
    if (instance.proxy) query.in(instance.proxy)
    query
      .select('.mx-slider__track')
      .boundingClientRect((rect: any) => {
        if (!rect) {
          resolve()
          return
        }
        range = props.vertical
          ? { start: rect.top, size: rect.height || 0 }
          : { start: rect.left, size: rect.width || 0 }
        resolve()
      })
      .exec()
  })
}

const onTouchStart = (event: any) => {
  if (props.disabled) return
  emit('drag-start')
  queryRange().then(() => updateValue(event))
}

const onTouchMove = (event: any) => {
  if (props.disabled) return
  updateValue(event)
}

const onTouchEnd = () => {
  emit('drag-end')
}

const updateValue = (event: any) => {
  const touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0])
  if (!touch || !range || !range.size) return
  const offset = touch.clientX - range.start
  const raw = (offset / range.size) * (max.value - min.value) + min.value
  const ratio = step.value === 1 ? raw : min.value + Math.round((raw - min.value) / step.value) * step.value
  let next = Math.round(ratio * 100) / 100
  if (next < min.value) next = min.value
  if (next > max.value) next = max.value
  if (next !== current.value) {
    emit('update:modelValue', next)
    emit('change', next)
  }
}
</script>

<style lang="scss">
.mx-slider {
  position: relative;
  -webkit-user-select: none;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: var(--mx-disabled-opacity);
  }

  &__track {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    border-radius: var(--mx-radius-max);
  }

  &--vertical &__track {
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }

  &__bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: var(--mx-radius-max);
  }

  &--vertical &__bar {
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
  }

  &__thumb {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);
  }

  &--vertical &__thumb {
    left: 50%;
    top: auto;
    transform: translate(-50%, 50%);
  }
}
</style>