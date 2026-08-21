/**
 * 组件共享基础设施: Props 定义辅助
 * 对齐 Vant makeStringProp / makeNumericProp 的 API 风格
 */
import type { PropType } from 'vue'

type Factory<T> = () => T

/** 字符串 prop, 支持默认值工厂 */
export const makeStringProp = <T extends string>(defaultValue: T) =>
  ({ type: String as unknown as PropType<T>, default: defaultValue }) as const

/** 数值/数值字符串混合 prop (Vant: number | string) */
export const makeNumericProp = <T extends number | string>(defaultValue: T) =>
  ({ type: [Number, String], default: defaultValue }) as const

/** 布尔 prop, 默认 false */
export const makeBooleanProp = (defaultValue = false) =>
  ({ type: Boolean, default: defaultValue }) as const

/** 对象 prop */
export const makeObjectProp = <T>(defaultValue?: T | Factory<T>) =>
  ({ type: Object as PropType<T>, default: defaultValue }) as const

/** 数组 prop */
export const makeArrayProp = <T>(defaultValue: T[] = []) =>
  ({ type: Array as unknown as PropType<T>, default: defaultValue }) as const

/** 简单类型 prop (number/string/boolean) */
export const makeProp = <T>(type: PropType<T> | true, defaultValue?: T | Factory<T>) =>
  ({ type, default: defaultValue }) as const

/** 根节点通用 props (自定义类名/样式) */
export const rootProps = {
  /** 自定义类名 */
  customClass: makeStringProp(''),
  /** 自定义样式 (字符串或对象) */
  customStyle: { type: [String, Object] as PropType<string | Record<string, string>>, default: '' },
}
