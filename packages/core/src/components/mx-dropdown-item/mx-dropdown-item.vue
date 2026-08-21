<template>
  <view
    class="mx-dropdown-item"
    :class="[
      { 'mx-dropdown-item--active': active, 'mx-dropdown-item--disabled': disabled },
      customClass,
    ]"
    :style="itemStyle"
    @click="onClickItem"
  >
    <text class="mx-dropdown-item__title" :style="titleStyle">{{ title }}</text>
    <text class="mx-dropdown-item__arrow" :style="arrowStyle">﹀</text>
  </view>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, reactive, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeArrayProp } from '../shared/props'
import { DROPDOWN_KEY, type DropdownContext, type DropdownOption } from '../mx-dropdown-menu/mx-dropdown-menu.vue'

const props = withDefaults(
  defineProps({
    /** 当前选中值 (v-model) */
    modelValue: { type: [Number, String], default: '' },
    /** 标题 */
    title: makeStringProp(''),
    /** 选项列表 */
    options: makeArrayProp<DropdownOption>([ ]),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 高亮颜色 (优先级高于菜单) */
    activeColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    options: [ ],
    disabled: false,
    activeColor: '',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()

/** 菜单注入的上下文 */
const context = inject<DropdownContext>(DROPDOWN_KEY)

/** meta 对象, 供菜单读取渲染 */
const meta = reactive({
  index: -1,
  title: props.title,
  options: props.options,
  disabled: props.disabled,
  value: props.modelValue,
  direction: context ? context.direction() : 'down',
  setValue: (value: number | string) => {
    emit('update:modelValue', value)
  },
})

watch(
  () => [props.modelValue, props.title, props.options, props.disabled],
  () => {
    meta.value = props.modelValue as number | string
    meta.title = props.title
    meta.options = props.options
    meta.disabled = props.disabled
  }
)

/** 当前是否展开 */
const active = computed(() => !!context && context.activeIndex.value === meta.index)

const color = computed(() => props.activeColor || (context ? context.activeColor() : '#1989fa'))

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const titleStyle = computed(() => (active.value && color.value ? { color: color.value } : {}))
const arrowStyle = computed(() => (active.value && color.value ? { color: color.value } : {}))

const onClickItem = () => {
  if (props.disabled || !context) return
  context.setActive(meta.index)
}

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

if (context) {
  context.register(meta as any)
}

onUnmounted(() => {
  if (context) context.unregister(meta.index)
})
</script>

<style lang="scss">
.mx-dropdown-item {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  background: var(--mx-background-2);

  &--active {
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      content: '';
      background: var(--mx-primary-color);
    }
  }

  &--disabled .mx-dropdown-item__title {
    color: var(--mx-text-color-3);
  }

  &__title {
    font-size: var(--mx-font-size-md);
    color: var(--mx-text-color);
  }

  &__arrow {
    margin-left: 4px;
    font-size: 10px;
    color: var(--mx-text-color-3);
  }
}
</style>