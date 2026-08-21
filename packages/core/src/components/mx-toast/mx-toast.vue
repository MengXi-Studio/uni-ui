<template>
  <!-- forbidClick: 透明遮罩拦截点击 -->
  <view v-if="props.forbidClick && showState" class="mx-toast__forbid" />

  <view
    v-if="transition.render"
    class="mx-toast"
    :class="[`mx-toast--${position}`, midTransition, transition.transitionClass, customClass]"
    :style="toastStyle"
  >
    <!-- loading 类型 -->
    <mx-loading v-if="type === 'loading'" :size="28" :color="'#fff'" />

    <!-- 图标: 内置类型或自定义 icon -->
    <view
      v-else-if="currentIcon"
      class="mx-toast__icon"
      :style="{ width: iconSizeUnit, height: iconSizeUnit }"
    >
      <image
        v-if="isImageIcon"
        class="mx-toast__icon-img"
        :src="currentIcon"
        mode="aspectFit"
        :style="{ width: iconSizeUnit, height: iconSizeUnit }"
      />
      <text v-else class="mx-toast__icon-char" :style="{ fontSize: iconSizeUnit }">
        {{ currentIcon }}
      </text>
    </view>

    <text v-if="message" class="mx-toast__text">{{ message }}</text>
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { useTransition } from '../../composables/use-transition'
import { addUnit } from '../../utils/unit'
import MxLoading from '../mx-loading/mx-loading.vue'

type ToastType = 'success' | 'fail' | 'loading' | 'custom' | 'html'
type ToastPosition = 'top' | 'middle' | 'bottom'

const props = defineProps({
  /** 是否显示 */
  show: makeBooleanProp(false),
  /** 文案 */
  message: makeStringProp(''),
  /** 类型 */
  type: makeStringProp<ToastType>('custom'),
  /** 位置 */
  position: makeStringProp<ToastPosition>('middle'),
  /** 自定义图标 (url 或字符/emoji) */
  icon: makeStringProp(''),
  /** 图标大小 */
  iconSize: makeNumericProp<number | string>('36px'),
  /** 是否禁止穿透点击 */
  forbidClick: makeBooleanProp(false),
  /** 展示时长 (ms), 0 不自动关闭 */
  duration: makeNumericProp<number>(2000),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

const showState = ref(props.show)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const transition = useTransition(
  computed(() => showState.value),
  200
)

/** 内置类型图标 (字符) */
const BUILTIN_ICON: Record<string, string> = {
  success: '✓',
  fail: '✕',
  loading: '',
}

const currentIcon = computed(() => {
  if (props.type === 'loading') return ''
  if (props.icon) return props.icon
  return BUILTIN_ICON[props.type] || ''
})

const isImageIcon = computed(
  () => /^(https?:)?\/\//.test(currentIcon.value) || /^data:image/.test(currentIcon.value)
)

const iconSizeUnit = computed(() => addUnit(props.iconSize) as string)

/** 中间位置使用缩放动画, 其余淡入 */
const midTransition = computed(() => (props.position === 'middle' ? 'mx--zoom' : 'mx--fade'))

const toastStyle = computed(() => {
  const style: Record<string, string> = {}
  if (typeof props.customStyle === 'string' && props.customStyle)
    Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const showToast = () => {
  showState.value = true
  emit('update:show', true)
}

const close = () => {
  showState.value = false
  emit('close')
  emit('update:show', false)
}

watch(
  () => props.show,
  (val) => {
    showState.value = val
  }
)

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

onBeforeUnmount(() => {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = null
})

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

defineExpose({ show: showToast, close })
</script>

<style lang="scss">
@use '../../styles/transition.scss' as *;
.mx-toast {
  position: fixed;
  left: 50%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  max-width: 70%;
  min-height: 96px;
  padding: var(--mx-padding-md);
  box-sizing: border-box;
  color: #fff;
  font-size: var(--mx-font-size-sm);
  line-height: var(--mx-line-height-md);
  text-align: center;
  word-break: break-all;
  background: rgba(0, 0, 0, 0.7);

  &__forbid {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    width: 100%;
    height: 100%;
  }

  &--middle {
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: var(--mx-radius-md);

    &.mx--enter {
      animation: mx-zoom-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-zoom-out var(--mx-duration-base) both;
    }
  }

  &--top {
    top: 10%;
    transform: translate3d(-50%, 0, 0);
    border-radius: var(--mx-radius-md);
  }

  &--bottom {
    bottom: 10%;
    transform: translate3d(-50%, 0, 0);
    border-radius: var(--mx-radius-md);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--mx-padding-xs);
  }

  &__icon-img {
    display: block;
  }

  &__icon-char {
    line-height: 1;
  }

  &__text {
    max-width: 100%;
  }
}
</style>
