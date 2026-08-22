# Cascader 级联选择

级联选择器，底部弹出，用于省市区等多级数据的逐级选择，对齐 Vant Cascader 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-cascader
  v-model:show="show"
  :value="value"
  :options="options"
  @update:model-value="value = $event"
  @finish="onFinish"
/>
```

```js
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      { text: '杭州市', value: '330100', children: [{ text: '西湖区', value: '330106' }] },
    ],
  },
  {
    text: '广东省',
    value: '440000',
    children: [
      { text: '广州市', value: '440100', children: [{ text: '天河区', value: '440106' }] },
    ],
  },
]
```

`options` 为树形结构，选中叶子节点（无 `children` 的选项）时选择完成，触发 `confirm` / `finish` 并关闭弹层。

## selected 模式

`variant` 设为 `selected` 时，顶部以面包屑形式展示已选路径，点击面包屑可回退到对应层级。

```vue
<mx-cascader v-model:show="show" :value="value" :options="options" variant="selected" />
```

## 自定义字段名

通过 `field-names` 指定选项中文本、值、子级的字段名。

```vue
<mx-cascader
  v-model:show="show"
  :value="value"
  :options="options"
  :field-names="{ text: 'name', value: 'id', children: 'sub' }"
/>
```

## Props

| 参数           | 说明                                   | 类型               | 默认值  |
| -------------- | -------------------------------------- | ------------------ | ------- |
| show           | 是否显示（v-model:show）               | `boolean`          | `false` |
| options        | 树形选项数据（必填）                   | `array`            | -       |
| value          | 选中的值数组                           | `array`            | `[]`    |
| title          | 标题                                   | `string`           | `选择`  |
| active-tab-asc | 是否可点击选择每个 tab                 | `boolean`          | `false` |
| variant        | 展示类型                               | `tabs \| selected` | `tabs`  |
| field-names    | 字段名映射 `{ text, value, children }` | `object`           | `{}`    |
| z-index        | 弹层层级                               | `number \| string` | `1000`  |
| custom-class   | 自定义类名                             | `string`           | `''`    |
| custom-style   | 自定义样式                             | `string \| object` | `''`    |

## Events

| 事件名             | 说明                           | 回调参数                               |
| ------------------ | ------------------------------ | -------------------------------------- |
| change             | 切换选项或切换层级时触发       | 当前选中路径（每层一个 option 的数组） |
| confirm            | 选择完成（选中叶子节点）时触发 | 选中路径数组                           |
| finish             | 选择完成（选中叶子节点）时触发 | 选中路径数组                           |
| update:model-value | 选择完成时触发                 | 选中路径数组                           |

选中路径数组中每一项为对应层级的原始选项对象。
