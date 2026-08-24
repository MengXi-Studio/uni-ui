/**
 * 单位换算工具
 */

/**
 * 为数值自动拼接单位 (Vant addUnit 的 uni-app 版本)
 * - 数字     -> 追加 px
 * - 字符串   -> 原样返回
 * 多端兼容: 如需响应式可使用 rpx 字符串直接传入
 */
export function addUnit(value: string | number | undefined): string | undefined {
	if (value === undefined || value === null) return undefined

	return typeof value === 'number' ? `${value}px` : value
}

/** 数值取整安全解析 */
export function toNumber(value: string | number | undefined, fallback = 0): number {
	if (value === undefined || value === null || value === '') return fallback

	const num = Number(value)
	return Number.isNaN(num) ? fallback : num
}
