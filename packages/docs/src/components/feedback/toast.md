# Toast 轻提示

用于轻量级成功、失败等提示反馈。

## 基础用法

```vue
<mx-toast v-model:show="show" message="操作成功" />
```

## 类型 / 位置

```vue
<mx-toast v-model:show="show" type="success" message="成功" />
<mx-toast v-model:show="show" type="fail" message="失败" />
<mx-toast v-model:show="show" position="top" message="顶部提示" />
```

## 加载 / 自动关闭

```vue
<mx-toast v-model:show="show" type="loading" message="加载中..." :forbid-click="true" />
<mx-toast v-model:show="show" message="自动关闭" :duration="2000" />
```

## API

### Props

| 参数         | 说明                         | 类型                                   | 默认值   |
| ------------ | ---------------------------- | -------------------------------------- | -------- |
| show         | 是否显示（v-model）          | `boolean`                              | `false`  |
| message      | 提示内容                     | `string`                               | -        |
| type         | 类型                         | `success \| fail \| loading \| custom` | `text`   |
| position     | 位置                         | `top \| middle \| bottom`              | `middle` |
| duration     | 自动关闭时长（ms，0 不自动） | `number`                               | `2000`   |
| forbid-click | 是否禁止背景点击             | `boolean`                              | `false`  |

### 实例方法（expose）

`show()` / `close()`
