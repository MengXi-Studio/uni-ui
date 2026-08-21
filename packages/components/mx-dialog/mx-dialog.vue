<template>
  <mx-popup
    :show="showState"
    :position="'center'"
    :round="true"
    :close-on-click-overlay="closeOnClickOverlay"
    :before-close="beforeClose"
    :custom-class="customClass"
    :custom-style="customStyle"
    @update:show="onSyncShow"
    @close="onPopupClose"
    @click-overlay="emit('click-overlay')"
  >
    <view class="mx-dialog">
      <!-- 关闭图标 -->
      <text
        v-if="showCloseIcon"
        class="mx-dialog__close-icon"
        @click.stop="onClose"
      >×</text>

      <!-- 标题 -->
      <view v-if="title" class="mx-dialog__header">
        <text class="mx-dialog__title">{{ title }}</text>
      </view>

      <!-- 内容: 默认插槽优先, 回退到 content/message -->
      <view v-if="$slots.default" class="mx-dialog__body">
        <slot />
      </view>
      <view v-else-if="content || message" class="mx-dialog__content" :class="{ 'mx-dialog__content--isolated': !title && !showConfirmButton && !showCancelButton }">
        <text class="mx-dialog__text">{{ content || message }}</text>
      </view>

      <!-- 操作按钮 -->
      <view v-if="showConfirmButton || showCancelButton" class="mx-dialog__footer">
        <view
          v-if="showCancelButton"
          class="mx-dialog__button"
          hover-class="mx-dialog__button--active"
          @click="onCancel"
        >
          <text class="mx-dialog__button-text">{{ cancelButtonText }}</text>
        </view>
        <view
          v-if="showConfirmButton"
          class="mx-dialog__button"
          hover-class="mx-dialog__button--active"
          @click="onConfirm"
        >
          <text class="mx-dialog__button-text mx-dialog__button-text--confirm" :style="confirmTextStyle">{{ confirmButtonText }}</text>
        </view>
      </view>
    </view>
  </mx-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import { useTransition } from '../../../composables/use-transition'
import MxPopup from '../mx-popup/mx-popup.vue'

const props = withDefaults(
  defineProps({
    /** 是否显示 */
    show: makeBooleanProp(false),
    /** 标题 */
    title: makeStringProp(''),
    /** 内容文案 */
    content: makeStringProp(''),
    /** 内容文案 (别名) */
    message: makeStringProp(''),
    /** 是否显示确认按钮 */
    showConfirmButton: makeBooleanProp(true),
    /** 是否显示取消按钮 */
    showCancelButton: makeBooleanProp(false),
    /** 确认按钮文案 */
    confirmButtonText: makeStringProp('确认'),
    /** 取消按钮文案 */
    cancelButtonText: makeStringProp('取消'),
    /** 确认按钮颜色 */
    confirmButtonColor: makeStringProp(''),
    /** 是否显示关闭图标 */
    showCloseIcon: makeBooleanProp(false),
    /** 点击遮罩是否关闭 */
    closeOnClickOverlay: makeBooleanProp(false),
    /** 关闭/操作前钩子, 返回 false 阻止 */
    beforeClose: { type: Function as any, default: null },
    /** 过渡时长 */
    duration: makeNumericProp<number | string>(300),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    showConfirmButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }
)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'closed'): void
  (e: 'click-overlay'): void
}>()

const showState = ref(props.show)
const transition = useTransition(computed(() => showState.value), Number(props.duration) || 300)

const confirmTextStyle = computed(() => (props.confirmButtonColor ? { color: props.confirmButtonColor } : {}))

const onSyncShow = (val: boolean) => {
  showState.value = val
  emit('update:show', val)
}

/** popup 关闭 (遮罩/图标) 时转发 close 事件 */
const onPopupClose = () => emit('close')

/** 关闭 (通过关闭图标) */
const onClose = () => {
  runBeforeClose('close', () => {
    emit('close')
    doClose()
  }, () => {})
}

const onConfirm = () => {
  runBeforeClose('confirm', () => {
    emit('confirm')
    doClose()
  })
}

const onCancel = () => {
  runBeforeClose('cancel', () => {
    emit('cancel')
    doClose()
  })
}

const doClose = () => {
  showState.value = false
  emit('update:show', false)
}

const runBeforeClose = (action: string, done: () => void, fail = () => {}) => {
  if (typeof props.beforeClose === 'function') {
    props.beforeClose(action).then((result: unknown) => {
      if (result === false) fail()
      else done()
    })
  } else done()
}

// open / closed 事件
watch(showState, (val) => {
  if (val) emit('open')
})
watch(transition.render, (r) => {
  if (!r) emit('closed')
})

defineExpose({ show: () => { showState.value = true; emit('update:show', true) }, close: doClose })
</script>

<style lang="scss">
.mx-dialog {
  position: relative;
  width: 312px;
  max-width: 100%;
  overflow: hidden;
  font-size: var(--mx-font-size-md);

  &__close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
    color: var(--mx-text-color-3);
    font-size: 20px;
    line-height: 1;
  }

  &__header {
    padding: 26px 24px 0;
  }

  &__title {
    display: block;
    color: var(--mx-text-color);
    font-weight: var(--mx-font-weight-bold);
    font-size: var(--mx-font-size-lg);
    line-height: var(--mx-line-height-md);
    text-align: center;
  }

  &__body {
    padding: var(--mx-padding-md);
  }

  &__content {
    padding: 26px 24px;
    display: flex;
    justify-content: center;

    &--isolated {
      padding-bottom: 26px;
    }
  }

  &__text {
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-sm);
    line-height: var(--mx-line-height-lg);
    text-align: center;
    word-break: break-all;
  }

  &__footer {
    display: flex;
    overflow: hidden;
    border-top: 1px solid var(--mx-border-color);
  }

  &__button {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    box-sizing: border-box;
    cursor: pointer;

    &--active {
      background: var(--mx-active-color);
    }

    & + & {
      border-left: 1px solid var(--mx-border-color);
    }
  }

  &__button-text {
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);

    &--confirm {
      color: var(--mx-primary-color);
    }
  }
}
</style>