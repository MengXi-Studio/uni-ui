# Grid 宫格

以栅格形式展示元素。

## 基础用法

```vue
<mx-grid :column-num="3">
  <mx-grid-item icon="📁" text="文字" />
  <mx-grid-item icon="⚙️" text="设置" />
  <mx-grid-item icon="🛒" text="购物车" />
</mx-grid>
```

## 间距 / 方形

```vue
<mx-grid :column-num="2" :gutter="8" square>
  <mx-grid-item text="格子 1" />
  <mx-grid-item text="格子 2" />
</mx-grid>
```

## API

### Grid Props

| 参数       | 说明         | 类型      | 默认值  |
| ---------- | ------------ | --------- | ------- |
| column-num | 列数         | `number`  | `4`     |
| gutter     | 间距         | `number`  | `0`     |
| border     | 是否显示边框 | `boolean` | `true`  |
| square     | 是否为方形   | `boolean` | `false` |

### GridItem Props

| 参数 | 说明               | 类型     | 默认值 |
| ---- | ------------------ | -------- | ------ |
| icon | 图标（图片或字符） | `string` | -      |
| text | 文案               | `string` | -      |

### Events

`click`（点击格子）
