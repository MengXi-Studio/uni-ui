# Empty 空状态

用于页面或列表为空时的占位。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-empty description="暂无数据" />
```

## 图片类型

```vue
<mx-empty image="search" description="暂无搜索结果" />
```

## 底部按钮

```vue
<mx-empty description="暂无数据">
  <mx-button type="primary" round>立即刷新</mx-button>
</mx-empty>
```

## API

### Props

| 参数        | 说明               | 类型     | 默认值 |
| ----------- | ------------------ | -------- | ------ |
| image       | 图片地址或内置类型 | `string` | -      |
| image-size  | 图片尺寸           | `number` | `80`   |
| description | 描述文案           | `string` | -      |

### Slots

`default`（底部按钮/内容）、`image`、`description`
