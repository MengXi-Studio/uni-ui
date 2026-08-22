# Checkbox

Checkbox component, supports standalone usage and checkbox group, aligned with Vant Checkbox's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-checkbox :model-value="true">Checkbox</mx-checkbox>
  <mx-checkbox :model-value="false">Checkbox</mx-checkbox>
</demo-live>

```vue
<mx-checkbox v-model="checked">Checkbox</mx-checkbox>
```

## Checkbox Group

<demo-live>
  <mx-checkbox-group :model-value="['a']">
    <mx-checkbox name="a">Checkbox a</mx-checkbox>
    <mx-checkbox name="b">Checkbox b</mx-checkbox>
    <mx-checkbox name="c">Checkbox c</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result">
  <mx-checkbox name="a">Checkbox a</mx-checkbox>
  <mx-checkbox name="b">Checkbox b</mx-checkbox>
  <mx-checkbox name="c">Checkbox c</mx-checkbox>
</mx-checkbox-group>
```

## Horizontal Arrangement

<demo-live>
  <mx-checkbox-group :model-value="['a']" direction="horizontal">
    <mx-checkbox name="a">Checkbox a</mx-checkbox>
    <mx-checkbox name="b">Checkbox b</mx-checkbox>
    <mx-checkbox name="c">Checkbox c</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result" direction="horizontal">
  <mx-checkbox name="a">Checkbox a</mx-checkbox>
  <mx-checkbox name="b">Checkbox b</mx-checkbox>
</mx-checkbox-group>
```

## Disabled State

<demo-live>
  <mx-checkbox-group :model-value="['a']" disabled>
    <mx-checkbox name="a">Checkbox a</mx-checkbox>
    <mx-checkbox name="b">Checkbox b</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<!-- Disable all children -->
<mx-checkbox-group v-model="result" disabled>
  <mx-checkbox name="a">Checkbox a</mx-checkbox>
  <mx-checkbox name="b">Checkbox b</mx-checkbox>
</mx-checkbox-group>

<!-- Disable individually -->
<mx-checkbox v-model="checked" disabled>Checkbox</mx-checkbox>
```

## Custom Color / Size / Shape

<demo-live>
  <mx-checkbox-group :model-value="['a']" checked-color="#ee0a24" :icon-size="24" shape="square">
    <mx-checkbox name="a">Checkbox a</mx-checkbox>
    <mx-checkbox name="b">Checkbox b</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result" checked-color="#ee0a24" :icon-size="24" shape="square">
  <mx-checkbox name="a">Checkbox a</mx-checkbox>
  <mx-checkbox name="b">Checkbox b</mx-checkbox>
</mx-checkbox-group>
```

## Limit the Maximum Number of Selections

When `max` is set to `0`, it means no limit.

```vue
<mx-checkbox-group v-model="result" :max="2">
  <mx-checkbox name="a">Checkbox a</mx-checkbox>
  <mx-checkbox name="b">Checkbox b</mx-checkbox>
  <mx-checkbox name="c">Checkbox c</mx-checkbox>
</mx-checkbox-group>
```

## Checkbox Props

| Name          | Description                                      | Type               | Default  |
| ------------- | ------------------------------------------------ | ------------------ | -------- |
| model-value   | Checked state (v-model when not used in a group) | `boolean`          | `false`  |
| name          | Identifier                                       | `string \| number` | `''`     |
| checked-color | Icon color when checked                          | `string`           | `''`     |
| icon-size     | Icon size                                        | `number \| string` | `'20px'` |
| shape         | Shape                                            | `round \| square`  | `round`  |
| label         | Tip when unchecked                               | `string`           | `''`     |
| disabled      | Whether disabled                                 | `boolean`          | `false`  |
| block         | Whether it is a block element                    | `boolean`          | `false`  |
| custom-class  | Custom class name                                | `string`           | `''`     |
| custom-style  | Custom style                                     | `string \| object` | `''`     |

## Checkbox Events

| Event  | Description                            | Params                                           |
| ------ | -------------------------------------- | ------------------------------------------------ |
| change | Triggered when the bound value changes | The current checked state (when used standalone) |

## Checkbox Slots

| Name    | Description       |
| ------- | ----------------- |
| default | Custom label text |
| icon    | Custom icon       |

## CheckboxGroup Props

| Name          | Description                                          | Type                     | Default    |
| ------------- | ---------------------------------------------------- | ------------------------ | ---------- |
| model-value   | The identifier array of the selected items (v-model) | `array`                  | `[]`       |
| max           | Maximum number of selections (0 means no limit)      | `number \| string`       | `0`        |
| direction     | Arrangement direction                                | `vertical \| horizontal` | `vertical` |
| disabled      | Whether to disable all children                      | `boolean`                | `false`    |
| checked-color | Icon color when checked                              | `string`                 | `''`       |
| icon-size     | Icon size                                            | `number \| string`       | `'20px'`   |
| shape         | Shape                                                | `round \| square`        | `round`    |
| custom-class  | Custom class name                                    | `string`                 | `''`       |
| custom-style  | Custom style                                         | `string \| object`       | `''`       |

## CheckboxGroup Events

| Event  | Description                            | Params                       |
| ------ | -------------------------------------- | ---------------------------- |
| change | Triggered when the bound value changes | The updated identifier array |
