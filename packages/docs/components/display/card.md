# Card 商品卡片

商品卡片，用于展示商品图片、价格、标题等信息，对齐 Vant Card 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

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

价格整数与小数部分自动拆分展示；`origin-price` 高于 `price` 时展示划线原价。

## 商品标签

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

## 自定义内容

通过插槽自定义图片、标签、描述与底部内容：

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

| 参数         | 说明                                    | 类型               | 默认值  |
| ------------ | --------------------------------------- | ------------------ | ------- |
| img          | 商品图片地址                            | `string`           | `''`    |
| title        | 商品名称                                | `string`           | `''`    |
| desc         | 商品描述                                | `string`           | `''`    |
| tag          | 商品标签                                | `string`           | `''`    |
| num          | 商品数量                                | `string`           | `''`    |
| price        | 价格                                    | `number \| string` | `0`     |
| origin-price | 原价                                    | `number \| string` | `0`     |
| currency     | 价格货币符号                            | `string`           | `¥`     |
| num-type     | 数量显示方式：text 文本 / grid 网格角标 | `text \| grid`     | `text`  |
| thumb-link   | 商品图点击跳转地址（由使用方处理导航）  | `string`           | `''`    |
| lazy-load    | 是否懒加载图片                          | `boolean`          | `false` |
| centered     | 内容是否居中                            | `boolean`          | `false` |
| custom-class | 自定义类名                              | `string`           | `''`    |
| custom-style | 自定义样式                              | `string \| object` | `''`    |

## Events

| 事件名      | 说明               | 回调参数 |
| ----------- | ------------------ | -------- |
| click       | 点击卡片时触发     | event    |
| click-thumb | 点击商品图时触发   | event    |
| click-tag   | 点击商品标签时触发 | event    |

## Slots

| 名称  | 说明                               |
| ----- | ---------------------------------- |
| thumb | 自定义商品图（设置 img 时显示）    |
| tag   | 自定义标签角标                     |
| desc  | 自定义描述                         |
| tags  | 自定义标签区（位于描述下方）       |
| foot  | 自定义底部内容（默认为价格与数量） |
