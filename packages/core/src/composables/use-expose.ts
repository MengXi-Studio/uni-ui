import { getCurrentInstance } from 'vue'

/**
 * useExpose: 向父级组件暴露内部方法
 * 通过 getCurrentInstance().exposed 暴露内部方法
 */
export function useExpose<T>(exposeObj: T) {
	const instance = getCurrentInstance()

	if (instance) {
		instance.exposed = instance.exposed || {}

		Object.keys(exposeObj as any).forEach(key => {
			;(instance.exposed as any)[key] = (exposeObj as any)[key]
		})
	}
}
