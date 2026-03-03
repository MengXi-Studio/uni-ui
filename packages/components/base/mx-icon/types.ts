/**
 * 图标组件类型定义
 */

export type IconType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
export type IconSize = 'small' | 'medium' | 'large'

export interface IconProps {
  /** 图标名称 */
  name: string
  /** 图标类型 */
  type?: IconType
  /** 图标尺寸 */
  size?: IconSize
  /** 图标颜色 */
  color?: string
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}
