<template>
  <view
    class="mx-grid"
    :class="[{ 'mx-grid--border': border, 'mx-grid--square': square, 'mx-grid--gutter': gutter > 0 }, customClass]"
    :style="gridStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import { makeNumericProp, makeBooleanProp, makeStringProp } from '../../shared/props'

const props = withDefaults(
  defineProps({
    /** 列数 */
    columnNum: makeNumericProp<number | string>(4),
    /** 格子间距 */
    gutter: makeNumericProp<number | string>(0),
    /** 是否显示边框 */
    border: makeBooleanProp(true),
    /** 是否将格子固定为正方形 */
    square: makeBooleanProp(false),
    /** 是否将格子内容居中 */
    center: makeBooleanProp(true),
    /** 图标大小 */
    iconSize: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    columnNum: 4,
    gutter: 0,
    border: true,
    center: true,
  }
)

const columnNum = computed(() => Number(props.columnNum))
const gutter = computed(() => Number(props.gutter))

const context = reactive({
  columnNum,
  gutter,
  border: computed(() => props.border),
  square: computed(() => props.square),
  iconSize: computed(() => props.iconSize),
})

provide('mxGrid', context)

const gridStyle = computed(() => {
  const style: Record<string, string> = {}
  if (gutter.value > 0) {
    style.marginRight = `-${gutter.value}px`
    style.marginBottom = `-${gutter.value}px`
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
</script>

<style lang="scss">
.mx-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &--border {
    border-top: 1px solid var(--mx-border-color);
    border-left: 1px solid var(--mx-border-color);
  }
}
</style>