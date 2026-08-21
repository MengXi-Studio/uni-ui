<template>
  <view
    class="mx-number-keyboard"
    :class="[`mx-number-keyboard--${theme}`, customClass]"
    :style="keyboardStyle"
    @touchmove.stop.prevent
  >
    <!-- 自定义主题头部 -->
    <view v-if="theme === 'custom'" class="mx-number-keyboard__header">
      <text class="mx-number-keyboard__close" @click="onClose">
        {{ closeButtonText || '×' }}
      </text>
      <text class="mx-number-keyboard__title">{{ title }}</text>
      <text class="mx-number-keyboard__header-right" />
    </view>

    <!-- 按键区域 -->
    <view class="mx-number-keyboard__body">
      <!-- 数字 1-9 -->
      <view v-for="row in digitRows" :key="row[0]" class="mx-number-keyboard__row">
        <view
          v-for="(k) in row"
          :key="k"
          class="mx-number-keyboard__key"
          :class="`mx-number-keyboard__key--num`"
          hover-class="mx-number-keyboard__key--active"
          @click="onInput(k)"
        >
          <text class="mx-number-keyboard__key-text">{{ k }}</text>
        </view>
      </view>

      <!-- 最后一行: 附加键 / 0 / 退格 -->
      <view class="mx-number-keyboard__row">
        <view
          class="mx-number-keyboard__key mx-number-keyboard__key--extra"
          :class="!extraKey ? 'mx-number-keyboard__key--empty' : ''"
          hover-class="mx-number-keyboard__key--active"
          @click="extraKey && onInput(extraKey)"
        >
          <text v-if="extraKey" class="mx-number-keyboard__key-text">{{ extraKey }}</text>
        </view>
        <view
          class="mx-number-keyboard__key mx-number-keyboard__key--0"
          hover-class="mx-number-keyboard__key--active"
          @click="onInput('0')"
        >
          <text class="mx-number-keyboard__key-text">0</text>
        </view>
        <view
          class="mx-number-keyboard__key mx-number-keyboard__key--delete"
          hover-class="mx-number-keyboard__key--active"
          @click="onDelete"
        >
          <text class="mx-number-keyboard__key-delete-text">{{ deleteButtonText || '⌫' }}</text>
        </view>
      </view>
    </view>

    <!-- 默认主题关闭按钮 -->
    <view v-if="theme === 'default'" class="mx-number-keyboard__sidebar">
      <view
        class="mx-number-keyboard__sidebar-close"
        hover-class="mx-number-keyboard__key--active"
        @click="onClose"
      >
        <text>{{ closeButtonText || '完成' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'

type KeyboardTheme = 'default' | 'custom'

const props = withDefaults(
  defineProps({
    /** 数字键盘标题 */
    title: makeStringProp(''),
    /** 是否显示 (v-model:show) */
    show: makeBooleanProp(false),
    /** 附加键, 如 '.', 显示在底部左侧 */
    extraKey: makeStringProp(''),
    /** 关闭按钮文字 */
    closeButtonText: makeStringProp(''),
    /** 退格按钮文字 */
    deleteButtonText: makeStringProp(''),
    /** 键盘主题: default / custom */
    theme: makeStringProp<KeyboardTheme>('default'),
    /** 是否打乱顺序 */
    randomKeyOrder: makeBooleanProp(false),
    /** z-index */
    zIndex: makeNumericProp<number | string>(1000),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    title: '',
    theme: 'default',
    deleteButtonText: '',
    zIndex: 1000,
  }
)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'input', value: string): void
  (e: 'delete'): void
  (e: 'close'): void
}>()

const keyboardStyle = computed(() => {
  const style: Record<string, string> = { zIndex: String(props.zIndex) }
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

/** 数字 1-9 排列 */
const baseRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

const digitRows = computed(() => {
  const flat = baseRows.flat()
  const digits = props.randomKeyOrder ? shuffle(flat) : flat
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)]
})

function shuffle(list: string[]): string[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

const onInput = (key: string) => {
  emit('input', key)
}

const onDelete = () => {
  emit('delete')
}

const onClose = () => {
  emit('close')
  emit('update:show', false)
}
</script>

<style lang="scss">
.mx-number-keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--mx-background-2);

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    padding: 0 16px;
  }

  &__close {
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-sm);
  }

  &__title {
    max-width: 60%;
    overflow: hidden;
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__header-right {
    min-width: 48px;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
  }

  &__key {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    background: var(--mx-background-2);

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      transform: scaleX(0.5);
      transform-origin: center;
      border-left: 1px solid var(--mx-border-color);
    }

    &::before {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      transform-origin: center;
      border-top: 1px solid var(--mx-border-color);
    }

    &--active {
      background: var(--mx-active-color);
    }

    &--empty {
      background: transparent;

      &::after,
      &::before {
        display: none;
      }
    }

    &--extra {
      background: var(--mx-background);
    }

    &--delete {
      background: var(--mx-background);
    }
  }

  &__key-text {
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-lg);
  }

  &__key-delete-text {
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
  }

  &__sidebar {
    display: flex;
    justify-content: flex-end;
    background: var(--mx-background-2);
  }

  &__sidebar-close {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 48px;
    color: var(--mx-primary-color);
    font-size: var(--mx-font-size-md);
    background: var(--mx-background);

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      transform: scaleX(0.5);
      transform-origin: center;
      border-left: 1px solid var(--mx-border-color);
    }
  }
}
</style>