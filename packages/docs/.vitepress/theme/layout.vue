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
import { computed } from 'vue'
import AsideComponentList from './aside-component-list.vue'
import MxHeader from './mx-header.vue'
import MxSimulator from './mx-simulator.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

// 右侧手机模拟器显隐与内容区让位由 mx-simulator 组件自管

function closeSidebar() {
  document.body.classList.remove('mx-sidebar-open')
}
</script>
