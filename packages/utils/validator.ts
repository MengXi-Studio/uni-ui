/**
 * 验证器工具函数
 */

/**
 * 验证是否为手机号
 */
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证是否为邮箱
 */
export function isEmail(value: string): boolean {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}

/**
 * 验证是否为身份证号码（简单验证）
 */
export function isIdCard(value: string): boolean {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

/**
 * 验证是否为 URL
 */
export function isUrl(value: string): boolean {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)
}

/**
 * 验证是否为空
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 验证是否为数字
 */
export function isNumber(value: unknown): boolean {
  return !isNaN(Number(value)) && value !== ''
}

/**
 * 验证是否为整数
 */
export function isInteger(value: unknown): boolean {
  return Number.isInteger(Number(value))
}

/**
 * 验证是否在范围内
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * 验证是否必填
 */
export function isRequired(value: unknown, message?: string): string | null {
  if (isEmpty(value)) {
    return message || '此项为必填项'
  }
  return null
}

/**
 * 验证长度范围
 */
export function validateLength(
  value: string,
  min: number,
  max: number,
  message?: string
): string | null {
  const length = value.length
  if (length < min || length > max) {
    return message || `长度应在 ${min} 到 ${max} 个字符之间`
  }
  return null
}

/**
 * 验证正则表达式
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  message?: string
): string | null {
  if (!pattern.test(value)) {
    return message || '格式不正确'
  }
  return null
}
