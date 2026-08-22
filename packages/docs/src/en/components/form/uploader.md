# Uploader

Used for image/file upload and preview.

## Basic Usage

```vue
<mx-uploader v-model="fileList" />
```

## Limit Count / Size

```vue
<mx-uploader v-model="fileList" :max-count="3" />
<mx-uploader v-model="fileList" :max-size="1024 * 500" @oversize="onOversize" />
```

## Uploading / Deleting

```vue
<mx-uploader v-model="fileList" :max-count="1" />
```

> The upload status is controlled by the `status` (`uploading / done / failed`) of each item in `v-model`.

## API

### Props

| Name         | Description                         | Type         | Default |
| ------------ | ----------------------------------- | ------------ | ------- |
| model-value  | The file list (v-model)             | `FileItem[]` | `[]`    |
| max-count    | Maximum count                       | `number`     | -       |
| max-size     | Maximum size of a single file       | `number`     | -       |
| multiple     | Whether to allow multiple selection | `boolean`    | `false` |
| accept       | Accepted file type                  | `string`     | `image` |
| preview-size | Preview image size                  | `number`     | `80`    |

### Events

| Event    | Description                   | Params           |
| -------- | ----------------------------- | ---------------- |
| change   | When the list changes         | The new list     |
| oversize | When a file exceeds the limit | file             |
| delete   | When a file is deleted        | The deleted item |
