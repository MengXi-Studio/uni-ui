<template>
  <label
    class="mx-radio"
    :class="[{ 'mx-radio--checked': checked, 'mx-radio--disabled': computedDisabled }, customClass]"
    :style="customStyle"
    @click="toggle"
  >
    <view class="mx-radio__icon" :style="iconStyle">
      <view v-if="checked" class="mx-radio__icon-dot" />
    </view>

    <slot name="icon" />

    <view class="mx-radio__label">
      <slot>{{ label }}</slot>
    </view>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

type RadioGroupInstance = {
  disabled: () => boolean
  checkedColor: () => string
  iconSize: () => number | string
  toggle: (name: string | number) => void
  isChecked: (name: string | number) => boolean
}

const props = withDefaults(
  defineProps({
    /** 当前选中的值 */
    modelValue: { type: [String, Number, Boolean] as any, default: '' },
    /** 标识符 */
    name: { type: [String, Number, Boolean] as any, default: '' },
    /** 选中时图标颜色 */
    checkedColor: makeStringProp(''),
    /** 图标大小 */
    iconSize: makeNumericProp<number | string>('20px'),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 文案 */
    label: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    name: '',
    iconSize: '20px',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown): void
}>()

const group = inject<RadioGroupInstance | null>('mx-radio-group', null)

const computedDisabled = computed(() => props.disabled || (group ? group.disabled() : false))
const checkedColor = computed(() => {
  const base = group ? group.checkedColor() : props.checkedColor
  return base || 'var(--mx-primary-color)'
})
const iconSize = computed(() => (group ? group.iconSize() : props.iconSize))

const checked = computed(() =>
  group ? group.isChecked(String(props.name)) : props.modelValue === props.name
)

const iconStyle = computed(() => ({
  width: addUnit(iconSize.value) as string,
  height: addUnit(iconSize.value) as string,
  ...(checked.value ? { borderColor: checkedColor.value } : {}),
}))

const toggle = () => {
  if (computedDisabled.value) return
  if (group) {
    group.toggle(String(props.name))
  } else {
    emit('update:modelValue', props.name)
    emit('change', props.name)
  }
}
</script>

<style lang="scss">
.mx-radio {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: var(--mx-disabled-opacity);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid var(--mx-text-color-3);
    transition: border-color var(--mx-duration-fast) var(--mx-ease-in-out);
  }

  &__icon-dot {
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: var(--mx-primary-color);
  }

  &__label {
    margin-left: 8px;
    color: var(--mx-text-color);
    line-height: 20px;
  }

  &--disabled &__label {
    color: var(--mx-text-color-3);
  }
}
</style>