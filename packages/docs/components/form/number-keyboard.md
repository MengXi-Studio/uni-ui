# NumberKeyboard 数字键盘

数字键盘组件，用于密码、验证码等数字输入场景，对齐 Vant NumberKeyboard 的 API 与交互。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

键盘固定显示在页面底部，通常配合 `v-if` 控制挂载，通过 `input` / `delete` 事件自行拼接输入内容。

```vue
<mx-field v-model="value" label="密码" placeholder="请输入密码" readonly @click="show = true" />
<mx-number-keyboard v-if="show" v-model:show="show" @input="onInput" @delete="onDelete" />
```

```js
import { ref } from 'vue'

const show = ref(false)
const value = ref('')

const onInput = (key) => (value.value += key)
const onDelete = () => (value.value = value.value.slice(0, -1))
```

## 自定义主题

`theme` 设为 `custom` 时显示顶部标题栏，左侧带关闭按钮。

```vue
<mx-number-keyboard
  v-if="show"
  v-model:show="show"
  theme="custom"
  title="键盘标题"
  close-button-text="完成"
  @input="onInput"
/>
```

## 配置附加键

`extra-key` 显示在键盘底部左侧，常用于小数点。

```vue
<mx-number-keyboard v-if="show" v-model:show="show" extra-key="." @input="onInput" />
```

## 随机键位

`random-key-order` 设为 `true` 时每次挂载打乱数字键顺序，适用于安全键盘场景。

```vue
<mx-number-keyboard v-if="show" v-model:show="show" random-key-order @input="onInput" />
```

## 自定义按键文案

```vue
<mx-number-keyboard
  v-if="show"
  v-model:show="show"
  delete-button-text="删除"
  close-button-text="完成"
  @input="onInput"
/>
```

## Props

| 参数               | 说明                           | 类型                | 默认值    |
| ------------------ | ------------------------------ | ------------------- | --------- |
| title              | 数字键盘标题                   | `string`            | `''`      |
| show               | 是否显示（v-model:show）       | `boolean`           | `false`   |
| extra-key          | 附加键，如 `.`，显示在底部左侧 | `string`            | `''`      |
| close-button-text  | 关闭按钮文字                   | `string`            | `''`      |
| delete-button-text | 退格按钮文字                   | `string`            | `''`      |
| theme              | 键盘主题                       | `default \| custom` | `default` |
| random-key-order   | 是否打乱顺序                   | `boolean`           | `false`   |
| z-index            | 键盘层级                       | `number \| string`  | `1000`    |
| custom-class       | 自定义类名                     | `string`            | `''`      |
| custom-style       | 自定义样式                     | `string \| object`  | `''`      |

## Events

| 事件名 | 说明                         | 回调参数 |
| ------ | ---------------------------- | -------- |
| input  | 按下数字键（含附加键）时触发 | 按键内容 |
| delete | 按下退格键时触发             | -        |
| close  | 点击关闭按钮时触发           | -        |
