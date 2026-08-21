# Search 搜索

用于搜索场景。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-search v-model="value" placeholder="请输入搜索关键词" />
```

## 搜索动作

```vue
<mx-search v-model="value" @search="onSearch" />
```

## 形状 / 禁用 / 清除

```vue
<mx-search v-model="value" shape="square" />
<mx-search v-model="value" disabled />
<mx-search v-model="value" clearable />
```

## API

### Props

| 参数        | 说明              | 类型              | 默认值  |
| ----------- | ----------------- | ----------------- | ------- |
| model-value | 输入值（v-model） | `string`          | -       |
| placeholder | 占位符            | `string`          | -       |
| shape       | 形状              | `round \| square` | `round` |
| disabled    | 禁用              | `boolean`         | `false` |
| clearable   | 是否可清除        | `boolean`         | `false` |
| background  | 背景色            | `string`          | -       |

### Events

| 事件名            | 说明        |
| ----------------- | ----------- |
| update:modelValue | 值更新      |
| search            | 搜索        |
| clear             | 清除        |
| cancel            | 取消        |
| focus / blur      | 聚焦 / 失焦 |
