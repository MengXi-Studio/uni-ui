/**
 * 格式化器工具函数
 */

/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
	const d = new Date(date)
	if (isNaN(d.getTime())) return ''

	const year = d.getFullYear()
	const month = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	const hours = String(d.getHours()).padStart(2, '0')
	const minutes = String(d.getMinutes()).padStart(2, '0')
	const seconds = String(d.getSeconds()).padStart(2, '0')

	return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day).replace('HH', hours).replace('mm', minutes).replace('ss', seconds)
}

/**
 * 格式化金额
 */
export function formatMoney(amount: number | string, decimals = 2): string {
	const num = Number(amount)
	if (isNaN(num)) return '0.00'

	return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化数字（千分位）
 */
export function formatNumber(num: number | string): string {
	return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number | string): string {
	const size = Number(bytes)
	if (isNaN(size)) return '0 B'

	const units = ['B', 'KB', 'MB', 'GB', 'TB']
	let index = 0
	let value = size

	while (value >= 1024 && index < units.length - 1) {
		value /= 1024
		index++
	}

	return `${value.toFixed(2)} ${units[index]}`
}

/**
 * 格式化百分比
 */
export function formatPercent(value: number | string, decimals = 0): string {
	const num = Number(value)
	if (isNaN(num)) return '0%'

	return `${(num * 100).toFixed(decimals)}%`
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(date: Date | string | number): string {
	const now = new Date()
	const target = new Date(date)
	const diff = now.getTime() - target.getTime()

	const minute = 60 * 1000
	const hour = 60 * minute
	const day = 24 * hour
	const month = 30 * day
	const year = 12 * month

	if (diff < minute) {
		return '刚刚'
	} else if (diff < hour) {
		return `${Math.floor(diff / minute)}分钟前`
	} else if (diff < day) {
		return `${Math.floor(diff / hour)}小时前`
	} else if (diff < month) {
		return `${Math.floor(diff / day)}天前`
	} else if (diff < year) {
		return `${Math.floor(diff / month)}个月前`
	} else {
		return `${Math.floor(diff / year)}年前`
	}
}

/**
 * 格式化电话号码（中间 4 位隐藏）
 */
export function formatPhone(phone: string): string {
	return String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化身份证（显示前 6 后 4 位）
 */
export function formatIdCard(idCard: string): string {
	return String(idCard).replace(/(\d{6})\d{8}(\w{4})/, '$1********$2')
}

/**
 * 截断文本（超出长度显示省略号）
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
	if (text.length <= maxLength) return text

	return text.slice(0, maxLength) + suffix
}

/**
 * 首字母大写
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 驼峰转短横线
 */
export function camelToKebab(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 短横线转驼峰
 */
export function kebabToCamel(str: string): string {
	return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}
