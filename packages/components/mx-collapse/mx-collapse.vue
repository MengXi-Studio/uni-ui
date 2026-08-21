<template>
  <view class="mx-collapse" :class="customClass" :style="customStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { makeBooleanProp, makeStringProp } from '../../shared/props'

export type CollapseContext = {
  isActive: (name: string | number) => boolean
  toggle: (name: string | number) => void
  disabled: { value: boolean }
  duration: { value: number }
}

const props = withDefaults(
  defineProps({
    /** 当前展开的 Item 名称 (v-model, 数组或字符串/数字) */
    modelValue: { type: [Array, String, Number] as any, default: null },
    /** 是否开启手风琴模式 */
    accordion: makeBooleanProp(false),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 切换动画时长 */
    duration: { type: Number, default: 300 },
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown, name: string | number): void
}>()

const collapseValue = computed<(string | number)[]>(() => {
  const v = props.modelValue
  if (v === null || v === undefined || v === '') return []
  return Array.isArray(v) ? v : [v]
})

const isActive = (name: string | number) => collapseValue.value.includes(name)

const toggle = (name: string | number) => {
  if (props.disabled) return
  let next: unknown
  if (props.accordion) {
    next = isActive(name) ? '' : name
  } else {
    const list = collapseValue.value.slice()
    const idx = list.indexOf(name)
    if (idx > -1) list.splice(idx, 1)
    else list.push(name)
    next = list
  }
  emit('update:modelValue', next)
  emit('change', next, name)
}

const itemContexts: CollapseContext = { isActive, toggle, disabled: computed(() => props.disabled), duration: computed(() => props.duration) }
provide('mxCollapse', itemContexts)
</script>

<style lang="scss">
.mx-collapse {
  width: 100%;
  box-sizing: border-box;
}
</style>