# Quick Start

MengXi Uni-UI is a cross-platform component library for uni-app, supporting H5, WeChat Mini Program, Alipay Mini Program and App.

## Installation

```bash
# In a uni-app CLI project (or the playground sub-package in this repo)
pnpm add @mengxi/uni-ui
```

## Configure easycom

Add the following to your `pages.json`:

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
    }
  }
}
```

After configuration, there is no need to register components manually — just use `<mx-button>` and the like directly.

## Import Global Styles

Import the global styles once in `App.vue` (reset + CSS variables + transition animations):

```vue
<style lang="scss">
@use '@mengxi/uni-ui/src/styles/index.scss';
</style>
```

## Usage

```vue
<template>
  <view>
    <mx-button type="primary">Primary Button</mx-button>
    <mx-cell title="Cell" value="Content" is-link />
    <mx-switch v-model="switched" />
    <mx-field v-model="value" label="Field" placeholder="Please enter" clearable />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const switched = ref(true)
const value = ref('')
</script>
```

## Run the Example

```bash
# This repo: CLI-style example (packages/playground)
pnpm --filter @mengxi/uni-ui-playground run dev:h5
```

> The HBuilderX-style example can be found in `packages/uni-app`.
