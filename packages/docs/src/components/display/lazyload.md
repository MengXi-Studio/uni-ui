# Lazyload 懒加载

图片进入视口时才触发加载，基于 uni.createIntersectionObserver 实现，H5 / 小程序 / App 多端兼容。

## 基础用法

<demo-live>
  <mx-lazyload
    image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
    width="100"
    height="100"
  />
</demo-live>

```vue
<mx-lazyload image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" width="100" height="100" />
```

## 自定义占位

<demo-live>
  <mx-lazyload
    image="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
    width="100"
    height="100"
    placeholder="#ebedf0"
  >
    <template #placeholder>
      <text style="color: #969799; font-size: 12px;">加载中…</text>
    </template>
  </mx-lazyload>
</demo-live>

```vue
<mx-lazyload image="xxx.jpeg" width="100" height="100" placeholder="#ebedf0">
  <template #placeholder>
    <text>加载中…</text>
  </template>
</mx-lazyload>
```

## Props

| 参数         | 说明       | 类型               | 默认值    |
| ------------ | ---------- | ------------------ | --------- |
| image        | 图片地址   | `string`           | `''`      |
| width        | 宽度       | `number \| string` | -         |
| height       | 高度       | `number \| string` | -         |
| placeholder  | 占位背景色 | `string`           | `#f2f3f5` |
| custom-class | 自定义类名 | `string`           | `''`      |
| custom-style | 自定义样式 | `string \| object` | `''`      |

## Events

| 事件名 | 说明                                  | 回调参数 |
| ------ | ------------------------------------- | -------- |
| load   | 进入视口触发加载 / 图片加载完成时触发 | -        |
| error  | 图片加载失败时触发                    | -        |
| click  | 点击时触发                            | -        |

## Slots

| 名称        | 说明               |
| ----------- | ------------------ |
| placeholder | 未加载时的占位内容 |

## 方法（通过 ref 调用）

| 方法名 | 说明               | 参数 | 返回值 |
| ------ | ------------------ | ---- | ------ |
| flush  | 触发加载           | -    | -      |
| load   | 触发加载           | -    | -      |
| resize | 兼容保留（空实现） | -    | -      |
