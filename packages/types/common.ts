/**
 * 公共类型定义 (对齐 Vant 泛型)
 */

// 通用事件/方法返回类型
export type Interceptor = (...args: any[]) => Promise<boolean> | boolean

/** 通用函数 */
export type ComponentClass = string | Array<object | string> | object

/** 联合转布尔 */
export type Numeric = number | string

/** 全局常用字段映射 */
export type FieldNames = Record<string, string>

/** 点击事件 */
export interface CommonTouchEvent {
  detail: { x: number; y: number }
}

/** 弹层/浮层通用回调事件 */
export interface PopupEmits {
  (e: 'update:show', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'click-overlay'): void
}