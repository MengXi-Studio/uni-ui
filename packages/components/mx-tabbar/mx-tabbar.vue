<template>
  <view>
    <view
      class="mx-tabbar"
      :class="[{ 'mx-tabbar--fixed': fixed, 'mx-tabbar--borderless': !border }, customClass]"
      :style="tabbarStyleMerged"
    >
      <slot />
    </view>
    <view v-if="placeholder && fixed" class="mx-tabbar__placeholder" :style="placeholderStyle" />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../../shared/props'

const props = withDefaults(
  defineProps({
    /** 当前选中项的名称 (v-model) */
    modelValue: makeNumericProp<string | number>(''),
    /** 是否固定在底部 */
    fixed: makeBooleanProp(false),
    /** 是否显示占位元素 */
    placeholder: makeBooleanProp(true),
    /** 是否显示顶部边框 */
    border: makeBooleanProp(true),
    /** 是否启用底部安全区适配 */
    safeAreaInsetBottom: makeBooleanProp(true),
    /** 选中颜色 */
    activeColor: makeStringProp(''),
    /** 未选中颜色 */
    inactiveColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const emit = defineEmits<{
  (e: 'update:modelValue', name: string | number): void
  (e: 'change', name: string | number): void
}>()

const currentActive = computed(() => {
  const v = props.modelValue
  return v === '' || v === undefined || v === null ? null : v
})

const setActive = (name: string | number) => {
  if (currentActive.value === name) return
  emit('update:modelValue', name)
  emit('change', name)
}

provide('mxTabbar', {
  active: computed(() => props.modelValue),
  activeColor: computed(() => props.activeColor),
  inactiveColor: computed(() => props.inactiveColor),
  setActive,
})

const safeBottom = computed(() => {
  if (!props.safeAreaInsetBottom) return 0
  try {
    const info = uni.getSystemInfoSync()
    return (info as any).safeAreaInsets?.bottom || 0
  } catch {
    return 0
  }
})

const tabbarStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.fixed) {
    style.position = 'fixed'
    style.bottom = '0'
    style.left = '0'
    style.right = '0'
    style.zIndex = '500'
  }
  if (safeBottom.value) style.paddingBottom = `${safeBottom.value}px`
  return style
})

const placeholderStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  style.height = '50px'
  if (safeBottom.value) style.height = `${50 + safeBottom.value}px`
  return style
})

const tabbarStyleMerged = computed(() => {
  const style = { ...tabbarStyle.value }
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
</script>

<style lang="scss">
.mx-tabbar {
  display: flex;
  align-items: stretch;
  height: 50px;
  box-sizing: content-box;
  background: var(--mx-background-2);

  &--fixed {
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>