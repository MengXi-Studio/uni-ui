/**
 * 网络请求组合式函数
 */

import { ref, type Ref } from 'vue'

/**
 * 网络请求配置
 */
export interface RequestConfig<T = any> {
	/** 请求 URL */
	url: string
	/** 请求方法 */
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	/** 请求数据 */
	data?: T
	/** 请求头 */
	header?: Record<string, string>
	/** 是否显示加载中 */
	showLoading?: boolean
	/** 加载中提示 */
	loadingText?: string
}

/**
 * 网络请求选项
 */
export interface RequestOptions {
	/** 是否立即执行请求 */
	immediate?: boolean
	/** 默认数据 */
	defaultData?: any
}

/**
 * 网络请求组合式函数
 * @param config 网络请求配置
 * @param options 网络请求选项
 * @returns 网络请求结果
 *
 * @example
 * const { data, loading, error, run } = useRequest({ url: '/api/user' })
 */
export function useRequest<T = any>(config: RequestConfig, options: RequestOptions = {}) {
	const { immediate = false, defaultData = null } = options

	/** 请求数据 */
	const data = ref<T | null>(defaultData) as Ref<T | null>
	/** 加载中状态 */
	const loading = ref(false)
	/** 请求错误 */
	const error = ref<Error | null>(null)

	/** 发送请求并处理响应 */
	const run = async (overrideConfig?: Partial<RequestConfig>) => {
		const finalConfig = { ...config, ...overrideConfig }

		if (finalConfig.showLoading !== false) {
			loading.value = true
			error.value = null

			uni.showLoading({
				title: finalConfig.loadingText || '加载中...',
				mask: true
			})
		}

		try {
			const response = await uni.request({
				url: finalConfig.url,
				method: finalConfig.method || 'GET',
				data: finalConfig.data,
				header: finalConfig.header
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
				icon: 'none'
			})

			throw err
		} finally {
			if (finalConfig.showLoading !== false) {
				loading.value = false
				uni.hideLoading()
			}
		}
	}

	/** 刷新数据 */
	const refresh = () => run()

	/** 是否立即执行请求 */
	if (immediate) {
		run()
	}

	return {
		data,
		loading,
		error,
		run,
		refresh
	}
}

/**
 * 分页请求组合式函数
 * @param fetchFn 分页请求函数
 * @returns 分页请求结果
 *
 * @example
 * const { list, loading, error, page, pageSize, total, hasMore, loadMore, refresh } = usePaginatedRequest(fetchFn)
 */
export function usePaginatedRequest<T = any>(fetchFn: (page: number, pageSize: number) => Promise<{ list: T[]; total: number }>) {
	/** 分页列表 */
	const list = ref<T[]>([]) as Ref<T[]>
	/** 加载中状态 */
	const loading = ref(false)
	/** 分页请求错误 */
	const error = ref<Error | null>(null)
	/** 当前页码 */
	const page = ref(1)
	/** 每页数量 */
	const pageSize = ref(10)
	/** 总页数 */
	const total = ref(0)
	/** 是否还有更多数据 */
	const hasMore = ref(true)

	/** 加载更多数据 */
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

	/** 刷新数据 */
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
		refresh
	}
}
