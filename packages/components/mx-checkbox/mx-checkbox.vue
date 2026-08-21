<template>
  <label
    class="mx-checkbox"
    :class="[
      {
        'mx-checkbox--checked': checked,
        'mx-checkbox--disabled': computedDisabled,
        'mx-checkbox--block': block,
      },
      customClass,
    ]"
    :style="customStyle"
    @click="toggle"
  >
    <view class="mx-checkbox__icon" :class="[`mx-checkbox__icon--${iconShape}`]" :style="iconStyle">
      <text v-if="checked" class="mx-checkbox__icon-check">✓</text>
    </view>

    <slot name="icon" />

    <view class="mx-checkbox__label">
      <slot>{{ label }}</slot>
    </view>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

type CheckboxGroupInstance = {
  modelValue: () => (string | number)[]
  max: () => number
  disabled: () => boolean
  checkedColor: () => string
  iconSize: () => number | string
  shape: () => 'round' | 'square'
  toggle: (name: string | number) => void
  isChecked: (name: string | number) => boolean
}

const props = withDefaults(
  defineProps({
    /** 选中状态 (未在 group 中使用时) */
    modelValue: makeBooleanProp(false),
    /** 标识符 */
    name: { type: [String, Number] as any, default: '' },
    /** 选中时图标颜色 */
    checkedColor: makeStringProp(''),
    /** 图标大小 */
    iconSize: makeNumericProp<number | string>('20px'),
    /** 形状: round / square */
    shape: makeStringProp<'round' | 'square'>('round'),
    /** 未选中时的提示 */
    label: makeStringProp(''),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 是否为块级 */
    block: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: false,
    name: '',
    iconSize: '20px',
    shape: 'round',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'change', value: unknown): void
}>()

const group = inject<CheckboxGroupInstance | null>('mx-checkbox-group', null)

const computedDisabled = computed(() => props.disabled || (group ? group.disabled() : false))
const iconShape = computed(() => (group ? group.shape() : props.shape))
const iconSize = computed(() => (group ? group.iconSize() : props.iconSize))
const checkedColor = computed(() => {
  const base = group ? group.checkedColor() : props.checkedColor
  return base || 'var(--mx-primary-color)'
})

const checked = computed(() =>
  group ? group.isChecked(String(props.name)) : !!props.modelValue
)

const iconStyle = computed(() => ({
  width: addUnit(iconSize.value) as string,
  height: addUnit(iconSize.value) as string,
  fontSize: addUnit(iconSize.value) as string,
  ...(checked.value
    ? {
        background: checkedColor.value,
        borderColor: checkedColor.value,
      }
    : {}),
}))

const toggle = () => {
  if (computedDisabled.value) return
  if (group) {
    group.toggle(String(props.name))
  } else {
    const next = !checked.value
    emit('update:modelValue', next)
    emit('change', next)
  }
}
</script>

<style lang="scss">
.mx-checkbox {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &--block {
    display: flex;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--mx-disabled-opacity);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-shrink: 0;
    color: #fff;
    border: 1px solid var(--mx-text-color-3);
    transition: border-color var(--mx-duration-fast) var(--mx-ease-in-out),
      background-color var(--mx-duration-fast) var(--mx-ease-in-out);

    &--round {
      border-radius: var(--mx-radius-md);
    }

    &--square {
      border-radius: 0;
    }
  }

  &__icon-check {
    line-height: 1;
    font-size: 80%;
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