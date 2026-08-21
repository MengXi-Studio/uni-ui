# Switch 开关

开关，可用于控制某项功能的开启与关闭。

## 基础用法

```vue
<mx-switch v-model="switched" />
```

## 禁用 / 加载

```vue
<mx-switch v-model="switched" disabled />
<mx-switch v-model="switched" loading />
```

## 自定义颜色与尺寸

```vue
<mx-switch v-model="switched" active-color="#07c160" inactive-color="#eee" :size="24" />
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 开关值（v-model） | `boolean` | `false` |
| size | 尺寸 | `number` | `30` |
| active-color | 打开背景色 | `string` | `--mx-primary-color` |
| inactive-color | 关闭背景色 | `string` | `--mx-text-color-3` |
| disabled | 禁用 | `boolean` | `false` |
| loading | 加载中 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换时 | 新值 |