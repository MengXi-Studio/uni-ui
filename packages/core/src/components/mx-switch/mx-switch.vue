<template>
  <view
    class="mx-switch"
    :class="[`mx-switch--${checked ? 'on' : 'off'}`, { 'mx-switch--disabled': disabled, 'mx-switch--loading': loading }, customClass]"
    :style="switchStyle"
    @click="onClick"
  >
    <view class="mx-switch__node" :style="nodeStyle" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 开关值 */
    modelValue: makeBooleanProp(false),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 是否加载中 */
    loading: makeBooleanProp(false),
    /** 开关尺寸 */
    size: makeNumericProp<number | string>('30px'),
    /** 开关打开时的背景色 */
    activeColor: makeStringProp(''),
    /** 开关关闭时的背景色 */
    inactiveColor: makeStringProp(''),
    /** 打开时对应的值 */
    activeValue: { type: [Boolean, String, Number] as any, default: true },
    /** 关闭时对应的值 */
    inactiveValue: { type: [Boolean, String, Number] as any, default: false },
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: false,
    size: '30px',
    activeValue: true,
    inactiveValue: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown): void
  (e: 'click'): void
}>()

const checked = computed(() => props.modelValue === props.activeValue)

const switchStyle = computed(() => {
  const style: Record<string, string> = {
    width: `calc(${addUnit(props.size)} + 6px)`,
    height: `calc(${addUnit(props.size)} + 6px)`,
    background: checked.value
      ? props.activeColor || 'var(--mx-primary-color)'
      : props.inactiveColor || 'var(--mx-text-color-3)',
  }
  return style
})

const nodeStyle = computed(() => ({
  width: addUnit(props.size) as string,
  height: addUnit(props.size) as string,
}))

const onClick = () => {
  emit('click')
  if (props.disabled || props.loading) return
  const next = !checked.value ? props.activeValue : props.inactiveValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss">
.mx-switch {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: 40px;
  padding: 2px;
  border-radius: 999px;
  background: var(--mx-text-color-3);
  transition: background-color var(--mx-duration-fast) var(--mx-ease-in-out);

  &--disabled {
    opacity: var(--mx-disabled-opacity);
    cursor: not-allowed;
  }

  &--loading {
    opacity: 0.6;
  }

  &--off .mx-switch__node {
    transform: translateX(0);
  }

  &--on .mx-switch__node {
    transform: translateX(100%);
  }

  &__node {
    position: relative;
    box-sizing: border-box;
    border-radius: 100%;
    background: #fff;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
    transition: transform var(--mx-duration-fast) var(--mx-ease-in-out);
  }
}
</style>