# Icon 图标

图标组件，支持图片路径与字体图标名两种模式。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

图片图标：

```vue
<mx-icon image="https://img.yzcdn.cn/vant/icon-demo.png" />
```

字体/符号图标：

```vue
<mx-icon name="★" color="#ee0a24" :size="20" />
```

## 徽标

```vue
<mx-icon name="★" badge="12" />
<mx-icon name="★" dot />
```

## API

### Props

| 参数        | 说明                    | 类型               | 默认值  |
| ----------- | ----------------------- | ------------------ | ------- |
| name        | 图标名称（字体字符）    | `string`           | -       |
| src / image | 图片地址（优先于 name） | `string`           | -       |
| color       | 图标颜色                | `string`           | -       |
| size        | 图标尺寸                | `number \| string` | `16px`  |
| dot         | 是否显示圆点            | `boolean`          | `false` |
| badge       | 徽标内容                | `number \| string` | -       |
| badge-color | 徽标背景色              | `string`           | -       |

### Events

| 事件名 | 说明     |
| ------ | -------- |
| click  | 点击图标 |
