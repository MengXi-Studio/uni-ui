<template>
  <view
    class="mx-tab"
    :class="[{ 'mx-tab--active': active, 'mx-tab--disabled': disabled }, customClass]"
    :style="[customStyle, tabStyle]"
    @click="onClick"
  >
    <slot :title="title">{{ title }}</slot>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'

type TabsContext = {
  active: { value: string | number }
  activeColor: { value: string }
  color: { value: string }
  lineWidth: { value: string | number }
  setActive: (name: string | number, title: string) => void
}

const props = defineProps({
  /** 标题 */
  title: makeStringProp(''),
  /** 标签名称 (可与 v-model 对应) */
  name: makeStringProp(''),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const tabs = inject<TabsContext>('mxTabs', null)

const name = computed(() => props.name || props.title)

const emit = defineEmits<{ (e: 'click'): void }>()

const active = computed(() => (tabs ? tabs.active.value === name.value : false))

const color = computed(() => {
  if (!tabs) return ''
  return active.value ? tabs.activeColor.value : tabs.color.value
})

const tabStyle = computed(() => {
  const style: Record<string, string> = {}
  const c = color.value
  if (c) style.color = c
  return mergeStyle(style)
})

const onClick = () => {
  if (props.disabled) return
  emit('click')
  if (tabs) tabs.setActive(name.value, props.title)
}

function mergeStyle(style: Record<string, string>): Record<string, string> {
  const raw = props.customStyle as any
  if (typeof raw === 'string' && raw) Object.assign(style, parseStyle(raw))
  else if (raw && typeof raw === 'object') Object.assign(style, raw)
  return style
}

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
.mx-tab {
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 16px;
  color: var(--mx-text-color);
  font-size: 14px;
  line-height: 44px;
  cursor: pointer;

  &--active {
    font-weight: var(--mx-font-weight-bold);
  }

  &--disabled {
    color: var(--mx-text-color-3) !important;
  }
}
</style>
