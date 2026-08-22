import { shallowRef } from 'vue'
import type { Slot } from 'vue'

/**
 * 文档页 Demo 与右侧手机模拟器共享的插槽存储。
 *
 * 每个 <demo-live> 仅在客户端 onMounted 时把默认插槽注册进来，右侧手机
 * 模拟器（mx-simulator.vue）读取并渲染同一份插槽。这样组件在「文档预览区」
 * 与「手机屏幕」两处各有一份独立实例，均可交互；SSR 阶段 store 为空，
 * 手机屏内容纯客户端产生，避免 hydration 双份问题。组件卸载时移除自己的插槽。
 */
export const simulatorSlots = shallowRef<Slot[]>([])

export function registerDemoSlot(slot: Slot) {
  if (simulatorSlots.value.includes(slot)) return
  simulatorSlots.value = [...simulatorSlots.value, slot]
}

export function unregisterDemoSlot(slot: Slot) {
  simulatorSlots.value = simulatorSlots.value.filter((s) => s !== slot)
}
