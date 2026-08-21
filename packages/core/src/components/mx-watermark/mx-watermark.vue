<template>
  <view
    class="mx-watermark"
    :class="customClass"
    :style="watermarkStyle"
    pointer-events="none"
  >
    <!-- 绝对定位铺满的水印单元 -->
    <view
      v-for="item in items"
      :key="item.key"
      class="mx-watermark__item"
      :style="item.style"
    >
      <text
        class="mx-watermark__text"
        :style="{
          fontSize: fontSizeUnit,
          color: color,
          transform: `rotate(${rotate}deg)`,
        }"
        >{{ text }}</text
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 水印文字 */
    text: makeStringProp(''),
    /** 单个水印块宽度 */
    width: makeNumericProp<number>(120),
    /** 单个水印块高度 */
    height: makeNumericProp<number>(64),
    /** 每行/每列之间的间隙 */
    gap: makeNumericProp<number>(16),
    /** 文字字号 (px / rpx) */
    fontSize: makeNumericProp<number | string>(14),
    /** 文字颜色 (建议带透明度, 如 rgba) */
    color: makeStringProp('rgba(0, 0, 0, 0.12)'),
    /** 旋转角度 */
    rotate: makeNumericProp<number>(-22),
    /** 是否全屏铺满 (默认铺满容器) */
    fullScreen: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    text: '',
    width: 120,
    height: 64,
    gap: 16,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.12)',
    rotate: -22,
  }
)

interface WatermarkItem {
  key: string
  style: Record<string, string>
}

/** 系统屏幕尺寸, 用于铺满计算 (uni API, 不操作 document/window) */
const screen = ((): { width: number; height: number } => {
  try {
    const info = uni.getSystemInfoSync()
    return { width: info.windowWidth || 375, height: info.windowHeight || 667 }
  } catch (e) {
    return { width: 375, height: 667 }
  }
})()

const fontSizeUnit = computed(() => (addUnit(props.fontSize as any) as string) || '14px')

const watermarkStyle = computed(() => {
  const style: Record<string, string> = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1',
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

/** 生成铺满的水印单元 (间隙网格) */
const items = computed<WatermarkItem[]>(() => {
  const w = Number(props.width)
  const h = Number(props.height)
  const g = Number(props.gap)
  const cols = Math.ceil((screen.width + g) / (w + g))
  const rows = Math.ceil((screen.height + g) / (h + g))
  const list: WatermarkItem[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      list.push({
        key: `${r}-${c}`,
        style: {
          left: `${c * (w + g)}px`,
          top: `${r * (h + g)}px`,
          width: `${w}px`,
          height: `${h}px`,
        },
      })
    }
  }
  return list
})
</script>

<style lang="scss">
.mx-watermark {
  overflow: hidden;
  pointer-events: none;
  user-select: none;

  &__item {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    max-width: 100%;
    overflow: hidden;
    font-weight: inherit;
    word-break: break-all;
    text-overflow: ellipsis;
  }
}
</style>