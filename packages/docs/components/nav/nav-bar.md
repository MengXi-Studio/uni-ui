# NavBar 导航栏

顶部导航栏，支持返回、左右插槽与吸顶。

## 引入

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## 基础用法

```vue
<mx-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
```

## 左右文字 / 插槽

```vue
<mx-nav-bar title="标题" left-text="返回" right-text="按钮" />
```

## 吸顶 / 安全区

```vue
<mx-nav-bar title="标题" fixed safe-area-inset-top />
```

## API

### Props

| 参数                | 说明             | 类型               | 默认值  |
| ------------------- | ---------------- | ------------------ | ------- |
| title               | 标题             | `string`           | -       |
| left-text           | 左侧文字         | `string`           | -       |
| right-text          | 右侧文字         | `string`           | -       |
| left-arrow          | 是否显示返回箭头 | `boolean`          | `false` |
| fixed               | 是否吸顶         | `boolean`          | `false` |
| safe-area-inset-top | 顶部安全区       | `boolean`          | `false` |
| z-index             | 层级             | `number \| string` | `500`   |

### Events

`click-left` / `click-right` / `click-arrow`
