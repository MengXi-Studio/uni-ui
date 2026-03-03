/**
 * 网络请求组合式函数
 */

/// <reference path="../types/uni-app.d.ts" />

import { ref, type Ref } from 'vue'

export interface RequestConfig<T = any> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: T
  header?: Record<string, string>
  showLoading?: boolean
  loadingText?: string
}

export interface RequestOptions {
  immediate?: boolean
  defaultData?: any
}

/**
 * 网络请求 Hook
 * @example
 * const { data, loading, error, run } = useRequest({ url: '/api/user' })
 */
export function useRequest<T = any>(
  config: RequestConfig,
  options: RequestOptions = {}
) {
  const { immediate = false, defaultData = null } = options
  
  const data = ref<T | null>(defaultData) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const run = async (overrideConfig?: Partial<RequestConfig>) => {
    const finalConfig = { ...config, ...overrideConfig }
    
    if (finalConfig.showLoading !== false) {
      loading.value = true
      error.value = null
      
      uni.showLoading({
        title: finalConfig.loadingText || '加载中...',
        mask: true,
      })
    }

    try {
      const response = await uni.request({
        url: finalConfig.url,
        method: finalConfig.method || 'GET',
        data: finalConfig.data,
        header: finalConfig.header,
      })

      if (response.statusCode === 200) {
        data.value = response.data as T
        error.value = null
        return response.data
      } else {
        throw new Error(`请求失败：${response.statusCode}`)
      }
    } catch (err) {
      error.value = err as Error
      console.error('Request error:', err)
      
      uni.showToast({
        title: error.value.message || '请求失败',
        icon: 'none',
      })
      
      throw err
    } finally {
      if (finalConfig.showLoading !== false) {
        loading.value = false
        uni.hideLoading()
      }
    }
  }

  const refresh = () => run()

  if (immediate) {
    run()
  }

  return {
    data,
    loading,
    error,
    run,
    refresh,
  }
}

/**
 * 分页请求 Hook
 */
export function usePaginatedRequest<T = any>(
  fetchFn: (page: number, pageSize: number) => Promise<{ list: T[]; total: number }>
) {
  const list = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const hasMore = ref(true)

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true
    error.value = null

    try {
      const result = await fetchFn(page.value, pageSize.value)
      
      if (result.list.length < pageSize.value) {
        hasMore.value = false
      }
      
      list.value = [...list.value, ...result.list]
      total.value = result.total
      page.value++
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    page.value = 1
    list.value = []
    hasMore.value = true
    await loadMore()
  }

  return {
    list,
    loading,
    error,
    page,
    pageSize,
    total,
    hasMore,
    loadMore,
    refresh,
  }
}
