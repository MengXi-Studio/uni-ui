<template>
  <div class="mx-aside-components">
    <div class="mx-aside-header">
      <div class="mx-aside-logo">
        <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
          <rect width="32" height="32" rx="7" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #4fc3f7" />
              <stop offset="100%" style="stop-color: #1976d2" />
            </linearGradient>
          </defs>
          <path d="M10 13 L16 10 L22 13 L22 19 L16 22 L10 19 Z" fill="white" opacity="0.95" />
        </svg>
      </div>
      <div class="mx-aside-title">MengXi Uni-UI</div>
    </div>
    <div class="mx-aside-desc">轻量、可定制的移动端 uni-app 组件库</div>
    <template v-for="group in groups" :key="group.title">
      <div class="mx-aside-group-title">{{ group.title }}</div>
      <a
        v-for="item in group.items"
        :key="item.link"
        :href="item.link"
        class="mx-aside-link"
        :class="{ active: isActive(item.link) }"
      >
        {{ item.text }}
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()

const groups = [
  {
    title: '基础组件',
    items: [
      { text: 'Button 按钮', link: '/components/basic/button.html' },
      { text: 'Cell 单元格', link: '/components/basic/cell.html' },
      { text: 'Icon 图标', link: '/components/basic/icon.html' },
      { text: 'Image 图片', link: '/components/basic/image.html' },
      { text: 'Layout 布局', link: '/components/basic/layout.html' },
      { text: 'Popup 弹出层', link: '/components/basic/popup.html' },
    ],
  },
  {
    title: '表单组件',
    items: [
      { text: 'Area 省市区选择', link: '/components/form/area.html' },
      { text: 'Calendar 日历', link: '/components/form/calendar.html' },
      { text: 'Cascader 级联选择', link: '/components/form/cascader.html' },
      { text: 'Checkbox 复选框', link: '/components/form/checkbox.html' },
      { text: 'Field 输入框', link: '/components/form/field.html' },
      { text: 'Form 表单', link: '/components/form/form.html' },
      { text: 'NumberKeyboard 数字键盘', link: '/components/form/number-keyboard.html' },
      { text: 'Picker 选择器', link: '/components/form/picker.html' },
      { text: 'Radio 单选框', link: '/components/form/radio.html' },
      { text: 'Rate 评分', link: '/components/form/rate.html' },
      { text: 'Search 搜索', link: '/components/form/search.html' },
      { text: 'Slider 滑块', link: '/components/form/slider.html' },
      { text: 'Stepper 步进器', link: '/components/form/stepper.html' },
      { text: 'Switch 开关', link: '/components/form/switch.html' },
      { text: 'Uploader 文件上传', link: '/components/form/uploader.html' },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { text: 'ActionSheet 动作面板', link: '/components/feedback/action-sheet.html' },
      { text: 'Dialog 弹出框', link: '/components/feedback/dialog.html' },
      { text: 'DropdownMenu 下拉菜单', link: '/components/feedback/dropdown-menu.html' },
      { text: 'Loading 加载', link: '/components/feedback/loading.html' },
      { text: 'Notify 消息通知', link: '/components/feedback/notify.html' },
      { text: 'Overlay 遮罩层', link: '/components/feedback/overlay.html' },
      { text: 'PullRefresh 下拉刷新', link: '/components/feedback/pull-refresh.html' },
      { text: 'ShareSheet 分享面板', link: '/components/feedback/share-sheet.html' },
      { text: 'SwipeCell 滑动单元格', link: '/components/feedback/swipe-cell.html' },
      { text: 'Toast 轻提示', link: '/components/feedback/toast.html' },
      { text: 'ImagePreview 图片预览', link: '/components/feedback/image-preview.html' },
    ],
  },
  {
    title: '展示组件',
    items: [
      { text: 'Badge 徽标', link: '/components/display/badge.html' },
      { text: 'Card 卡片', link: '/components/display/card.html' },
      { text: 'Circle 环形进度条', link: '/components/display/circle.html' },
      { text: 'Collapse 折叠面板', link: '/components/display/collapse.html' },
      { text: 'CountDown 倒计时', link: '/components/display/count-down.html' },
      { text: 'Divider 分割线', link: '/components/display/divider.html' },
      { text: 'Empty 空状态', link: '/components/display/empty.html' },
      { text: 'Lazyload 懒加载', link: '/components/display/lazyload.html' },
      { text: 'Progress 进度条', link: '/components/display/progress.html' },
      { text: 'Skeleton 骨架屏', link: '/components/display/skeleton.html' },
      { text: 'Space 间距', link: '/components/display/space.html' },
      { text: 'Tag 标签', link: '/components/display/tag.html' },
      { text: 'TextEllipsis 文本省略', link: '/components/display/text-ellipsis.html' },
      { text: 'Watermark 水印', link: '/components/display/watermark.html' },
    ],
  },
  {
    title: '导航组件',
    items: [
      { text: 'BackTop 回到顶部', link: '/components/nav/back-top.html' },
      { text: 'Grid 宫格', link: '/components/nav/grid.html' },
      { text: 'IndexBar 索引栏', link: '/components/nav/index-bar.html' },
      { text: 'NavBar 导航栏', link: '/components/nav/nav-bar.html' },
      { text: 'Pagination 分页', link: '/components/nav/pagination.html' },
      { text: 'Sidebar 侧边导航', link: '/components/nav/sidebar.html' },
      { text: 'Sticky 粘性布局', link: '/components/nav/sticky.html' },
      { text: 'Tabbar 标签栏', link: '/components/nav/tabbar.html' },
      { text: 'Tabs 标签页', link: '/components/nav/tabs.html' },
      { text: 'TreeSelect 分类选择', link: '/components/nav/tree-select.html' },
    ],
  },
  {
    title: '业务组件',
    items: [
      { text: 'AddressEdit 地址编辑', link: '/components/business/address-edit.html' },
      { text: 'AddressList 地址列表', link: '/components/business/address-list.html' },
      { text: 'ConfigProvider 全局配置', link: '/components/business/config-provider.html' },
      { text: 'ContactCard 联系人卡片', link: '/components/business/contact-card.html' },
      { text: 'ContactEdit 联系人编辑', link: '/components/business/contact-edit.html' },
      { text: 'ContactList 联系人列表', link: '/components/business/contact-list.html' },
      { text: 'Coupon 优惠券', link: '/components/business/coupon.html' },
      { text: 'FloatingBubble 悬浮气泡', link: '/components/business/floating-bubble.html' },
      { text: 'FloatingPanel 浮动面板', link: '/components/business/floating-panel.html' },
      { text: 'GoodsAction 商品导航', link: '/components/business/goods-action.html' },
      { text: 'Signature 签名', link: '/components/business/signature.html' },
      { text: 'SubmitBar 提交订单栏', link: '/components/business/submit-bar.html' },
    ],
  },
]

function isActive(link: string) {
  return route.path === link.replace('.html', '')
}
</script>

<style scoped>
.mx-aside-components {
  padding: 20px 0;
}
.mx-aside-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-bottom: 4px;
}
.mx-aside-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mx-aside-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--mx-text-1);
}
.mx-aside-desc {
  font-size: 12px;
  color: var(--mx-text-3);
  margin-bottom: 16px;
  padding: 0 16px;
}
.mx-aside-group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--mx-text-3);
  padding: 10px 16px 4px;
  letter-spacing: 0.5px;
}
.mx-aside-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  font-size: 13px;
  color: var(--mx-text-2);
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s;
}
.mx-aside-link::after {
  content: '>';
  font-size: 12px;
  color: var(--mx-text-3);
  opacity: 0.5;
}
.mx-aside-link:hover {
  color: var(--mx-brand);
}
.mx-aside-link:hover::after {
  color: var(--mx-brand);
  opacity: 0.8;
}
.mx-aside-link.active {
  color: var(--mx-brand);
  font-weight: 500;
}
</style>
