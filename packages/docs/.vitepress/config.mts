import { defineConfig } from 'vitepress'

// 参考 Vant 官网分类组织的文档站点
export default defineConfig({
  lang: 'zh-CN',
  title: 'MengXi Uni-UI',
  description: '基于 Vue 3 + TypeScript 的高质量 uni-app 组件库',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/quickstart' },
      { text: '组件', link: '/components/basic/button' },
      { text: 'GitHub', link: 'https://github.com/MengXi-Studio/mengxi-uni-ui' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
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
            { text: 'Popup 弹出层', link: '/components/basic/popup' },
            { text: 'Switch 开关', link: '/components/basic/switch' },
          ],
        },
        {
          text: '表单组件',
          items: [{ text: 'Field 输入框', link: '/components/form/field' }],
        },
        {
          text: '反馈组件',
          items: [{ text: 'Dialog 弹出框', link: '/components/feedback/dialog' }],
        },
      ],
    },
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2024 MengXi Studio',
    },
  },
})