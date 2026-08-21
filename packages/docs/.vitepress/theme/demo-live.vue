<template>
  <div class="demo-live">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 在线交互 Demo 容器：包裹组件示例，渲染为带边框的预览卡片
defineSlots<{ default: () => unknown }>()
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
