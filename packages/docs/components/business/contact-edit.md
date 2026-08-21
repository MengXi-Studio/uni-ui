# ContactEdit 联系人编辑

联系人信息编辑表单，包含姓名、电话与联系人类型单选，对齐 Vant ContactEdit 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

通过 `v-model` 绑定联系人信息对象，点击保存按钮时先校验再触发 `save` 事件。

```vue
<template>
  <mx-contact-edit v-model="contact" @save="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const contact = ref({
  name: '',
  tel: '',
  type: 'company',
})

const onSave = (value) => console.log('保存联系人', value)
</script>
```

## 显示联系人类型

通过 `show-contact-type` 显示"公司 / 企业"类型单选项，选中值同步到联系人信息的 `type` 字段。

```vue
<template>
  <mx-contact-edit v-model="contact" show-contact-type @save="onSave" />
</template>

<script setup>
import { ref } from 'vue'

const contact = ref({ name: '', tel: '', type: 'company' })
const onSave = (value) => console.log('保存联系人', value)
</script>
```

## 自定义最大长度

通过 `name-maxlength`、`tel-maxlength` 限制姓名与电话的最大输入长度。

```vue
<mx-contact-edit v-model="contact" :name-maxlength="10" :tel-maxlength="11" @save="onSave" />
```

## 自定义按钮内容

通过 `button` 插槽自定义保存按钮文字。

```vue
<mx-contact-edit v-model="contact" @save="onSave">
  <template #button>保存联系人</template>
</mx-contact-edit>
```

## 校验

通过 ref 调用 `save` 方法，可在外部触发校验并保存，校验失败时组件内显示错误提示并返回 `false`。

```vue
<template>
  <mx-contact-edit ref="editRef" v-model="contact" />
</template>

<script setup>
import { ref } from 'vue'

const editRef = ref()

const onSubmit = () => {
  const success = editRef.value.save()
  console.log('保存结果', success)
}
</script>
```

## Props

| 参数              | 说明                     | 类型               | 默认值  |
| ----------------- | ------------------------ | ------------------ | ------- |
| v-model           | 联系人信息对象           | `object`           | `{}`    |
| tel-maxlength     | 电话最大长度             | `number \| string` | `11`    |
| name-maxlength    | 姓名最大长度             | `number \| string` | `20`    |
| show-contact-type | 是否显示联系人类型单选项 | `boolean`          | `false` |
| custom-class      | 自定义类名               | `string`           | `''`    |
| custom-style      | 自定义样式               | `string \| object` | `''`    |

## Events

| 事件名            | 说明               | 回调参数       |
| ----------------- | ------------------ | -------------- |
| update:modelValue | 保存成功时同步信息 | 联系人信息对象 |
| save              | 校验通过保存时触发 | 联系人信息对象 |

## Slots

| 名称   | 说明               |
| ------ | ------------------ |
| button | 自定义保存按钮内容 |

## 方法（通过 ref 调用）

| 方法名 | 说明                               | 返回值    |
| ------ | ---------------------------------- | --------- |
| save   | 校验并保存，校验失败时显示错误提示 | `boolean` |
