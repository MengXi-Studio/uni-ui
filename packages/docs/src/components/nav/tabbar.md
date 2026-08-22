# Tabbar 标签栏

底部导航栏，用于场景切换。

## 基础用法

```vue
<mx-tabbar v-model="active">
  <mx-tabbar-item name="home" icon="🏠" text="首页" />
  <mx-tabbar-item name="search" icon="🔍" text="搜索" />
  <mx-tabbar-item name="user" icon="👤" text="我的" />
</mx-tabbar>
```

## 固定底部 / 安全区

```vue
<mx-tabbar v-model="active" fixed safe-area-inset-bottom />
```

## 徽标

```vue
<mx-tabbar-item name="cart" icon="🛒" text="购物车" badge="3" />
```

## API

### Tabbar Props

| 参数                   | 说明                  | 类型               | 默认值               |
| ---------------------- | --------------------- | ------------------ | -------------------- |
| model-value            | 当前激活项（v-model） | `string \| number` | -                    |
| fixed                  | 是否固定底部          | `boolean`          | `false`              |
| safe-area-inset-bottom | 底部安全区            | `boolean`          | `false`              |
| active-color           | 选中颜色              | `string`           | `--mx-primary-color` |
| inactive-color         | 未选中颜色            | `string`           | `--mx-text-color-2`  |

### TabbarItem Props

`name` / `icon` / `text` / `badge` / `dot`
