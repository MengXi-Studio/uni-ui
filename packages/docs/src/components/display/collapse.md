# Collapse 折叠面板

折叠面板容器与面板项组合使用，支持手风琴模式，对齐 Vant Collapse 的 API 与交互。

## 基础用法

`v-model` 绑定当前展开项的 name 数组，`mx-collapse-item` 通过 `name` 标识每个面板。

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="标题 1" name="1">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 2" name="2">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 3" name="3">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse v-model="activeNames">
  <mx-collapse-item title="标题 1" name="1">内容 1</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容 2</mx-collapse-item>
  <mx-collapse-item title="标题 3" name="3">内容 3</mx-collapse-item>
</mx-collapse>
```

```ts
const activeNames = ref(['1'])
```

## 手风琴

开启 `accordion` 后同时最多展开一个面板，`v-model` 为单个 name（字符串或数字）。

```vue
<mx-collapse v-model="activeName" accordion>
  <mx-collapse-item title="标题 1" name="1">内容 1</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容 2</mx-collapse-item>
  <mx-collapse-item title="标题 3" name="3">内容 3</mx-collapse-item>
</mx-collapse>
```

```ts
const activeName = ref('1')
```

## 禁用状态

面板项设置 `disabled` 后不可展开收起；也可以在 `mx-collapse` 上统一禁用全部面板。

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="禁用面板" name="1" disabled>
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
    <mx-collapse-item title="标题 2" name="2">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse :model-value="['1']">
  <mx-collapse-item title="禁用面板" name="1" disabled>内容</mx-collapse-item>
  <mx-collapse-item title="标题 2" name="2">内容</mx-collapse-item>
</mx-collapse>
```

## 自定义标题内容与图标

`icon` 支持图片地址或字符（emoji），`value` 展示标题右侧额外信息；也可通过 `title` / `value` 插槽完全自定义。

<demo-live>
  <mx-collapse :model-value="['1']">
    <mx-collapse-item title="标题 1" name="1" icon="⭐" value="右侧信息">
      代码是写出来给人看的，顺便能在机器上运行。
    </mx-collapse-item>
  </mx-collapse>
</demo-live>

```vue
<mx-collapse v-model="activeNames">
  <mx-collapse-item title="标题 1" name="1" icon="⭐" value="右侧信息">
    内容
  </mx-collapse-item>
  <mx-collapse-item title="自定义标题" name="2">
    <template #title>
      <text style="color: #1989fa">自定义标题</text>
    </template>
    内容
  </mx-collapse-item>
</mx-collapse>
```

## API

### Collapse Props

| 参数         | 说明                           | 类型                        | 默认值  |
| ------------ | ------------------------------ | --------------------------- | ------- |
| model-value  | 当前展开面板的 name（v-model） | `array \| string \| number` | -       |
| accordion    | 是否开启手风琴模式             | `boolean`                   | `false` |
| disabled     | 是否禁用所有面板               | `boolean`                   | `false` |
| duration     | 切换动画时长，单位毫秒         | `number`                    | `300`   |
| custom-class | 自定义类名                     | `string`                    | -       |
| custom-style | 自定义样式                     | `string \| object`          | -       |

### CollapseItem Props

| 参数         | 说明                         | 类型               | 默认值  |
| ------------ | ---------------------------- | ------------------ | ------- |
| name         | 唯一标识，未设置时取 title   | `string \| number` | -       |
| title        | 标题                         | `string`           | -       |
| value        | 标题右侧额外信息             | `string`           | -       |
| disabled     | 是否禁用面板                 | `boolean`          | `false` |
| icon         | 图标（图片地址或字符/emoji） | `string`           | -       |
| custom-class | 自定义类名                   | `string`           | -       |
| custom-style | 自定义样式                   | `string \| object` | -       |

### Collapse Events

| 事件名             | 说明                    | 回调参数      |
| ------------------ | ----------------------- | ------------- |
| update:model-value | 展开状态更新（v-model） | `value`       |
| change             | 切换面板时触发          | `value, name` |

### CollapseItem Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 面板内容               |
| title   | 自定义标题             |
| value   | 自定义标题右侧额外信息 |
