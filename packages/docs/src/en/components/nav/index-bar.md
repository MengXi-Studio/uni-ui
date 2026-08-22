# IndexBar

Index bar for quickly locating items in a list. The index navigation on the right supports touch and slide to select, and works with the IndexAnchor. It aligns with the API and interactions of the Vant IndexBar.

## Install

```json
// pages.json easycom
"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"
```

## Basic Usage

Use `mx-index-anchor` as a child of `mx-index-bar`; the index bar needs to be given a height:

<demo-live>
  <mx-index-bar custom-style="height: 320px; width: 100%;">
    <mx-index-anchor index="A" />
    <mx-cell title="Text" value="Content" />
    <mx-cell title="Text" value="Content" />
    <mx-index-anchor index="B" />
    <mx-cell title="Text" value="Content" />
    <mx-cell title="Text" value="Content" />
    <mx-index-anchor index="C" />
    <mx-cell title="Text" value="Content" />
    <mx-cell title="Text" value="Content" />
  </mx-index-bar>
</demo-live>

```vue
<mx-index-bar custom-style="height: 320px;">
  <mx-index-anchor index="A" />
  <mx-cell title="Text" value="Content" />
  <mx-cell title="Text" value="Content" />
  <mx-index-anchor index="B" />
  <mx-cell title="Text" value="Content" />
  <mx-cell title="Text" value="Content" />
  <mx-index-anchor index="C" />
  <mx-cell title="Text" value="Content" />
  <mx-cell title="Text" value="Content" />
</mx-index-bar>
```

Touching the index bar on the right quickly scrolls to the corresponding anchor. A hint bubble showing the current index is displayed while dragging.

## Custom Index List

Customize the index characters with `index-list`:

<demo-live>
  <mx-index-bar
    :index-list="['1', '2', '3']"
    custom-style="height: 280px; width: 100%;"
  >
    <mx-index-anchor index="1" />
    <mx-cell title="Text" value="Content" />
    <mx-index-anchor index="2" />
    <mx-cell title="Text" value="Content" />
    <mx-index-anchor index="3" />
    <mx-cell title="Text" value="Content" />
  </mx-index-bar>
</demo-live>

```vue
<mx-index-bar :index-list="['1', '2', '3']" custom-style="height: 280px;">
  <mx-index-anchor index="1" />
  <mx-cell title="Text" value="Content" />
  <mx-index-anchor index="2" />
  <mx-cell title="Text" value="Content" />
  <mx-index-anchor index="3" />
  <mx-cell title="Text" value="Content" />
</mx-index-bar>
```

## Custom Index Character

After enabling `use-index-slot` on the anchor, customize the index character rendering through the `index` slot:

```vue
<mx-index-anchor index="A" use-index-slot>
  <template #index="{ index }">
    <text style="color: #ee0a24; font-weight: bold;">{{ index }}</text>
  </template>
  <mx-cell title="Text" value="Content" />
</mx-index-anchor>
```

## API

### IndexBar Props

| Name              | Description                            | Type               | Default |
| ----------------- | -------------------------------------- | ------------------ | ------- |
| index-list        | Index character list                   | `string[]`         | `A - Z` |
| z-index           | z-index of the index bar               | `number \| string` | `500`   |
| sticky            | Whether to anchor the sticky top title | `boolean`          | `true`  |
| sticky-offset-top | Offset of the sticky top title         | `number \| string` | `0`     |
| custom-class      | Custom class name                      | `string`           | `''`    |
| custom-style      | Custom style                           | `string \| object` | `''`    |

### IndexBar Events

| Event  | Description                              | Params        |
| ------ | ---------------------------------------- | ------------- |
| change | Triggered when the current index changes | index: string |
| select | Triggered when an index is selected      | index: string |

### IndexBar Slots

| Name    | Description                                     |
| ------- | ----------------------------------------------- |
| default | List content, usually a list of mx-index-anchor |

### IndexAnchor Props

| Name           | Description                   | Type               | Default |
| -------------- | ----------------------------- | ------------------ | ------- |
| index          | Index character               | `number \| string` | `''`    |
| custom-index   | Custom index character        | `string`           | `''`    |
| use-index-slot | Whether to use the index slot | `boolean`          | `false` |
| sticky         | Whether to anchor to the top  | `boolean`          | `true`  |
| custom-class   | Custom class name             | `string`           | `''`    |
| custom-style   | Custom style                  | `string \| object` | `''`    |

### IndexAnchor Slots

| Name    | Description                      | Slot Props             |
| ------- | -------------------------------- | ---------------------- |
| index   | Custom index character rendering | index: index character |
| default | List content under the anchor    | -                      |
