import { defineConfig } from 'vitepress'

// 参考 Vant 官网分类组织的文档站点（自定义 theme 还原 Vant 视觉）
export default defineConfig({
  lang: 'zh-CN',
  title: 'MengXi Uni-UI',
  description: '基于 Vue 3 + TypeScript 的高质量 uni-app 组件库',
  appearance: false,
  lastUpdated: true,
  cleanUrls: false,
  // 静音 Dart Sass legacy-js-api 弃用警告（官网使用组件库 scss）
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
  themeConfig: {
    outline: { level: [2, 3], label: '目录' },
    search: {
      provider: 'local',
      options: {
        translations: { button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' } },
      },
    },
    nav: [],
    sidebar: {
      '/': [
        {
          text: '开发指南',
          items: [
            { text: '介绍', link: '/' },
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/basic/button' },
            { text: 'Cell 单元格', link: '/components/basic/cell' },
            { text: 'Icon 图标', link: '/components/basic/icon' },
            { text: 'Tag 标签', link: '/components/basic/tag' },
            { text: 'Badge 徽标', link: '/components/basic/badge' },
            { text: 'Loading 加载', link: '/components/basic/loading' },
            { text: 'Skeleton 骨架屏', link: '/components/basic/skeleton' },
            { text: 'Switch 开关', link: '/components/basic/switch' },
            { text: 'Row/Col 布局', link: '/components/basic/row-col' },
            { text: 'Popup 弹出层', link: '/components/basic/popup' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Field 输入框', link: '/components/form/field' },
            { text: 'Rate 评分', link: '/components/form/rate' },
            { text: 'Stepper 步进器', link: '/components/form/stepper' },
            { text: 'Search 搜索', link: '/components/form/search' },
            { text: 'Picker 选择器', link: '/components/form/picker' },
            { text: 'Uploader 文件上传', link: '/components/form/uploader' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Toast 轻提示', link: '/components/feedback/toast' },
            { text: 'Notify 消息通知', link: '/components/feedback/notify' },
            { text: 'Dialog 弹出框', link: '/components/feedback/dialog' },
            { text: 'ActionSheet 动作面板', link: '/components/feedback/action-sheet' },
            { text: 'Empty 空状态', link: '/components/feedback/empty' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'NavBar 导航栏', link: '/components/nav/nav-bar' },
            { text: 'Tabs 标签页', link: '/components/nav/tabs' },
            { text: 'Tabbar 标签栏', link: '/components/nav/tabbar' },
            { text: 'Grid 宫格', link: '/components/nav/grid' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/basic/button' },
            { text: 'Cell 单元格', link: '/components/basic/cell' },
            { text: 'Icon 图标', link: '/components/basic/icon' },
            { text: 'Tag 标签', link: '/components/basic/tag' },
            { text: 'Badge 徽标', link: '/components/basic/badge' },
            { text: 'Loading 加载', link: '/components/basic/loading' },
            { text: 'Skeleton 骨架屏', link: '/components/basic/skeleton' },
            { text: 'Switch 开关', link: '/components/basic/switch' },
            { text: 'Row/Col 布局', link: '/components/basic/row-col' },
            { text: 'Popup 弹出层', link: '/components/basic/popup' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Field 输入框', link: '/components/form/field' },
            { text: 'Rate 评分', link: '/components/form/rate' },
            { text: 'Stepper 步进器', link: '/components/form/stepper' },
            { text: 'Search 搜索', link: '/components/form/search' },
            { text: 'Picker 选择器', link: '/components/form/picker' },
            { text: 'Uploader 文件上传', link: '/components/form/uploader' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Toast 轻提示', link: '/components/feedback/toast' },
            { text: 'Notify 消息通知', link: '/components/feedback/notify' },
            { text: 'Dialog 弹出框', link: '/components/feedback/dialog' },
            { text: 'ActionSheet 动作面板', link: '/components/feedback/action-sheet' },
            { text: 'Empty 空状态', link: '/components/feedback/empty' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'NavBar 导航栏', link: '/components/nav/nav-bar' },
            { text: 'Tabs 标签页', link: '/components/nav/tabs' },
            { text: 'Tabbar 标签栏', link: '/components/nav/tabbar' },
            { text: 'Grid 宫格', link: '/components/nav/grid' },
          ],
        },
      ],
    },
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2024 MengXi Studio',
    },
  },
})