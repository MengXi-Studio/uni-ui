# Grid

Display elements in a grid layout.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-grid :column-num="3">
  <mx-grid-item icon="📁" text="Files" />
  <mx-grid-item icon="⚙️" text="Settings" />
  <mx-grid-item icon="🛒" text="Cart" />
</mx-grid>
```

## Gutter / Square

```vue
<mx-grid :column-num="2" :gutter="8" square>
  <mx-grid-item text="Grid 1" />
  <mx-grid-item text="Grid 2" />
</mx-grid>
```

## API

### Grid Props

| Name       | Description                       | Type      | Default |
| ---------- | --------------------------------- | --------- | ------- |
| column-num | Column count                      | `number`  | `4`     |
| gutter     | Gutter                            | `number`  | `0`     |
| border     | Whether to show the border        | `boolean` | `true`  |
| square     | Whether to set the item to square | `boolean` | `false` |

### GridItem Props

| Name | Description               | Type     | Default |
| ---- | ------------------------- | -------- | ------- |
| icon | Icon (image or character) | `string` | -       |
| text | Text                      | `string` | -       |

### Events

`click`（triggered when the grid item is tapped）
