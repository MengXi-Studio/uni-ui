# Rate

Used for rating, supports half star, readonly, disabled, etc.

## Basic Usage

<demo-live>
  <demo-rate />
</demo-live>

```vue
<mx-rate v-model="value" count="5" />
```

## Half Star

```vue
<mx-rate v-model="value" allow-half />
```

## Readonly / Disabled / Custom Color

```vue
<mx-rate v-model="value" readonly />
<mx-rate v-model="value" disabled />
<mx-rate v-model="value" color="#ffd21e" count="6" />
```

## API

### Props

| Name        | Description                     | Type               | Default              |
| ----------- | ------------------------------- | ------------------ | -------------------- |
| model-value | The score value (v-model)       | `number`           | `0`                  |
| count       | Total number of icons           | `number`           | `5`                  |
| allow-half  | Whether to allow half selection | `boolean`          | `false`              |
| readonly    | Readonly                        | `boolean`          | `false`              |
| disabled    | Disabled                        | `boolean`          | `false`              |
| size        | Icon size                       | `number \| string` | `20px`               |
| color       | Color when selected             | `string`           | `--mx-primary-color` |
| void-color  | Color when unselected           | `string`           | `--mx-text-color-3`  |
| gutter      | Gap                             | `number`           | -                    |

### Events

| Event  | Description            |
| ------ | ---------------------- |
| change | When the score changes |
