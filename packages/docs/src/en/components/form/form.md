# Form

Form component, used for data validation, submission and reset, needs to be used with form items (such as `mx-field`), aligned with Vant Form's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

`model` binds the form data object, and `rules` configures the validation rules (the keys correspond to the form items' `name`). Call `submitForm` via ref to trigger validation and submit.

```vue
<mx-form ref="formRef" :model="form" :rules="rules" @submit="onSubmit" @failed="onFailed">
  <mx-field v-model="form.username" label="Username" name="username" placeholder="Please enter your username" />
  <mx-field v-model="form.phone" label="Phone" name="phone" placeholder="Please enter your phone number" />
  <mx-button type="primary" block @click="formRef?.submitForm()">Submit</mx-button>
</mx-form>
```

```js
import { ref, reactive } from 'vue'

const formRef = ref()
const form = reactive({ username: '', phone: '' })

const rules = {
  username: [
    { required: true, message: 'Please enter your username' },
    { min: 2, max: 20, message: 'The username must be 2 - 20 characters long' },
  ],
  phone: [
    { required: true, message: 'Please enter your phone number' },
    { pattern: /^1\d{10}$/, message: 'The phone number format is invalid' },
  ],
}

const onSubmit = (values) => console.log('Submit', values)
const onFailed = (errors) => console.log('Validation failed', errors)
```

## Validation Rules

Rules support required, pattern, length and custom validator functions. A single field can have multiple rules, which are validated in order and stop at the first failure.

```js
const rules = {
  username: [
    { required: true, message: 'Please enter your username' },
    { pattern: /^\w+$/, message: 'Only letters, numbers and underscores are supported' },
    { min: 2, max: 20, message: 'The length must be 2 - 20 characters' },
    {
      validator: (value, model, field) => value !== 'admin' || 'The username is unavailable',
      message: 'The username validation failed',
    },
  ],
}
```

| Field     | Description                                            | Type                                                                       |
| --------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| required  | Whether required                                       | `boolean`                                                                  |
| pattern   | Pattern validation                                     | `RegExp`                                                                   |
| min       | Minimum length                                         | `number`                                                                   |
| max       | Maximum length                                         | `number`                                                                   |
| validator | Custom validator, returning `false` / string / Promise | `(value, model, field) => boolean \| string \| Promise<boolean \| string>` |
| message   | Failure message text                                   | `string`                                                                   |

## Props

| Name            | Description                                                                            | Type                   | Default |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------- | ------- |
| model           | Form data object (required)                                                            | `object`               | -       |
| rules           | Validation rules                                                                       | `object`               | `{}`    |
| label-width     | Label width                                                                            | `number \| string`     | -       |
| label-align     | Label alignment                                                                        | `left \| right \| top` | `left`  |
| scroll-to-error | Whether to automatically trigger the `requireValidator` field in the form after submit | `boolean`              | `false` |
| custom-class    | Custom class name                                                                      | `string`               | `''`    |
| custom-style    | Custom style                                                                           | `string \| object`     | `''`    |

## Events

| Event  | Description                                       | Params                                             |
| ------ | ------------------------------------------------- | -------------------------------------------------- |
| submit | Triggered when submitting after validation passes | The form data object `values`                      |
| failed | Triggered when validation fails                   | The error info object (field name → error message) |

## Methods (called via ref)

| Method     | Description                                                                          | Params                                                  | Return                                                        |
| ---------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------- |
| validate   | Validate all or specified fields                                                     | `fields?: string \| string[]` (validate all if omitted) | `Promise<Record<string, string>>` (empty object means passed) |
| resetForm  | Reset the form data to the initial values, can pass `values` to override some fields | `values?: Record<string, unknown>`                      | The reset form data object                                    |
| submitForm | Validate and trigger the `submit` / `failed` events                                  | -                                                       | `Promise<Record<string, string> \| null>`                     |

```vue
<mx-form ref="formRef" :model="form" :rules="rules">
  <mx-field v-model="form.username" label="Username" name="username" />
</mx-form>

<mx-button @click="formRef?.resetForm()">Reset</mx-button>
<mx-button
  type="primary"
  @click="
    formRef
      ?.validate()
      .then((errors) => !Object.keys(errors).length && showToast('Validation passed'))
  "
>Validate Only</mx-button>
```
