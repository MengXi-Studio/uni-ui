# Popup

Popup component, supports 5 directions with border radius, overlay, close icon and interceptor.

## Basic Usage (Centered)

```vue
<mx-popup v-model:show="show" @click-overlay="show = false">
  <view class="content">Centered content</view>
</mx-popup>
```

## Popup From Bottom

```vue
<mx-popup v-model:show="show" position="bottom" round closeable>
  <view class="content">Bottom content</view>
</mx-popup>
```

## Props

| Name                   | Description                                | Type                                       | Default  |
| ---------------------- | ------------------------------------------ | ------------------------------------------ | -------- |
| show                   | Whether to show (v-model)                  | `boolean`                                  | `false`  |
| position               | Position                                   | `center \| top \| bottom \| left \| right` | `center` |
| overlay                | Whether to show the overlay                | `boolean`                                  | `true`   |
| closeable              | Whether to show the close icon             | `boolean`                                  | `false`  |
| close-on-click-overlay | Whether to close when clicking the overlay | `boolean`                                  | `true`   |
| round                  | Whether to use rounded corners             | `boolean`                                  | `false`  |
| z-index                | Z-index level                              | `number`                                   | `1000`   |
| duration               | Transition duration (ms)                   | `number`                                   | `300`    |
| safe-area-inset-bottom | Bottom safe area inset                     | `boolean`                                  | `false`  |

## Events

| Event            | Description                  |
| ---------------- | ---------------------------- |
| open             | When opening                 |
| close            | When closing                 |
| closed           | After closing                |
| click-overlay    | When clicking the overlay    |
| click-close-icon | When clicking the close icon |
| update:show      | When the visibility updates  |
