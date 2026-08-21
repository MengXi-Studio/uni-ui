<template>
  <button
    class="mx-button"
    :class="[
      `mx-button--${type}`,
      `mx-button--${size}`,
      {
        'mx-button--block': block,
        'mx-button--round': round,
        'mx-button--square': square,
        'mx-button--plain': plain,
        'mx-button--disabled': disabled,
        'mx-button--loading': loading,
        'mx-button--icon-left': iconPosition === 'left',
        'mx-button--icon-right': iconPosition === 'right',
      },
      customClass,
    ]"
    :style="buttonStyle"
    :disabled="disabled || loading"
    :form-type="formType"
    :open-type="openType"
    :hover-class="'mx-button__hover'"
    :hover-start-time="20"
    :hover-stay-time="70"
    @click="onClick"
  >
    <!-- 加载中 -->
    <mx-loading
      v-if="loading"
      :type="loadingType"
      :size="loadingSize"
      :color="loadingColor"
      :customClass="'mx-button__icon'"
    >
    </mx-loading>

    <!-- 图标 -->
    <view v-else-if="showIcon" class="mx-button__icon">
      <mx-icon v-if="isImageIcon" :image="icon" :size="iconSize" />
      <mx-icon v-else :name="icon" :size="iconSize" />
    </view>

    <!-- 文案 -->
    <text v-if="loadingText && loading" class="mx-button__text mx-button__loading-text">{{ loadingText }}</text>
    <text v-else class="mx-button__text"><slot /></text>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'
import MxLoading from '../mx-loading/mx-loading.vue'
import MxIcon from '../mx-icon/mx-icon.vue'

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'large' | 'normal' | 'small' | 'mini'
type IconPosition = 'left' | 'right'
type LoadingType = 'circular' | 'spinner'

const props = withDefaults(
  defineProps({
    /** 类型 */
    type: makeStringProp<ButtonType>('default'),
    /** 尺寸 */
    size: makeStringProp<ButtonSize>('normal'),
    /** 自定义主题色 */
    color: makeStringProp(''),
    /** 图标名或图标 url */
    icon: makeStringProp(''),
    /** 图标位置 */
    iconPosition: makeStringProp<IconPosition>('left'),
    /** 图标尺寸 */
    iconSize: makeStringProp(''),
    /** 是否加载中 */
    loading: makeBooleanProp(false),
    /** 加载文案 */
    loadingText: makeStringProp(''),
    /** 加载类型 */
    loadingType: makeStringProp<LoadingType>('circular'),
    /** 加载图标尺寸 */
    loadingSize: makeNumericProp<number | string>('20px'),
    /** 加载图标颜色 */
    loadingColor: makeStringProp('#fff'),
    /** 是否为朴素按钮 */
    plain: makeBooleanProp(false),
    /** 是否为圆形 */
    round: makeBooleanProp(false),
    /** 是否为方形 */
    square: makeBooleanProp(false),
    /** 是否为块级按钮 */
    block: makeBooleanProp(false),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** form-type: submit / reset */
    formType: makeStringProp(''),
    /** open-type: 原生能力扩展 */
    openType: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    type: 'default',
    size: 'normal',
    iconPosition: 'left',
    loadingType: 'circular',
    loadingSize: '20px',
    loadingColor: '#fff',
  }
)

const emit = defineEmits<{
  (e: 'click', event: Event): void
  (e: 'touchstart', event: Event): void
  (e: 'touchmove', event: Event): void
  (e: 'touchend', event: Event): void
  (e: 'touchcancel', event: Event): void
}>()

const isImageIcon = computed(() => /^(\/|http)/.test(props.icon))

const showIcon = computed(() => props.icon && !props.loading)

/** 自定义颜色 */
const buttonStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.color) {
    style.color = props.plain ? props.color : '#fff'
    style.background = props.plain ? 'transparent' : props.color
    if (!props.plain) {
      style.borderColor = props.color
    }
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

const onClick = (event: Event) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style lang="scss">
.mx-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  margin: 0;
  border: 1px solid var(--mx-border-color);
  border-radius: var(--mx-radius-md);
  font-size: 14px;
  line-height: 1.2;
  outline: none;
  transition: opacity 0.15s;
  -webkit-appearance: none;

  &::after {
    border: none;
  }

  &__hover {
    opacity: 0.8;
  }

  &__icon {
    display: inline-flex;
    font-size: 1.2em;
  }

  &__icon + &__text,
  &__text + &__icon {
    margin-left: 4px;
  }

  &__text {
    display: inline-flex;
    align-items: center;
  }

  &--large {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    font-size: 16px;
  }

  &--normal {
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  }

  &--small {
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
  }

  &--mini {
    height: 24px;
    padding: 0 8px;
    font-size: 10px;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--round {
    border-radius: var(--mx-radius-max);
  }

  &--square {
    border-radius: 0;
  }

  &--default {
    color: var(--mx-text-color);
    background: var(--mx-background-2);

    &.mx-button--plain {
      background: transparent;
    }
  }

  &--primary {
    color: #fff;
    background: var(--mx-primary-color);
    border-color: var(--mx-primary-color);

    &.mx-button--plain {
      color: var(--mx-primary-color);
      background: transparent;
    }
  }

  &--success {
    color: #fff;
    background: var(--mx-success-color);
    border-color: var(--mx-success-color);

    &.mx-button--plain {
      color: var(--mx-success-color);
      background: transparent;
    }
  }

  &--warning {
    color: #fff;
    background: var(--mx-warning-color);
    border-color: var(--mx-warning-color);

    &.mx-button--plain {
      color: var(--mx-warning-color);
      background: transparent;
    }
  }

  &--danger {
    color: #fff;
    background: var(--mx-danger-color);
    border-color: var(--mx-danger-color);

    &.mx-button--plain {
      color: var(--mx-danger-color);
      background: transparent;
    }
  }

  &--disabled {
    opacity: var(--mx-disabled-opacity);
    cursor: not-allowed;
  }

  &--loading {
    opacity: 0.9;
  }

  /* 朴素按钮修改边框颜色以匹配文案颜色 */
  &.mx-button--plain.mx-button--primary {
    border-color: currentColor;
  }
  &.mx-button--plain.mx-button--success {
    border-color: currentColor;
  }
  &.mx-button--plain.mx-button--warning {
    border-color: currentColor;
  }
  &.mx-button--plain.mx-button--danger {
    border-color: currentColor;
  }
}
</style>