# GoodsAction 商品导航

商品页底部操作栏，由 `mx-goods-action` 容器、`mx-goods-action-icon` 图标按钮与 `mx-goods-action-button` 操作按钮组成，对齐 Vant GoodsAction 系列的 API 与交互。

## 基础用法

图标按钮放在左侧，操作按钮放在右侧。

<demo-live>
  <mx-goods-action>
    <mx-goods-action-icon icon="💬" text="客服" />
    <mx-goods-action-icon icon="🛒" text="购物车" :badge="5" />
    <mx-goods-action-button type="warning" text="加入购物车" />
    <mx-goods-action-button type="danger" text="立即购买" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="💬" text="客服" />
  <mx-goods-action-icon icon="🛒" text="购物车" :badge="5" />
  <mx-goods-action-button type="warning" text="加入购物车" />
  <mx-goods-action-button type="danger" text="立即购买" />
</mx-goods-action>
```

## 图标按钮状态

图标按钮支持徽标与禁用状态。

<demo-live>
  <mx-goods-action>
    <mx-goods-action-icon icon="⭐" text="已收藏" color="#ff5000" />
    <mx-goods-action-icon icon="🛒" text="购物车" :badge="99" />
    <mx-goods-action-button type="primary" text="立即购买" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="⭐" text="已收藏" color="#ff5000" />
  <mx-goods-action-icon icon="🛒" text="购物车" :badge="99" />
  <mx-goods-action-button type="primary" text="立即购买" />
</mx-goods-action>
```

## 自定义按钮颜色

操作按钮支持五种类型与自定义主题色。

<demo-live>
  <mx-goods-action>
    <mx-goods-action-button text="默认按钮" />
    <mx-goods-action-button type="primary" text="主要按钮" />
    <mx-goods-action-button type="danger" text="危险按钮" color="#7232dd" />
  </mx-goods-action>
</demo-live>

```vue
<mx-goods-action>
  <mx-goods-action-button text="默认按钮" />
  <mx-goods-action-button type="primary" text="主要按钮" />
  <mx-goods-action-button type="danger" text="危险按钮" color="#7232dd" />
</mx-goods-action>
```

## 加载与禁用状态

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="🛒" text="购物车" disabled />
  <mx-goods-action-button type="warning" text="加入购物车" loading />
  <mx-goods-action-button type="danger" text="立即购买" disabled />
</mx-goods-action>
```

## 事件监听

```vue
<mx-goods-action>
  <mx-goods-action-icon icon="🛒" text="购物车" @click="onClickCart" />
  <mx-goods-action-button type="warning" text="加入购物车" @click="onClickAdd" />
  <mx-goods-action-button type="danger" text="立即购买" @click="onClickBuy" />
</mx-goods-action>
```

```js
const onClickCart = event => console.log('点击购物车')
const onClickAdd = event => console.log('加入购物车')
const onClickBuy = event => console.log('立即购买')
```

## GoodsAction Props

| 参数                   | 说明               | 类型               | 默认值  |
| ---------------------- | ------------------ | ------------------ | ------- |
| safe-area-inset-bottom | 是否适配底部安全区 | `boolean`          | `false` |
| custom-class           | 自定义类名         | `string`           | `''`    |
| custom-style           | 自定义样式         | `string \| object` | `''`    |

## GoodsActionButton Props

| 参数         | 说明         | 类型                                                 | 默认值    |
| ------------ | ------------ | ---------------------------------------------------- | --------- |
| text         | 按钮文字     | `string`                                             | `''`      |
| type         | 按钮类型     | `default \| primary \| danger \| success \| warning` | `default` |
| color        | 自定义主题色 | `string`                                             | `''`      |
| icon         | 图标名称     | `string`                                             | `''`      |
| disabled     | 是否禁用     | `boolean`                                            | `false`   |
| loading      | 是否加载中   | `boolean`                                            | `false`   |
| custom-class | 自定义类名   | `string`                                             | `''`      |
| custom-style | 自定义样式   | `string \| object`                                   | `''`      |

## GoodsActionIcon Props

| 参数         | 说明                     | 类型               | 默认值  |
| ------------ | ------------------------ | ------------------ | ------- |
| icon         | 图标名称（图标名或字符） | `string`           | `''`    |
| text         | 图标下文字               | `string`           | `''`    |
| color        | 图标颜色                 | `string`           | `''`    |
| badge        | 徽标内容                 | `number \| string` | -       |
| disabled     | 是否禁用                 | `boolean`          | `false` |
| custom-class | 自定义类名               | `string`           | `''`    |
| custom-style | 自定义样式               | `string \| object` | `''`    |

## Events

| 组件              | 事件名 | 说明           | 回调参数 |
| ----------------- | ------ | -------------- | -------- |
| GoodsActionButton | click  | 点击按钮时触发 | event    |
| GoodsActionIcon   | click  | 点击图标时触发 | event    |

## Slots

| 组件              | 名称    | 说明                           |
| ----------------- | ------- | ------------------------------ |
| GoodsAction       | default | 容器内容（图标按钮与操作按钮） |
| GoodsActionButton | default | 自定义按钮文字                 |
| GoodsActionIcon   | icon    | 自定义图标                     |
| GoodsActionIcon   | default | 自定义内容（追加在文字之后）   |
