# 主题定制

MengXi Uni-UI 采用 **SCSS 变量 + CSS 变量**双层主题系统，全部颜色以 `--mx-*` CSS 变量暴露，方便运行时覆盖与明暗主题切换。

## 通过 CSS 变量覆盖

在 `page`（小程序）或 `:root`（H5）上覆盖即可全局生效：

```css
page {
  --mx-primary-color: #1989fa;
  --mx-danger-color: #ee0a24;
  --mx-text-color: #323233;
  --mx-radius-lg: 12px;
}
```

## 常用变量

| 变量                 | 说明     | 默认值  |
| -------------------- | -------- | ------- |
| --mx-primary-color   | 主题色   | #1989fa |
| --mx-success-color   | 成功色   | #07c160 |
| --mx-warning-color   | 警告色   | #ff976a |
| --mx-danger-color    | 危险色   | #ee0a24 |
| --mx-text-color      | 主文字   | #323233 |
| --mx-text-color-2    | 次级文字 | #969799 |
| --mx-text-color-3    | 占位文字 | #c8c9cc |
| --mx-background      | 页面背景 | #f7f8fa |
| --mx-background-2    | 组件背景 | #ffffff |
| --mx-border-color    | 边框     | #ebedf0 |
| --mx-radius-sm/md/lg | 圆角     | 2/4/8px |

## 通过 ConfigProvider 局部定制

`<mx-config-provider>` 可在局部覆盖主题变量（支持深色主题）：

```vue
<mx-config-provider :theme-vars="{ '--mx-primary-color': '#ff976a' }">
  <mx-button type="primary">按钮</mx-button>
</mx-config-provider>
```

## SCSS 变量（编译期）

在 uni-app 项目中可通过 `@use` 引入组件库 SCSS 变量：

```scss
@use '@mengxi/uni-ui/src/styles/variables.scss' as *;

.my-class {
  color: $primary-color;
}
```
