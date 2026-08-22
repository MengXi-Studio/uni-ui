# NavBar

Top navigation bar that supports back, left/right slots and sticky positioning.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-nav-bar title="Title" left-arrow @click-left="onClickLeft" />
```

## Left / Right Text / Slots

```vue
<mx-nav-bar title="Title" left-text="Back" right-text="Button" />
```

## Sticky / Safe Area

```vue
<mx-nav-bar title="Title" fixed safe-area-inset-top />
```

## API

### Props

| Name                | Description                     | Type               | Default |
| ------------------- | ------------------------------- | ------------------ | ------- |
| title               | Title                           | `string`           | -       |
| left-text           | Left text                       | `string`           | -       |
| right-text          | Right text                      | `string`           | -       |
| left-arrow          | Whether to show the back arrow  | `boolean`          | `false` |
| fixed               | Whether to leave the top        | `boolean`          | `false` |
| safe-area-inset-top | Whether to enable top safe area | `boolean`          | `false` |
| z-index             | z-index                         | `number \| string` | `500`   |

### Events

`click-left` / `click-right` / `click-arrow`
