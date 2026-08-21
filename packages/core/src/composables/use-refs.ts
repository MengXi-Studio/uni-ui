/**
 * useRefs: 动态管理多个节点引用 (对齐 Vant useRefs)
 */
import { ref, type Ref } from 'vue'

export function useRefs<T>(): {
  refs: Ref<Array<T | null>>
  setRefs: (index: number) => (el: T | null) => void
} {
  // 显式断言规避 Vue Ref 对数组元素 UnwrapRef 深度展开导致的泛型不兼容
  const refs = ref<Array<T | null>>([]) as unknown as Ref<Array<T | null>>

  const setRefs = (index: number) => (el: T | null) => {
    while (refs.value.length <= index) refs.value.push(null)
    refs.value[index] = el
  }

  return { refs, setRefs }
}
