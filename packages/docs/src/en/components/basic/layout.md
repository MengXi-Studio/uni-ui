# Row/Col Layout

Flex-based grid layout, divided into 24 columns.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-row :gutter="12">
  <mx-col :span="8">span 8</mx-col>
  <mx-col :span="8">span 8</mx-col>
  <mx-col :span="8">span 8</mx-col>
</mx-row>
```

## Offset / Alignment

```vue
<mx-row justify="space-between">
  <mx-col :span="8" :offset="2">offset 2</mx-col>
  <mx-col :span="8">Column</mx-col>
</mx-row>
```

## API

### Row Props

| Name    | Description         | Type                                                                      | Default |
| ------- | ------------------- | ------------------------------------------------------------------------- | ------- |
| gutter  | Column gap (px)     | `number`                                                                  | `0`     |
| justify | Main axis alignment | `start \| end \| center \| space-around \| space-between \| space-evenly` | `start` |

### Col Props

| Name   | Description        | Type               | Default |
| ------ | ------------------ | ------------------ | ------- |
| span   | Column span (1~24) | `number \| string` | `24`    |
| offset | Left offset        | `number \| string` | `0`     |
