# Uploader 文件上传

用于图片/文件上传与预览。

## 基础用法

```vue
<mx-uploader v-model="fileList" />
```

## 限制数量 / 大小

```vue
<mx-uploader v-model="fileList" :max-count="3" />
<mx-uploader v-model="fileList" :max-size="1024 * 500" @oversize="onOversize" />
```

## 上传中 / 删除

```vue
<mx-uploader v-model="fileList" :max-count="1" />
```

> 上传状态由 `v-model` 中每项的 `status`（`uploading / done / failed`）控制。

## API

### Props

| 参数         | 说明                | 类型         | 默认值  |
| ------------ | ------------------- | ------------ | ------- |
| model-value  | 文件列表（v-model） | `FileItem[]` | `[]`    |
| max-count    | 最大数量            | `number`     | -       |
| max-size     | 最大单文件大小      | `number`     | -       |
| multiple     | 是否多选            | `boolean`    | `false` |
| accept       | 接受的文件类型      | `string`     | `image` |
| preview-size | 预览图尺寸          | `number`     | `80`    |

### Events

| 事件名   | 说明     | 回调参数 |
| -------- | -------- | -------- |
| change   | 列表变化 | 新列表   |
| oversize | 文件超限 | file     |
| delete   | 删除文件 | 被删项   |
