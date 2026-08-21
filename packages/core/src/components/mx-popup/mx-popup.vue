<template>
  <mx-overlay
    v-if="overlay"
    :show="overlayShow"
    :duration="Number(duration) || 300"
    :z-index="zIndex"
    :custom-style="overlayStyle"
    :custom-class="overlayClass"
    @click="onClickOverlay"
  />

  <view
    v-if="transition.render"
    class="mx-popup"
    :class="[
      `mx-popup--${position}`,
      transition.transitionClass,
      {
        'mx-popup--round': round,
        'mx-popup--safe-bottom': safeAreaInsetBottom,
        'mx-popup--safe-top': safeAreaInsetTop,
      },
      customClass,
    ]"
    :style="popupStyle"
  >
    <slot />

    <!-- 关闭图标 -->
    <text
      v-if="closeable && position !== 'center'"
      class="mx-popup__close-icon"
      :class="[`mx-popup__close-icon--${closeIconPosition}`]"
      @click.stop="onClickCloseIcon"
    >
      ×
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'
import { useTransition } from '../../composables/use-transition'
import MxOverlay from '../mx-overlay/mx-overlay.vue'

type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

const props = defineProps({
  /** 是否显示 */
  show: makeBooleanProp(false),
  /** 弹出位置 */
  position: makeStringProp<PopupPosition>('center'),
  /** z-index */
  zIndex: makeNumericProp<number | string>(1000),
  /** 过渡时长 (ms) */
  duration: makeNumericProp<number | string>(300),
  /** 是否显示遮罩 */
  overlay: makeBooleanProp(true),
  /** 遮罩自定义类名 */
  overlayClass: makeStringProp(''),
  /** 遮罩自定义样式 */
  overlayStyle: { type: [String, Object] as any, default: '' },
  /** 是否圆角 */
  round: makeBooleanProp(false),
  /** 是否显示关闭图标 */
  closeable: makeBooleanProp(false),
  /** 关闭图标位置: top-left / top-right / bottom-left / bottom-right */
  closeIconPosition: makeStringProp<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>(
    'top-right'
  ),
  /** 点击遮罩是否关闭 */
  closeOnClickOverlay: makeBooleanProp(true),
  /** 底部安全区 */
  safeAreaInsetBottom: makeBooleanProp(false),
  /** 顶部安全区 */
  safeAreaInsetTop: makeBooleanProp(false),
  /** 关闭前钩子, 返回 false 阻止关闭; 支持 async */
  beforeClose: { type: Function as any, default: null },
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'click-overlay'): void
  (e: 'click-close-icon'): void
}>()

const transition = useTransition(
  computed(() => props.show),
  Number(props.duration) || 300
)

/** 遮罩独立显示状态 (与内容同步, 由当前显隐决定) */
const overlayShow = computed(() => props.show || transition.leaving.value)

const popupStyle = computed(() => {
  const style: Record<string, string> = { zIndex: String(props.zIndex) }
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

const close = (trigger?: 'overlay' | 'icon') => {
  const callClose = () => {
    emit('close')
    emit('update:show', false)
  }
  if (typeof props.beforeClose === 'function') {
    props.beforeClose(trigger).then((result: unknown) => {
      if (result !== false) callClose()
    })
  } else {
    callClose()
  }
}

const onClickOverlay = () => {
  emit('click-overlay')
  if (props.closeOnClickOverlay) close('overlay')
}

const onClickCloseIcon = () => {
  emit('click-close-icon')
  close('icon')
}
</script>

<style lang="scss">
.mx-popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background: var(--mx-background-2);
  transition-timing-function: var(--mx-ease-in-out);

  &--center {
    top: 50%;
    left: 50%;
    min-width: 288px;
    max-width: 75%;
    border-radius: var(--mx-radius-lg);
    transform: translate3d(-50%, -50%, 0);

    &.mx--enter {
      animation: mx-zoom-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-zoom-out var(--mx-duration-base) both;
    }
  }

  &--top {
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 0 0 var(--mx-radius-lg) var(--mx-radius-lg);

    &.mx--enter {
      animation: mx-slide-down-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-slide-down-out var(--mx-duration-base) both;
    }
  }

  &--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: var(--mx-radius-lg) var(--mx-radius-lg) 0 0;

    &.mx--enter {
      animation: mx-slide-up-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-slide-up-out var(--mx-duration-base) both;
    }
  }

  &--left {
    top: 0;
    left: 0;
    width: calc(100% - 100px);
    height: 100%;
    border-radius: 0 var(--mx-radius-lg) var(--mx-radius-lg) 0;

    &.mx--enter {
      animation: mx-slide-left-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-slide-left-out var(--mx-duration-base) both;
    }
  }

  &--right {
    top: 0;
    right: 0;
    width: calc(100% - 100px);
    height: 100%;
    border-radius: var(--mx-radius-lg) 0 0 var(--mx-radius-lg);

    &.mx--enter {
      animation: mx-slide-right-in var(--mx-duration-base) both;
    }
    &.mx--leave {
      animation: mx-slide-right-out var(--mx-duration-base) both;
    }
  }

  &--round {
    border-radius: var(--mx-radius-lg);
  }

  &--safe-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &--safe-top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }

  &__close-icon {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    color: var(--mx-text-color-2);
    font-size: 18px;
    line-height: 1;

    &--top-left {
      top: 16px;
      left: 16px;
    }
    &--top-right {
      top: 16px;
      right: 16px;
    }
    &--bottom-left {
      bottom: 16px;
      left: 16px;
    }
    &--bottom-right {
      bottom: 16px;
      right: 16px;
    }
  }
}
</style>
