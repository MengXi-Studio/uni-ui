# Card

A product card used to display product image, price, title and other information. It aligns with the API and interactions of the Vant Card.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-card
    title="商品标题"
    desc="商品描述"
    num="2"
    price="10.00"
    origin-price="20.00"
    img="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
    custom-style="width: 320px;"
  />
</demo-live>

```vue
<mx-card
  title="商品标题"
  desc="商品描述"
  num="2"
  price="10.00"
  origin-price="20.00"
  img="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
/>
```

The integer and decimal parts of the price are displayed separately automatically; when `origin-price` is higher than `price`, the original price is shown with a strikethrough.

## Product Tag

<demo-live>
  <mx-card
    tag="热销"
    title="商品标题"
    desc="商品描述"
    price="10.00"
    img="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
    custom-style="width: 320px;"
  />
</demo-live>

```vue
<mx-card
  tag="热销"
  title="商品标题"
  desc="商品描述"
  price="10.00"
  img="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
/>
```

## Custom Content

Customize the image, tag, description and bottom content through slots:

<demo-live>
  <mx-card
    title="商品标题"
    price="10.00"
    img="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
    custom-style="width: 320px;"
  >
    <template #tags>
      <mx-tag plain type="danger" custom-style="margin-right: 4px;">标签一</mx-tag>
      <mx-tag plain type="primary">标签二</mx-tag>
    </template>
    <template #foot>
      <mx-button size="mini" type="danger">立即购买</mx-button>
    </template>
  </mx-card>
</demo-live>

```vue
<mx-card title="商品标题" price="10.00" img="xxx.jpeg">
  <template #thumb>
    <image src="xxx.jpeg" style="width: 88px; height: 88px;" />
  </template>
  <template #tag>
    <text>热销</text>
  </template>
  <template #desc>
    <view>自定义描述</view>
  </template>
  <template #tags>
    <mx-tag plain type="danger">标签一</mx-tag>
  </template>
  <template #foot>
    <mx-button size="mini" type="danger">立即购买</mx-button>
  </template>
</mx-card>
```

## Props

| Name         | Description                                                                  | Type               | Default |
| ------------ | ---------------------------------------------------------------------------- | ------------------ | ------- |
| img          | Product image URL                                                            | `string`           | `''`    |
| title        | Product name                                                                 | `string`           | `''`    |
| desc         | Product description                                                          | `string`           | `''`    |
| tag          | Product tag                                                                  | `string`           | `''`    |
| num          | Product quantity                                                             | `string`           | `''`    |
| price        | Price                                                                        | `number \| string` | `0`     |
| origin-price | Original price                                                               | `number \| string` | `0`     |
| currency     | Price currency symbol                                                        | `string`           | `¥`     |
| num-type     | Quantity display method: text text / grid corner badge                       | `text \| grid`     | `text`  |
| thumb-link   | The navigation URL when clicking the product image (handled by the consumer) | `string`           | `''`    |
| lazy-load    | Whether to lazily load the image                                             | `boolean`          | `false` |
| centered     | Whether the content is centered                                              | `boolean`          | `false` |
| custom-class | Custom class name                                                            | `string`           | `''`    |
| custom-style | Custom style                                                                 | `string \| object` | `''`    |

## Events

| Event       | Description                                 | Params |
| ----------- | ------------------------------------------- | ------ |
| click       | Triggered when the card is clicked          | event  |
| click-thumb | Triggered when the product image is clicked | event  |
| click-tag   | Triggered when the product tag is clicked   | event  |

## Slots

| Name  | Description                                           |
| ----- | ----------------------------------------------------- |
| thumb | Custom product image (shown when img is set)          |
| tag   | Custom tag corner badge                               |
| desc  | Custom description                                    |
| tags  | Custom tag area (below the description)               |
| foot  | Custom bottom content (price and quantity by default) |
