<template>
  <view
    class="mx-badge"
    :class="[
      { 'mx-badge--dot': dot, 'mx-badge--fixed': fixed, 'mx-badge--alone': !hasSlot },
      customClass,
    ]"
    :style="customStyle"
  >
    <slot />
    <text
      v-if="showBadge"
      class="mx-badge__content"
      :class="[{ 'mx-badge__content--max': max < contentNumber }, `mx-badge__content--${color}`]"
      :style="contentStyle"
    >
      {{ badgeContent }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'

const props = defineProps({
  /** 徽标内容 */
  content: makeNumericProp<number | string | undefined>(undefined),
  /** 最大值 (超限显示 max+) */
  max: makeNumericProp<number | string>(99),
  /** 是否为圆点 */
  dot: makeBooleanProp(false),
  /** 颜色 */
  color: makeStringProp('danger'),
  /** 自定义背景色 */
  bgColor: makeStringProp(''),
  /** 是否绝对定位 (需父级 relative) */
  fixed: makeBooleanProp(false),
  /** 徽标偏移值 */
  offset: { type: Array as unknown as () => [number, number], default: () => [0, 0] },
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const hasSlot = computed(() => true)

const contentNumber = computed(() => Number(props.content) || 0)
const showBadge = computed(() => props.dot || (props.content !== undefined && props.content !== ''))

const badgeContent = computed(() => {
  if (props.dot) return ''
  if (
    typeof props.content === 'number' &&
    props.max !== undefined &&
    props.content > Number(props.max)
  ) {
    return `${props.max}+`
  }
  return String(props.content)
})

const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.bgColor) style.backgroundColor = props.bgColor
  const [x, y] = props.offset
  if (x) style.right = `${-x}px`
  if (y) style.top = `${y}px`
  return style
})
</script>

<style lang="scss">
.mx-badge {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;

  &--fixed {
    position: absolute;
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    min-width: 16px;
    min-height: 16px;
    padding: 0 4px;
    color: #fff;
    font-weight: var(--mx-font-weight-bold);
    font-size: 11px;
    line-height: 16px;
    text-align: center;
    background: var(--mx-danger-color);
    border: 1px solid #fff;
    border-radius: 999px;
    transform: translate(50%, -50%);
    transform-origin: 100%;

    &--primary {
      background: var(--mx-primary-color);
    }
    &--success {
      background: var(--mx-success-color);
    }
    &--warning {
      background: var(--mx-warning-color);
    }
    &--danger {
      background: var(--mx-danger-color);
    }
  }
}
</style>
