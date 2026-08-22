# Tag

Used to mark a category or status.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-tag type="primary">标签</mx-tag>
<mx-tag type="success">标签</mx-tag>
<mx-tag type="warning">标签</mx-tag>
<mx-tag type="danger">标签</mx-tag>
```

## Styles

```vue
<mx-tag plain type="primary">朴素</mx-tag>
<mx-tag round type="danger">圆角</mx-tag>
<mx-tag mark type="warning">标记</mx-tag>
<mx-tag size="large">大号</mx-tag>
<mx-tag size="mini">迷你</mx-tag>
```

## Closable

```vue
<mx-tag closeable @close="onClose">标签</mx-tag>
```

## API

### Props

| Name      | Description             | Type                                                 | Default   |
| --------- | ----------------------- | ---------------------------------------------------- | --------- |
| type      | Type                    | `default \| primary \| success \| warning \| danger` | `default` |
| size      | Size                    | `large \| medium \| mini`                            | `medium`  |
| color     | Custom background color | `string`                                             | -         |
| plain     | Plain style             | `boolean`                                            | `false`   |
| round     | Rounded corners         | `boolean`                                            | `false`   |
| mark      | Mark style              | `boolean`                                            | `false`   |
| closeable | Closable                | `boolean`                                            | `false`   |

### Events

| Event | Description               |
| ----- | ------------------------- |
| close | When the close is clicked |
