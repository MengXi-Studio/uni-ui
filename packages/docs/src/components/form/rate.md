# Rate 评分

用于评分，支持半星、只读、禁用等。

## 基础用法

<demo-live>
  <demo-rate />
</demo-live>

```vue
<mx-rate v-model="value" count="5" />
```

## 半星

```vue
<mx-rate v-model="value" allow-half />
```

## 只读 / 禁用 / 自定义颜色

```vue
<mx-rate v-model="value" readonly />
<mx-rate v-model="value" disabled />
<mx-rate v-model="value" color="#ffd21e" count="6" />
```

## API

### Props

| 参数        | 说明            | 类型               | 默认值               |
| ----------- | --------------- | ------------------ | -------------------- |
| model-value | 分值（v-model） | `number`           | `0`                  |
| count       | 图标总数        | `number`           | `5`                  |
| allow-half  | 是否允许半选    | `boolean`          | `false`              |
| readonly    | 只读            | `boolean`          | `false`              |
| disabled    | 禁用            | `boolean`          | `false`              |
| size        | 图标大小        | `number \| string` | `20px`               |
| color       | 选中颜色        | `string`           | `--mx-primary-color` |
| void-color  | 未选中颜色      | `string`           | `--mx-text-color-3`  |
| gutter      | 间距            | `number`           | -                    |

### Events

| 事件名 | 说明       |
| ------ | ---------- |
| change | 分值变化时 |
