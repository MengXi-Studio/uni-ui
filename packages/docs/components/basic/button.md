# Button 按钮

按钮组件，对齐 Vant Button 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <mx-button>默认按钮</mx-button>
  <mx-button type="primary">主要按钮</mx-button>
  <mx-button type="success">成功</mx-button>
  <mx-button type="warning">警告</mx-button>
  <mx-button type="danger">危险</mx-button>
</demo-live>

```vue
<mx-button>默认按钮</mx-button>
<mx-button type="primary">主要按钮</mx-button>
<mx-button type="success">成功</mx-button>
<mx-button type="warning">警告</mx-button>
<mx-button type="danger">危险</mx-button>
```

## 不同尺寸

```vue
<mx-button size="large">大号</mx-button>
<mx-button size="normal">普通</mx-button>
<mx-button size="small">小号</mx-button>
<mx-button size="mini">迷你</mx-button>
```

## 朴素 / 圆角 / 块级

```vue
<mx-button plain type="primary">朴素</mx-button>
<mx-button round type="danger">圆角</mx-button>
<mx-button block type="primary">块级</mx-button>
```

## 加载 / 禁用

```vue
<mx-button type="primary" loading loading-text="加载中" />
<mx-button disabled>禁用</mx-button>
```

## Props

| 参数          | 说明             | 类型                                                 | 默认值    |
| ------------- | ---------------- | ---------------------------------------------------- | --------- |
| type          | 按钮类型         | `default \| primary \| success \| warning \| danger` | `default` |
| size          | 尺寸             | `large \| normal \| small \| mini`                   | `normal`  |
| color         | 自定义主题色     | `string`                                             | -         |
| icon          | 图标名或图片地址 | `string`                                             | -         |
| icon-position | 图标位置         | `left \| right`                                      | `left`    |
| loading       | 加载中           | `boolean`                                            | `false`   |
| loading-text  | 加载文案         | `string`                                             | -         |
| plain         | 朴素按钮         | `boolean`                                            | `false`   |
| round         | 圆形             | `boolean`                                            | `false`   |
| square        | 方形             | `boolean`                                            | `false`   |
| block         | 块级             | `boolean`                                            | `false`   |
| disabled      | 禁用             | `boolean`                                            | `false`   |
| custom-class  | 自定义类名       | `string`                                             | -         |
| custom-style  | 自定义样式       | `string \| object`                                   | -         |

## Events

| 事件名 | 说明     | 回调参数 |
| ------ | -------- | -------- |
| click  | 点击事件 | event    |
