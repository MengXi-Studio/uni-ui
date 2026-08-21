<template>
  <view
    class="mx-space"
    :class="[
      direction === 'horizontal' ? 'mx-space--horizontal' : 'mx-space--vertical',
      { 'mx-space--wrap': wrap },
      customClass,
    ]"
    :style="mergeStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

type Align = 'start' | 'center' | 'end' | 'baseline' | 'flex-start' | 'flex-end'
type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'

const props = defineProps({
  /** 间距大小 */
  gap: makeNumericProp<number | string>(8),
  /** 排列方向: horizontal / vertical */
  direction: makeStringProp<'horizontal' | 'vertical'>('horizontal'),
  /** 是否换行 */
  wrap: makeBooleanProp(false),
  /** 对齐方式 */
  align: makeStringProp<Align>('flex-start'),
  /** 主轴对齐方式 */
  justify: makeStringProp<Justify>('flex-start'),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
}

const mergeStyle = computed(() => {
  const base: Record<string, string> = {}
  const gapStr = addUnit(props.gap) || '8px'
  if (props.wrap) base.gap = `${gapStr} ${gapStr}`
  else base.gap = gapStr
  base.alignItems = alignMap[props.align] || 'flex-start'
  base.justifyContent = justifyMap[props.justify] || 'flex-start'
  if (typeof props.customStyle === 'string' && props.customStyle) {
    return { ...base, ...parseStyleString(props.customStyle) }
  }
  return { ...base, ...(props.customStyle as object) }
})

function parseStyleString(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) {
      obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
    }
  })
  return obj
}
</script>

<style lang="scss">
.mx-space {
  display: flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
