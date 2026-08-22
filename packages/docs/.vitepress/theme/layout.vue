<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <MxHeader />
      <MxSimulator />
      <div class="mx-sidebar-mask" @click="closeSidebar" />
    </template>
    <template #aside-top>
      <AsideComponentList v-if="isHome" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed, onMounted, watch } from 'vue'
import AsideComponentList from './aside-component-list.vue'
import MxHeader from './mx-header.vue'
import MxSimulator from './mx-simulator.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

// 组件文档页显示右侧手机模拟器，内容区让位（body.mx-has-sim 由 style.css 消费）
// 仅在客户端操作 document（SSR 阶段守卫）
function applySimulatorClass(path: string) {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('mx-has-sim', path.startsWith('/components/'))
}

onMounted(() => applySimulatorClass(route.path))
watch(() => route.path, applySimulatorClass)

function closeSidebar() {
  document.body.classList.remove('mx-sidebar-open')
}
</script>
