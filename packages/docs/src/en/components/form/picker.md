# Picker

A scrollable selector popped up from the bottom, supports multiple columns.

## Basic Usage (Single Column)

```vue
<mx-picker v-model:show="show" :columns="['Hangzhou', 'Ningbo', 'Wenzhou', 'Shaoxing']" @confirm="onConfirm" />
```

## Multiple Columns

```vue
<mx-picker
	v-model:show="show"
	:columns="[
		['Monday', 'Tuesday'],
		['Morning', 'Afternoon']
	]"
	title="Time Select"
	@confirm="onConfirm" />
```

## API

### Props

| Name                | Description                                                   | Type      | Default   |
| ------------------- | ------------------------------------------------------------- | --------- | --------- |
| show                | Whether to show (v-model)                                     | `boolean` | `false`   |
| columns             | Options (simple array / two-dimensional array / cascade tree) | `array`   | `[]`      |
| title               | Title                                                         | `string`  | -         |
| confirm-button-text | Text of the confirm button                                    | `string`  | `Confirm` |
| cancel-button-text  | Text of the cancel button                                     | `string`  | `Cancel`  |
| value-key           | The field used to extract the text from the option object     | `string`  | `text`    |

### Events

| Event   | Description            | Params                                  |
| ------- | ---------------------- | --------------------------------------- |
| confirm | When clicking confirm  | `{ selectedOptions, selectedValues }`   |
| cancel  | When clicking cancel   | -                                       |
| change  | When an option changes | The selected data of the current column |
