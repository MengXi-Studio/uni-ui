<template>
  <div class="demo-live">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { registerDemoSlot, unregisterDemoSlot } from './simulator-store'

// 在线交互 Demo 容器：文档预览 + 右侧手机模拟器 双端展示同一份组件。
// 挂载时把默认插槽注册进 store，由右侧手机模拟器渲染第二份（独立实例、均可交互）。
const slots = defineSlots<{ default: () => unknown }>()
const defaultSlot = slots.default

onMounted(() => {
  if (defaultSlot) registerDemoSlot(defaultSlot)
})
onBeforeUnmount(() => {
  if (defaultSlot) unregisterDemoSlot(defaultSlot)
})
</script>

<style scoped>
.demo-live {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 24px;
  margin: 16px 0;
  background: #fff;
  border: 1px solid var(--mx-border, #ebedf0);
  border-radius: 8px;
  overflow: hidden;
}
.demo-live :deep(view),
.demo-live :deep(text) {
  /* 让 uni 标签的组件在 web 下正常参与 flex 布局 */
  box-sizing: border-box;
}
</style>
