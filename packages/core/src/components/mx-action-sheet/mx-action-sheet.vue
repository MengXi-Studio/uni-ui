<template>
  <mx-popup
    :show="showState"
    :position="'bottom'"
    :round="true"
    :safe-area-inset-bottom="true"
    :close-on-click-overlay="closeOnClickOverlay"
    :custom-class="customClass"
    :custom-style="customStyle"
    @update:show="onSyncShow"
    @click-overlay="emit('click-overlay')"
  >
    <view class="mx-action-sheet">
      <!-- 标题 -->
      <view v-if="title || description" class="mx-action-sheet__header">
        <text v-if="title" class="mx-action-sheet__title">{{ title }}</text>
        <text v-if="description" class="mx-action-sheet__description">{{ description }}</text>
      </view>

      <!-- 选项列表 -->
      <view class="mx-action-sheet__list">
        <view
          v-for="(action, index) in actions"
          :key="index"
          class="mx-action-sheet__item"
          :class="{
            'mx-action-sheet__item--disabled': action.disabled,
            'mx-action-sheet__item--loading': action.loading,
          }"
          hover-class="mx-action-sheet__item--active"
          :style="action.color ? { color: action.color } : {}"
          @click="onSelect(action)"
        >
          <text class="mx-action-sheet__name">{{ action.name }}</text>
          <text v-if="action.subname && !action.loading" class="mx-action-sheet__subname">
            {{ action.subname }}
          </text>
          <mx-loading
            v-if="action.loading && action.name"
            :size="16"
            :color="'var(--mx-text-color-3)'"
            custom-class="mx-action-sheet__loading"
          />
          <text v-if="action.loading && !action.name" class="mx-action-sheet__name">
            {{ action.loadingText || '加载中...' }}
          </text>
        </view>
      </view>

      <!-- 取消按钮 -->
      <view
        v-if="cancelText"
        class="mx-action-sheet__cancel"
        hover-class="mx-action-sheet__cancel--active"
        @click="onCancel"
      >
        <text class="mx-action-sheet__cancel-text">{{ cancelText }}</text>
      </view>
    </view>
  </mx-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeArrayProp } from '../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'
import MxLoading from '../mx-loading/mx-loading.vue'

interface SheetAction {
  /** 选项文案 */
  name: string
  /** 描述 */
  subname?: string
  /** 颜色 */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 加载文案 */
  loadingText?: string
  /** 点击回调 */
  callback?: (action: SheetAction) => void
}

const props = defineProps({
  /** 是否显示 */
  show: makeBooleanProp(false),
  /** 菜单选项 */
  actions: makeArrayProp<SheetAction>(),
  /** 标题 */
  title: makeStringProp(''),
  /** 取消按钮文案 */
  cancelText: makeStringProp('取消'),
  /** 描述文案 */
  description: makeStringProp(''),
  /** 是否点击选中后关闭 */
  closeOnClickAction: makeBooleanProp(true),
  /** 是否点击遮罩关闭 */
  closeOnClickOverlay: makeBooleanProp(true),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'select', action: SheetAction): void
  (e: 'cancel'): void
  (e: 'click-overlay'): void
}>()

const showState = ref(props.show)

const onSyncShow = (val: boolean) => {
  showState.value = val
  emit('update:show', val)
}

const close = () => {
  showState.value = false
  emit('update:show', false)
}

const onSelect = (action: SheetAction) => {
  if (action.disabled) return
  emit('select', action)
  if (typeof action.callback === 'function') action.callback(action)
  if (props.closeOnClickAction) close()
}

const onCancel = () => {
  emit('cancel')
  close()
}

defineExpose({
  show: () => {
    showState.value = true
    emit('update:show', true)
  },
  close,
})
</script>

<style lang="scss">
.mx-action-sheet {
  padding: var(--mx-padding-xs) 0;
  user-select: none;

  &__header {
    padding: var(--mx-padding-sm) var(--mx-padding-md);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    color: var(--mx-text-color);
    font-weight: var(--mx-font-weight-bold);
    font-size: var(--mx-font-size-lg);
    line-height: var(--mx-line-height-md);
  }

  &__description {
    margin-top: 8px;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-sm);
    line-height: var(--mx-line-height-md);
  }

  &__list {
    margin-top: var(--mx-padding-xs);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 16px;
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
    line-height: var(--mx-line-height-md);
    text-align: center;

    &--active {
      background: var(--mx-active-color);
    }

    &--disabled {
      color: var(--mx-text-color-3);
      cursor: not-allowed;
    }

    &--loading {
      cursor: progress;
    }
  }

  &__name {
    display: inline-block;
  }

  &__subname {
    margin-left: 8px;
    color: var(--mx-text-color-3);
    font-size: var(--mx-font-size-xs);
  }

  &__loading {
    margin-left: 4px;
  }

  &__cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin-top: var(--mx-padding-xs);
    border-top: 1px solid var(--mx-border-color);

    &--active {
      background: var(--mx-active-color);
    }
  }

  &__cancel-text {
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
    line-height: var(--mx-line-height-md);
  }
}
</style>
