# Collapse

A collapse panel container used together with panel items, with accordion mode support. It aligns with the API and interactions of the Vant Collapse.

## Basic Usage

`v-model` binds the array of `name`s of the currently expanded items. `mx-collapse-item` identifies each panel through `name`.

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="标题 1" name="1">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 2" name="2">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 3" name="3">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse v-model="activeNames">
  <mx-collapse-item title="标题 1" name="1">内容 1</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容 2</mx-collapse-item>
  <mx-collapse-item title="标题 3" name="3">内容 3</mx-collapse-item>
</mx-collapse>
```

```ts
const activeNames = ref(['1'])
```

## Accordion

After enabling `accordion`, at most one panel can be expanded at a time. `v-model` is a single name (string or number).

```vue
<mx-collapse v-model="activeName" accordion>
  <mx-collapse-item title="标题 1" name="1">内容 1</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容 2</mx-collapse-item>
  <mx-collapse-item title="标题 3" name="3">内容 3</mx-collapse-item>
</mx-collapse>
```

```ts
const activeName = ref('1')
```

## Disabled State

Once a panel item is set to `disabled`, it can no longer be expanded or collapsed; you can also disable all panels uniformly on `mx-collapse`.

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="禁用面板" name="1" disabled>
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 2" name="2">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse :model-value="['1']">
  <mx-collapse-item title="禁用面板" name="1" disabled>内容</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容</mx-collapse-item>
</mx-collapse>
```

## Custom Title Content and Icon

`icon` supports an image URL or a character (emoji). `value` shows extra information on the right of the title; you can also fully customize it through the `title` / `value` slots.

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="标题 1" name="1" icon="⭐" value="右侧信息">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse v-model="activeNames">
  <mx-collapse-item title="标题 1" name="1" icon="⭐" value="右侧信息">
    内容
  </mx-collapse-item>
  <mx-collapse-item title="自定义标题" name="2">
    <template #title>
      <text style="color: #1989fa">自定义标题</text>
    </template>
    内容
  </mx-collapse-item>
</mx-collapse>
```

## API

### Collapse Props

| Name         | Description                                        | Type                        | Default |
| ------------ | -------------------------------------------------- | --------------------------- | ------- |
| model-value  | The name of the currently expanded panel (v-model) | `array \| string \| number` | -       |
| accordion    | Whether to enable accordion mode                   | `boolean`                   | `false` |
| disabled     | Whether to disable all panels                      | `boolean`                   | `false` |
| duration     | Toggle animation duration, in milliseconds         | `number`                    | `300`   |
| custom-class | Custom class name                                  | `string`                    | -       |
| custom-style | Custom style                                       | `string \| object`          | -       |

### CollapseItem Props

| Name         | Description                                 | Type               | Default |
| ------------ | ------------------------------------------- | ------------------ | ------- |
| name         | Unique identifier, uses title when not set  | `string \| number` | -       |
| title        | Title                                       | `string`           | -       |
| value        | Extra information on the right of the title | `string`           | -       |
| disabled     | Whether to disable the panel                | `boolean`          | `false` |
| icon         | Icon (image URL or character/emoji)         | `string`           | -       |
| custom-class | Custom class name                           | `string`           | -       |
| custom-style | Custom style                                | `string \| object` | -       |

### Collapse Events

| Event              | Description                     | Params        |
| ------------------ | ------------------------------- | ------------- |
| update:model-value | Expanded state update (v-model) | `value`       |
| change             | Triggered when switching panels | `value, name` |

### CollapseItem Slots

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| default | Panel content                                      |
| title   | Custom title                                       |
| value   | Custom extra information on the right of the title |
