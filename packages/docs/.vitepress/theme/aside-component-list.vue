<template>
  <div class="mx-aside-components">
    <div class="mx-aside-header">
      <div class="mx-aside-logo">
        <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
          <rect width="32" height="32" rx="7" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #4fc3f7" />
              <stop offset="100%" style="stop-color: #1976d2" />
            </linearGradient>
          </defs>
          <path d="M10 13 L16 10 L22 13 L22 19 L16 22 L10 19 Z" fill="white" opacity="0.95" />
        </svg>
      </div>
      <div class="mx-aside-title">MengXi Uni-UI</div>
    </div>
    <div class="mx-aside-desc">轻量、可定制的移动端 uni-app 组件库</div>
    <div class="mx-aside-group-title">基础组件</div>
    <a
      v-for="item in basicComponents"
      :key="item.link"
      :href="item.link"
      class="mx-aside-link"
      :class="{ active: isActive(item.link) }"
    >
      {{ item.text }}
    </a>
    <div class="mx-aside-group-title">表单组件</div>
    <a
      v-for="item in formComponents"
      :key="item.link"
      :href="item.link"
      class="mx-aside-link"
      :class="{ active: isActive(item.link) }"
    >
      {{ item.text }}
    </a>
    <div class="mx-aside-group-title">反馈组件</div>
    <a
      v-for="item in feedbackComponents"
      :key="item.link"
      :href="item.link"
      class="mx-aside-link"
      :class="{ active: isActive(item.link) }"
    >
      {{ item.text }}
    </a>
    <div class="mx-aside-group-title">导航组件</div>
    <a
      v-for="item in navComponents"
      :key="item.link"
      :href="item.link"
      class="mx-aside-link"
      :class="{ active: isActive(item.link) }"
    >
      {{ item.text }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()

const basicComponents = [
  { text: 'Button 按钮', link: '/components/basic/button.html' },
  { text: 'Cell 单元格', link: '/components/basic/cell.html' },
  { text: 'Icon 图标', link: '/components/basic/icon.html' },
  { text: 'Tag 标签', link: '/components/basic/tag.html' },
  { text: 'Badge 徽标', link: '/components/basic/badge.html' },
  { text: 'Loading 加载', link: '/components/basic/loading.html' },
  { text: 'Skeleton 骨架屏', link: '/components/basic/skeleton.html' },
  { text: 'Switch 开关', link: '/components/basic/switch.html' },
  { text: 'Row/Col 布局', link: '/components/basic/row-col.html' },
  { text: 'Popup 弹出层', link: '/components/basic/popup.html' },
]

const formComponents = [
  { text: 'Field 输入框', link: '/components/form/field.html' },
  { text: 'Rate 评分', link: '/components/form/rate.html' },
  { text: 'Stepper 步进器', link: '/components/form/stepper.html' },
  { text: 'Search 搜索', link: '/components/form/search.html' },
  { text: 'Picker 选择器', link: '/components/form/picker.html' },
  { text: 'Uploader 文件上传', link: '/components/form/uploader.html' },
]

const feedbackComponents = [
  { text: 'Toast 轻提示', link: '/components/feedback/toast.html' },
  { text: 'Notify 消息通知', link: '/components/feedback/notify.html' },
  { text: 'Dialog 弹出框', link: '/components/feedback/dialog.html' },
  { text: 'ActionSheet 动作面板', link: '/components/feedback/action-sheet.html' },
  { text: 'Empty 空状态', link: '/components/feedback/empty.html' },
]

const navComponents = [
  { text: 'NavBar 导航栏', link: '/components/nav/nav-bar.html' },
  { text: 'Tabs 标签页', link: '/components/nav/tabs.html' },
  { text: 'Tabbar 标签栏', link: '/components/nav/tabbar.html' },
  { text: 'Grid 宫格', link: '/components/nav/grid.html' },
]

function isActive(link: string) {
  return route.path === link.replace('.html', '')
}
</script>

<style scoped>
.mx-aside-components {
  padding: 20px 0;
}
.mx-aside-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-bottom: 4px;
}
.mx-aside-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mx-aside-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--mx-text-1);
}
.mx-aside-desc {
  font-size: 12px;
  color: var(--mx-text-3);
  margin-bottom: 16px;
  padding: 0 16px;
}
.mx-aside-group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--mx-text-3);
  padding: 10px 16px 4px;
  letter-spacing: 0.5px;
}
.mx-aside-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  font-size: 13px;
  color: var(--mx-text-2);
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s;
}
.mx-aside-link::after {
  content: '>';
  font-size: 12px;
  color: var(--mx-text-3);
  opacity: 0.5;
}
.mx-aside-link:hover {
  color: var(--mx-brand);
}
.mx-aside-link:hover::after {
  color: var(--mx-brand);
  opacity: 0.8;
}
.mx-aside-link.active {
  color: var(--mx-brand);
  font-weight: 500;
}
</style>
