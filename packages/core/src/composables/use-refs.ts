/**
 * useRefs: 动态管理多个节点引用 (对齐 Vant useRefs)
 */
import { ref, type Ref } from 'vue'

type RefObject<T> = Ref<T | null>

export function useRefs<T>(): {
  refs: Ref<(T | null)[]>
  setRefs: (index: number) => (el: T | null) => void
} {
  const refs = ref<(T | null)[]>([])

  const setRefs = (index: number) => (el: T | null) => {
    if (index >= refs.value.length) refs.value = [...refs.value, ...Array(index - refs.value.length + 1).fill(null)]
    refs.value[index] = el
  }

  return { refs, setRefs }
}