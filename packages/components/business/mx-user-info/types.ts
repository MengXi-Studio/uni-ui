/**
 * 用户信息组件类型定义
 */

export interface UserInfo {
  id: string | number
  avatar: string
  nickname: string
  phone?: string
  level?: string
  points?: number
}

export interface UserInfoCardProps {
  /** 用户信息 */
  user?: UserInfo
  /** 显示手机号 */
  showPhone?: boolean
  /** 显示等级 */
  showLevel?: boolean
  /** 显示积分 */
  showPoints?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

export interface UserInfoCardEmits {
  (e: 'click', user: UserInfo): void
}
