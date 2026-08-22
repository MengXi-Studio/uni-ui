# Picker 选择器

底部弹出的滚动选择器，支持多列。

## 基础用法（单列）

```vue
<mx-picker v-model:show="show" :columns="['杭州', '宁波', '温州', '绍兴']" @confirm="onConfirm" />
```

## 多列

```vue
<mx-picker
	v-model:show="show"
	:columns="[
		['周一', '周二'],
		['上午', '下午']
	]"
	title="时间选择"
	@confirm="onConfirm" />
```

## API

### Props

| 参数                | 说明                                 | 类型      | 默认值  |
| ------------------- | ------------------------------------ | --------- | ------- |
| show                | 是否显示（v-model）                  | `boolean` | `false` |
| columns             | 选项（简单数组 / 二维数组 / 级联树） | `array`   | `[]`    |
| title               | 标题                                 | `string`  | -       |
| confirm-button-text | 确认按钮文案                         | `string`  | `确认`  |
| cancel-button-text  | 取消按钮文案                         | `string`  | `取消`  |
| value-key           | 选项对象中取文本的字段               | `string`  | `text`  |

### Events

| 事件名  | 说明     | 回调参数                              |
| ------- | -------- | ------------------------------------- |
| confirm | 点击确认 | `{ selectedOptions, selectedValues }` |
| cancel  | 点击取消 | -                                     |
| change  | 选项变化 | 当前列选中数据                        |
