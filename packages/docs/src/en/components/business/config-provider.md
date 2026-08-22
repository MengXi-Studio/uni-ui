# ConfigProvider

A global configuration component used to wrap page content for dark mode switching and CSS theme variable customization. It aligns with the API and interactions of the Vant ConfigProvider.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Wrap `mx-config-provider` around the outer layer of the page content to provide theme configuration for components inside it.

```vue
<template>
  <mx-config-provider>
    <view class="page">
      <mx-button type="primary">Primary Button</mx-button>
    </view>
  </mx-config-provider>
</template>
```

## Dark Mode

Enable dark mode with `theme="dark"`; components apply the built-in dark theme variables.

<demo-live>
  <mx-config-provider theme="dark">
    <view style="padding: 8px">
      <mx-cell title="Cell" value="Content" label="A cell in dark mode" />
    </view>
  </mx-config-provider>
</demo-live>

```vue
<mx-config-provider theme="dark">
  <view style="padding: 8px">
    <mx-cell title="Cell" value="Content" label="A cell in dark mode" />
  </view>
</mx-config-provider>
```

## Customize Theme Variables

Pass an object keyed by CSS variable names with `theme-vars` to override the default theme variables. It takes effect only on the components within the wrapped scope.

<demo-live>
  <mx-config-provider :theme-vars="{ '--mx-primary-color': '#7232dd' }">
    <mx-button type="primary" style="margin-right: 8px">Primary Button</mx-button>
    <mx-tag type="primary" style="margin-right: 8px">Tag</mx-tag>
    <mx-cell title="Cell" value="Content" style="margin-top: 8px" />
  </mx-config-provider>
</demo-live>

```vue
<mx-config-provider :theme-vars="{ '--mx-primary-color': '#7232dd' }">
  <mx-button type="primary">Primary Button</mx-button>
  <mx-tag type="primary">Tag</mx-tag>
  <mx-cell title="Cell" value="Content" />
</mx-config-provider>
```

Common theme variables:

| Variable           | Description          |
| ------------------ | -------------------- |
| --mx-primary-color | Primary color        |
| --mx-success-color | Success color        |
| --mx-warning-color | Warning color        |
| --mx-danger-color  | Danger color         |
| --mx-text-color    | Primary text color   |
| --mx-text-color-2  | Secondary text color |
| --mx-text-color-3  | Weak text color      |
| --mx-background    | Page background      |
| --mx-background-2  | Component background |
| --mx-border-color  | Border color         |

## Theme-specific Variables

`theme-vars-light` and `theme-vars-dark` take effect under the light and dark themes respectively; `theme-vars` always takes effect (highest priority).

```vue
<template>
  <mx-config-provider
    :theme="theme"
    :theme-vars-light="{ '--mx-primary-color': '#1989fa' }"
    :theme-vars-dark="{ '--mx-primary-color': '#7232dd' }"
  >
    <mx-button type="primary">Theme Button</mx-button>
  </mx-config-provider>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>
```

## Props

| Name             | Description                                   | Type               | Default |
| ---------------- | --------------------------------------------- | ------------------ | ------- |
| theme            | Theme: `light` / `dark`                       | `light \| dark`    | `light` |
| theme-vars       | Theme variables (keys are CSS variable names) | `object`           | `{}`    |
| theme-vars-dark  | Dark theme variables                          | `object`           | `{}`    |
| theme-vars-light | Light theme variables                         | `object`           | `{}`    |
| custom-class     | Custom class name                             | `string`           | `''`    |
| custom-style     | Custom style                                  | `string \| object` | `''`    |

## Slots

| Name    | Description          |
| ------- | -------------------- |
| default | Wrapped page content |
