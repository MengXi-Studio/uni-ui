# Button

Button component, aligned with Vant Button's API and interactions.

## Import

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

<demo-live>
  <mx-button>Default</mx-button>
  <mx-button type="primary">Primary</mx-button>
  <mx-button type="success">Success</mx-button>
  <mx-button type="warning">Warning</mx-button>
  <mx-button type="danger">Danger</mx-button>
</demo-live>

```vue
<mx-button>Default</mx-button>
<mx-button type="primary">Primary</mx-button>
<mx-button type="success">Success</mx-button>
<mx-button type="warning">Warning</mx-button>
<mx-button type="danger">Danger</mx-button>
```

## Sizes

```vue
<mx-button size="large">Large</mx-button>
<mx-button size="normal">Normal</mx-button>
<mx-button size="small">Small</mx-button>
<mx-button size="mini">Mini</mx-button>
```

## Plain / Round / Block

```vue
<mx-button plain type="primary">Plain</mx-button>
<mx-button round type="danger">Round</mx-button>
<mx-button block type="primary">Block</mx-button>
```

## Loading / Disabled

```vue
<mx-button type="primary" loading loading-text="Loading" />
<mx-button disabled>Disabled</mx-button>
```

## Props

| Name          | Description            | Type                                                 | Default   |
| ------------- | ---------------------- | ---------------------------------------------------- | --------- |
| type          | Button type            | `default \| primary \| success \| warning \| danger` | `default` |
| size          | Size                   | `large \| normal \| small \| mini`                   | `normal`  |
| color         | Custom theme color     | `string`                                             | -         |
| icon          | Icon name or image URL | `string`                                             | -         |
| icon-position | Icon position          | `left \| right`                                      | `left`    |
| loading       | Loading state          | `boolean`                                            | `false`   |
| loading-text  | Loading text           | `string`                                             | -         |
| plain         | Plain button           | `boolean`                                            | `false`   |
| round         | Round                  | `boolean`                                            | `false`   |
| square        | Square                 | `boolean`                                            | `false`   |
| block         | Block element          | `boolean`                                            | `false`   |
| disabled      | Disabled               | `boolean`                                            | `false`   |
| custom-class  | Custom class name      | `string`                                             | -         |
| custom-style  | Custom style           | `string \| object`                                   | -         |

## Events

| Event | Description | Params |
| ----- | ----------- | ------ |
| click | Click event | event  |
