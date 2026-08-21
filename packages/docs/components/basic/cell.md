# Cell 单元格

单元格，配合 CellGroup 实现分组展示，对齐 Vant Cell。

## 基础用法

```vue
<mx-cell-group inset>
  <mx-cell title="单元格" value="内容" />
  <mx-cell title="带描述" label="描述信息" />
  <mx-cell title="带箭头" is-link />
</mx-cell-group>
```

## 右侧图标

```vue
<mx-cell title="箭头" is-link arrow-direction="down" />
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | `string` | - |
| label | 标题下描述 | `string` | - |
| value | 右侧内容 | `string \| number` | - |
| icon | 左侧图标 | `string` | - |
| is-link | 是否显示箭头 | `boolean` | `false` |
| arrow-direction | 箭头方向 | `up \| down \| left \| right` | `right` |
| border | 是否显示下边框 | `boolean` | `true` |
| size | 尺寸 | `large` | - |
| center | 是否垂直居中 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | event |

## Slots

`icon` / `title` / `label` / `default`（value 区域）/ `right-icon` / `arrow`