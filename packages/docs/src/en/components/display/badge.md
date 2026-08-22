# Badge

Shows a message count or a status dot in the top-right corner of an element.

## Basic Usage

```vue
<mx-badge :content="5"><mx-tag>徽标</mx-tag></mx-badge>
```

## Max Value (shows a plus sign when exceeding the limit)

```vue
<mx-badge :content="200" :max="99"><mx-tag>徽标</mx-tag></mx-badge>
```

## Dot / Custom Color

```vue
<mx-badge dot><mx-tag>圆点</mx-tag></mx-badge>
<mx-badge :content="5" bg-color="#07c160"><mx-tag>自定义色</mx-tag></mx-badge>
```

## API

### Props

| Name     | Description                            | Type               | Default  |
| -------- | -------------------------------------- | ------------------ | -------- |
| content  | Badge content                          | `number \| string` | -        |
| max      | Max value, show max+ when exceeded     | `number`           | `99`     |
| dot      | Whether to display as a dot            | `boolean`          | `false`  |
| color    | Color (primary/success/warning/danger) | `string`           | `danger` |
| bg-color | Custom background color                | `string`           | -        |
| offset   | Offset [x, y]                          | `[number, number]` | `[0, 0]` |
