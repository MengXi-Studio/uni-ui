<template>
  <header class="mx-header">
    <div class="mx-header__top">
      <!-- 移动端菜单按钮 -->
      <button class="mx-header__hamburger" aria-label="打开菜单" @click="toggleSidebar">
        <span class="line" />
        <span class="line" />
        <span class="line" />
      </button>

      <!-- 左侧 logo 区 -->
      <a class="mx-header__logo" href="/">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="mx-header-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #4fc3f7" />
              <stop offset="100%" style="stop-color: #1976d2" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="7" fill="url(#mx-header-logo-grad)" />
          <path d="M10 13 L16 10 L22 13 L22 19 L16 22 L10 19 Z" fill="white" opacity="0.95" />
        </svg>
        <span class="mx-header__title">MengXi Uni-UI</span>
        <span class="mx-header__subtitle">（适用于 uni-app）</span>
      </a>

      <!-- 右侧导航 -->
      <ul class="mx-header__top-nav">
        <li class="mx-header__top-nav-item">
          <a
            class="mx-header__link"
            href="https://github.com/MengXi-Studio/mengxi-uni-ui"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path
                fill="#fff"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </li>

        <!-- 主题切换 -->
        <li class="mx-header__top-nav-item">
          <a class="mx-header__link" title="切换主题" @click="toggleTheme">
            <svg v-if="!isDark" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path
                fill="#fff"
                d="M12 22c5.523 0 10-4.477 10-10 0-.463-.032-.919-.093-1.366a1 1 0 011.576-.916c.68.46 1.492.697 2.334.604a8.001 8.001 0 01-8.653-8.653 5 5 0 01.604 2.334 1 1 0 01-.916 1.576A10.13 10.13 0 0012 2C6.477 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 118-8 8 8 0 01-8 8zM6.5 12a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zm2 0a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z"
                transform="scale(0.92) translate(1, 1)"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path
                fill="#fff"
                d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-13.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm0 17c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8.5-8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm17 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5.64 6.64c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12zm12.72 12.72c-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12zm-2.12-12.72c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12zM5.64 19.36c-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0z"
              />
            </svg>
          </a>
        </li>

        <!-- 版本切换 -->
        <li ref="versionRef" class="mx-header__top-nav-item">
          <span class="mx-header__cube mx-header__version" @click="toggleVersionPop">
            {{ version }}
            <transition name="mx-header-dropdown">
              <div v-if="showVersionPop" class="mx-header__version-pop">
                <div
                  v-for="item in versions"
                  :key="item.label"
                  class="mx-header__version-pop-item"
                  :class="{ active: item.label === version }"
                  @click="onSwitchVersion(item)"
                >
                  {{ item.label }}
                </div>
              </div>
            </transition>
          </span>
        </li>

        <!-- 语言切换 -->
        <li class="mx-header__top-nav-item">
          <span class="mx-header__cube" title="暂无英文文档">EN</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const version = 'v0.1.0'
const versions = [
  { label: 'v0.1.0', link: 'https://github.com/MengXi-Studio/mengxi-uni-ui/releases' },
]

const showVersionPop = ref(false)
const versionRef = ref<HTMLElement | null>(null)

function toggleTheme() {
  isDark.value = !isDark.value
}

function toggleVersionPop() {
  showVersionPop.value = !showVersionPop.value
}

function onSwitchVersion(item: { label: string; link?: string }) {
  showVersionPop.value = false
  if (item.link) window.open(item.link, '_blank')
}

function checkHideVersionPop(e: MouseEvent) {
  if (versionRef.value && !versionRef.value.contains(e.target as Node)) {
    showVersionPop.value = false
  }
}

function toggleSidebar() {
  document.body.classList.toggle('mx-sidebar-open')
}

onMounted(() => {
  document.addEventListener('click', checkHideVersionPop)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', checkHideVersionPop)
})
</script>

<style scoped>
/* 对齐 Vant 官网 van-doc-header：#011f3c 背景、64px 高 */
.mx-header {
  position: relative;
  z-index: 2;
  width: 100%;
  background-color: #011f3c;
  user-select: none;
}

html.dark .mx-header {
  background-color: rgba(1, 31, 60, 0.3);
}

.mx-header__top {
  display: flex;
  align-items: center;
  height: 64px;
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 32px;
}

/* 左侧 logo */
.mx-header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.mx-header__logo svg {
  display: inline-block;
  width: 28px;
  margin-right: 12px;
}

.mx-header__title {
  color: #fff;
  font-size: 22px;
  font-weight: 500;
}

.mx-header__subtitle {
  color: #999;
  margin-left: 4px;
  font-size: 13px;
}

/* 右侧导航 */
.mx-header__top-nav {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mx-header__top-nav-item {
  position: relative;
  margin-left: 16px;
}

.mx-header__link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.mx-header__link svg {
  display: block;
  width: 30px;
  height: 30px;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mx-header__link:hover svg {
  transform: scale(1.2);
}

/* 版本/语言胶囊（对齐 van-doc-header__cube） */
.mx-header__cube {
  position: relative;
  display: block;
  padding: 0 12px;
  color: #001938;
  background: #f7f8fa;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.mx-header__version {
  padding-right: 20px;
}

.mx-header__version::after {
  position: absolute;
  top: 10px;
  right: 9px;
  width: 5px;
  height: 5px;
  color: #001938;
  border: 1px solid;
  border-color: transparent transparent currentColor currentColor;
  transform: rotate(-45deg);
  content: '';
}

/* 版本下拉（对齐 van-doc-header__version-pop） */
.mx-header__version-pop {
  position: absolute;
  top: 34px;
  left: 0;
  width: 100%;
  z-index: 99;
  color: #333;
  line-height: 36px;
  text-align: left;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px #ebedf0;
  transform-origin: top;
  transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.mx-header__version-pop-item {
  padding-left: 12px;
  transition: 0.2s;
}

.mx-header__version-pop-item:hover,
.mx-header__version-pop-item.active {
  color: #1989fa;
  background-color: #f7f8fa;
}

/* 下拉过渡 */
.mx-header-dropdown-enter-active,
.mx-header-dropdown-leave-active {
  transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.mx-header-dropdown-enter-from,
.mx-header-dropdown-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

/* 移动端菜单按钮（<960px 显示） */
.mx-header__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mx-header__hamburger .line {
  display: block;
  width: 20px;
  height: 2px;
  margin: 0 auto;
  background: #fff;
  border-radius: 1px;
}

@media (max-width: 960px) {
  .mx-header__hamburger {
    display: flex;
  }

  .mx-header__top {
    padding: 0 16px;
  }

  .mx-header__subtitle {
    display: none;
  }

  .mx-header__title {
    font-size: 18px;
  }
}
</style>
