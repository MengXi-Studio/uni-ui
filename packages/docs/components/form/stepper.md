# Stepper 步进器

用于数量增减操作。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

<demo-live>
  <demo-stepper />
</demo-live>

```vue
<mx-stepper v-model="value" />
```

## 范围 / 步长 / 整数

```vue
<mx-stepper v-model="value" :min="0" :max="10" />
<mx-stepper v-model="value" :step="2" />
<mx-stepper v-model="value" integer />
```

## 禁用

```vue
<mx-stepper v-model="value" disabled />
```

## API

### Props

| 参数        | 说明              | 类型      | 默认值     |
| ----------- | ----------------- | --------- | ---------- |
| model-value | 当前值（v-model） | `number`  | -          |
| min         | 最小值            | `number`  | `0`        |
| max         | 最大值            | `number`  | `Infinity` |
| step        | 步长              | `number`  | `1`        |
| integer     | 是否只允许整数    | `boolean` | `false`    |
| disabled    | 禁用              | `boolean` | `false`    |

### Events

| 事件名    | 说明     | 回调参数 |
| --------- | -------- | -------- |
| change    | 值变化   | 新值     |
| overlimit | 超出范围 | 方向     |
