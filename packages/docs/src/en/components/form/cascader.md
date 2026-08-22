# Cascader

Cascader component, popped up from the bottom, used for step-by-step selection of multi-level data such as province/city/district, aligned with Vant Cascader's API and interactions.

## Basic Usage

```vue
<mx-cascader v-model:show="show" :value="value" :options="options" @update:model-value="value = $event" @finish="onFinish" />
```

```js
const options = [
	{
		text: 'Zhejiang',
		value: '330000',
		children: [{ text: 'Hangzhou', value: '330100', children: [{ text: 'Xihu', value: '330106' }] }]
	},
	{
		text: 'Guangdong',
		value: '440000',
		children: [{ text: 'Guangzhou', value: '440100', children: [{ text: 'Tianhe', value: '440106' }] }]
	}
]
```

`options` is a tree structure. When a leaf node (an option without `children`) is selected, the selection is complete, triggering `confirm` / `finish` and closing the popup.

## Selected Mode

When `variant` is set to `selected`, the selected path is displayed as breadcrumbs at the top, and clicking a breadcrumb item can go back to the corresponding level.

```vue
<mx-cascader v-model:show="show" :value="value" :options="options" variant="selected" />
```

## Custom Field Names

Specify the field names of the text, value and children in the options via `field-names`.

```vue
<mx-cascader v-model:show="show" :value="value" :options="options" :field-names="{ text: 'name', value: 'id', children: 'sub' }" />
```

## Props

| Name           | Description                                    | Type               | Default  |
| -------------- | ---------------------------------------------- | ------------------ | -------- |
| show           | Whether to show (v-model:show)                 | `boolean`          | `false`  |
| options        | Tree-shaped option data (required)             | `array`            | -        |
| value          | The selected value array                       | `array`            | `[]`     |
| title          | Title                                          | `string`           | `Select` |
| active-tab-asc | Whether to allow clicking to select each tab   | `boolean`          | `false`  |
| variant        | Display type                                   | `tabs \| selected` | `tabs`   |
| field-names    | Field name mapping `{ text, value, children }` | `object`           | `{}`     |
| z-index        | Popup z-index level                            | `number \| string` | `1000`   |
| custom-class   | Custom class name                              | `string`           | `''`     |
| custom-style   | Custom style                                   | `string \| object` | `''`     |

## Events

| Event              | Description                                                        | Params                                                         |
| ------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| change             | Triggered when switching options or levels                         | The currently selected path (an array of one option per level) |
| confirm            | Triggered when the selection is complete (a leaf node is selected) | The selected path array                                        |
| finish             | Triggered when the selection is complete (a leaf node is selected) | The selected path array                                        |
| update:model-value | Triggered when the selection is complete                           | The selected path array                                        |

Each item in the selected path array is the original option object of the corresponding level.
