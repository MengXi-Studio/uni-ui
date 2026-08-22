# Tabbar

Bottom navigation bar used for scene switching.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

```vue
<mx-tabbar v-model="active">
  <mx-tabbar-item name="home" icon="🏠" text="Home" />
  <mx-tabbar-item name="search" icon="🔍" text="Search" />
  <mx-tabbar-item name="user" icon="👤" text="Profile" />
</mx-tabbar>
```

## Fixed Bottom / Safe Area

```vue
<mx-tabbar v-model="active" fixed safe-area-inset-bottom />
```

## Badge

```vue
<mx-tabbar-item name="cart" icon="🛒" text="Cart" badge="3" />
```

## API

### Tabbar Props

| Name                   | Description                          | Type               | Default              |
| ---------------------- | ------------------------------------ | ------------------ | -------------------- |
| model-value            | Current active item (v-model)        | `string \| number` | -                    |
| fixed                  | Whether to fix the bar to the bottom | `boolean`          | `false`              |
| safe-area-inset-bottom | Whether to enable bottom safe area   | `boolean`          | `false`              |
| active-color           | Active color                         | `string`           | `--mx-primary-color` |
| inactive-color         | Inactive color                       | `string`           | `--mx-text-color-2`  |

### TabbarItem Props

`name` / `icon` / `text` / `badge` / `dot`
