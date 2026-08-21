<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <div class="mx-nav-extra">
        <a
          class="mx-nav-icon"
          href="https://github.com/MengXi-Studio/mengxi-uni-ui"
          target="_blank"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </a>
        <button class="mx-nav-icon mx-theme-toggle" title="切换主题">
          <svg class="sun" viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-13.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm0 17c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8.5-8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm17 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5.64 6.64c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12zm12.72 12.72c-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12zm-2.12-12.72c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12zM5.64 19.36c-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0z"
            />
          </svg>
        </button>
        <div class="mx-nav-version">
          <span>0.1.0</span>
          <svg viewBox="0 0 24 24" width="12" height="12">
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <div class="mx-nav-lang">ZH</div>
      </div>
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

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
</script>
