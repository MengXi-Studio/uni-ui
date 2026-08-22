# Area

Province/city/district selector, popped up from the bottom with three-column linked selection of province, city and district, aligned with Vant Area's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-area v-model:show="show" v-model="areaCode" :area-list="areaList" @confirm="onConfirm" />
```

```js
const areaList = {
  province_list: { 110000: 'Beijing', 310000: 'Shanghai' },
  city_list: { 110100: 'Beijing', 310100: 'Shanghai' },
  county_list: {
    110101: 'Dongcheng',
    110102: 'Xicheng',
    110105: 'Chaoyang',
    310101: 'Huangpu',
    310104: 'Xuhui',
    310105: 'Changning',
  },
}
```

`area-list` contains three keys: `province_list`, `city_list` and `county_list`. The keys are region codes and the values are region names. The component automatically builds the three-level province/city/district association based on the code prefix.

When `v-model` is bound to an array, an array of the selected codes at each level is returned after confirming; when bound to a single value, the code of the last level is returned.

## Configuring the Number of Columns

When `columns-num` is set to `2`, only the province and city columns are shown.

```vue
<mx-area v-model:show="show" v-model="areaCode" :area-list="areaList" :columns-num="2" />
```

## Props

| Name                | Description                                                      | Type                        | Default   |
| ------------------- | ---------------------------------------------------------------- | --------------------------- | --------- |
| show                | Whether to show (v-model:show)                                   | `boolean`                   | `false`   |
| model-value         | The selected region code, an array or a single value (v-model)   | `string \| number \| array` | `[]`      |
| area-list           | The region data, keys mapped by the province/city/county prefix  | `object`                    | `{}`      |
| columns-num         | Number of columns; 2 = province/city, 3 = province/city/district | `number \| string`          | `3`       |
| title               | Title                                                            | `string`                    | `Region`  |
| confirm-button-text | Text of the confirm button                                       | `string`                    | `Confirm` |
| cancel-button-text  | Text of the cancel button                                        | `string`                    | `Cancel`  |
| custom-class        | Custom class name                                                | `string`                    | `''`      |
| custom-style        | Custom style                                                     | `string \| object`          | `''`      |

## Events

| Event   | Description                                | Params                                |
| ------- | ------------------------------------------ | ------------------------------------- |
| confirm | Triggered when clicking the confirm button | `{ selectedValues, selectedOptions }` |
| cancel  | Triggered when clicking the cancel button  | -                                     |
| change  | Triggered when an option changes           | `{ selectedValues, index }`           |

- `selectedValues`: an array of the selected codes at each level
- `selectedOptions`: an array of the selected option objects at each level (contains `text`, `value`, `code`)
- `index`: the index of the column that changed this time
