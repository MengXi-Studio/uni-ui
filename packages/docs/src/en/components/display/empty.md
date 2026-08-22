# Empty

Used as a placeholder when a page or list is empty.

## Basic Usage

```vue
<mx-empty description="暂无数据" />
```

## Image Type

```vue
<mx-empty image="search" description="暂无搜索结果" />
```

## Bottom Button

```vue
<mx-empty description="暂无数据">
  <mx-button type="primary" round>立即刷新</mx-button>
</mx-empty>
```

## API

### Props

| Name        | Description                | Type     | Default |
| ----------- | -------------------------- | -------- | ------- |
| image       | Image URL or built-in type | `string` | -       |
| image-size  | Image size                 | `number` | `80`    |
| description | Description text           | `string` | -       |

### Slots

`default` (bottom button/content), `image`, `description`
