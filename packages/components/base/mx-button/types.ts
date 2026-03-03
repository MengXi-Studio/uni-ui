/**
 * 按钮组件类型定义
 */

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonShape = 'square' | 'round' | 'circle'

export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 按钮形状 */
  shape?: ButtonShape
  /** 是否为空心按钮 */
  plain?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 按钮文字 */
  text?: string
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

export interface ButtonEmits {
  (e: 'click'): void
}
