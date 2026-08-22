# AddressEdit 地址编辑

收货地址编辑表单，包含姓名、电话、省市区选择、详细地址、邮政编码与默认地址开关，对齐 Vant AddressEdit 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定地址信息对象，`area-list` 传入省市区数据（`province_list` / `city_list` / `county_list`），点击保存触发 `save` 事件。

```vue
<template>
  <mx-address-edit
    v-model="address"
    :area-list="areaList"
    @save="onSave"
    @change-area="onChangeArea"
  />
</template>

<script setup>
import { ref } from 'vue'

const address = ref({
  name: '',
  tel: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  addressDetail: '',
  postalCode: '',
  isDefault: false,
})

const areaList = {
  province_list: { 110000: '北京市', 330000: '浙江省' },
  city_list: { 110100: '北京市', 330100: '杭州市', 330200: '宁波市' },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    330102: '上城区',
    330105: '拱墅区',
    330203: '海曙区',
  },
}

const onSave = (value) => console.log('保存', value)
const onChangeArea = (values) => console.log('地区变化', values)
</script>
```

## 隐藏字段

通过 `show-detail`、`show-postal`、`show-set-default` 控制对应字段是否显示。

```vue
<mx-address-edit
  v-model="address"
  :area-list="areaList"
  :show-detail="false"
  :show-postal="false"
  :show-set-default="false"
/>
```

## 自定义文案

支持自定义各输入项占位符、地区栏标题与保存按钮文字。

```vue
<mx-address-edit
  v-model="address"
  :area-list="areaList"
  name-placeholder="收货人姓名"
  tel-placeholder="手机号码"
  detail-placeholder="街道、楼牌号等"
  area-title="选择地区"
  save-button-text="保存地址"
/>
```

## 校验

通过 ref 调用 `validate` 方法校验表单（姓名、电话不为空），通过返回 `true`。

```vue
<template>
  <mx-address-edit ref="editRef" v-model="address" :area-list="areaList" />
</template>

<script setup>
import { ref } from 'vue'

const editRef = ref()

const onValidate = () => {
  const valid = editRef.value.validate()
  console.log('校验结果', valid)
}
</script>
```

## Props

| 参数               | 说明             | 类型               | 默认值             |
| ------------------ | ---------------- | ------------------ | ------------------ |
| v-model            | 地址信息对象     | `object`           | `{}`               |
| area-list          | 省市区数据       | `object`           | `{}`               |
| show-detail        | 是否显示详细地址 | `boolean`          | `true`             |
| show-postal        | 是否显示邮政编码 | `boolean`          | `true`             |
| show-set-default   | 是否显示设为默认 | `boolean`          | `true`             |
| show-search-result | 是否显示搜索结果 | `boolean`          | `false`            |
| name-placeholder   | 姓名占位符       | `string`           | `请填写收货人姓名` |
| tel-placeholder    | 电话占位符       | `string`           | `请填写手机号码`   |
| detail-placeholder | 详细地址占位符   | `string`           | `街道、门牌号等`   |
| detail-maxlength   | 详细地址最大长度 | `number \| string` | `200`              |
| area-placeholder   | 地区占位符       | `string`           | `省 / 市 / 区`     |
| area-title         | 省市区选择器标题 | `string`           | `所在地区`         |
| postal-placeholder | 邮政编码占位符   | `string`           | `请输入邮政编码`   |
| save-button-text   | 保存按钮文字     | `string`           | `保存`             |
| error-message      | 校验失败提示文案 | `string`           | `请填写完整信息`   |
| custom-class       | 自定义类名       | `string`           | `''`               |
| custom-style       | 自定义样式       | `string \| object` | `''`               |

## Events

| 事件名            | 说明                 | 回调参数             |
| ----------------- | -------------------- | -------------------- |
| update:modelValue | 地址信息变化时触发   | 当前地址信息对象     |
| save              | 点击保存按钮时触发   | 当前地址信息对象     |
| change            | 任一字段变化时触发   | 当前地址信息对象     |
| change-area       | 省市区选择确认时触发 | 更新后的地址信息对象 |

## 方法（通过 ref 调用）

| 方法名   | 说明                       | 返回值    |
| -------- | -------------------------- | --------- |
| validate | 校验表单（姓名、电话非空） | `boolean` |
