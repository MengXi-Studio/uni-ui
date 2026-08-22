import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { versionNav } from './shared'

export const META_URL = 'https://mengxi-studio.github.io/uni-ui/'
export const META_TITLE = 'Uni UI'
export const META_DESCRIPTION = '基于 Vue 3 + TypeScript 的高质量 uni-app 组件库'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	/** 网站配置 描述 */
	description: META_DESCRIPTION,

	/** 网站配置 头信息 */
	head: [
		['meta', { property: 'og:url', content: META_URL }],
		['meta', { property: 'og:description', content: META_DESCRIPTION }],
		['meta', { property: 'twitter:url', content: META_URL }],
		['meta', { property: 'og:title', content: META_TITLE }]
	],

	/** 网站配置 主题配置 */
	themeConfig: {
		/** 网站主题配置 编辑链接 */
		editLink: {
			pattern: 'https://github.com/MengXi-Studio/uni-ui/edit/main/packages/docs/:path',
			text: '对本页提出修改建议'
		},

		/** 网站主题配置 大纲标题 */
		outlineTitle: '本页内容',

		/** 网站主题配置 导航栏 */
		nav: [
			{ text: '指南', link: '/guide/quickstart' },
			{ text: '组件', link: '/components/basic/button' },
			{
				text: '相关链接',
				items: [
					{
						text: '问题反馈',
						link: 'https://github.com/MengXi-Studio/uni-ui/issues'
					},
					{
						text: '更新日志',
						link: 'https://github.com/MengXi-Studio/uni-ui/releases'
					}
				]
			},
			versionNav
		],

		sidebar: {
			'/guide/': [
				{
					text: '指南',
					items: [
						{ text: '快速上手', link: '/guide/quickstart' },
						{ text: '主题定制', link: '/guide/theme' }
					]
				}
			],
			'/components/': [
				{
					text: '基础组件',
					items: [
						{ text: 'Button 按钮', link: '/components/basic/button' },
						{ text: 'Cell 单元格', link: '/components/basic/cell' },
						{ text: 'Icon 图标', link: '/components/basic/icon' },
						{ text: 'Image 图片', link: '/components/basic/image' },
						{ text: 'Layout 布局', link: '/components/basic/layout' },
						{ text: 'Popup 弹出层', link: '/components/basic/popup' }
					]
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
						{ text: 'Uploader 文件上传', link: '/components/form/uploader' }
					]
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
						{ text: 'ImagePreview 图片预览', link: '/components/feedback/image-preview' }
					]
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
						{ text: 'Watermark 水印', link: '/components/display/watermark' }
					]
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
						{ text: 'TreeSelect 分类选择', link: '/components/nav/tree-select' }
					]
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
						{ text: 'SubmitBar 提交订单栏', link: '/components/business/submit-bar' }
					]
				}
			]
		}
	}
}
