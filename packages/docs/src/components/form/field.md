# Field 输入框

文本输入框，对齐 Vant Field，内置清除、字数统计、前后图标等能力。

## 基础用法

```vue
<mx-field v-model="value" label="用户名" placeholder="请输入用户名" clearable />
```

## 密码 / 字数

```vue
<mx-field v-model="value" type="password" label="密码" />
<mx-field v-model="value" label="简介" type="textarea" autosize maxlength="50" show-word-limit />
```

## Props

| 参数            | 说明                    | 类型                                     | 默认值  |
| --------------- | ----------------------- | ---------------------------------------- | ------- |
| model-value     | 输入值（v-model）       | `string \| number`                       | -       |
| label           | 左侧标签                | `string`                                 | -       |
| type            | 输入类型                | `text \| number \| password \| textarea` | `text`  |
| placeholder     | 占位符                  | `string`                                 | -       |
| clearable       | 是否可清除              | `boolean`                                | `false` |
| maxlength       | 最大长度                | `number`                                 | -       |
| disabled        | 禁用                    | `boolean`                                | `false` |
| readonly        | 只读                    | `boolean`                                | `false` |
| show-word-limit | 显示字数统计            | `boolean`                                | `false` |
| autosize        | 自适应高度(仅 textarea) | `boolean \| object`                      | `false` |
| required        | 必填                    | `boolean`                                | `false` |

## Events

`update:modelValue` / `change` / `focus` / `blur` / `clear` / `click`

## Slots

`label` / `left-icon` / `right-icon` / `extra` / `default`
