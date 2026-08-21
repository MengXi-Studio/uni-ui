import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  // uni-app CLI 项目源码位于 src/
  root: 'src',
})