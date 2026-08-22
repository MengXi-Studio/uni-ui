import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './style.css'
// 引入组件库全局样式：声明 --mx-* 主题变量/reset，保证在线 Demo 的主题色与圆角生效
import '@mengxi/uni-ui/src/styles/index.scss'
import DemoLive from './demo-live.vue'
import HomeBadges from './components/HomeBadges.vue'
import SardDocHeader from './components/SardDocHeader.vue'
import MobileEmulator from './components/MobileEmulator.vue'
import { View, Text, Image, ScrollView, Swiper, SwiperItem } from './uni-shims'
import DemoScreenSwitch from './demos/demo-switch.vue'
import DemoScreenRate from './demos/demo-rate.vue'
import DemoScreenStepper from './demos/demo-stepper.vue'
import DemoScreenTabs from './demos/demo-tabs.vue'
import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

// 在线 Demo 可渲染的全部组件（mx-signature / mx-sign-board 依赖 canvas，不注册）
// 使用字面量路径保证 Vite 可静态分析（动态 import 懒加载）
const components: Record<string, Component> = {
	// 基础组件
	'mx-button': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-button/mx-button.vue')),
	'mx-cell': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-cell/mx-cell.vue')),
	'mx-cell-group': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-cell-group/mx-cell-group.vue')),
	'mx-icon': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-icon/mx-icon.vue')),
	'mx-image': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-image/mx-image.vue')),
	'mx-row': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-row/mx-row.vue')),
	'mx-col': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-col/mx-col.vue')),
	'mx-popup': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-popup/mx-popup.vue')),
	'mx-overlay': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-overlay/mx-overlay.vue')),

	// 表单组件
	'mx-area': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-area/mx-area.vue')),
	'mx-calendar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-calendar/mx-calendar.vue')),
	'mx-cascader': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-cascader/mx-cascader.vue')),
	'mx-checkbox': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-checkbox/mx-checkbox.vue')),
	'mx-checkbox-group': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-checkbox-group/mx-checkbox-group.vue')),
	'mx-field': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-field/mx-field.vue')),
	'mx-form': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-form/mx-form.vue')),
	'mx-number-keyboard': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-number-keyboard/mx-number-keyboard.vue')),
	'mx-picker': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-picker/mx-picker.vue')),
	'mx-picker-group': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-picker-group/mx-picker-group.vue')),
	'mx-radio': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-radio/mx-radio.vue')),
	'mx-radio-group': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-radio-group/mx-radio-group.vue')),
	'mx-rate': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-rate/mx-rate.vue')),
	'mx-search': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-search/mx-search.vue')),
	'mx-slider': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-slider/mx-slider.vue')),
	'mx-stepper': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-stepper/mx-stepper.vue')),
	'mx-switch': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-switch/mx-switch.vue')),
	'mx-uploader': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-uploader/mx-uploader.vue')),

	// 反馈组件
	'mx-action-sheet': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-action-sheet/mx-action-sheet.vue')),
	'mx-dialog': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-dialog/mx-dialog.vue')),
	'mx-dropdown-menu': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-dropdown-menu/mx-dropdown-menu.vue')),
	'mx-dropdown-item': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-dropdown-item/mx-dropdown-item.vue')),
	'mx-loading': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-loading/mx-loading.vue')),
	'mx-notify': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-notify/mx-notify.vue')),
	'mx-toast': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-toast/mx-toast.vue')),
	'mx-pull-refresh': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-pull-refresh/mx-pull-refresh.vue')),
	'mx-share-sheet': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-share-sheet/mx-share-sheet.vue')),
	'mx-swipe-cell': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-swipe-cell/mx-swipe-cell.vue')),
	'mx-image-preview': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-image-preview/mx-image-preview.vue')),

	// 展示组件
	'mx-badge': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-badge/mx-badge.vue')),
	'mx-card': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-card/mx-card.vue')),
	'mx-circle': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-circle/mx-circle.vue')),
	'mx-collapse': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-collapse/mx-collapse.vue')),
	'mx-collapse-item': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-collapse-item/mx-collapse-item.vue')),
	'mx-count-down': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-count-down/mx-count-down.vue')),
	'mx-divider': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-divider/mx-divider.vue')),
	'mx-empty': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-empty/mx-empty.vue')),
	'mx-lazyload': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-lazyload/mx-lazyload.vue')),
	'mx-progress': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-progress/mx-progress.vue')),
	'mx-skeleton': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-skeleton/mx-skeleton.vue')),
	'mx-space': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-space/mx-space.vue')),
	'mx-tag': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tag/mx-tag.vue')),
	'mx-text-ellipsis': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-text-ellipsis/mx-text-ellipsis.vue')),
	'mx-watermark': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-watermark/mx-watermark.vue')),

	// 导航组件
	'mx-back-top': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-back-top/mx-back-top.vue')),
	'mx-grid': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-grid/mx-grid.vue')),
	'mx-grid-item': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-grid-item/mx-grid-item.vue')),
	'mx-index-bar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-index-bar/mx-index-bar.vue')),
	'mx-index-anchor': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-index-anchor/mx-index-anchor.vue')),
	'mx-nav-bar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-nav-bar/mx-nav-bar.vue')),
	'mx-pagination': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-pagination/mx-pagination.vue')),
	'mx-sidebar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-sidebar/mx-sidebar.vue')),
	'mx-sticky': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-sticky/mx-sticky.vue')),
	'mx-tabbar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tabbar/mx-tabbar.vue')),
	'mx-tabbar-item': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tabbar-item/mx-tabbar-item.vue')),
	'mx-tabs': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tabs/mx-tabs.vue')),
	'mx-tab-pane': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tab-pane/mx-tab-pane.vue')),
	'mx-tab': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tab/mx-tab.vue')),
	'mx-tree-select': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-tree-select/mx-tree-select.vue')),

	// 业务组件
	'mx-address-edit': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-address-edit/mx-address-edit.vue')),
	'mx-address-list': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-address-list/mx-address-list.vue')),
	'mx-config-provider': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-config-provider/mx-config-provider.vue')),
	'mx-contact-card': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-contact-card/mx-contact-card.vue')),
	'mx-contact-edit': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-contact-edit/mx-contact-edit.vue')),
	'mx-contact-list': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-contact-list/mx-contact-list.vue')),
	'mx-coupon': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-coupon/mx-coupon.vue')),
	'mx-coupon-cell': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-coupon-cell/mx-coupon-cell.vue')),
	'mx-coupon-list': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-coupon-list/mx-coupon-list.vue')),
	'mx-floating-bubble': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-floating-bubble/mx-floating-bubble.vue')),
	'mx-floating-panel': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-floating-panel/mx-floating-panel.vue')),
	'mx-goods-action': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-goods-action/mx-goods-action.vue')),
	'mx-goods-action-button': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-goods-action-button/mx-goods-action-button.vue')),
	'mx-goods-action-icon': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-goods-action-icon/mx-goods-action-icon.vue')),
	'mx-submit-bar': defineAsyncComponent(() => import('@mengxi/uni-ui/src/components/mx-submit-bar/mx-submit-bar.vue'))
}

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'home-hero-after': () => h(HomeBadges),
			'doc-before': () => h(SardDocHeader),
			'aside-top': () => h(MobileEmulator)
		})
	},
	enhanceApp({ app }) {
		// uni 标签 shim（仅官网演示用）
		app.component('view', View)
		app.component('text', Text)
		app.component('image', Image)
		app.component('scroll-view', ScrollView)
		app.component('swiper', Swiper)
		app.component('swiper-item', SwiperItem)

		// 演示容器 + 交互示例包装
		app.component('demo-live', DemoLive)
		app.component('demo-switch', DemoScreenSwitch)
		app.component('demo-rate', DemoScreenRate)
		app.component('demo-stepper', DemoScreenStepper)
		app.component('demo-tabs', DemoScreenTabs)

		// mx-* 组件（在线 Demo 渲染，懒加载）
		for (const [name, component] of Object.entries(components)) {
			app.component(name, component)
		}
	}
} satisfies Theme
