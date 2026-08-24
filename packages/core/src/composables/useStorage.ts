/**
 * 本地存储组合式函数
 *
 * 说明：uni-app 官方存储 API（uni.setStorageSync 等）对应的是持久化本地存储，
 * 并未封装 "session" 会话级语义，因此本封装仅提供 local 一种类型。
 */

import { ref, watch, type Ref } from 'vue'

export interface StorageOptions {
	serializer?: (value: any) => string
	parser?: (value: string) => any
}

/**
 * 本地存储 Hook（持久化）
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 配置选项
 *
 * @example
 * const [value, setValue] = useStorage('user-info', { name: '' })
 */
export function useStorage<T = any>(key: string, initialValue: T, options: StorageOptions = {}): [Ref<T>, (value: T) => void, () => void] {
	const { serializer = JSON.stringify, parser = JSON.parse } = options

	// 读取存储
	const readStorage = (): T => {
		try {
			const item = uni.getStorageSync(key)
			return item ? parser(item) : initialValue
		} catch (error) {
			console.error('Error reading storage:', error)
			return initialValue
		}
	}

	// 写入存储
	const writeStorage = (value: T) => {
		try {
			uni.setStorageSync(key, serializer(value))
		} catch (error) {
			console.error('Error writing storage:', error)
		}
	}

	// 删除存储
	const removeStorage = () => {
		try {
			uni.removeStorageSync(key)
		} catch (error) {
			console.error('Error removing storage:', error)
		}
	}

	const value = ref(readStorage()) as Ref<T>

	// 监听变化自动保存
	watch(
		value,
		newValue => {
			writeStorage(newValue)
		},
		{ deep: true }
	)

	const setValue = (newValue: T) => {
		value.value = newValue
	}

	return [value, setValue, removeStorage]
}

/**
 * 字符串存储 Hook（不序列化）
 */
export function useStringStorage(key: string, initialValue = ''): [Ref<string>, (value: string) => void, () => void] {
	return useStorage(key, initialValue, {
		serializer: val => val,
		parser: val => val
	})
}

/**
 * 数字存储 Hook
 */
export function useNumberStorage(key: string, initialValue = 0): [Ref<number>, (value: number) => void, () => void] {
	return useStorage(key, initialValue, {
		serializer: val => String(val),
		parser: val => Number(val)
	})
}

/**
 * 布尔值存储 Hook
 */
export function useBooleanStorage(key: string, initialValue = false): [Ref<boolean>, (value: boolean) => void, () => void] {
	return useStorage(key, initialValue, {
		serializer: val => String(val),
		parser: val => val === 'true'
	})
}

/**
 * 清除所有本地存储
 */
export function clearStorage() {
	try {
		uni.clearStorageSync()
	} catch (error) {
		console.error('Error clearing storage:', error)
	}
}

/**
 * 获取所有 keys
 */
export function getAllKeys(): string[] {
	try {
		const info = uni.getStorageInfoSync()
		return info.keys || []
	} catch (error) {
		console.error('Error getting storage info:', error)
		return []
	}
}
