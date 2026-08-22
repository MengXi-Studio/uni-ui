# Popup 弹出层

弹出层组件，支持 5 个方向与圆角、遮罩、关闭图标、拦截器。

## 基础用法（居中）

```vue
<mx-popup v-model:show="show" @click-overlay="show = false">
  <view class="content">居中内容</view>
</mx-popup>
```

## 从底部弹出

```vue
<mx-popup v-model:show="show" position="bottom" round closeable>
  <view class="content">底部内容</view>
</mx-popup>
```

## Props

| 参数                   | 说明                | 类型                                       | 默认值   |
| ---------------------- | ------------------- | ------------------------------------------ | -------- |
| show                   | 是否显示（v-model） | `boolean`                                  | `false`  |
| position               | 位置                | `center \| top \| bottom \| left \| right` | `center` |
| overlay                | 是否显示遮罩        | `boolean`                                  | `true`   |
| closeable              | 是否显示关闭图标    | `boolean`                                  | `false`  |
| close-on-click-overlay | 点击遮罩关闭        | `boolean`                                  | `true`   |
| round                  | 是否圆角            | `boolean`                                  | `false`  |
| z-index                | 层级                | `number`                                   | `1000`   |
| duration               | 过渡时长(ms)        | `number`                                   | `300`    |
| safe-area-inset-bottom | 底部安全区          | `boolean`                                  | `false`  |

## Events

| 事件名           | 说明         |
| ---------------- | ------------ |
| open             | 打开时       |
| close            | 关闭时       |
| closed           | 关闭后       |
| click-overlay    | 点击遮罩     |
| click-close-icon | 点击关闭图标 |
| update:show      | 显隐更新     |
