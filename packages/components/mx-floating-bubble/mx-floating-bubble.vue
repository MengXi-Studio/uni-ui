<template>
  <view v-if="modelValue" class="mx-floating-bubble" :class="customClass" :style="rootStyle">
    <movable-area class="mx-floating-bubble__area">
      <movable-view
        class="mx-floating-bubble__bubble"
        :direction="directionMap"
        :x="x"
        :y="y"
        :out-of-bounds="false"
        :damping="30"
        @change="onChange"
        @touchend="onTouchEnd"
        @click="onClick"
      >
        <slot>
          <text v-if="icon" class="mx-floating-bubble__icon">{{ icon }}</text>
          <text v-else-if="text" class="mx-floating-bubble__text">{{ text }}</text>
        </slot>
      </movable-view>
    </movable-area>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'

const props = withDefaults(
  defineProps({
    /** 是否可见 (v-model) */
    modelValue: makeBooleanProp(true),
    /** 图标文本 */
    icon: makeStringProp(''),
    /** 文案 */
    text: makeStringProp(''),
    /** 可拖动轴: x 水平 / y 垂直 / both 双向 */
    axis: makeStringProp<'x' | 'y' | 'both'>('both'),
    /** 松手是否吸附边缘 */
    magnetic: makeBooleanProp(true),
    /** 气泡尺寸 */
    size: makeNumericProp<number | string>(48),
    /** 距离右边缘 (拖动起始 x) */
    right: makeNumericProp<number | string>(16),
    /** 距离底部 (拖动起始 y) */
    bottom: makeNumericProp<number | string>(80),
    /** z-index */
    zIndex: makeNumericProp<number | string>(1000),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: true,
    icon: '',
    text: '',
    axis: 'both',
    magnetic: true,
    size: 48,
    right: 16,
    bottom: 80,
    zIndex: 1000,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click'): void
  (e: 'offset-change', value: { x: number; y: number }): void
}>()

const directionMap = computed(() => {
  if (props.axis === 'x') return 'horizontal'
  if (props.axis === 'y') return 'vertical'
  return 'all'
})

const areaWidth = ref(0)
const areaHeight = ref(0)

/** movable-view 当前坐标 */
const x = ref(0)
const y = ref(0)

// 测量可移动区域尺寸, 用于磁吸计算
function measure() {
  if (typeof uni === 'undefined' || !(uni as any).createSelectorQuery) return
  const query = uni.createSelectorQuery()
  query.select('.mx-floating-bubble__area').boundingClientRect((res: any) => {
    if (res) {
      areaWidth.value = res.width
      areaHeight.value = res.height
    }
  })
  query.exec()
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      setTimeout(measure, 0)
    }
  },
  { immediate: true }
)

const sizeNum = computed(() => Number(props.size) || 48)

const rootStyle = computed(() => {
  const style: Record<string, string> = {
    position: 'fixed',
    right: Number(props.right) + 'px',
    bottom: Number(props.bottom) + 'px',
    zIndex: String(props.zIndex),
    width: sizeNum.value + 'px',
    height: sizeNum.value + 'px',
  }
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
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

const onChange = (event: any) => {
  x.value = event.detail.x
  y.value = event.detail.y
  emit('offset-change', { x: x.value, y: y.value })
}

const onTouchEnd = () => {
  if (!props.magnetic || !areaWidth.value) return
  // 吸附到最近水平边缘
  const half = sizeNum.value
  const snapX = x.value + half / 2 <= areaWidth.value / 2 ? 0 : areaWidth.value - half
  x.value = snapX
  emit('offset-change', { x: x.value, y: y.value })
}

const onClick = () => {
  emit('click')
}
</script>

<style lang="scss">
.mx-floating-bubble {
  font-size: 0;

  &__area {
    width: 100%;
    height: 100%;
  }

  &__bubble {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mx-primary-color);
    border-radius: 50%;
    box-shadow: 0 4px 10px var(--mx-active-color);
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }

  &__icon {
    line-height: 1;
  }

  &__text {
    font-size: 14px;
    line-height: 1;
  }
}
</style>