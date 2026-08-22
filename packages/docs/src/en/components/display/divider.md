# Divider

A divider used to separate content. It aligns with the API and interactions of the Vant Divider.

## Basic Usage

<demo-live>
  <mx-divider />
</demo-live>

```vue
<mx-divider />
```

## Show Text

<demo-live>
  <mx-divider>文字</mx-divider>
</demo-live>

```vue
<mx-divider>文字</mx-divider>
```

## Content Position

<demo-live>
  <mx-divider content-position="left">文字</mx-divider>
  <mx-divider content-position="right">文字</mx-divider>
</demo-live>

```vue
<mx-divider content-position="left">文字</mx-divider>
<mx-divider content-position="right">文字</mx-divider>
```

## Dashed

<demo-live>
  <mx-divider dashed>虚线分割线</mx-divider>
</demo-live>

```vue
<mx-divider dashed>虚线分割线</mx-divider>
```

## Props

| Name             | Description                  | Type                      | Default  |
| ---------------- | ---------------------------- | ------------------------- | -------- |
| dashed           | Whether to use a dashed line | `boolean`                 | `false`  |
| content-position | Content position             | `left \| center \| right` | `center` |
| custom-class     | Custom class name            | `string`                  | `''`     |
| custom-style     | Custom style                 | `string \| object`        | `''`     |

## Slots

| Name    | Description                          |
| ------- | ------------------------------------ |
| default | Content in the middle of the divider |
