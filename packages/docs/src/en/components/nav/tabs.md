# Tabs

Switch between different contents on the current page.

## Basic Usage

<demo-live>
  <demo-tabs />
</demo-live>

```vue
<mx-tabs v-model="active">
  <mx-tab-pane title="Tab 1" name="1">Content 1</mx-tab-pane>
  <mx-tab-pane title="Tab 2" name="2">Content 2</mx-tab-pane>
  <mx-tab-pane title="Tab 3" name="3">Content 3</mx-tab-pane>
</mx-tabs>
```

## Custom Color / Sticky

```vue
<mx-tabs v-model="active" active-color="#ee0a24" />
<mx-tabs v-model="active" sticky />
```

## Disable a Tab

```vue
<mx-tab-pane title="Disabled" name="1" disabled>Disabled content</mx-tab-pane>
```

## API

### Tabs Props

| Name         | Description                                          | Type               | Default              |
| ------------ | ---------------------------------------------------- | ------------------ | -------------------- |
| model-value  | Current active tab (v-model)                         | `string \| number` | -                    |
| active-color | Active tab color                                     | `string`           | `--mx-primary-color` |
| color        | Inactive tab color                                   | `string`           | `--mx-text-color`    |
| sticky       | Whether to keep the tab bar in the top of the screen | `boolean`          | `false`              |
| line-width   | Width of the underline                               | `number \| string` | `40`                 |

### Tabs Events

`change`（triggered on switch) / `click-tab`

### TabPane Props

`title` / `name` / `disabled` / `badge` / `dot`
