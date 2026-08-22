# GoodsAction

A bottom action bar on product pages, composed of the `mx-goods-action` container, `mx-goods-action-icon` icon buttons and `mx-goods-action-button` action buttons. It aligns with the API and interactions of the Vant GoodsAction series.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Icon buttons are placed on the left and action buttons on the right.

<demo-live>
  <mx-goods-action>
    <mx-goods-action-icon icon="💬" text="Support" />
    <mx-goods-action-icon icon="🛒" text="Cart" :badge="5" />
    <mx-goods-action-button type="warning" text="Add to Cart" />
    <mx-goods-action-button type="danger" text="Buy Now" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="💬" text="Support" />
  <mx-goods-action-icon icon="🛒" text="Cart" :badge="5" />
  <mx-goods-action-button type="warning" text="Add to Cart" />
  <mx-goods-action-button type="danger" text="Buy Now" />
</mx-goods-action>
```

## Icon Button States

Icon buttons support badge and disabled states.

<demo-live>
  <mx-goods-action>
    <mx-goods-action-icon icon="⭐" text="Favorited" color="#ff5000" />
    <mx-goods-action-icon icon="🛒" text="Cart" :badge="99" />
    <mx-goods-action-button type="primary" text="Buy Now" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="⭐" text="Favorited" color="#ff5000" />
  <mx-goods-action-icon icon="🛒" text="Cart" :badge="99" />
  <mx-goods-action-button type="primary" text="Buy Now" />
</mx-goods-action>
```

## Custom Button Color

Action buttons support five types and a custom theme color.

<demo-live>
  <mx-goods-action>
    <mx-goods-action-button text="Default Button" />
    <mx-goods-action-button type="primary" text="Primary Button" />
    <mx-goods-action-button type="danger" text="Danger Button" color="#7232dd" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-button text="Default Button" />
  <mx-goods-action-button type="primary" text="Primary Button" />
  <mx-goods-action-button type="danger" text="Danger Button" color="#7232dd" />
</mx-goods-action>
```

## Loading and Disabled States

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="🛒" text="Cart" disabled />
  <mx-goods-action-button type="warning" text="Add to Cart" loading />
  <mx-goods-action-button type="danger" text="Buy Now" disabled />
</mx-goods-action>
```

## Event Listening

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="🛒" text="Cart" @click="onClickCart" />
  <mx-goods-action-button type="warning" text="Add to Cart" @click="onClickAdd" />
  <mx-goods-action-button type="danger" text="Buy Now" @click="onClickBuy" />
</mx-goods-action>
```

```js
const onClickCart = (event) => console.log('Tap cart')
const onClickAdd = (event) => console.log('Add to cart')
const onClickBuy = (event) => console.log('Buy now')
```

## GoodsAction Props

| Name                   | Description                              | Type               | Default |
| ---------------------- | ---------------------------------------- | ------------------ | ------- |
| safe-area-inset-bottom | Whether to adapt to the bottom safe area | `boolean`          | `false` |
| custom-class           | Custom class name                        | `string`           | `''`    |
| custom-style           | Custom style                             | `string \| object` | `''`    |

## GoodsActionButton Props

| Name         | Description        | Type                                                 | Default   |
| ------------ | ------------------ | ---------------------------------------------------- | --------- |
| text         | Button text        | `string`                                             | `''`      |
| type         | Button type        | `default \| primary \| danger \| success \| warning` | `default` |
| color        | Custom theme color | `string`                                             | `''`      |
| icon         | Icon name          | `string`                                             | `''`      |
| disabled     | Whether disabled   | `boolean`                                            | `false`   |
| loading      | Whether loading    | `boolean`                                            | `false`   |
| custom-class | Custom class name  | `string`                                             | `''`      |
| custom-style | Custom style       | `string \| object`                                   | `''`      |

## GoodsActionIcon Props

| Name         | Description                        | Type               | Default |
| ------------ | ---------------------------------- | ------------------ | ------- |
| icon         | Icon name (icon name or character) | `string`           | `''`    |
| text         | Text below the icon                | `string`           | `''`    |
| color        | Icon color                         | `string`           | `''`    |
| badge        | Badge content                      | `number \| string` | -       |
| disabled     | Whether disabled                   | `boolean`          | `false` |
| custom-class | Custom class name                  | `string`           | `''`    |
| custom-style | Custom style                       | `string \| object` | `''`    |

## Events

| Component         | Event | Description                       | Params |
| ----------------- | ----- | --------------------------------- | ------ |
| GoodsActionButton | click | Triggered when tapping the button | event  |
| GoodsActionIcon   | click | Triggered when tapping the icon   | event  |

## Slots

| Component         | Name    | Description                                 |
| ----------------- | ------- | ------------------------------------------- |
| GoodsAction       | default | Container content (icon and action buttons) |
| GoodsActionButton | default | Custom button text                          |
| GoodsActionIcon   | icon    | Custom icon                                 |
| GoodsActionIcon   | default | Custom content (appended after the text)    |
