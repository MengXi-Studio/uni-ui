# Form 表单

表单组件，用于数据校验、提交与重置，需搭配表单项（如 mx-field）使用，对齐 Vant Form 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

`model` 绑定表单数据对象，`rules` 配置校验规则（键与表单项 `name` 对应），通过 ref 调用 `submitForm` 触发校验并提交。

```vue
<mx-form ref="formRef" :model="form" :rules="rules" @submit="onSubmit" @failed="onFailed">
  <mx-field v-model="form.username" label="用户名" name="username" placeholder="请输入用户名" />
  <mx-field v-model="form.phone" label="手机号" name="phone" placeholder="请输入手机号" />
  <mx-button type="primary" block @click="formRef?.submitForm()">提交</mx-button>
</mx-form>
```

```js
import { ref, reactive } from 'vue'

const formRef = ref()
const form = reactive({ username: '', phone: '' })

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 20, message: '用户名长度为 2 - 20 个字符' },
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
  ],
}

const onSubmit = (values) => console.log('提交', values)
const onFailed = (errors) => console.log('校验失败', errors)
```

## 校验规则

规则支持必填、正则、长度与自定义校验函数，同一字段可配置多条规则，按顺序校验、命中即止。

```js
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { pattern: /^\w+$/, message: '仅支持字母、数字、下划线' },
    { min: 2, max: 20, message: '长度为 2 - 20 个字符' },
    {
      validator: (value, model, field) => value !== 'admin' || '用户名不可用',
      message: '用户名校验失败',
    },
  ],
}
```

| 字段      | 说明                                          | 类型                                                                       |
| --------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| required  | 是否必填                                      | `boolean`                                                                  |
| pattern   | 正则校验                                      | `RegExp`                                                                   |
| min       | 最小长度                                      | `number`                                                                   |
| max       | 最大长度                                      | `number`                                                                   |
| validator | 自定义校验函数，返回 false / string / Promise | `(value, model, field) => boolean \| string \| Promise<boolean \| string>` |
| message   | 校验失败提示信息                              | `string`                                                                   |

## Props

| 参数            | 说明                                           | 类型                   | 默认值  |
| --------------- | ---------------------------------------------- | ---------------------- | ------- |
| model           | 表单数据对象（必填）                           | `object`               | -       |
| rules           | 校验规则                                       | `object`               | `{}`    |
| label-width     | 标签宽度                                       | `number \| string`     | -       |
| label-align     | 标签对齐                                       | `left \| right \| top` | `left`  |
| scroll-to-error | 提交后是否自动触发表单内 requireValidator 字段 | `boolean`              | `false` |
| custom-class    | 自定义类名                                     | `string`               | `''`    |
| custom-style    | 自定义样式                                     | `string \| object`     | `''`    |

## Events

| 事件名 | 说明                 | 回调参数                          |
| ------ | -------------------- | --------------------------------- |
| submit | 校验通过后提交时触发 | 表单数据对象 `values`             |
| failed | 校验失败时触发       | 错误信息对象（字段名 → 错误信息） |

## 方法（通过 ref 调用）

| 方法名     | 说明                                             | 参数                                          | 返回值                                              |
| ---------- | ------------------------------------------------ | --------------------------------------------- | --------------------------------------------------- |
| validate   | 校验全部或指定字段                               | `fields?: string \| string[]`（缺省校验全部） | `Promise<Record<string, string>>`（空对象表示通过） |
| resetForm  | 重置表单数据到初始值，可传入 values 覆盖部分字段 | `values?: Record<string, unknown>`            | 重置后的表单数据对象                                |
| submitForm | 校验并触发 `submit` / `failed` 事件              | -                                             | `Promise<Record<string, string> \| null>`           |

```vue
<mx-form ref="formRef" :model="form" :rules="rules">
  <mx-field v-model="form.username" label="用户名" name="username" />
</mx-form>

<mx-button @click="formRef?.resetForm()">重置</mx-button>
<mx-button
  type="primary"
  @click="
    formRef?.validate().then((errors) => !Object.keys(errors).length && showToast('校验通过'))
  "
>仅校验</mx-button>
```
