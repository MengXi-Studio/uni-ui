# Badge 徽标

在元素右上角展示消息数量或状态圆点。

## 基础用法

```vue
<mx-badge :content="5"><mx-tag>徽标</mx-tag></mx-badge>
```

## 最大值（超限显示加号）

```vue
<mx-badge :content="200" :max="99"><mx-tag>徽标</mx-tag></mx-badge>
```

## 圆点 / 自定义颜色

```vue
<mx-badge dot><mx-tag>圆点</mx-tag></mx-badge>
<mx-badge :content="5" bg-color="#07c160"><mx-tag>自定义色</mx-tag></mx-badge>
```

## API

### Props

| 参数     | 说明                                   | 类型               | 默认值   |
| -------- | -------------------------------------- | ------------------ | -------- |
| content  | 徽标内容                               | `number \| string` | -        |
| max      | 最大值，超过显示 max+                  | `number`           | `99`     |
| dot      | 是否显示为圆点                         | `boolean`          | `false`  |
| color    | 颜色（primary/success/warning/danger） | `string`           | `danger` |
| bg-color | 自定义背景色                           | `string`           | -        |
| offset   | 偏移 [x, y]                            | `[number, number]` | `[0, 0]` |
