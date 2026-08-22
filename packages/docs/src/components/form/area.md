# Area 省市区选择

省市区选择器，底部弹出省 / 市 / 区三列联动选择，对齐 Vant Area 的 API 与交互。

## 基础用法

```vue
<mx-area v-model:show="show" v-model="areaCode" :area-list="areaList" @confirm="onConfirm" />
```

```js
const areaList = {
	province_list: { 110000: '北京市', 310000: '上海市' },
	city_list: { 110100: '北京市', 310100: '上海市' },
	county_list: {
		110101: '东城区',
		110102: '西城区',
		110105: '朝阳区',
		310101: '黄浦区',
		310104: '徐汇区',
		310105: '长宁区'
	}
}
```

`area-list` 包含 `province_list`、`city_list`、`county_list` 三个键，键为地区编码、值为地区名，组件按编码前缀自动建立省市区三级关联。

`v-model` 绑定数组时，确认后返回各级地区编码数组；绑定单值时返回最后一级编码。

## 配置列数

`columns-num` 设为 `2` 时仅显示省、市两列。

```vue
<mx-area v-model:show="show" v-model="areaCode" :area-list="areaList" :columns-num="2" />
```

## Props

| 参数                | 说明                                           | 类型                        | 默认值     |
| ------------------- | ---------------------------------------------- | --------------------------- | ---------- |
| show                | 是否显示（v-model:show）                       | `boolean`                   | `false`    |
| model-value         | 选中的地区编码，数组或单值（v-model）          | `string \| number \| array` | `[]`       |
| area-list           | 省市区数据，键为 province/city/county 前缀映射 | `object`                    | `{}`       |
| columns-num         | 列数，2 = 省市级，3 = 省市县级                 | `number \| string`          | `3`        |
| title               | 标题                                           | `string`                    | `所在地区` |
| confirm-button-text | 确认按钮文字                                   | `string`                    | `确认`     |
| cancel-button-text  | 取消按钮文字                                   | `string`                    | `取消`     |
| custom-class        | 自定义类名                                     | `string`                    | `''`       |
| custom-style        | 自定义样式                                     | `string \| object`          | `''`       |

## Events

| 事件名  | 说明               | 回调参数                              |
| ------- | ------------------ | ------------------------------------- |
| confirm | 点击确认按钮时触发 | `{ selectedValues, selectedOptions }` |
| cancel  | 点击取消按钮时触发 | -                                     |
| change  | 选项变化时触发     | `{ selectedValues, index }`           |

- `selectedValues`：各级选中项编码数组
- `selectedOptions`：各级选中项对象数组（含 `text`、`value`、`code`）
- `index`：本次变化列的下标
