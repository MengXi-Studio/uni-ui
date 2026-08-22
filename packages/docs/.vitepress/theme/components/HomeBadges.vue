<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const isZh = computed(() => lang.value && lang.value.startsWith('zh'))

const npmUrl = 'https://www.npmjs.com/package/@mengxi/uni-ui'
const githubUrl = 'https://github.com/MengXi-Studio/mengxi-uni-ui'
</script>

<template>
  <div class="home-badges">
    <a :href="npmUrl" target="_blank" rel="noopener">
      <img
        :alt="isZh ? 'npm 版本' : 'npm version'"
        src="https://img.shields.io/npm/v/@mengxi/uni-ui.svg?style=flat-square&color=1989fa"
      />
    </a>
    <a :href="npmUrl" target="_blank" rel="noopener">
      <img
        :alt="isZh ? 'npm 下载量' : 'npm downloads'"
        src="https://img.shields.io/npm/dm/@mengxi/uni-ui.svg?style=flat-square&color=42b883"
      />
    </a>
    <a :href="githubUrl" target="_blank" rel="noopener">
      <img
        alt="GitHub stars"
        src="https://img.shields.io/github/stars/MengXi-Studio/mengxi-uni-ui.svg?style=flat-square&color=42b883"
      />
    </a>
    <a :href="githubUrl" target="_blank" rel="noopener">
      <img
        alt="GitHub license"
        src="https://img.shields.io/github/license/MengXi-Studio/mengxi-uni-ui.svg?style=flat-square&color=35495e"
      />
    </a>
  </div>
</template>

<style scoped>
.home-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  margin-bottom: 8px;
}

.home-badges img {
  height: 20px;
  vertical-align: middle;
  transition: opacity 0.2s;
}

.home-badges a:hover img {
  opacity: 0.85;
}
</style>
