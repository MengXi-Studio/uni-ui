# Theme Customization

@mengxi/uni-ui adopts a two-layer theming system of **SCSS variables + CSS variables**. All colors are exposed as `--mx-*` CSS variables, making it easy to override at runtime and switch between light/dark themes.

## Override with CSS Variables

Override them on `page` (Mini Program) or `:root` (H5) to apply globally:

```css
page {
	--mx-primary-color: #1989fa;
	--mx-danger-color: #ee0a24;
	--mx-text-color: #323233;
	--mx-radius-lg: 12px;
}
```

## Common Variables

| Variable             | Description          | Default |
| -------------------- | -------------------- | ------- |
| --mx-primary-color   | Primary color        | #1989fa |
| --mx-success-color   | Success color        | #07c160 |
| --mx-warning-color   | Warning color        | #ff976a |
| --mx-danger-color    | Danger color         | #ee0a24 |
| --mx-text-color      | Primary text         | #323233 |
| --mx-text-color-2    | Secondary text       | #969799 |
| --mx-text-color-3    | Placeholder text     | #c8c9cc |
| --mx-background      | Page background      | #f7f8fa |
| --mx-background-2    | Component background | #ffffff |
| --mx-border-color    | Border               | #ebedf0 |
| --mx-radius-sm/md/lg | Border radius        | 2/4/8px |

## Local Override with ConfigProvider

`<mx-config-provider>` can override theme variables locally (dark theme supported):

```vue
<mx-config-provider :theme-vars="{ '--mx-primary-color': '#ff976a' }">
  <mx-button type="primary">Button</mx-button>
</mx-config-provider>
```

## SCSS Variables (Compile-time)

You can use the component library's SCSS variables in a uni-app project via `@use`:

```scss
@use '@mengxi/uni-ui/src/styles/variables.scss' as *;

.my-class {
	color: $primary-color;
}
```
