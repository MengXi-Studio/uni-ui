/**
 * 卡片组件类型定义
 */

export type CardSize = 'small' | 'medium' | 'large'

export interface CardProps {
  /** 卡片标题 */
  title?: string
  /** 卡片副标题 */
  subtitle?: string
  /** 卡片尺寸 */
  size?: CardSize
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否悬浮 */
  hoverable?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

export interface CardEmits {
  (e: 'click'): void
}
