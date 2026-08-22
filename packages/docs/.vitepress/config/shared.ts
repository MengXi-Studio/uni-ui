import { defineConfig } from 'vitepress'

/** 网站部署基础路径（CI 注入，本地默认 /uni-ui/） */
const base = process.env.DOCS_BASE || '/uni-ui/'

/** 将根路径资源拼接到当前 base 下，避免子路径下 logo 等资源 404 */
const asset = (p: string) => base + p.replace(/^\//, '')

/**
 * 版本切换器导航项
 *
 * 当前仅发布 v0.1.0；后续版本迭代时在此追加
 */
export const versionNav = {
  text: 'v0.1.0',
  items: [{ text: 'v0.1.0', link: '/' }],
}

export const sharedConfig = defineConfig({
  /** 网站标题 */
  title: 'MengXi Uni-UI',

  lastUpdated: true,

  markdown: {
    /** 网站 Markdown 主题 */
    theme: {
      dark: 'one-dark-pro',
      light: 'github-light',
    },
  },

  /** 静音 Dart Sass legacy-js-api 弃用警告（官网使用组件库 scss） */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },

  /** 网站头标签 */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: asset('logo.svg') }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'MengXi Uni-UI' }],
    ['meta', { property: 'twitter:title', content: 'MengXi Uni-UI' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    [
      'meta',
      {
        property: 'twitter:description',
        content: '基于 Vue 3 + TypeScript 的高质量 uni-app 组件库',
      },
    ],
  ],

  /** 网站主题配置 */
  themeConfig: {
    /** 网站主题配置 logo（VitePress 自动拼 base，无需处理） */
    logo: '/logo.svg',

    /** 网站主题配置 社交链接 */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MengXi-Studio/mengxi-uni-ui' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@mengxi/uni-ui' },
    ],

    /** 网站主题配置 页脚 */
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present 梦曦工作室',
    },
  },
})
