import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
      '@components': path.resolve(__dirname, 'packages/components'),
      '@utils': path.resolve(__dirname, 'packages/utils'),
      '@composables': path.resolve(__dirname, 'packages/composables'),
      '@styles': path.resolve(__dirname, 'packages/styles'),
      '@types': path.resolve(__dirname, 'packages/types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 仅注入编译期变量与 mixins, 避免每个组件重复输出全局样式
        additionalData: '@use "@styles/variables.scss" as *;\n@use "@styles/mixins.scss" as *;',
      },
    },
  },
})
