# Switch

A switch, can be used to toggle a function on or off.

## Basic Usage

<demo-live>
  <demo-switch />
</demo-live>

```vue
<mx-switch v-model="switched" />
```

## Disabled / Loading

```vue
<mx-switch v-model="switched" disabled />
<mx-switch v-model="switched" loading />
```

## Custom Color and Size

```vue
<mx-switch v-model="switched" active-color="#07c160" inactive-color="#eee" :size="24" />
```

## Props

| Name           | Description                    | Type      | Default              |
| -------------- | ------------------------------ | --------- | -------------------- |
| model-value    | Switch value (v-model)         | `boolean` | `false`              |
| size           | Size                           | `number`  | `30`                 |
| active-color   | Background color when active   | `string`  | `--mx-primary-color` |
| inactive-color | Background color when inactive | `string`  | `--mx-text-color-3`  |
| disabled       | Disabled                       | `boolean` | `false`              |
| loading        | Loading state                  | `boolean` | `false`              |

## Events

| Event  | Description  | Params        |
| ------ | ------------ | ------------- |
| change | When toggled | The new value |
