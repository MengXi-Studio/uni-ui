# DropdownMenu

A drop-down menu list, commonly used for filtering in list pages. It aligns with the API and interactions of the Vant DropdownMenu.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

`mx-dropdown-item` is nested inside `mx-dropdown-menu`. `v-model` binds the value of the currently selected item, and `options` sets the option array.

<demo-live>
  <mx-dropdown-menu>
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ]"
    />
    <mx-dropdown-item
      title="默认排序"
      :model-value="'a'"
      :options="[
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu>
  <mx-dropdown-item v-model="value1" :options="option1" />
  <mx-dropdown-item v-model="value2" :options="option2" />
</mx-dropdown-menu>
```

```ts
const value1 = ref(0)
const value2 = ref('a')

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
]
```

## Custom Color

Set `active-color` on the menu bar; an `active-color` set individually on a menu item has higher priority.

<demo-live>
  <mx-dropdown-menu active-color="#ee0a24">
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu active-color="#ee0a24">
  <mx-dropdown-item v-model="value1" :options="option1" />
</mx-dropdown-menu>
```

## Expand Upwards

<demo-live>
  <mx-dropdown-menu direction="up">
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu direction="up">
  <mx-dropdown-item v-model="value1" :options="option1" />
</mx-dropdown-menu>
```

## Disabled Menu

<demo-live>
  <mx-dropdown-menu>
    <mx-dropdown-item
      disabled
      title="禁用菜单"
      :model-value="0"
      :options="[
        { text: '选项一', value: 0 },
        { text: '选项二', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu>
  <mx-dropdown-item v-model="value" disabled title="禁用菜单" :options="options" />
</mx-dropdown-menu>
```

## API

### DropdownMenu Props

| Name                   | Description                                      | Type               | Default   |
| ---------------------- | ------------------------------------------------ | ------------------ | --------- |
| active-color           | The selected color of the menu title and options | `string`           | `#1989fa` |
| direction              | The expand direction of the menu                 | `down \| up`       | `down`    |
| z-index                | The z-index level of the menu bar                | `number \| string` | `10`      |
| duration               | Transition duration, in milliseconds             | `number \| string` | `200`     |
| overlay                | Whether to show the overlay layer                | `boolean`          | `true`    |
| close-on-click-overlay | Whether to close after clicking the overlay      | `boolean`          | `true`    |
| custom-class           | Custom class name                                | `string`           | -         |
| custom-style           | Custom style                                     | `string \| object` | -         |

### DropdownItem Props

| Name         | Description                                        | Type               | Default |
| ------------ | -------------------------------------------------- | ------------------ | ------- |
| model-value  | The value of the currently selected item (v-model) | `number \| string` | -       |
| title        | Menu item title                                    | `string`           | -       |
| options      | Option array                                       | `DropdownOption[]` | `[]`    |
| disabled     | Whether to disable the menu item                   | `boolean`          | `false` |
| active-color | Selected color, higher priority than the menu      | `string`           | -       |
| custom-class | Custom class name                                  | `string`           | -       |
| custom-style | Custom style                                       | `string \| object` | -       |

### DropdownOption Data Structure

| Key      | Description                   | Type               |
| -------- | ----------------------------- | ------------------ |
| text     | Option text                   | `string`           |
| value    | The value of the option       | `number \| string` |
| disabled | Whether to disable the option | `boolean`          |

### DropdownMenu Events

| Event              | Description                                                    | Params          |
| ------------------ | -------------------------------------------------------------- | --------------- |
| update:model-value | Expanded item index update, -1 means all collapsed             | `index: number` |
| click              | Triggered when clicking the menu title to expand the menu item | `index: number` |
| close              | Triggered when the menu is collapsed                           | -               |

### DropdownItem Events

| Event              | Description                     | Params                    |
| ------------------ | ------------------------------- | ------------------------- |
| update:model-value | Selected value update (v-model) | `value: number \| string` |

### DropdownMenu Slots

| Name    | Description                                    |
| ------- | ---------------------------------------------- |
| default | Menu bar content, nest mx-dropdown-item inside |

### Methods (call through ref)

Get the DropdownMenu instance through ref:

| Name         | Description                                                           | Type     |
| ------------ | --------------------------------------------------------------------- | -------- |
| active-index | The index of the currently expanded menu item, -1 means all collapsed | `number` |
