/**
 * 公共类型定义
 */

// 通用类型
export interface CommonProps {
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

// 尺寸类型
export type SizeType = 'small' | 'medium' | 'large'

// 颜色主题类型
export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

// 对齐方式
export type AlignType = 'left' | 'center' | 'right'
