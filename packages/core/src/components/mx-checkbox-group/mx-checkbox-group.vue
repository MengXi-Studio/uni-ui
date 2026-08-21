<template>
  <view
    class="mx-checkbox-group"
    :class="[`mx-checkbox-group--${direction}`, customClass]"
    :style="customStyle"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp, makeArrayProp } from '../shared/props'
import { toNumber } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 已选中项的标识符数组 */
    modelValue: makeArrayProp<(string | number)[]>(),
    /** 最多选择个数 (0 表示不限制) */
    max: makeNumericProp(0),
    /** 排列方向 */
    direction: makeStringProp<'vertical' | 'horizontal'>('vertical'),
    /** 是否禁用所有子项 */
    disabled: makeBooleanProp(false),
    /** 选中时图标颜色 */
    checkedColor: makeStringProp(''),
    /** 图标大小 */
    iconSize: makeNumericProp<number | string>('20px'),
    /** 形状: round / square */
    shape: makeStringProp<'round' | 'square'>('round'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    max: 0,
    direction: 'vertical',
    iconSize: '20px',
    shape: 'round',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}>()

const isChecked = (name: string | number) => props.modelValue.indexOf(name) > -1

const toggle = (name: string | number) => {
  const list = props.modelValue.slice()
  const index = list.indexOf(name)
  if (index > -1) {
    list.splice(index, 1)
  } else {
    const max = toNumber(props.max)
    if (max > 0 && list.length >= max) return
    list.push(name)
  }
  emit('update:modelValue', list)
  emit('change', list)
}

provide<{
  modelValue: () => (string | number)[]
  max: () => number
  disabled: () => boolean
  checkedColor: () => string
  iconSize: () => number | string
  shape: () => 'round' | 'square'
  toggle: (name: string | number) => void
  isChecked: (name: string | number) => boolean
}>('mx-checkbox-group', {
  modelValue: () => props.modelValue,
  max: () => toNumber(props.max),
  disabled: () => props.disabled,
  checkedColor: () => props.checkedColor,
  iconSize: () => props.iconSize,
  shape: () => props.shape,
  toggle,
  isChecked,
})
</script>

<style lang="scss">
.mx-checkbox-group {
  display: inline-flex;
  flex-direction: column;

  &--horizontal {
    flex-direction: row;
    flex-wrap: wrap;

    .mx-checkbox {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.mx-checkbox-group {
  &--vertical {
    .mx-checkbox {
      padding: 12px 16px;
    }
  }
}
</style>