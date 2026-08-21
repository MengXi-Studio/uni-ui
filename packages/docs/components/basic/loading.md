# Loading 加载

用于加载中的提示状态。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-loading />
<mx-loading color="#1989fa" />
```

## 圆环 / 转圈

```vue
<mx-loading type="circular" />
<mx-loading type="spinner" />
```

## 文字与方向

```vue
<mx-loading text="加载中..." />
<mx-loading vertical text="加载中..." />
```

## API

### Props

| 参数     | 说明         | 类型                  | 默认值     |
| -------- | ------------ | --------------------- | ---------- |
| type     | 加载图标类型 | `circular \| spinner` | `circular` |
| size     | 图标大小     | `number \| string`    | `30px`     |
| color    | 颜色         | `string`              | `#c8c9cc`  |
| text     | 加载文字     | `string`              | -          |
| vertical | 是否垂直排列 | `boolean`             | `false`    |
