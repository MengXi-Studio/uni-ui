/**
 * 输入框组件类型定义
 */

export type InputType = 'text' | 'number' | 'digit' | 'idcard' | 'nickname'
export type InputSize = 'small' | 'medium' | 'large'

export interface InputProps {
  /** 输入框类型 */
  type?: InputType
  /** 输入框尺寸 */
  size?: InputSize
  /** 输入框值 */
  modelValue?: string | number
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 最大长度 */
  maxlength?: number
  /** 是否显示清除按钮 */
  clearable?: boolean
  /** 是否显示字数统计 */
  showCount?: boolean
  /** 前置图标 */
  prefixIcon?: string
  /** 后置图标 */
  suffixIcon?: string
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'input', value: string | number): void
  (e: 'clear'): void
}
