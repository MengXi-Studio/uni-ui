# Checkbox 复选框

复选框组件，支持单独使用与复选框组，对齐 Vant Checkbox 的 API 与交互。

## 基础用法

<demo-live>
  <mx-checkbox :model-value="true">复选框</mx-checkbox>
  <mx-checkbox :model-value="false">复选框</mx-checkbox>
</demo-live>

```vue
<mx-checkbox v-model="checked">复选框</mx-checkbox>
```

## 复选框组

<demo-live>
  <mx-checkbox-group :model-value="['a']">
    <mx-checkbox name="a">复选框 a</mx-checkbox>
    <mx-checkbox name="b">复选框 b</mx-checkbox>
    <mx-checkbox name="c">复选框 c</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result">
  <mx-checkbox name="a">复选框 a</mx-checkbox>
  <mx-checkbox name="b">复选框 b</mx-checkbox>
  <mx-checkbox name="c">复选框 c</mx-checkbox>
</mx-checkbox-group>
```

## 水平排列

<demo-live>
  <mx-checkbox-group :model-value="['a']" direction="horizontal">
    <mx-checkbox name="a">复选框 a</mx-checkbox>
    <mx-checkbox name="b">复选框 b</mx-checkbox>
    <mx-checkbox name="c">复选框 c</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result" direction="horizontal">
  <mx-checkbox name="a">复选框 a</mx-checkbox>
  <mx-checkbox name="b">复选框 b</mx-checkbox>
</mx-checkbox-group>
```

## 禁用状态

<demo-live>
  <mx-checkbox-group :model-value="['a']" disabled>
    <mx-checkbox name="a">复选框 a</mx-checkbox>
    <mx-checkbox name="b">复选框 b</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<!-- 禁用所有子项 -->
<mx-checkbox-group v-model="result" disabled>
  <mx-checkbox name="a">复选框 a</mx-checkbox>
  <mx-checkbox name="b">复选框 b</mx-checkbox>
</mx-checkbox-group>

<!-- 单独禁用 -->
<mx-checkbox v-model="checked" disabled>复选框</mx-checkbox>
```

## 自定义颜色 / 大小 / 形状

<demo-live>
  <mx-checkbox-group :model-value="['a']" checked-color="#ee0a24" :icon-size="24" shape="square">
    <mx-checkbox name="a">复选框 a</mx-checkbox>
    <mx-checkbox name="b">复选框 b</mx-checkbox>
  </mx-checkbox-group>
</demo-live>

```vue
<mx-checkbox-group v-model="result" checked-color="#ee0a24" :icon-size="24" shape="square">
  <mx-checkbox name="a">复选框 a</mx-checkbox>
  <mx-checkbox name="b">复选框 b</mx-checkbox>
</mx-checkbox-group>
```

## 限制最大可选数

`max` 设为 `0` 时表示不限制。

```vue
<mx-checkbox-group v-model="result" :max="2">
  <mx-checkbox name="a">复选框 a</mx-checkbox>
  <mx-checkbox name="b">复选框 b</mx-checkbox>
  <mx-checkbox name="c">复选框 c</mx-checkbox>
</mx-checkbox-group>
```

## Checkbox Props

| 参数          | 说明                                     | 类型               | 默认值   |
| ------------- | ---------------------------------------- | ------------------ | -------- |
| model-value   | 选中状态（未在 group 中使用时，v-model） | `boolean`          | `false`  |
| name          | 标识符                                   | `string \| number` | `''`     |
| checked-color | 选中时图标颜色                           | `string`           | `''`     |
| icon-size     | 图标大小                                 | `number \| string` | `'20px'` |
| shape         | 形状                                     | `round \| square`  | `round`  |
| label         | 未选中时的提示                           | `string`           | `''`     |
| disabled      | 是否禁用                                 | `boolean`          | `false`  |
| block         | 是否为块级                               | `boolean`          | `false`  |
| custom-class  | 自定义类名                               | `string`           | `''`     |
| custom-style  | 自定义样式                               | `string \| object` | `''`     |

## Checkbox Events

| 事件名 | 说明               | 回调参数                   |
| ------ | ------------------ | -------------------------- |
| change | 当绑定值变化时触发 | 当前选中状态（单独使用时） |

## Checkbox Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义文案 |
| icon    | 自定义图标 |

## CheckboxGroup Props

| 参数          | 说明                            | 类型                     | 默认值     |
| ------------- | ------------------------------- | ------------------------ | ---------- |
| model-value   | 已选中项的标识符数组（v-model） | `array`                  | `[]`       |
| max           | 最多选择个数（0 表示不限制）    | `number \| string`       | `0`        |
| direction     | 排列方向                        | `vertical \| horizontal` | `vertical` |
| disabled      | 是否禁用所有子项                | `boolean`                | `false`    |
| checked-color | 选中时图标颜色                  | `string`                 | `''`       |
| icon-size     | 图标大小                        | `number \| string`       | `'20px'`   |
| shape         | 形状                            | `round \| square`        | `round`    |
| custom-class  | 自定义类名                      | `string`                 | `''`       |
| custom-style  | 自定义样式                      | `string \| object`       | `''`       |

## CheckboxGroup Events

| 事件名 | 说明               | 回调参数           |
| ------ | ------------------ | ------------------ |
| change | 当绑定值变化时触发 | 更新后的标识符数组 |
