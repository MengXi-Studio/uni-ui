<template>
  <view class="mx-dropdown-menu" :class="customClass" :style="rootStyle">
    <!-- 顶部横向触发项 -->
    <view class="mx-dropdown-menu__bar">
      <slot />
    </view>

    <!-- 遮罩 -->
    <mx-overlay
      v-if="overlay && activeIndex >= 0"
      class="mx-dropdown-menu__overlay"
      :show="true"
      :z-index="zIndex"
      :duration="durationNumber"
      :custom-style="overlayStyle"
      @click="onClickOverlay"
    />

    <!-- 弹出选项面板 -->
    <view
      v-if="activeIndex >= 0"
      class="mx-dropdown-menu__panel"
      :class="[
        activeItem && activeItem.direction ? `mx-dropdown-menu__panel--${activeItem.direction}` : '',
        'mx-dropdown-menu__panel--enter',
      ]"
      :style="panelStyle"
    >
      <template v-if="activeItem">
        <view
          v-for="(option, oi) in (activeItem.options || [])"
          :key="oi"
          class="mx-dropdown-menu__option"
          :class="{ 'mx-dropdown-menu__option--active': activeItem.value === option.value, 'mx-dropdown-menu__option--disabled': option.disabled }"
          @click="activeItem.value !== option.value && !option.disabled ? onSelect(activeItem, option) : null"
        >
          <text class="mx-dropdown-menu__option-text">{{ option.text }}</text>
          <text v-if="activeItem.value === option.value" class="mx-dropdown-menu__option-check">✓</text>
        </view>
        <view v-if="!(activeItem.options || []).length" class="mx-dropdown-menu__empty">
          <text class="mx-dropdown-menu__empty-text">暂无选项</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import type { Ref } from 'vue'

export type DropdownDirection = 'down' | 'up'
export interface DropdownOption {
  text: string
  value: number | string
  disabled?: boolean
}
export interface DropdownItemMeta {
  index: number
  title: string
  options: DropdownOption[]
  disabled: boolean
  value: number | string
  direction: "down" | "up"
  setValue: (value: number | string) => void
}

/** provide/inject 上下文令牌 */
export const DROPDOWN_KEY = '__mx_dropdown_context__'

export interface DropdownContext {
  activeIndex: Ref<number>
  activeColor: () => string
  direction: () => DropdownDirection
  zIndex: () => number
  duration: () => number
  register: (meta: DropdownItemMeta) => number
  unregister: (index: number) => void
  setActive: (index: number) => void
}
</script>

<script setup lang="ts">
import { computed, onUnmounted, provide, ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import MxOverlay from '../mx-overlay/mx-overlay.vue'

const props = withDefaults(
  defineProps({
    /** 高亮颜色 */
    activeColor: makeStringProp('#1989fa'),
    /** 展开方向: down 向下 / up 向上 */
    direction: makeStringProp<DropdownDirection>('down'),
    /** z-index */
    zIndex: makeNumericProp<number | string>(10),
    /** 过渡时长 (ms) */
    duration: makeNumericProp<number | string>(200),
    /** 是否显示遮罩 */
    overlay: makeBooleanProp(true),
    /** 点击遮罩是否关闭 */
    closeOnClickOverlay: makeBooleanProp(true),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    activeColor: '#1989fa',
    direction: 'down',
    zIndex: 10,
    duration: 200,
    overlay: true,
    closeOnClickOverlay: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'click', index: number): void
  (e: 'close'): void
}>()

const durationNumber = computed(() => Number(props.duration) || 200)

/** 当前展开的下拉项索引, -1 表示全部收起 */
const activeIndex = ref(-1)

/** 注册的下拉项元信息 */
const registry = ref<DropdownItemMeta[]>([])

const activeItem = computed(() => (activeIndex.value >= 0 ? registry.value[activeIndex.value] : null))

const rootStyle = computed(() => {
  const style: Record<string, string> = { zIndex: String(props.zIndex) }
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const overlayStyle = computed(() => ({ zIndex: String(props.zIndex) }))

const panelStyle = computed(() => ({ zIndex: String(props.zIndex) }))

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

const setActive = (index: number) => {
  if (activeIndex.value === index) {
    // 已打开则收起
    activeIndex.value = -1
    emit('update:modelValue', -1)
    emit('close')
    return
  }
  activeIndex.value = index
  emit('update:modelValue', index)
  emit('click', index)
}

const onClickOverlay = () => {
  if (props.closeOnClickOverlay) {
    activeIndex.value = -1
    emit('update:modelValue', -1)
    emit('close')
  }
}

const onSelect = (item: DropdownItemMeta, option: DropdownOption) => {
  item.setValue(option.value)
  activeIndex.value = -1
  emit('update:modelValue', -1)
  emit('close')
}

const register = (meta: DropdownItemMeta): number => {
  const index = registry.value.length
  meta.index = index
  registry.value.push(meta)
  return index
}

const unregister = (index: number) => {
  registry.value.splice(index, 1)
  // 重排剩余项索引
  registry.value.forEach((item, i) => (item.index = i))
  if (activeIndex.value >= registry.value.length) {
    activeIndex.value = -1
  }
}

provide<DropdownContext>(DROPDOWN_KEY, {
  activeIndex,
  activeColor: () => props.activeColor,
  direction: () => props.direction,
  zIndex: () => Number(props.zIndex),
  duration: () => durationNumber.value,
  register,
  unregister,
  setActive,
})

onUnmounted(() => {
  registry.value = []
})

defineExpose({ activeIndex })
</script>

<style lang="scss">
.mx-dropdown-menu {
  position: relative;
  user-select: none;

  &__bar {
    display: flex;
    align-items: center;
  }

  &__overlay {
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__panel {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
    background: var(--mx-background-2);
    box-shadow: 0 6px 12px var(--mx-active-color);
    animation: mx-dropdown-slide var(--mx-duration-base) var(--mx-ease-in-out) both;

    &--down {
      top: 100%;
      border-radius: 0 0 var(--mx-radius-md) var(--mx-radius-md);
      transform-origin: top center;
    }
    &--up {
      bottom: 100%;
      border-radius: var(--mx-radius-md) var(--mx-radius-md) 0 0;
      transform-origin: bottom center;
    }

    &--enter {
      animation: mx-dropdown-fade var(--mx-duration-base) var(--mx-ease-in-out) both;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--mx-padding-md);
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
    line-height: 48px;
    background: var(--mx-background-2);

    &:active {
      background-color: var(--mx-active-color);
    }

    &--active {
      font-weight: var(--mx-font-weight-bold);
    }

    &--disabled {
      color: var(--mx-text-color-3);
    }
  }

  &__option-check {
    color: var(--mx-primary-color);
    font-size: 16px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    color: var(--mx-text-color-3);
    font-size: var(--mx-font-size-md);
    background: var(--mx-background-2);
  }
}

@keyframes mx-dropdown-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>