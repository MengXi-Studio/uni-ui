<template>
  <text
    class="mx-tag"
    :class="[
      `mx-tag--${type}`,
      `mx-tag--${size}`,
      `mx-tag--${mark ? 'mark' : 'plain'}`,
      { 'mx-tag--round': round, 'mx-tag--closeable': closeable, 'mx-tag--plain-border': plain },
      customClass,
    ]"
    :style="tagStyle"
  >
    <slot />
    <text v-if="closeable" class="mx-tag__close" @click.stop="onClose">×</text>
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'

type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type TagSize = 'large' | 'medium' | 'mini'

const props = defineProps({
  /** 类型 */
  type: makeStringProp<TagType>('default'),
  /** 尺寸 */
  size: makeStringProp<TagSize>('medium'),
  /** 自定义颜色 */
  color: makeStringProp(''),
  /** 自定义文字颜色 */
  textColor: makeStringProp(''),
  /** 是否圆角 */
  round: makeBooleanProp(false),
  /** 是否标记样式 */
  mark: makeBooleanProp(false),
  /** 是否为朴素样式 */
  plain: makeBooleanProp(false),
  /** 是否可关闭 */
  closeable: makeBooleanProp(false),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{ (e: 'close'): void }>()

const tagStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    if (props.plain) {
      style.color = props.color
      style.borderColor = props.color
    } else {
      style.color = props.textColor || '#fff'
      style.backgroundColor = props.color
    }
  }
  if (props.textColor && !props.color) style.color = props.textColor
  if (typeof props.customStyle === 'string' && props.customStyle)
    Object.assign(style, parseStyle(props.customStyle))
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

const onClose = () => emit('close')
</script>

<style lang="scss">
.mx-tag {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 4px;
  color: var(--mx-text-color);
  font-size: 12px;
  line-height: 16px;
  border-radius: 2px;

  &--default {
    color: var(--mx-text-color);
    background: var(--mx-active-color);
  }

  &--primary {
    color: var(--mx-primary-color);
    background: rgba(25, 137, 250, 0.1);
  }

  &--success {
    color: var(--mx-success-color);
    background: rgba(7, 193, 96, 0.1);
  }

  &--warning {
    color: var(--mx-warning-color);
    background: rgba(255, 151, 106, 0.1);
  }

  &--danger {
    color: var(--mx-danger-color);
    background: rgba(238, 10, 36, 0.1);
  }

  &--large {
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
  }

  &--medium {
    padding: 2px 6px;
  }

  &--mini {
    padding: 0 4px;
    font-size: 10px;
  }

  &--plain {
    background: transparent;
    &.mx-tag--default {
      background: transparent;
      border: 1px solid var(--mx-border-color);
    }
    &.mx-tag--primary {
      border: 1px solid var(--mx-primary-color);
    }
    &.mx-tag--success {
      border: 1px solid var(--mx-success-color);
    }
    &.mx-tag--warning {
      border: 1px solid var(--mx-warning-color);
    }
    &.mx-tag--danger {
      border: 1px solid var(--mx-danger-color);
    }
  }

  &--round {
    border-radius: 999px;
  }

  &--mark {
    border-radius: 0 999px 999px 0;
  }

  &__close {
    margin-left: 2px;
    padding-left: 2px;
    font-size: 14px;
  }
}
</style>
