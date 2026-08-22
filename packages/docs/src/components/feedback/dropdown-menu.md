# DropdownMenu 下拉菜单

向下弹出的菜单列表，常用于列表页的筛选操作，对齐 Vant DropdownMenu 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

`mx-dropdown-item` 嵌套在 `mx-dropdown-menu` 中使用，`v-model` 绑定当前选中项对应的 value，`options` 设置选项数组。

<demo-live>
  <mx-dropdown-menu>
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ]"
    />
    <mx-dropdown-item
      title="默认排序"
      :model-value="'a'"
      :options="[
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu>
  <mx-dropdown-item v-model="value1" :options="option1" />
  <mx-dropdown-item v-model="value2" :options="option2" />
</mx-dropdown-menu>
```

```ts
const value1 = ref(0)
const value2 = ref('a')

const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' },
]
```

## 自定义颜色

在菜单栏设置 `active-color`；菜单项单独设置的 `active-color` 优先级更高。

<demo-live>
  <mx-dropdown-menu active-color="#ee0a24">
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu active-color="#ee0a24">
  <mx-dropdown-item v-model="value1" :options="option1" />
</mx-dropdown-menu>
```

## 向上展开

<demo-live>
  <mx-dropdown-menu direction="up">
    <mx-dropdown-item
      title="全部商品"
      :model-value="0"
      :options="[
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu direction="up">
  <mx-dropdown-item v-model="value1" :options="option1" />
</mx-dropdown-menu>
```

## 禁用菜单

<demo-live>
  <mx-dropdown-menu>
    <mx-dropdown-item
      disabled
      title="禁用菜单"
      :model-value="0"
      :options="[
        { text: '选项一', value: 0 },
        { text: '选项二', value: 1 },
      ]"
    />
  </mx-dropdown-menu>
</demo-live>

```vue
<mx-dropdown-menu>
  <mx-dropdown-item v-model="value" disabled title="禁用菜单" :options="options" />
</mx-dropdown-menu>
```

## API

### DropdownMenu Props

| 参数                   | 说明                     | 类型               | 默认值    |
| ---------------------- | ------------------------ | ------------------ | --------- |
| active-color           | 菜单标题与选项的选中颜色 | `string`           | `#1989fa` |
| direction              | 菜单展开方向             | `down \| up`       | `down`    |
| z-index                | 菜单栏 z-index 层级      | `number \| string` | `10`      |
| duration               | 过渡时长，单位毫秒       | `number \| string` | `200`     |
| overlay                | 是否显示遮罩层           | `boolean`          | `true`    |
| close-on-click-overlay | 是否在点击遮罩层后关闭   | `boolean`          | `true`    |
| custom-class           | 自定义类名               | `string`           | -         |
| custom-style           | 自定义样式               | `string \| object` | -         |

### DropdownItem Props

| 参数         | 说明                              | 类型               | 默认值  |
| ------------ | --------------------------------- | ------------------ | ------- |
| model-value  | 当前选中项对应的 value（v-model） | `number \| string` | -       |
| title        | 菜单项标题                        | `string`           | -       |
| options      | 选项数组                          | `DropdownOption[]` | `[]`    |
| disabled     | 是否禁用菜单项                    | `boolean`          | `false` |
| active-color | 选中颜色，优先级高于菜单          | `string`           | -       |
| custom-class | 自定义类名                        | `string`           | -       |
| custom-style | 自定义样式                        | `string \| object` | -       |

### DropdownOption 数据结构

| 键名     | 说明         | 类型               |
| -------- | ------------ | ------------------ |
| text     | 选项文字     | `string`           |
| value    | 选项对应的值 | `number \| string` |
| disabled | 是否禁用选项 | `boolean`          |

### DropdownMenu Events

| 事件名             | 说明                            | 回调参数        |
| ------------------ | ------------------------------- | --------------- |
| update:model-value | 展开项索引更新，-1 表示全部收起 | `index: number` |
| click              | 点击菜单标题展开菜单项时触发    | `index: number` |
| close              | 菜单收起时触发                  | -               |

### DropdownItem Events

| 事件名             | 说明                  | 回调参数                  |
| ------------------ | --------------------- | ------------------------- |
| update:model-value | 选中值更新（v-model） | `value: number \| string` |

### DropdownMenu Slots

| 名称    | 说明                              |
| ------- | --------------------------------- |
| default | 菜单栏内容，嵌套 mx-dropdown-item |

### 方法（通过 ref 调用）

通过 ref 获取 DropdownMenu 实例：

| 名称         | 说明                                  | 类型     |
| ------------ | ------------------------------------- | -------- |
| active-index | 当前展开的菜单项索引，-1 表示全部收起 | `number` |
