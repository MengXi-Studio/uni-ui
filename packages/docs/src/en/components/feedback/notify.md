# Notify

A full-width message notification at the top of the page.

## Basic Usage

```vue
<mx-notify v-model:show="show" message="通知内容" />
```

## Types

```vue
<mx-notify v-model:show="show" type="success" message="成功" />
<mx-notify v-model:show="show" type="warning" message="警告" />
<mx-notify v-model:show="show" type="danger" message="危险" />
```

## Custom Color

```vue
<mx-notify v-model:show="show" :color="#fff" background="#1989fa" message="自定义" />
```

## API

### Props

| Name       | Description               | Type                                      | Default   |
| ---------- | ------------------------- | ----------------------------------------- | --------- |
| show       | Whether to show (v-model) | `boolean`                                 | `false`   |
| message    | Notification content      | `string`                                  | -         |
| type       | Type                      | `primary \| success \| warning \| danger` | `primary` |
| color      | Text color                | `string`                                  | `#fff`    |
| background | Background color          | `string`                                  | -         |
| duration   | Display duration (ms)     | `number`                                  | `3000`    |

### Instance Methods (expose)

`show()` / `close()`
