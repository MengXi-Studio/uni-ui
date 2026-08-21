<template>
  <view
    v-if="transition.render"
    class="mx-notify"
    :class="[`mx-notify--${type}`, 'mx--fade', transition.transitionClass, customClass]"
    :style="notifyStyle"
    @click="onClick"
  >
    <!-- 加载类型 -->
    <mx-loading v-if="type === 'loading'" :size="16" :color="textColor" />
    <!-- 文案 -->
    <text v-if="message" class="mx-notify__text" :style="textStyle">{{ message }}</text>
    <!-- 扩展 -->
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { useTransition } from '../../composables/use-transition'
import MxLoading from '../mx-loading/mx-loading.vue'

type NotifyType = 'success' | 'warning' | 'danger' | 'primary' | 'loading' | 'custom'

const props = defineProps({
  /** 是否显示 */
  show: makeBooleanProp(false),
  /** 通知文案 */
  message: makeStringProp(''),
  /** 类型 */
  type: makeStringProp<NotifyType>('primary'),
  /** 自定义文字颜色 */
  color: makeStringProp(''),
  /** 自定义背景色 */
  background: makeStringProp(''),
  /** 展示时长 (ms), 0 表示不自动关闭 */
  duration: makeNumericProp<number>(3000),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
  (e: 'click'): void
}>()

/** 内部展示状态 (支持 v-model 与 instance 方法) */
const showState = ref(props.show)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const transition = useTransition(
  computed(() => showState.value),
  200
)

const TYPE_BG: Record<string, string> = {
  primary: 'var(--mx-primary-color)',
  success: 'var(--mx-success-color)',
  warning: 'var(--mx-warning-color)',
  danger: 'var(--mx-danger-color)',
  custom: '',
}

const textColor = computed(() => {
  if (props.color) return props.color
  return props.type === 'custom' ? 'var(--mx-text-color)' : '#fff'
})

const notifyStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.background) style.background = props.background
  else if (TYPE_BG[props.type]) style.background = TYPE_BG[props.type]
  if (props.type === 'custom' && !props.background) style.background = 'var(--mx-background-2)'
  if (typeof props.customStyle === 'string' && props.customStyle)
    Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const textStyle = computed(() => {
  const style: Record<string, string> = { color: textColor.value }
  if (props.type === 'loading') style.marginLeft = '4px'
  return style
})

/** 实例: 打开 */
const showNotify = () => {
  showState.value = true
  emit('update:show', true)
}

/** 实例: 关闭 */
const close = () => {
  showState.value = false
  emit('close')
  emit('update:show', false)
}

/** 供外部以 v-model 控制时同步 prop -> 内部状态 */
watch(
  () => props.show,
  (val) => {
    showState.value = val
  }
)

// 展示后自动关闭
watch(
  () => showState.value,
  (val) => {
    if (closeTimer) clearTimeout(closeTimer)
    closeTimer = null
    if (val && Number(props.duration) > 0) {
      closeTimer = setTimeout(() => close(), Number(props.duration))
    }
  }
)

const onClick = () => emit('click')

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

onBeforeUnmount(() => {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = null
})

defineExpose({ show: showNotify, close })
</script>

<style lang="scss">
.mx-notify {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--mx-padding-xs) var(--mx-padding-md);
  box-sizing: border-box;
  font-size: var(--mx-font-size-sm);
  line-height: var(--mx-line-height-md);

  &__text {
    text-align: center;
  }

  &--primary {
    color: #fff;
  }
  &--success {
    color: #fff;
  }
  &--warning {
    color: #fff;
  }
  &--danger {
    color: #fff;
  }
  &--loading {
    color: #fff;
  }
  &--custom {
    color: var(--mx-text-color);
  }
}
</style>
