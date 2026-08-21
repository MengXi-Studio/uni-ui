import { defineConfig } from 'vitepress'

// 组件文档分类（对齐 Vant 官网导航结构）
const componentSidebar = [
  {
    text: '基础组件',
    items: [
      { text: 'Button 按钮', link: '/components/basic/button' },
      { text: 'Cell 单元格', link: '/components/basic/cell' },
      { text: 'Icon 图标', link: '/components/basic/icon' },
      { text: 'Image 图片', link: '/components/basic/image' },
      { text: 'Layout 布局', link: '/components/basic/layout' },
      { text: 'Popup 弹出层', link: '/components/basic/popup' },
    ],
  },
  {
    text: '表单组件',
    items: [
      { text: 'Area 省市区选择', link: '/components/form/area' },
      { text: 'Calendar 日历', link: '/components/form/calendar' },
      { text: 'Cascader 级联选择', link: '/components/form/cascader' },
      { text: 'Checkbox 复选框', link: '/components/form/checkbox' },
      { text: 'Field 输入框', link: '/components/form/field' },
      { text: 'Form 表单', link: '/components/form/form' },
      { text: 'NumberKeyboard 数字键盘', link: '/components/form/number-keyboard' },
      { text: 'Picker 选择器', link: '/components/form/picker' },
      { text: 'Radio 单选框', link: '/components/form/radio' },
      { text: 'Rate 评分', link: '/components/form/rate' },
      { text: 'Search 搜索', link: '/components/form/search' },
      { text: 'Slider 滑块', link: '/components/form/slider' },
      { text: 'Stepper 步进器', link: '/components/form/stepper' },
      { text: 'Switch 开关', link: '/components/form/switch' },
      { text: 'Uploader 文件上传', link: '/components/form/uploader' },
    ],
  },
  {
    text: '反馈组件',
    items: [
      { text: 'ActionSheet 动作面板', link: '/components/feedback/action-sheet' },
      { text: 'Dialog 弹出框', link: '/components/feedback/dialog' },
      { text: 'DropdownMenu 下拉菜单', link: '/components/feedback/dropdown-menu' },
      { text: 'Loading 加载', link: '/components/feedback/loading' },
      { text: 'Notify 消息通知', link: '/components/feedback/notify' },
      { text: 'Overlay 遮罩层', link: '/components/feedback/overlay' },
      { text: 'PullRefresh 下拉刷新', link: '/components/feedback/pull-refresh' },
      { text: 'ShareSheet 分享面板', link: '/components/feedback/share-sheet' },
      { text: 'SwipeCell 滑动单元格', link: '/components/feedback/swipe-cell' },
      { text: 'Toast 轻提示', link: '/components/feedback/toast' },
      { text: 'ImagePreview 图片预览', link: '/components/feedback/image-preview' },
    ],
  },
  {
    text: '展示组件',
    items: [
      { text: 'Badge 徽标', link: '/components/display/badge' },
      { text: 'Card 卡片', link: '/components/display/card' },
      { text: 'Circle 环形进度条', link: '/components/display/circle' },
      { text: 'Collapse 折叠面板', link: '/components/display/collapse' },
      { text: 'CountDown 倒计时', link: '/components/display/count-down' },
      { text: 'Divider 分割线', link: '/components/display/divider' },
      { text: 'Empty 空状态', link: '/components/display/empty' },
      { text: 'Lazyload 懒加载', link: '/components/display/lazyload' },
      { text: 'Progress 进度条', link: '/components/display/progress' },
      { text: 'Skeleton 骨架屏', link: '/components/display/skeleton' },
      { text: 'Space 间距', link: '/components/display/space' },
      { text: 'Tag 标签', link: '/components/display/tag' },
      { text: 'TextEllipsis 文本省略', link: '/components/display/text-ellipsis' },
      { text: 'Watermark 水印', link: '/components/display/watermark' },
    ],
  },
  {
    text: '导航组件',
    items: [
      { text: 'BackTop 回到顶部', link: '/components/nav/back-top' },
      { text: 'Grid 宫格', link: '/components/nav/grid' },
      { text: 'IndexBar 索引栏', link: '/components/nav/index-bar' },
      { text: 'NavBar 导航栏', link: '/components/nav/nav-bar' },
      { text: 'Pagination 分页', link: '/components/nav/pagination' },
      { text: 'Sidebar 侧边导航', link: '/components/nav/sidebar' },
      { text: 'Sticky 粘性布局', link: '/components/nav/sticky' },
      { text: 'Tabbar 标签栏', link: '/components/nav/tabbar' },
      { text: 'Tabs 标签页', link: '/components/nav/tabs' },
      { text: 'TreeSelect 分类选择', link: '/components/nav/tree-select' },
    ],
  },
  {
    text: '业务组件',
    items: [
      { text: 'AddressEdit 地址编辑', link: '/components/business/address-edit' },
      { text: 'AddressList 地址列表', link: '/components/business/address-list' },
      { text: 'ConfigProvider 全局配置', link: '/components/business/config-provider' },
      { text: 'ContactCard 联系人卡片', link: '/components/business/contact-card' },
      { text: 'ContactEdit 联系人编辑', link: '/components/business/contact-edit' },
      { text: 'ContactList 联系人列表', link: '/components/business/contact-list' },
      { text: 'Coupon 优惠券', link: '/components/business/coupon' },
      { text: 'FloatingBubble 悬浮气泡', link: '/components/business/floating-bubble' },
      { text: 'FloatingPanel 浮动面板', link: '/components/business/floating-panel' },
      { text: 'GoodsAction 商品导航', link: '/components/business/goods-action' },
      { text: 'Signature 签名', link: '/components/business/signature' },
      { text: 'SubmitBar 提交订单栏', link: '/components/business/submit-bar' },
    ],
  },
]

// 参考 Vant 官网分类组织的文档站点（自定义 theme 还原 Vant 视觉）
export default defineConfig({
  lang: 'zh-CN',
  title: 'MengXi Uni-UI',
  description: '基于 Vue 3 + TypeScript 的高质量 uni-app 组件库',
  appearance: false,
  lastUpdated: true,
  cleanUrls: false,
  // 静音 Dart Sass legacy-js-api 弃用警告（官网使用组件库 scss）
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },
  themeConfig: {
    outline: { level: [2, 3], label: '目录' },
    search: {
      provider: 'local',
      options: {
        translations: { button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' } },
      },
    },
    nav: [],
    sidebar: {
      '/guide/': [
        {
          text: '开发指南',
          items: [
            { text: '介绍', link: '/' },
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
        ...componentSidebar,
      ],
      '/components/': componentSidebar,
      '/': [
        {
          text: '开发指南',
          items: [
            { text: '介绍', link: '/' },
            { text: '快速上手', link: '/guide/quickstart' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
        ...componentSidebar,
      ],
    },
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2024 MengXi Studio',
    },
  },
})
