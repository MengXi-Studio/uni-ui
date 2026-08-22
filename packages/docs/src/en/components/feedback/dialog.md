# Dialog

A dialog popup that supports a title, content, confirm/cancel buttons and a close icon.

## Basic Usage

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

| Name                   | Description                                              | Type                                      | Default |
| ---------------------- | -------------------------------------------------------- | ----------------------------------------- | ------- |
| show                   | Whether to show (v-model)                                | `boolean`                                 | `false` |
| title                  | Title                                                    | `string`                                  | -       |
| content                | Content                                                  | `string`                                  | -       |
| show-confirm-button    | Whether to show the confirm button                       | `boolean`                                 | `true`  |
| show-cancel-button     | Whether to show the cancel button                        | `boolean`                                 | `false` |
| confirm-button-text    | Confirm button text                                      | `string`                                  | `确定`  |
| cancel-button-text     | Cancel button text                                       | `string`                                  | `取消`  |
| close-on-click-overlay | Whether to close when clicking the overlay               | `boolean`                                 | `true`  |
| before-close           | Callback before close, return `false` to prevent closing | `(action) => boolean \| Promise<boolean>` | -       |

## Events

| Event       | Description                       |
| ----------- | --------------------------------- |
| confirm     | Triggered when confirm is clicked |
| cancel      | Triggered when cancel is clicked  |
| open        | When opened                       |
| close       | When closed                       |
| update:show | Show state update                 |

## Slots

`default` (title area) / `content`
