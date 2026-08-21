# Radio 单选框

单选框组件，需在 mx-radio-group 中使用，对齐 Vant Radio 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <mx-radio-group :model-value="'a'">
    <mx-radio name="a">单选框 a</mx-radio>
    <mx-radio name="b">单选框 b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked">
  <mx-radio name="a">单选框 a</mx-radio>
  <mx-radio name="b">单选框 b</mx-radio>
</mx-radio-group>
```

`v-model` 绑定当前选中项的 `name`。

## 水平排列

<demo-live>
  <mx-radio-group :model-value="'1'" direction="horizontal">
    <mx-radio name="1">单选框 1</mx-radio>
    <mx-radio name="2">单选框 2</mx-radio>
    <mx-radio name="3">单选框 3</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked" direction="horizontal">
  <mx-radio name="1">单选框 1</mx-radio>
  <mx-radio name="2">单选框 2</mx-radio>
</mx-radio-group>
```

## 禁用状态

<demo-live>
  <mx-radio-group :model-value="'a'" disabled>
    <mx-radio name="a">单选框 a</mx-radio>
    <mx-radio name="b">单选框 b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<!-- 禁用所有子项 -->
<mx-radio-group v-model="checked" disabled>
  <mx-radio name="a">单选框 a</mx-radio>
  <mx-radio name="b">单选框 b</mx-radio>
</mx-radio-group>

<!-- 单独禁用 -->
<mx-radio name="a" disabled>单选框 a</mx-radio>
```

## 自定义颜色与大小

<demo-live>
  <mx-radio-group :model-value="'a'" checked-color="#ee0a24" :icon-size="24">
    <mx-radio name="a">单选框 a</mx-radio>
    <mx-radio name="b">单选框 b</mx-radio>
  </mx-radio-group>
</demo-live>

```vue
<mx-radio-group v-model="checked" checked-color="#ee0a24" :icon-size="24">
  <mx-radio name="a">单选框 a</mx-radio>
  <mx-radio name="b">单选框 b</mx-radio>
</mx-radio-group>
```

## Radio Props

| 参数          | 说明                                              | 类型                          | 默认值   |
| ------------- | ------------------------------------------------- | ----------------------------- | -------- |
| model-value   | 当前选中的值（单独使用时，v-model，与 name 匹配） | `string \| number \| boolean` | `''`     |
| name          | 标识符                                            | `string \| number \| boolean` | `''`     |
| checked-color | 选中时图标颜色                                    | `string`                      | `''`     |
| icon-size     | 图标大小                                          | `number \| string`            | `'20px'` |
| disabled      | 是否禁用                                          | `boolean`                     | `false`  |
| label         | 文案                                              | `string`                      | `''`     |
| custom-class  | 自定义类名                                        | `string`                      | `''`     |
| custom-style  | 自定义样式                                        | `string \| object`            | `''`     |

## Radio Events

| 事件名 | 说明             | 回调参数   |
| ------ | ---------------- | ---------- |
| change | 切换选中项时触发 | 当前标识符 |

## Radio Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义文案 |
| icon    | 自定义图标 |

## RadioGroup Props

| 参数          | 说明                    | 类型                          | 默认值     |
| ------------- | ----------------------- | ----------------------------- | ---------- |
| model-value   | 当前选中的值（v-model） | `string \| number \| boolean` | `''`       |
| direction     | 排列方向                | `vertical \| horizontal`      | `vertical` |
| disabled      | 是否禁用所有子项        | `boolean`                     | `false`    |
| checked-color | 选中时图标颜色          | `string`                      | `''`       |
| icon-size     | 图标大小                | `number \| string`            | `'20px'`   |
| custom-class  | 自定义类名              | `string`                      | `''`       |
| custom-style  | 自定义样式              | `string \| object`            | `''`       |

## RadioGroup Events

| 事件名 | 说明               | 回调参数       |
| ------ | ------------------ | -------------- |
| change | 当绑定值变化时触发 | 当前选中标识符 |
