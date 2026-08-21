/**
 * useExpose: 向父级组件暴露内部方法
 * 对齐 Vant useExpose (通过 getCurrentInstance().exposed 暴露)
 */
import { getCurrentInstance } from 'vue'

export function useExpose<T>(exposeObj: T) {
  const instance = getCurrentInstance()
  if (instance) {
    instance.exposed = instance.exposed || {}
    Object.keys(exposeObj as any).forEach((key) => {
      ;(instance.exposed as any)[key] = (exposeObj as any)[key]
    })
  }
}