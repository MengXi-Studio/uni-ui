# Field

Text input field, aligned with Vant Field, with built-in clear, word count and left/right icon capabilities.

## Basic Usage

```vue
<mx-field v-model="value" label="Username" placeholder="Please enter your username" clearable />
```

## Password / Word Count

```vue
<mx-field v-model="value" type="password" label="Password" />
<mx-field v-model="value" label="Bio" type="textarea" autosize maxlength="50" show-word-limit />
```

## Props

| Name            | Description                    | Type                                     | Default |
| --------------- | ------------------------------ | ---------------------------------------- | ------- |
| model-value     | The input value (v-model)      | `string \| number`                       | -       |
| label           | Left label                     | `string`                                 | -       |
| type            | Input type                     | `text \| number \| password \| textarea` | `text`  |
| placeholder     | Placeholder                    | `string`                                 | -       |
| clearable       | Whether clearable              | `boolean`                                | `false` |
| maxlength       | Maximum length                 | `number`                                 | -       |
| disabled        | Disabled                       | `boolean`                                | `false` |
| readonly        | Readonly                       | `boolean`                                | `false` |
| show-word-limit | Whether to show the word count | `boolean`                                | `false` |
| autosize        | Auto height (textarea only)    | `boolean \| object`                      | `false` |
| required        | Required                       | `boolean`                                | `false` |

## Events

`update:modelValue` / `change` / `focus` / `blur` / `clear` / `click`

## Slots

`label` / `left-icon` / `right-icon` / `extra` / `default`
