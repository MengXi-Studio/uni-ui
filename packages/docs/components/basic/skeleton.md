# Skeleton 骨架屏

用于在页面加载时占位，缓解加载中出现的白屏。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-skeleton :row="3" :avatar="true" />
```

## 关闭动画 / 自定宽度

```vue
<mx-skeleton :row="2" :animate="false" />
<mx-skeleton :row="2" row-width="50%" />
```

## API

### Props

| 参数         | 说明             | 类型                 | 默认值  |
| ------------ | ---------------- | -------------------- | ------- |
| row          | 段落行数         | `number`             | `0`     |
| title        | 是否显示标题占位 | `boolean`            | `true`  |
| avatar       | 是否显示头像占位 | `boolean`            | `false` |
| avatar-shape | 头像形状         | `round \| square`    | `round` |
| avatar-size  | 头像尺寸         | `number \| string`   | `32px`  |
| row-width    | 段落行宽度       | `string \| string[]` | `100%`  |
| animate      | 是否显示动画     | `boolean`            | `true`  |
| round        | 是否圆角         | `boolean`            | `false` |

### Slots

`default` / `title` / `row` 可自定义各区域。
