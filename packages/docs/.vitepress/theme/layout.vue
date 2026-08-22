<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <MxHeader />
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

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

function closeSidebar() {
  document.body.classList.remove('mx-sidebar-open')
}
</script>
