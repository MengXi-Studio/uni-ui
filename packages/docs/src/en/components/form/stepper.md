# Stepper

Used for quantity increase/decrease operations.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <demo-stepper />
</demo-live>

```vue
<mx-stepper v-model="value" />
```

## Range / Step / Integer

```vue
<mx-stepper v-model="value" :min="0" :max="10" />
<mx-stepper v-model="value" :step="2" />
<mx-stepper v-model="value" integer />
```

## Disabled

```vue
<mx-stepper v-model="value" disabled />
```

## API

### Props

| Name        | Description                    | Type      | Default    |
| ----------- | ------------------------------ | --------- | ---------- |
| model-value | The current value (v-model)    | `number`  | -          |
| min         | Minimum value                  | `number`  | `0`        |
| max         | Maximum value                  | `number`  | `Infinity` |
| step        | Step                           | `number`  | `1`        |
| integer     | Whether to allow only integers | `boolean` | `false`    |
| disabled    | Disabled                       | `boolean` | `false`    |

### Events

| Event     | Description              | Params        |
| --------- | ------------------------ | ------------- |
| change    | When the value changes   | The new value |
| overlimit | When exceeding the range | The direction |
