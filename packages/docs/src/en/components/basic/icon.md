# Icon

Icon component, supports two modes: image path and font icon name.

## Basic Usage

Image icon:

```vue
<mx-icon image="https://img.yzcdn.cn/vant/icon-demo.png" />
```

Font / symbol icon:

```vue
<mx-icon name="★" color="#ee0a24" :size="20" />
```

## Badge

```vue
<mx-icon name="★" badge="12" />
<mx-icon name="★" dot />
```

## API

### Props

| Name        | Description                              | Type               | Default |
| ----------- | ---------------------------------------- | ------------------ | ------- |
| name        | Icon name (font character)               | `string`           | -       |
| src / image | Image URL (takes precedence over `name`) | `string`           | -       |
| color       | Icon color                               | `string`           | -       |
| size        | Icon size                                | `number \| string` | `16px`  |
| dot         | Whether to show the dot                  | `boolean`          | `false` |
| badge       | Badge content                            | `number \| string` | -       |
| badge-color | Badge background color                   | `string`           | -       |

### Events

| Event | Description    |
| ----- | -------------- |
| click | Click the icon |
