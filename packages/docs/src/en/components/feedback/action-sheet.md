# ActionSheet

An action panel that slides up from the bottom.

## Basic Usage

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

## With Callback (callback inside action)

```vue
<mx-action-sheet v-model:show="show" :actions="[{ name: '选项', callback: () => {} }]" />
```

## API

### Props

| Name                   | Description                                | Type       | Default |
| ---------------------- | ------------------------------------------ | ---------- | ------- |
| show                   | Whether to show (v-model)                  | `boolean`  | `false` |
| actions                | The list of actions                        | `Action[]` | `[]`    |
| title                  | Title                                      | `string`   | -       |
| cancel-text            | Cancel button text                         | `string`   | -       |
| close-on-click-overlay | Whether to close when clicking the overlay | `boolean`  | `true`  |

### Events

| Event       | Description                         | Params          |
| ----------- | ----------------------------------- | --------------- |
| select      | Triggered when an option is clicked | `action, index` |
| cancel      | Triggered when cancel is clicked    | -               |
| update:show | Show state update                   | -               |
