---
sidebar: true
aside: true
outline: false
pageClass: mx-home
---

<div class="mx-home-page">

<div class="mx-home-hero">
  <div class="mx-home-logo">
    <svg viewBox="0 0 120 120" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mx-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4fc3f7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1976d2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#mx-logo-grad)"/>
      <path d="M38 48 L60 35 L82 48 L82 72 L60 85 L38 72 Z" fill="white" opacity="0.95"/>
      <path d="M60 35 L60 58 L82 48" fill="white" opacity="0.6"/>
      <path d="M60 58 L60 85 L38 72" fill="white" opacity="0.35"/>
    </svg>
  </div>
  <h1 class="mx-home-title">MengXi Uni-UI</h1>
  <p class="mx-home-subtitle">轻量、可定制的移动端 uni-app 组件库</p>
</div>

## 介绍

MengXi Uni-UI 是一个**轻量、可定制的移动端组件库**，基于 Vue 3 + TypeScript 构建，专为 uni-app 多端开发设计。

目前支持 **H5、微信小程序、App** 等多个平台，并严格对齐 Vant 组件规范，提供一致的开发体验。

## 特性

- 🚀 **性能极佳**，组件平均体积小于 1KB（min+gzip）
- 🚀 **40+ 个高质量组件**，覆盖移动端主流场景
- 🚀 **零外部依赖**，不依赖三方 npm 包
- 📒 **使用 TypeScript 编写**，提供完整的类型定义
- 📖 **提供丰富的中文文档和组件示例**
- 🎨 **支持 Vue 3 和 uni-app**
- 🎨 **支持主题定制**，内置 200+ 个主题变量
- 🎨 **支持按需引入**，配合 easycom 自动注册
- ♿ **支持无障碍访问**（持续改进中）
- 🌙 **支持深色模式**
- 🖥 **支持服务器端渲染**

## 快速开始

### 安装

```bash
npm i @mengxi/uni-ui
```

### 配置 easycom

在 `pages.json` 中配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
    }
  }
}
```

### 使用组件

```html
<template>
  <mx-button type="primary">主要按钮</mx-button>
</template>
```

## 浏览器支持

MengXi Uni-UI 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0。

## 链接

- [意见反馈](https://github.com/MengXi-Studio/mengxi-uni-ui/issues)
- [更新日志](https://github.com/MengXi-Studio/mengxi-uni-ui/releases)
- [GitHub](https://github.com/MengXi-Studio/mengxi-uni-ui)

</div>
