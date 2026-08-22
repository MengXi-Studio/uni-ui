# ContactCard

A contact info card that displays the contact name and phone, or serves as an "Add Contact" entry. It aligns with the API and interactions of the Vant ContactCard.

## Basic Usage

Shows the "Add Contact" entry when no `name` / `tel` is passed; shows the contact info once they are passed.

<demo-live>
  <mx-contact-card add-text="Contact" />
</demo-live>

```vue
<mx-contact-card add-text="Contact" />
```

## Edit Contact

With `type="edit"` the edit arrow is shown. Tapping the card triggers the `click` event, and tapping the arrow triggers the `edit` event.

<demo-live>
  <mx-contact-card type="edit" name="Zhang San" tel="13000000000" />
</demo-live>

```vue
<mx-contact-card type="edit" name="Zhang San" tel="13000000000" />
```

Used with events:

```vue
<mx-contact-card type="edit" name="Zhang San" tel="13000000000" @click="onClick" @edit="onEdit" />
```

```js
const onClick = event => console.log('Tap card')
const onEdit = event => console.log('Tap edit')
```

## Custom Content

Customize the card content through the default slot.

```vue
<mx-contact-card>
  <view class="my-card-content">Custom contact content</view>
</mx-contact-card>
```

## Props

| Name         | Description                                | Type               | Default   |
| ------------ | ------------------------------------------ | ------------------ | --------- |
| add-text     | Text shown when adding a contact           | `string`           | `''`      |
| name         | Contact name                               | `string`           | `''`      |
| tel          | Contact phone                              | `string`           | `''`      |
| type         | Card type: `default` display / `edit` edit | `default \| edit`  | `default` |
| custom-class | Custom class name                          | `string`           | `''`      |
| custom-style | Custom style                               | `string \| object` | `''`      |

## Events

| Event | Description                           | Params |
| ----- | ------------------------------------- | ------ |
| click | Triggered when tapping the card       | event  |
| edit  | Triggered when tapping the edit arrow | event  |

## Slots

| Name    | Description         |
| ------- | ------------------- |
| default | Custom card content |
