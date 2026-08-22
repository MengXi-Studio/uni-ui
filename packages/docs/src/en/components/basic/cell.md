# Cell

Cell component, can be used with CellGroup for grouped display, aligned with Vant Cell.

## Basic Usage

```vue
<mx-cell-group inset>
  <mx-cell title="Cell" value="Content" />
  <mx-cell title="With Description" label="Description text" />
  <mx-cell title="With Arrow" is-link />
</mx-cell-group>
```

## Right Icon

```vue
<mx-cell title="Arrow" is-link arrow-direction="down" />
```

## Props

| Name            | Description                       | Type                          | Default |
| --------------- | --------------------------------- | ----------------------------- | ------- |
| title           | Left title                        | `string`                      | -       |
| label           | Description below the title       | `string`                      | -       |
| value           | Right content                     | `string \| number`            | -       |
| icon            | Left icon                         | `string`                      | -       |
| is-link         | Whether to show the arrow         | `boolean`                     | `false` |
| arrow-direction | Arrow direction                   | `up \| down \| left \| right` | `right` |
| border          | Whether to show the bottom border | `boolean`                     | `true`  |
| size            | Size                              | `large`                       | -       |
| center          | Whether to vertically center      | `boolean`                     | `false` |

## Events

| Event | Description | Params |
| ----- | ----------- | ------ |
| click | Click event | event  |

## Slots

`icon` / `title` / `label` / `default` (value area) / `right-icon` / `arrow`
