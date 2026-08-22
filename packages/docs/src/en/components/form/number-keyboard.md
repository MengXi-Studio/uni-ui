# NumberKeyboard

Number keyboard component, used for numeric input scenarios such as passwords and verification codes, aligned with Vant NumberKeyboard's API and interactions.

## Basic Usage

The keyboard is fixed at the bottom of the page. It is usually mounted with `v-if`, and the input content is assembled manually through the `input` / `delete` events.

```vue
<mx-field v-model="value" label="Password" placeholder="Please enter the password" readonly @click="show = true" />
<mx-number-keyboard v-if="show" v-model:show="show" @input="onInput" @delete="onDelete" />
```

```js
import { ref } from 'vue'

const show = ref(false)
const value = ref('')

const onInput = key => (value.value += key)
const onDelete = () => (value.value = value.value.slice(0, -1))
```

## Custom Theme

When `theme` is set to `custom`, a top title bar is displayed with a close button on the left.

```vue
<mx-number-keyboard v-if="show" v-model:show="show" theme="custom" title="Keyboard title" close-button-text="Done" @input="onInput" />
```

## Configuring the Extra Key

`extra-key` is displayed at the bottom-left of the keyboard, commonly used for the decimal point.

```vue
<mx-number-keyboard v-if="show" v-model:show="show" extra-key="." @input="onInput" />
```

## Random Key Order

When `random-key-order` is set to `true`, the numeric key order is shuffled on each mount, suitable for secure keyboard scenarios.

```vue
<mx-number-keyboard v-if="show" v-model:show="show" random-key-order @input="onInput" />
```

## Custom Key Text

```vue
<mx-number-keyboard v-if="show" v-model:show="show" delete-button-text="Delete" close-button-text="Done" @input="onInput" />
```

## Props

| Name               | Description                                       | Type                | Default   |
| ------------------ | ------------------------------------------------- | ------------------- | --------- |
| title              | Number keyboard title                             | `string`            | `''`      |
| show               | Whether to show (v-model:show)                    | `boolean`           | `false`   |
| extra-key          | Extra key, e.g. `.`, displayed at the bottom-left | `string`            | `''`      |
| close-button-text  | Text of the close button                          | `string`            | `''`      |
| delete-button-text | Text of the backspace button                      | `string`            | `''`      |
| theme              | Keyboard theme                                    | `default \| custom` | `default` |
| random-key-order   | Whether to shuffle the order                      | `boolean`           | `false`   |
| z-index            | Keyboard z-index level                            | `number \| string`  | `1000`    |
| custom-class       | Custom class name                                 | `string`            | `''`      |
| custom-style       | Custom style                                      | `string \| object`  | `''`      |

## Events

| Event  | Description                                                      | Params                  |
| ------ | ---------------------------------------------------------------- | ----------------------- |
| input  | Triggered when a number key (including the extra key) is pressed | The pressed key content |
| delete | Triggered when the backspace key is pressed                      | -                       |
| close  | Triggered when the close button is clicked                       | -                       |
