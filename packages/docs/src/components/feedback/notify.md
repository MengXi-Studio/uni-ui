# Notify 消息通知

页面顶部通栏消息提示。

## 基础用法

```vue
<mx-notify v-model:show="show" message="通知内容" />
```

## 类型

```vue
<mx-notify v-model:show="show" type="success" message="成功" />
<mx-notify v-model:show="show" type="warning" message="警告" />
<mx-notify v-model:show="show" type="danger" message="危险" />
```

## 自定义颜色

```vue
<mx-notify v-model:show="show" :color="#fff" background="#1989fa" message="自定义" />
```

## API

### Props

| 参数       | 说明                | 类型                                      | 默认值    |
| ---------- | ------------------- | ----------------------------------------- | --------- |
| show       | 是否显示（v-model） | `boolean`                                 | `false`   |
| message    | 通知内容            | `string`                                  | -         |
| type       | 类型                | `primary \| success \| warning \| danger` | `primary` |
| color      | 文字颜色            | `string`                                  | `#fff`    |
| background | 背景色              | `string`                                  | -         |
| duration   | 显示时长（ms）      | `number`                                  | `3000`    |

### 实例方法（expose）

`show()` / `close()`
