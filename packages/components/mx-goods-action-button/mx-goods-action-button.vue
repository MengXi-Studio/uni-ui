<template>
  <view
    class="mx-goods-action-button"
    :class="[
      `mx-goods-action-button--${type}`,
      { 'mx-goods-action-button--disabled': disabled || loading },
      customClass,
    ]"
    :style="buttonStyle"
    :hover-class="!disabled && !loading ? 'mx-goods-action-button--hover' : ''"
    @click="onClick"
  >
    <view v-if="loading" class="mx-goods-action-button__loading">
      <mx-loading size="18px" color="#fff" />
    </view>
    <template v-else>
      <mx-icon v-if="icon" :name="icon" :color="buttonIconColor" class="mx-goods-action-button__icon" />
      <text class="mx-goods-action-button__text"><slot>{{ text }}</slot></text>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../../shared/props'
import MxIcon from '../mx-icon/mx-icon.vue'
import MxLoading from '../mx-loading/mx-loading.vue'

type GoodsActionButtonType = 'default' | 'primary' | 'danger' | 'success' | 'warning'

const props = withDefaults(
  defineProps({
    /** 按钮文字 */
    text: makeStringProp(''),
    /** 按钮类型 */
    type: makeStringProp<GoodsActionButtonType>('default'),
    /** 自定义主题色 */
    color: makeStringProp(''),
    /** 图标名称 */
    icon: makeStringProp(''),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 是否加载中 */
    loading: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    type: 'default',
  }
)

const emit = defineEmits<{ (e: 'click', event: Event): void }>()

/** 自定义颜色时使用, 否则使用主题按钮色下的白色文字 */
const buttonIconColor = computed(() => (props.type === 'default' && !props.color ? 'var(--mx-text-color)' : '#fff'))

const buttonStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.color = '#fff'
    style.background = props.color
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

const onClick = (event: Event) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style lang="scss">
.mx-goods-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex: 1;
  height: 40px;
  margin: 0 5px;
  color: #fff;
  font-size: 14px;
  border-radius: var(--mx-radius-max);
  cursor: pointer;
  transition: opacity var(--mx-duration-fast);

  &--hover {
    opacity: var(--mx-active-opacity);
  }

  &--default {
    background: var(--mx-blue-color);
  }
  &--primary {
    background: var(--mx-primary-color);
  }
  &--danger {
    background: var(--mx-danger-color);
  }
  &--success {
    background: var(--mx-success-color);
  }
  &--warning {
    background: var(--mx-warning-color);
  }

  &--disabled {
    opacity: var(--mx-disabled-opacity);
    cursor: not-allowed;
  }

  &__icon {
    margin-right: 4px;
    font-size: 16px;
  }

  &__text {
    white-space: nowrap;
  }
}
</style>