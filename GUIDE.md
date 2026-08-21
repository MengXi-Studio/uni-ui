# @mengxi/uni-ui 使用指南

## 快速开始

### 安装

```bash
npm install @mengxi/uni-ui
```

### 在 uni-app 项目中使用

#### 1. 配置 easycom

在 `pages.json` 中添加以下配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^mx-(.*)": "@mengxi/uni-ui/components/mx-$1/mx-$1.vue"
    }
  }
}
```

#### 2. 使用组件

```vue
<template>
  <view>
    <mx-button type="primary">按钮</mx-button>
    <mx-input v-model="value" placeholder="请输入" />
    <mx-card title="卡片">内容</mx-card>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

## 组件列表

### 基础组件

#### MX Button - 按钮

```vue
<mx-button type="primary" size="medium">主要按钮</mx-button>
<mx-button type="success" loading>加载中</mx-button>
<mx-button type="danger" disabled>禁用按钮</mx-button>
```

**Props:**

- `type`: 类型 (default | primary | success | warning | danger)
- `size`: 尺寸 (small | medium | large)
- `shape`: 形状 (square | round | circle)
- `plain`: 是否空心
- `disabled`: 是否禁用
- `loading`: 是否加载中
- `text`: 按钮文字

**Events:**

- `@click`: 点击事件

#### MX Input - 输入框

```vue
<mx-input v-model="value" placeholder="请输入" clearable show-count />
```

**Props:**

- `modelValue`: 绑定值
- `type`: 类型 (text | number | digit | idcard | nickname)
- `placeholder`: 占位符
- `disabled`: 是否禁用
- `readonly`: 是否只读
- `maxlength`: 最大长度
- `clearable`: 是否显示清除按钮
- `showCount`: 是否显示字数统计

**Events:**

- `@update:modelValue`: 值变化事件
- `@focus`: 聚焦事件
- `@blur`: 失焦事件
- `@clear`: 清除事件

#### MX Card - 卡片

```vue
<mx-card title="标题" subtitle="副标题">
  卡片内容
</mx-card>
```

**Props:**

- `title`: 标题
- `subtitle`: 副标题
- `size`: 尺寸 (small | medium | large)
- `bordered`: 是否显示边框
- `hoverable`: 是否悬浮

**Events:**

- `@click`: 点击事件

**Slots:**

- `header`: 头部插槽
- `default`: 内容插槽
- `footer`: 底部插槽

#### MX Icon - 图标

```vue
<mx-icon name="uniui-email" type="primary" size="large" />
```

**Props:**

- `name`: 图标名称
- `type`: 类型 (default | primary | success | warning | danger | info)
- `size`: 尺寸 (small | medium | large)
- `color`: 颜色

#### MX Loading - 加载

```vue
<mx-loading type="circle" size="medium" text="加载中..." />
<mx-loading type="dots" fullscreen />
```

**Props:**

- `type`: 类型 (circle | dots | spinner)
- `size`: 尺寸 (small | medium | large)
- `text`: 加载文字
- `fullscreen`: 是否全屏

### 业务组件

#### MX Product Card - 商品卡片

```vue
<mx-product-card
  :product="{
    title: '商品标题',
    price: 99.9,
    originalPrice: 199.9,
    image: '商品图片',
    sales: 1000,
    tags: ['新品', '热销'],
  }"
  @click="handleClick"
/>
```

**Props:**

- `product`: 商品信息对象
- `showOriginalPrice`: 是否显示原价
- `showSales`: 是否显示销量
- `showTags`: 是否显示标签

**Events:**

- `@click`: 点击事件，返回商品信息

#### MX User Info - 用户信息卡片

```vue
<mx-user-info-card
  :user="{
    avatar: '头像 URL',
    nickname: '昵称',
    phone: '手机号',
    level: 'VIP',
    points: 1000,
  }"
  @click="handleClick"
/>
```

**Props:**

- `user`: 用户信息对象
- `showPhone`: 是否显示手机号
- `showLevel`: 是否显示等级
- `showPoints`: 是否显示积分

**Events:**

- `@click`: 点击事件，返回用户信息

## 工具函数

### 验证器

```typescript
import { isPhone, isEmail, isEmpty } from '@mengxi/uni-ui/utils'

isPhone('13800138000') // true
isEmail('test@example.com') // true
isEmpty('') // true
```

### 格式化器

```typescript
import { formatDate, formatMoney, formatFileSize } from '@mengxi/uni-ui/utils'

formatDate(new Date()) // '2024-01-01 12:00:00'
formatMoney(1234.5) // '1,234.50'
formatFileSize(1024) // '1.00 KB'
```

## 组合式函数

### useRequest - 网络请求

```typescript
import { useRequest } from '@mengxi/uni-ui/composables'

const { data, loading, error, run } = useRequest(
  {
    url: '/api/user',
    method: 'GET',
    showLoading: true,
  },
  {
    immediate: true,
  }
)

// 手动触发
run()
```

### useStorage - 本地存储

```typescript
import { useStorage } from '@mengxi/uni-ui/composables'

const [value, setValue, removeValue] = useStorage('key', initialValue)

// 自动保存到 localStorage
setValue(newValue)
```

## 主题定制

### 使用 CSS 变量

```css
page {
  --mx-primary-color: #your-color;
  --mx-success-color: #your-color;
}
```

### 使用 SCSS 变量

```scss
@use '@mengxi/uni-ui/styles/variables.scss' as *;

.my-class {
  color: $primary-color;
}
```

### 暗色主题

```vue
<template>
  <view class="dark-theme">
    <!-- 内容 -->
  </view>
</template>
```

## 常见问题

### Q: 如何按需引入组件？

A: easycom 会自动按需加载组件，无需手动导入。

### Q: 如何自定义组件样式？

A: 可以通过 `className` 和 `customStyle` props 传入自定义样式。

### Q: 支持哪些平台？

A: 支持 H5、微信小程序、支付宝小程序、百度小程序、头条小程序、App（iOS/Android）。

## 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 运行示例项目
npm run dev

# 打包组件库
npm run build

# 运行测试
npm test
```

### 提交代码

请遵循 Conventional Commits 规范：

```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建/工具链相关
```

## License

MIT © 2024 MengXi Studio
