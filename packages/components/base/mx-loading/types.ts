/**
 * 加载组件类型定义
 */

export type LoadingType = 'circle' | 'dots' | 'spinner'
export type LoadingSize = 'small' | 'medium' | 'large'

export interface LoadingProps {
  /** 加载类型 */
  type?: LoadingType
  /** 加载尺寸 */
  size?: LoadingSize
  /** 加载文字 */
  text?: string
  /** 是否全屏 */
  fullscreen?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}
