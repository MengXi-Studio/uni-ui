/**
 * useRect: 通过 uni.createSelectorQuery 获取节点布局信息 (多端兼容)
 */
import { onMounted, ref, type Ref } from 'vue'

export interface Rect {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

/**
 * 获取节点尺寸
 * @param selector 选择器 (已加 . 前缀) 或组件实例
 */
export function useRect(
  selector: string,
  parent: Ref<unknown> | undefined
): Promise<Rect | null> {
  return new Promise((resolve) => {
    if (!selector || !parent?.value) {
      resolve(null)
      return
    }

    const query = uni.createSelectorQuery()
    try {
      // 传入组件实例可限定在组件内部查询 (App/小程序)
      ;(query as any).in(parent.value)
    } catch (e) {
      /* App 端 in 仅支持组件实例, 忽略即可 */
    }

    query
      .select(selector)
      .boundingClientRect((res: any) => {
        resolve(
          res
            ? {
                top: res.top ?? 0,
                bottom: res.bottom ?? 0,
                left: res.left ?? 0,
                right: res.right ?? 0,
                width: res.width ?? 0,
                height: res.height ?? 0,
              }
            : null
        )
      })
      .exec()
  })
}

/**
 * 对组件的根节点进行 rect 测量 (setup 中调用)
 */
export function useElementRect(selector: string) {
  const nodeRef = ref<unknown>(null)
  const rect = ref<Rect | null>(null)

  const getRect = () => useRect(selector, nodeRef.closed ? undefined : nodeRef.value as any)

  onMounted(() => {
    /* 延迟一帧, 确保渲染完成 */
    setTimeout(() => {
      getRect()
    }, 0)
  })

  return { nodeRef, rect, getRect }
}