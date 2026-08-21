# ContactCard 联系人卡片

联系人信息卡片，展示联系人姓名与电话，或作为"添加联系人"入口，对齐 Vant ContactCard 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

未传入 `name` / `tel` 时显示"添加联系人"入口；传入后展示联系人信息。

<demo-live>
  <mx-contact-card add-text="联系人" />
</demo-live>

```vue
<mx-contact-card add-text="联系人" />
```

## 编辑联系人

通过 `type="edit"` 显示编辑箭头，点击卡片触发 `click` 事件，点击箭头触发 `edit` 事件。

<demo-live>
  <mx-contact-card type="edit" name="张三" tel="13000000000" />
</demo-live>

```vue
<mx-contact-card type="edit" name="张三" tel="13000000000" />
```

配合事件使用：

```vue
<mx-contact-card type="edit" name="张三" tel="13000000000" @click="onClick" @edit="onEdit" />
```

```js
const onClick = (event) => console.log('点击卡片')
const onEdit = (event) => console.log('点击编辑')
```

## 自定义内容

通过默认插槽自定义卡片内容。

```vue
<mx-contact-card>
  <view class="my-card-content">自定义联系人内容</view>
</mx-contact-card>
```

## Props

| 参数         | 说明                                   | 类型               | 默认值    |
| ------------ | -------------------------------------- | ------------------ | --------- |
| add-text     | 添加联系人时显示的文字                 | `string`           | `''`      |
| name         | 联系人姓名                             | `string`           | `''`      |
| tel          | 联系人电话                             | `string`           | `''`      |
| type         | 卡片类型：`default` 展示 / `edit` 编辑 | `default \| edit`  | `default` |
| custom-class | 自定义类名                             | `string`           | `''`      |
| custom-style | 自定义样式                             | `string \| object` | `''`      |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击卡片时触发     | event    |
| edit   | 点击编辑箭头时触发 | event    |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义卡片内容 |
