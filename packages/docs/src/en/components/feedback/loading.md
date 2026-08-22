# Loading

Used to indicate a loading state.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-loading />
<mx-loading color="#1989fa" />
```

## Circular / Spinner

```vue
<mx-loading type="circular" />
<mx-loading type="spinner" />
```

## Text and Direction

```vue
<mx-loading text="加载中..." />
<mx-loading vertical text="加载中..." />
```

## API

### Props

| Name     | Description                  | Type                  | Default    |
| -------- | ---------------------------- | --------------------- | ---------- |
| type     | Loading icon type            | `circular \| spinner` | `circular` |
| size     | Icon size                    | `number \| string`    | `30px`     |
| color    | Color                        | `string`              | `#c8c9cc`  |
| text     | Loading text                 | `string`              | -          |
| vertical | Whether to layout vertically | `boolean`             | `false`    |
