# Toast

Used for lightweight feedback such as success and failure.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-toast v-model:show="show" message="操作成功" />
```

## Type / Position

```vue
<mx-toast v-model:show="show" type="success" message="成功" />
<mx-toast v-model:show="show" type="fail" message="失败" />
<mx-toast v-model:show="show" position="top" message="顶部提示" />
```

## Loading / Auto Close

```vue
<mx-toast v-model:show="show" type="loading" message="加载中..." :forbid-click="true" />
<mx-toast v-model:show="show" message="自动关闭" :duration="2000" />
```

## API

### Props

| Name         | Description                                     | Type                                   | Default  |
| ------------ | ----------------------------------------------- | -------------------------------------- | -------- |
| show         | Whether to show (v-model)                       | `boolean`                              | `false`  |
| message      | The toast content                               | `string`                               | -        |
| type         | Type                                            | `success \| fail \| loading \| custom` | `text`   |
| position     | Position                                        | `top \| middle \| bottom`              | `middle` |
| duration     | Auto close duration (ms, 0 means no auto close) | `number`                               | `2000`   |
| forbid-click | Whether to forbid clicking the background       | `boolean`                              | `false`  |

### Instance Methods (expose)

`show()` / `close()`
