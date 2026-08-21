<template>
  <view
    class="mx-field"
    :class="[
      `mx-field--label-${labelAlign}`,
      { 'mx-field--borderless': !border, 'mx-field--large': size === 'large' },
      customClass,
    ]"
    :style="customStyle"
    @click="onClick"
  >
    <view v-if="leftIconName || $slots['left-icon']" class="mx-field__left-icon">
      <slot name="left-icon">
        <mx-icon v-if="leftIconName" :name="leftIconName" />
      </slot>
    </view>

    <view v-if="label" class="mx-field__label" :style="labelStyle">
      <slot name="label">
        <text v-if="required" class="mx-field__required">*</text>
        <text>{{ label }}</text>
      </slot>
    </view>

    <view class="mx-field__body">
      <textarea
        v-if="isTextarea"
        class="mx-field__control"
        :class="['mx-field__control--' + computedInputAlign]"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :placeholder-class="'mx-field__placeholder'"
        :auto-height="!!autosize"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClickInput"
      />
      <input
        v-else
        class="mx-field__control"
        :class="['mx-field__control--' + computedInputAlign]"
        :value="modelValue"
        :type="nativeType"
        :password="password"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :placeholder-class="'mx-field__placeholder'"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClickInput"
      />
      <view v-if="showWordLimit && maxlength > 0" class="mx-field__word-limit">
        {{ String(modelValue || '').length }}/{{ maxlength }}
      </view>
      <slot name="extra" />
    </view>

    <view v-if="showRightArea" class="mx-field__right-icon" @click.stop="onClickRightIcon">
      <slot name="right-icon">
        <text v-if="showClear" class="mx-field__clear">×</text>
        <mx-icon v-else-if="rightIconName" :name="rightIconName" />
        <text v-else-if="isLink" class="mx-field__arrow">›</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'
import MxIcon from '../mx-icon/mx-icon.vue'

type FieldType = 'text' | 'number' | 'password' | 'textarea'
type FieldLabelAlign = 'left' | 'right' | 'top'
type FieldInputAlign = 'left' | 'right' | 'center'

const props = defineProps({
  /** 输入值 (v-model) */
  modelValue: { type: [String, Number] as any, default: '' },
  /** 左侧标签 */
  label: makeStringProp(''),
  /** 表单项名称, 供表单校验使用 */
  name: makeStringProp(''),
  /** 输入框类型 */
  type: makeStringProp<FieldType>('text'),
  /** 输入框内容对齐 (别名: valueAlign) */
  inputAlign: makeStringProp<FieldInputAlign>('left'),
  /** 输入框内容对齐 (旧别名) */
  valueAlign: makeStringProp<FieldInputAlign>(''),
  /** 标签宽度 */
  labelWidth: makeNumericProp<number | string | undefined>(undefined),
  /** 标签对齐 */
  labelAlign: makeStringProp<FieldLabelAlign>('left'),
  /** 占位符 */
  placeholder: makeStringProp(''),
  /** 是否禁用 */
  disabled: makeBooleanProp(false),
  /** 是否只读 */
  readonly: makeBooleanProp(false),
  /** 是否显示清除按钮 */
  clearable: makeBooleanProp(false),
  /** 最大输入长度 */
  maxlength: makeNumericProp<number | undefined>(undefined),
  /** textarea 自适应高度 */
  autosize: { type: [Boolean, Object] as any, default: false },
  /** 是否必填 (显示星号) */
  required: makeBooleanProp(false),
  /** 是否显示右侧箭头 */
  isLink: makeBooleanProp(false),
  /** 尺寸, large 会放大输入区 */
  size: makeStringProp(''),
  /** 是否显示字数统计 */
  showWordLimit: makeBooleanProp(false),
  /** 左侧图标名 */
  leftIconName: makeStringProp(''),
  /** 右侧图标名 */
  rightIconName: makeStringProp(''),
  /** 是否显示底部边框 */
  border: makeBooleanProp(true),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: unknown): void
  (e: 'blur', event: unknown): void
  (e: 'clear'): void
  (e: 'click-input', event: unknown): void
  (e: 'click-right-icon', event: unknown): void
  (e: 'click', event: unknown): void
}>()

const slots = useSlots()

/** textarea 类型 */
const isTextarea = computed(() => props.type === 'textarea')

/** 原生 input type 映射 */
const nativeType = computed(() => {
  const map: Record<string, string> = {
    text: 'text',
    number: 'number',
    password: 'password',
    tel: 'tel',
    digit: 'digit',
    idcard: 'idcard',
  }
  return map[props.type] || 'text'
})

/** password 仅在 password 类型时开启原生蒙层 */
const password = computed(() => props.type === 'password')

/** 输入框对齐含旧别名兼容 */
const computedInputAlign = computed(() => props.valueAlign || props.inputAlign)

const labelStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.labelWidth !== undefined && props.labelWidth !== '') {
    style.width =
      typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : (props.labelWidth as string)
  }
  return style
})

/** 是否显示右侧图标区域 (含清除/箭头/右图标) */
const showRightArea = computed(
  () => showClear.value || props.rightIconName || props.isLink || !!slots['right-icon']
)

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !props.readonly && String(props.modelValue || '') !== ''
)

const onInput = (event: Event) => {
  const value = (event as any).detail?.value ?? ''
  emit('update:modelValue', value)
  emit('change', value)
}

const onFocus = (event: unknown) => emit('focus', event)
const onBlur = (event: unknown) => emit('blur', event)
const onClickInput = (event: unknown) => emit('click-input', event)

const onClickRightIcon = (event: unknown) => {
  if (showClear.value) {
    emit('clear')
    emit('update:modelValue', '')
    emit('change', '')
    return
  }
  emit('click-right-icon', event)
}

const onClick = (event: unknown) => emit('click', event)
</script>

<style lang="scss">
.mx-field {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: var(--mx-text-color);
  font-size: 14px;
  line-height: 24px;
  background: var(--mx-background-2);

  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    transform: scaleY(0.5);
    transform-origin: center;
    border-bottom: 1px solid var(--mx-border-color);
  }

  &--borderless::after {
    display: none;
  }

  &--large {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &--label-top {
    display: block;

    .mx-field__label {
      width: 100% !important;
      margin-bottom: 4px;
    }

    .mx-field__body {
      width: 100%;
    }
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
    font-size: 16px;
    color: var(--mx-text-color-3);
  }

  &__label {
    flex-shrink: 0;
    margin-right: 12px;
    color: var(--mx-text-color);
    text-align: left;
  }

  &__required {
    margin-right: 2px;
    color: var(--mx-danger-color);
  }

  &__body {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__control {
    flex: 1;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: var(--mx-text-color);
    font-size: 14px;
    line-height: 24px;
    background: transparent;
    border: 0;
    outline: none;

    &--left {
      text-align: left;
    }
    &--right {
      text-align: right;
    }
    &--center {
      text-align: center;
    }
  }

  &__placeholder {
    color: var(--mx-text-color-3);
  }

  &__word-limit {
    margin-left: 8px;
    color: var(--mx-text-color-3);
    font-size: 12px;
    white-space: nowrap;
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: var(--mx-text-color-3);
    font-size: 16px;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--mx-text-color-3);
    color: var(--mx-background-2);
    font-size: 13px;
    line-height: 1;
  }

  &__arrow {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 1;
  }
}
</style>
