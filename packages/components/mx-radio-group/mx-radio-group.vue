<template>
  <view
    class="mx-radio-group"
    :class="[`mx-radio-group--${direction}`, customClass]"
    :style="customStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../../shared/props'

const props = withDefaults(
  defineProps({
    /** 当前选中的值 */
    modelValue: { type: [String, Number, Boolean] as any, default: '' },
    /** 排列方向 */
    direction: makeStringProp<'vertical' | 'horizontal'>('vertical'),
    /** 是否禁用所有子项 */
    disabled: makeBooleanProp(false),
    /** 选中时图标颜色 */
    checkedColor: makeStringProp(''),
    /** 图标大小 */
    iconSize: makeNumericProp<number | string>('20px'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    direction: 'vertical',
    iconSize: '20px',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown): void
}>()

const isChecked = (name: string | number) => props.modelValue === name

const toggle = (name: string | number) => {
  emit('update:modelValue', name)
  emit('change', name)
}

provide<{
  disabled: () => boolean
  checkedColor: () => string
  iconSize: () => number | string
  toggle: (name: string | number) => void
  isChecked: (name: string | number) => boolean
}>('mx-radio-group', {
  disabled: () => props.disabled,
  checkedColor: () => props.checkedColor,
  iconSize: () => props.iconSize,
  toggle,
  isChecked,
})
</script>

<style lang="scss">
.mx-radio-group {
  display: inline-flex;
  flex-direction: column;

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;

    .mx-radio {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &--vertical {
    .mx-radio {
      padding: 12px 16px;
    }
  }
}
</style>