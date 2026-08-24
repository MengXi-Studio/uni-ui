# 组件文档生成指南（内部工具文件，勿发布）

本文档用于指导为 @mengxi/uni-ui 官网（packages/docs）生成组件文档页。所有 API 表格必须严格从 `packages/core/src/components/<组件>/` 源码的 defineProps / defineEmits / defineSlots / defineExpose 中提取，禁止虚构任何 API。

## 文档模板

每个组件文档位于 `packages/docs/components/<分类>/<名称>.md`，格式如下：

````markdown
# Xxx 中文名

一句话描述（组件用途，对齐 Vant Xxx 的 API 与交互）。

## 基础用法

<demo-live>
  <mx-xxx>...</mx-xxx>
</demo-live>

```vue
<mx-xxx>...</mx-xxx>
```

## 功能小节（按 Vant 官网对应组件的演示分节）

<demo-live>...</demo-live>

```vue
...
```

## Props

| 参数 | 说明 | 类型  | 默认值 |
| ---- | ---- | ----- | ------ |
| xxx  | xxx  | `xxx` | `xxx`  |

## Events（如有）

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| xxx    | xxx  | xxx      |

## Slots（如有）

| 名称 | 说明 |
| ---- | ---- |
| xxx  | xxx  |

## 样式变量（如有）

| 名称 | 默认值 | 说明 |
| ---- | ------ | ---- |
````

## 硬性规则

1. **API 来源真实**：Props 表的参数名、类型、默认值必须逐一对照源码 defineProps；说明文字参考源码中 prop 的 JSDoc 注释（注释就是说明）。
2. **类型格式**：类型列用反引号包裹，联合类型用 `|` 分隔，如 `primary | success`；`[String, Number]` 写作 `string | number`。
3. **默认值格式**：用反引号包裹；字符串默认值写 `''` 或实际值；布尔写 `false` / `true`；无默认值写 `-`。
4. **demo-live 限制**：demo-live 内只能写静态模板（可用 `:model-value="true"` 等字面量绑定展示状态，但**不能用 v-model /
   script**）。需要数据交互的演示（v-model、事件回调、函数调用式 API 如 showToast()）只写 ```vue 代码块，不用 demo-live。
5. **函数调用式组件**（如 Toast/Notify/Dialog/ImagePreview 若为组件标签式则正常写）：若组件需要 uni.* 运行时或函数式调用，仅用代码块演示。
6. **子组件文档合并**：如 mx-collapse + mx-collapse-item 合并一篇文档，分别列出两个组件的 Props（用 `### Collapse Props` / `### CollapseItem Props` 小节）。
7. **代码演示章节命名**参考 Vant 官网：基础用法、xxx 模式、自定义 xxx、禁用状态等。
8. **文档语言**：简体中文；标题格式 `# 英文名 中文名`（与 Vant 一致，如 `# Checkbox 复选框`）。
9. **组件用法示例**必须与 core 实现一致：kebab-case 标签 `<mx-xxx>`，prop 名 kebab-case（如 `custom-class`）。
10. 组件源码路径：`packages/core/src/components/mx-xxx/mx-xxx.vue`（相对仓库根 `e:\Github PedroQue99\MengXi-Studio\uni-ui`）。
11. 文件末尾不留空行堆积，保持整洁。
12. 若组件有 defineExpose 的方法/实例，增加 `## 方法（通过 ref 调用）` 或 `## Slots` 章节。
13. 现有已注册可在线渲染组件参考 `packages/docs/.vitepress/theme/index.ts`；新文档中的 demo-live 引用的组件后续会统一注册，无需担心。
14. mx-icon 说明：`name` prop 直接作为字符内容渲染（传入 URL/dataURI 则作为图片显示），非内置图标字体。文档演示用 emoji 字符（如 `name="⭐"`）或图片 URL。其他组件的 icon 类 prop 同理传字符或 URL。

## 示例参考

参考已完成的 `packages/docs/components/basic/button.md` 的结构与风格。
