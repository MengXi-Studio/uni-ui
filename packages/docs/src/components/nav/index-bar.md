# IndexBar 索引栏

用于列表快速定位的索引栏，右侧索引导航支持触摸滑动选择，配合 IndexAnchor 锚点使用，对齐 Vant IndexBar 的 API 与交互。

## 基础用法

将 `mx-index-anchor` 锚点作为 `mx-index-bar` 的子组件使用，索引栏需要设置高度：

<demo-live>
  <mx-index-bar custom-style="height: 320px; width: 100%;">
    <mx-index-anchor index="A" />
    <mx-cell title="文本" value="内容" />
    <mx-cell title="文本" value="内容" />
    <mx-index-anchor index="B" />
    <mx-cell title="文本" value="内容" />
    <mx-cell title="文本" value="内容" />
    <mx-index-anchor index="C" />
    <mx-cell title="文本" value="内容" />
    <mx-cell title="文本" value="内容" />
  </mx-index-bar>
</demo-live>

```vue
<mx-index-bar custom-style="height: 320px;">
  <mx-index-anchor index="A" />
  <mx-cell title="文本" value="内容" />
  <mx-cell title="文本" value="内容" />
  <mx-index-anchor index="B" />
  <mx-cell title="文本" value="内容" />
  <mx-cell title="文本" value="内容" />
  <mx-index-anchor index="C" />
  <mx-cell title="文本" value="内容" />
  <mx-cell title="文本" value="内容" />
</mx-index-bar>
```

触摸右侧索引栏可快速滚动到对应锚点，拖动时显示当前索引提示气泡。

## 自定义索引列表

通过 `index-list` 自定义索引字符：

<demo-live>
  <mx-index-bar
    :index-list="['1', '2', '3']"
    custom-style="height: 280px; width: 100%;"
  >
    <mx-index-anchor index="1" />
    <mx-cell title="文本" value="内容" />
    <mx-index-anchor index="2" />
    <mx-cell title="文本" value="内容" />
    <mx-index-anchor index="3" />
    <mx-cell title="文本" value="内容" />
  </mx-index-bar>
</demo-live>

```vue
<mx-index-bar :index-list="['1', '2', '3']" custom-style="height: 280px;">
  <mx-index-anchor index="1" />
  <mx-cell title="文本" value="内容" />
  <mx-index-anchor index="2" />
  <mx-cell title="文本" value="内容" />
  <mx-index-anchor index="3" />
  <mx-cell title="文本" value="内容" />
</mx-index-bar>
```

## 自定义索引字符

锚点开启 `use-index-slot` 后，通过 `index` 插槽自定义索引字符渲染：

```vue
<mx-index-anchor index="A" use-index-slot>
  <template #index="{ index }">
    <text style="color: #ee0a24; font-weight: bold;">{{ index }}</text>
  </template>
  <mx-cell title="文本" value="内容" />
</mx-index-anchor>
```

## API

### IndexBar Props

| 参数              | 说明               | 类型               | 默认值  |
| ----------------- | ------------------ | ------------------ | ------- |
| index-list        | 索引字符列表       | `string[]`         | `A - Z` |
| z-index           | 索引栏 z-index     | `number \| string` | `500`   |
| sticky            | 是否吸附顶部的锚点 | `boolean`          | `true`  |
| sticky-offset-top | 顶部吸附高度       | `number \| string` | `0`     |
| custom-class      | 自定义类名         | `string`           | `''`    |
| custom-style      | 自定义样式         | `string \| object` | `''`    |

### IndexBar Events

| 事件名 | 说明               | 回调参数      |
| ------ | ------------------ | ------------- |
| change | 当前索引变化时触发 | index: string |
| select | 选中索引时触发     | index: string |

### IndexBar Slots

| 名称    | 说明                                  |
| ------- | ------------------------------------- |
| default | 列表内容，通常为 mx-index-anchor 列表 |

### IndexAnchor Props

| 参数           | 说明             | 类型               | 默认值  |
| -------------- | ---------------- | ------------------ | ------- |
| index          | 索引字符         | `number \| string` | `''`    |
| custom-index   | 自定义索引字符   | `string`           | `''`    |
| use-index-slot | 是否使用索引插槽 | `boolean`          | `false` |
| sticky         | 是否吸附在顶部   | `boolean`          | `true`  |
| custom-class   | 自定义类名       | `string`           | `''`    |
| custom-style   | 自定义样式       | `string \| object` | `''`    |

### IndexAnchor Slots

| 名称    | 说明               | 插槽参数        |
| ------- | ------------------ | --------------- |
| index   | 自定义索引字符渲染 | index: 索引字符 |
| default | 锚点下的列表内容   | -               |
