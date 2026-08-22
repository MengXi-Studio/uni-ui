# Skeleton

Used as a placeholder while the page is loading, to alleviate the white screen during loading.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-skeleton :row="3" :avatar="true" />
```

## Disable Animation / Custom Width

```vue
<mx-skeleton :row="2" :animate="false" />
<mx-skeleton :row="2" row-width="50%" />
```

## API

### Props

| Name         | Description                           | Type                 | Default |
| ------------ | ------------------------------------- | -------------------- | ------- |
| row          | Number of paragraph rows              | `number`             | `0`     |
| title        | Whether to show a title placeholder   | `boolean`            | `true`  |
| avatar       | Whether to show an avatar placeholder | `boolean`            | `false` |
| avatar-shape | Avatar shape                          | `round \| square`    | `round` |
| avatar-size  | Avatar size                           | `number \| string`   | `32px`  |
| row-width    | Paragraph row width                   | `string \| string[]` | `100%`  |
| animate      | Whether to show animation             | `boolean`            | `true`  |
| round        | Whether to use rounded corners        | `boolean`            | `false` |

### Slots

`default` / `title` / `row` can customize each area.
