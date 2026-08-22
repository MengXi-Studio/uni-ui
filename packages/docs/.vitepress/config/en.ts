import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { versionNav } from './shared'

export const META_URL = 'https://mengxi-studio.github.io/uni-ui/en/'
export const META_TITLE = 'Uni UI'
export const META_DESCRIPTION = 'A high-quality uni-app component library built with Vue 3 + TypeScript'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	/** 网站配置 描述 */
	description: META_DESCRIPTION,

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
			text: 'Suggest changes to this page'
		},

		/** 网站主题配置 大纲标题 */
		outlineTitle: 'Contents of this page',

		/** 网站主题配置 导航栏 */
		nav: [
			{ text: 'Guide', link: '/en/guide/quickstart' },
			{ text: 'Components', link: '/en/components/basic/button' },
			{
				text: 'Links',
				items: [
					{
						text: 'Issues',
						link: 'https://github.com/MengXi-Studio/uni-ui/issues'
					},
					{
						text: 'Changelog',
						link: 'https://github.com/MengXi-Studio/uni-ui/releases'
					}
				]
			},
			versionNav
		],

		sidebar: {
			'/en/guide/': [
				{
					text: 'Guide',
					items: [
						{ text: 'Quick Start', link: '/en/guide/quickstart' },
						{ text: 'Theme Customization', link: '/en/guide/theme' }
					]
				}
			],
			'/en/components/': [
				{
					text: 'Basic Components',
					items: [
						{ text: 'Button', link: '/en/components/basic/button' },
						{ text: 'Cell', link: '/en/components/basic/cell' },
						{ text: 'Icon', link: '/en/components/basic/icon' },
						{ text: 'Image', link: '/en/components/basic/image' },
						{ text: 'Layout', link: '/en/components/basic/layout' },
						{ text: 'Popup', link: '/en/components/basic/popup' }
					]
				},
				{
					text: 'Form Components',
					items: [
						{ text: 'Area', link: '/en/components/form/area' },
						{ text: 'Calendar', link: '/en/components/form/calendar' },
						{ text: 'Cascader', link: '/en/components/form/cascader' },
						{ text: 'Checkbox', link: '/en/components/form/checkbox' },
						{ text: 'Field', link: '/en/components/form/field' },
						{ text: 'Form', link: '/en/components/form/form' },
						{ text: 'NumberKeyboard', link: '/en/components/form/number-keyboard' },
						{ text: 'Picker', link: '/en/components/form/picker' },
						{ text: 'Radio', link: '/en/components/form/radio' },
						{ text: 'Rate', link: '/en/components/form/rate' },
						{ text: 'Search', link: '/en/components/form/search' },
						{ text: 'Slider', link: '/en/components/form/slider' },
						{ text: 'Stepper', link: '/en/components/form/stepper' },
						{ text: 'Switch', link: '/en/components/form/switch' },
						{ text: 'Uploader', link: '/en/components/form/uploader' }
					]
				},
				{
					text: 'Feedback Components',
					items: [
						{ text: 'ActionSheet', link: '/en/components/feedback/action-sheet' },
						{ text: 'Dialog', link: '/en/components/feedback/dialog' },
						{ text: 'DropdownMenu', link: '/en/components/feedback/dropdown-menu' },
						{ text: 'Loading', link: '/en/components/feedback/loading' },
						{ text: 'Notify', link: '/en/components/feedback/notify' },
						{ text: 'Overlay', link: '/en/components/feedback/overlay' },
						{ text: 'PullRefresh', link: '/en/components/feedback/pull-refresh' },
						{ text: 'ShareSheet', link: '/en/components/feedback/share-sheet' },
						{ text: 'SwipeCell', link: '/en/components/feedback/swipe-cell' },
						{ text: 'Toast', link: '/en/components/feedback/toast' },
						{ text: 'ImagePreview', link: '/en/components/feedback/image-preview' }
					]
				},
				{
					text: 'Display Components',
					items: [
						{ text: 'Badge', link: '/en/components/display/badge' },
						{ text: 'Card', link: '/en/components/display/card' },
						{ text: 'Circle', link: '/en/components/display/circle' },
						{ text: 'Collapse', link: '/en/components/display/collapse' },
						{ text: 'CountDown', link: '/en/components/display/count-down' },
						{ text: 'Divider', link: '/en/components/display/divider' },
						{ text: 'Empty', link: '/en/components/display/empty' },
						{ text: 'Lazyload', link: '/en/components/display/lazyload' },
						{ text: 'Progress', link: '/en/components/display/progress' },
						{ text: 'Skeleton', link: '/en/components/display/skeleton' },
						{ text: 'Space', link: '/en/components/display/space' },
						{ text: 'Tag', link: '/en/components/display/tag' },
						{ text: 'TextEllipsis', link: '/en/components/display/text-ellipsis' },
						{ text: 'Watermark', link: '/en/components/display/watermark' }
					]
				},
				{
					text: 'Navigation Components',
					items: [
						{ text: 'BackTop', link: '/en/components/nav/back-top' },
						{ text: 'Grid', link: '/en/components/nav/grid' },
						{ text: 'IndexBar', link: '/en/components/nav/index-bar' },
						{ text: 'NavBar', link: '/en/components/nav/nav-bar' },
						{ text: 'Pagination', link: '/en/components/nav/pagination' },
						{ text: 'Sidebar', link: '/en/components/nav/sidebar' },
						{ text: 'Sticky', link: '/en/components/nav/sticky' },
						{ text: 'Tabbar', link: '/en/components/nav/tabbar' },
						{ text: 'Tabs', link: '/en/components/nav/tabs' },
						{ text: 'TreeSelect', link: '/en/components/nav/tree-select' }
					]
				},
				{
					text: 'Business Components',
					items: [
						{ text: 'AddressEdit', link: '/en/components/business/address-edit' },
						{ text: 'AddressList', link: '/en/components/business/address-list' },
						{ text: 'ConfigProvider', link: '/en/components/business/config-provider' },
						{ text: 'ContactCard', link: '/en/components/business/contact-card' },
						{ text: 'ContactEdit', link: '/en/components/business/contact-edit' },
						{ text: 'ContactList', link: '/en/components/business/contact-list' },
						{ text: 'Coupon', link: '/en/components/business/coupon' },
						{ text: 'FloatingBubble', link: '/en/components/business/floating-bubble' },
						{ text: 'FloatingPanel', link: '/en/components/business/floating-panel' },
						{ text: 'GoodsAction', link: '/en/components/business/goods-action' },
						{ text: 'Signature', link: '/en/components/business/signature' },
						{ text: 'SubmitBar', link: '/en/components/business/submit-bar' }
					]
				}
			]
		}
	}
}
