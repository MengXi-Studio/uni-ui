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
        additionalData: '@use "@styles/index.scss" as *;',
      },
    },
  },
})
