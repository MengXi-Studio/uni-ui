# @mengxi/uni-ui - uni-app/HBuilderX 示例项目

本目录是 **uni-app 组件库示例项目**，使用 **HBuilderX** 创建（非 CLI 方式）。

## 目录结构

```
uni-app/
├── App.vue              # 应用入口（引入了组件库全局样式）
├── main.js              # Vue3 createSSRApp 入口
├── pages.json           # 页面配置 + easycom 规则
├── manifest.json        # 应用配置（H5/微信/App 多端）
├── uni.scss             # 全局 SCSS 占位（可自定义 --mx-* 变量）
└── pages/
    └── index/index.vue  # 组件示例页
```

## 使用方式

1. 用 HBuilderX 打开本目录；
2. 将 `packages/core/src/components` 下的组件复制到本目录 `uni_modules/mengxi-uni-ui/components/`（对应 `pages.json` 中的 easycom 规则： `@/uni_modules/mengxi-uni-ui/components/mx-$1/mx-$1.vue`）；
3. HBuilderX 会按 easycom 规则自动按需注册组件，页面直接使用 `<mx-button>` 等即可；
4. 主题定制：在 `uni.scss` 覆盖 `--mx-*` CSS 变量。

> 组件库完整源码位于 `../core/`；在线文档见 `../docs/`；CLI 方式示例见 `../playground/`。
