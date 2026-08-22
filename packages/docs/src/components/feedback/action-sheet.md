# ActionSheet 动作面板

从底部弹出的动作菜单。

## 基础用法

```vue
<mx-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" @select="onSelect" />
```

```ts
const actions = [
	{ name: '选项一', color: '#ee0a24' },
	{ name: '选项二', subname: '描述信息' },
	{ name: '禁用选项', disabled: true }
]
```

## 带回调（action 内 callback）

```vue
<mx-action-sheet v-model:show="show" :actions="[{ name: '选项', callback: () => {} }]" />
```

## API

### Props

| 参数                   | 说明                | 类型       | 默认值  |
| ---------------------- | ------------------- | ---------- | ------- |
| show                   | 是否显示（v-model） | `boolean`  | `false` |
| actions                | 动作列表            | `Action[]` | `[]`    |
| title                  | 标题                | `string`   | -       |
| cancel-text            | 取消按钮文案        | `string`   | -       |
| close-on-click-overlay | 点击遮罩关闭        | `boolean`  | `true`  |

### Events

| 事件名      | 说明     | 回调参数        |
| ----------- | -------- | --------------- |
| select      | 点击选项 | `action, index` |
| cancel      | 点击取消 | -               |
| update:show | 显隐更新 | -               |
