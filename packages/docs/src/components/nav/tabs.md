# Tabs 标签页

在当前页面中切换不同内容。

## 基础用法

<demo-live>
  <demo-tabs />
</demo-live>

```vue
<mx-tabs v-model="active">
  <mx-tab-pane title="标签 1" name="1">内容 1</mx-tab-pane>
  <mx-tab-pane title="标签 2" name="2">内容 2</mx-tab-pane>
  <mx-tab-pane title="标签 3" name="3">内容 3</mx-tab-pane>
</mx-tabs>
```

## 自定义颜色 / 吸顶

```vue
<mx-tabs v-model="active" active-color="#ee0a24" />
<mx-tabs v-model="active" sticky />
```

## 禁用某页

```vue
<mx-tab-pane title="禁用" name="1" disabled>禁用内容</mx-tab-pane>
```

## API

### Tabs Props

| 参数         | 说明                  | 类型               | 默认值               |
| ------------ | --------------------- | ------------------ | -------------------- |
| model-value  | 当前激活页（v-model） | `string \| number` | -                    |
| active-color | 选中颜色              | `string`           | `--mx-primary-color` |
| color        | 未选中颜色            | `string`           | `--mx-text-color`    |
| sticky       | 是否吸顶              | `boolean`          | `false`              |
| line-width   | 下划线宽度            | `number \| string` | `40`                 |

### Tabs Events

`change`（切换时）/ `click-tab`

### TabPane Props

`title` / `name` / `disabled` / `badge` / `dot`
