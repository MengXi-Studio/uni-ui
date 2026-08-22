# Divider 分割线

用于分隔内容的分割线，对齐 Vant Divider 的 API 与交互。

## 基础用法

<demo-live>
  <mx-divider />
</demo-live>

```vue
<mx-divider />
```

## 展示文字

<demo-live>
  <mx-divider>文字</mx-divider>
</demo-live>

```vue
<mx-divider>文字</mx-divider>
```

## 内容位置

<demo-live>
  <mx-divider content-position="left">文字</mx-divider>
  <mx-divider content-position="right">文字</mx-divider>
</demo-live>

```vue
<mx-divider content-position="left">文字</mx-divider>
<mx-divider content-position="right">文字</mx-divider>
```

## 虚线

<demo-live>
  <mx-divider dashed>虚线分割线</mx-divider>
</demo-live>

```vue
<mx-divider dashed>虚线分割线</mx-divider>
```

## Props

| 参数             | 说明         | 类型                      | 默认值   |
| ---------------- | ------------ | ------------------------- | -------- |
| dashed           | 是否使用虚线 | `boolean`                 | `false`  |
| content-position | 内容位置     | `left \| center \| right` | `center` |
| custom-class     | 自定义类名   | `string`                  | `''`     |
| custom-style     | 自定义样式   | `string \| object`        | `''`     |

## Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 分割线中间的内容 |
