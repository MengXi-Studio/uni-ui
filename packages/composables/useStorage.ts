/**
 * 本地存储组合式函数
 */

import { ref, watch, type Ref } from 'vue'

export type StorageType = 'local' | 'session'

export interface StorageOptions {
  type?: StorageType
  serializer?: (value: any) => string
  parser?: (value: string) => any
}

const storageMap = {
  local: uni.getStorageSync,
  session: uni.getStorageSync, // uni-app 中 session 和 local 使用相同的 API
}

const setStorageMap = {
  local: uni.setStorageSync,
  session: uni.setStorageSync,
}

/**
 * 本地存储 Hook
 * @param key 存储键名
 * @param initialValue 初始值
 * @param options 配置选项
 * 
 * @example
 * const [value, setValue] = useStorage('user-info', { name: '' })
 */
export function useStorage<T = any>(
  key: string,
  initialValue: T,
  options: StorageOptions = {}
): [Ref<T>, (value: T) => void, () => void] {
  const {
    type = 'local',
    serializer = JSON.stringify,
    parser = JSON.parse,
  } = options

  // 读取存储
  const readStorage = (): T => {
    try {
      const item = storageMap[type](key)
      return item ? parser(item) : initialValue
    } catch (error) {
      console.error('Error reading storage:', error)
      return initialValue
    }
  }

  // 写入存储
  const writeStorage = (value: T) => {
    try {
      setStorageMap[type](key, serializer(value))
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
    (newValue) => {
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
export function useStringStorage(
  key: string,
  initialValue = ''
): [Ref<string>, (value: string) => void, () => void] {
  return useStorage(key, initialValue, {
    serializer: (val) => val,
    parser: (val) => val,
  })
}

/**
 * 数字存储 Hook
 */
export function useNumberStorage(
  key: string,
  initialValue = 0
): [Ref<number>, (value: number) => void, () => void] {
  return useStorage(key, initialValue, {
    serializer: (val) => String(val),
    parser: (val) => Number(val),
  })
}

/**
 * 布尔值存储 Hook
 */
export function useBooleanStorage(
  key: string,
  initialValue = false
): [Ref<boolean>, (value: boolean) => void, () => void] {
  return useStorage(key, initialValue, {
    serializer: (val) => String(val),
    parser: (val) => val === 'true',
  })
}

/**
 * 清除所有存储
 */
export function clearStorage(type?: StorageType) {
  try {
    if (type === 'local') {
      uni.clearStorageSync()
    } else if (type === 'session') {
      // uni-app 中没有单独的 session 清除方法
      console.warn('uni-app 不支持单独清除 session 存储')
    }
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
