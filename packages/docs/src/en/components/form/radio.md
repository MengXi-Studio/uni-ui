# Radio

Radio component, used inside `mx-radio-group`, aligned with Vant Radio's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-radio-group :model-value="'a'">
    <mx-radio name="a">Radio a</mx-radio>
    <mx-radio name="b">Radio b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked">
  <mx-radio name="a">Radio a</mx-radio>
  <mx-radio name="b">Radio b</mx-radio>
</mx-radio-group>
```

`v-model` is bound to the `name` of the currently selected item.

## Horizontal Arrangement

<demo-live>
  <mx-radio-group :model-value="'1'" direction="horizontal">
    <mx-radio name="1">Radio 1</mx-radio>
    <mx-radio name="2">Radio 2</mx-radio>
    <mx-radio name="3">Radio 3</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked" direction="horizontal">
  <mx-radio name="1">Radio 1</mx-radio>
  <mx-radio name="2">Radio 2</mx-radio>
</mx-radio-group>
```

## Disabled State

<demo-live>
  <mx-radio-group :model-value="'a'" disabled>
    <mx-radio name="a">Radio a</mx-radio>
    <mx-radio name="b">Radio b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<!-- Disable all children -->
<mx-radio-group v-model="checked" disabled>
  <mx-radio name="a">Radio a</mx-radio>
  <mx-radio name="b">Radio b</mx-radio>
</mx-radio-group>

<!-- Disable individually -->
<mx-radio name="a" disabled>Radio a</mx-radio>
```

## Custom Color and Size

<demo-live>
  <mx-radio-group :model-value="'a'" checked-color="#ee0a24" :icon-size="24">
    <mx-radio name="a">Radio a</mx-radio>
    <mx-radio name="b">Radio b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked" checked-color="#ee0a24" :icon-size="24">
  <mx-radio name="a">Radio a</mx-radio>
  <mx-radio name="b">Radio b</mx-radio>
</mx-radio-group>
```

## Radio Props

| Name          | Description                                                                     | Type                          | Default  |
| ------------- | ------------------------------------------------------------------------------- | ----------------------------- | -------- |
| model-value   | The currently selected value (when used standalone, v-model, matched by `name`) | `string \| number \| boolean` | `''`     |
| name          | Identifier                                                                      | `string \| number \| boolean` | `''`     |
| checked-color | Icon color when checked                                                         | `string`                      | `''`     |
| icon-size     | Icon size                                                                       | `number \| string`            | `'20px'` |
| disabled      | Whether disabled                                                                | `boolean`                     | `false`  |
| label         | Label text                                                                      | `string`                      | `''`     |
| custom-class  | Custom class name                                                               | `string`                      | `''`     |
| custom-style  | Custom style                                                                    | `string \| object`            | `''`     |

## Radio Events

| Event  | Description                              | Params                 |
| ------ | ---------------------------------------- | ---------------------- |
| change | Triggered when the selected item changes | The current identifier |

## Radio Slots

| Name    | Description       |
| ------- | ----------------- |
| default | Custom label text |
| icon    | Custom icon       |

## RadioGroup Props

| Name          | Description                            | Type                          | Default    |
| ------------- | -------------------------------------- | ----------------------------- | ---------- |
| model-value   | The currently selected value (v-model) | `string \| number \| boolean` | `''`       |
| direction     | Arrangement direction                  | `vertical \| horizontal`      | `vertical` |
| disabled      | Whether to disable all children        | `boolean`                     | `false`    |
| checked-color | Icon color when checked                | `string`                      | `''`       |
| icon-size     | Icon size                              | `number \| string`            | `'20px'`   |
| custom-class  | Custom class name                      | `string`                      | `''`       |
| custom-style  | Custom style                           | `string \| object`            | `''`       |

## RadioGroup Events

| Event  | Description                            | Params                            |
| ------ | -------------------------------------- | --------------------------------- |
| change | Triggered when the bound value changes | The currently selected identifier |
