# Row/Col 布局

基于 flex 的栅格布局，24 等分。

## 基础用法

```vue
<mx-row :gutter="12">
  <mx-col :span="8">span 8</mx-col>
  <mx-col :span="8">span 8</mx-col>
  <mx-col :span="8">span 8</mx-col>
</mx-row>
```

## 偏移 / 对齐

```vue
<mx-row justify="space-between">
  <mx-col :span="8" :offset="2">offset 2</mx-col>
  <mx-col :span="8">列</mx-col>
</mx-row>
```

## API

### Row Props

| 参数    | 说明         | 类型                                                                      | 默认值  |
| ------- | ------------ | ------------------------------------------------------------------------- | ------- |
| gutter  | 列间距（px） | `number`                                                                  | `0`     |
| justify | 主轴对齐     | `start \| end \| center \| space-around \| space-between \| space-evenly` | `start` |

### Col Props

| 参数   | 说明           | 类型               | 默认值 |
| ------ | -------------- | ------------------ | ------ |
| span   | 列占位（1~24） | `number \| string` | `24`   |
| offset | 左侧偏移       | `number \| string` | `0`    |
