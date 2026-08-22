# Dialog 弹出框

弹出框，支持标题、内容、确认/取消按钮与关闭图标。

## 基础用法

```vue
<mx-dialog
  v-model:show="show"
  title="标题"
  content="这是一个弹窗"
  confirm-button-text="确定"
  cancel-button-text="取消"
  show-cancel-button
  @confirm="onConfirm"
/>
```

## Props

| 参数                   | 说明                              | 类型                                      | 默认值  |
| ---------------------- | --------------------------------- | ----------------------------------------- | ------- |
| show                   | 是否显示（v-model）               | `boolean`                                 | `false` |
| title                  | 标题                              | `string`                                  | -       |
| content                | 内容                              | `string`                                  | -       |
| show-confirm-button    | 显示确认按钮                      | `boolean`                                 | `true`  |
| show-cancel-button     | 显示取消按钮                      | `boolean`                                 | `false` |
| confirm-button-text    | 确认按钮文案                      | `string`                                  | `确定`  |
| cancel-button-text     | 取消按钮文案                      | `string`                                  | `取消`  |
| close-on-click-overlay | 点击遮罩关闭                      | `boolean`                                 | `true`  |
| before-close           | 关闭前回调，返回 `false` 阻止关闭 | `(action) => boolean \| Promise<boolean>` | -       |

## Events

| 事件名      | 说明     |
| ----------- | -------- |
| confirm     | 点击确认 |
| cancel      | 点击取消 |
| open        | 打开时   |
| close       | 关闭时   |
| update:show | 显隐更新 |

## Slots

`default`（标题区）/ `content`
