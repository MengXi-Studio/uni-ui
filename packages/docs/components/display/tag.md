# Tag 标签

用于标记分类或状态。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-tag type="primary">标签</mx-tag>
<mx-tag type="success">标签</mx-tag>
<mx-tag type="warning">标签</mx-tag>
<mx-tag type="danger">标签</mx-tag>
```

## 样式

```vue
<mx-tag plain type="primary">朴素</mx-tag>
<mx-tag round type="danger">圆角</mx-tag>
<mx-tag mark type="warning">标记</mx-tag>
<mx-tag size="large">大号</mx-tag>
<mx-tag size="mini">迷你</mx-tag>
```

## 可关闭

```vue
<mx-tag closeable @close="onClose">标签</mx-tag>
```

## API

### Props

| 参数      | 说明         | 类型                                                 | 默认值    |
| --------- | ------------ | ---------------------------------------------------- | --------- |
| type      | 类型         | `default \| primary \| success \| warning \| danger` | `default` |
| size      | 尺寸         | `large \| medium \| mini`                            | `medium`  |
| color     | 自定义背景色 | `string`                                             | -         |
| plain     | 朴素样式     | `boolean`                                            | `false`   |
| round     | 圆角         | `boolean`                                            | `false`   |
| mark      | 标记样式     | `boolean`                                            | `false`   |
| closeable | 可关闭       | `boolean`                                            | `false`   |

### Events

| 事件名 | 说明       |
| ------ | ---------- |
| close  | 点击关闭时 |
