<template>
	<view>
		<view class="mx-nav-bar" :class="[{ 'mx-nav-bar--fixed': fixed, 'mx-nav-bar--borderless': !border }, customClass]" :style="navbarStyle">
			<view class="mx-nav-bar__content">
				<view class="mx-nav-bar__left" @click="clickLeft">
					<view v-if="leftArrow || leftText" class="mx-nav-bar__left-inner">
						<view v-if="leftArrow" class="mx-nav-bar__arrow" @click="clickArrow">
							<mx-icon name="‹" :size="20" />
						</view>
						<text v-if="leftText" class="mx-nav-bar__text">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>

				<view class="mx-nav-bar__title">
					<slot name="title">
						<text class="mx-nav-bar__title-text">{{ title }}</text>
					</slot>
				</view>

				<view class="mx-nav-bar__right" @click="clickRight">
					<text v-if="rightText" class="mx-nav-bar__text">{{ rightText }}</text>
					<slot name="right" />
				</view>
			</view>
		</view>

		<view v-if="placeholder && fixed" class="mx-nav-bar__placeholder" :style="placeholderStyle" />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import MxIcon from '../mx-icon/mx-icon.vue'

const props = defineProps({
	/** 标题 */
	title: makeStringProp(''),
	/** 左侧文案 */
	leftText: makeStringProp(''),
	/** 右侧文案 */
	rightText: makeStringProp(''),
	/** 是否显示左侧箭头 */
	leftArrow: makeBooleanProp(true),
	/** 是否固定在顶部 */
	fixed: makeBooleanProp(false),
	/** 是否显示底部边框 */
	border: makeBooleanProp(true),
	/** 是否显示占位元素 */
	placeholder: makeBooleanProp(true),
	/** 层级 */
	zIndex: makeNumericProp<number | string>(500),
	/** 是否启用顶部安全区适配 */
	safeAreaInsetTop: makeBooleanProp(true),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 点击左侧区域时触发 */
	(e: 'click-left'): void
	/** 点击右侧区域时触发 */
	(e: 'click-right'): void
	/** 点击左侧箭头时触发 */
	(e: 'click-arrow'): void
}>()

/** 顶部安全区高度 */
const safeTop = computed(() => {
	if (!props.safeAreaInsetTop) return 0
	// #ifdef H5
	// #endif
	try {
		const info = uni.getSystemInfoSync()
		return info.statusBarHeight || 0
	} catch {
		return 0
	}
})

const navbarStyle = computed(() => {
	const style: Record<string, string> = {}
	style.zIndex = String(props.zIndex)
	if (props.fixed) {
		style.position = 'fixed'
		style.top = '0'
		style.left = '0'
		style.right = '0'
	}
	if (safeTop.value) style.paddingTop = `${safeTop.value}px`
	if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
	else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
	return style
})

const placeholderStyle = computed(() => {
	const style: Record<string, string> = {}
	if (safeTop.value) style.paddingTop = `${safeTop.value}px`
	return style
})

const clickLeft = () => emit('click-left')
const clickRight = () => emit('click-right')
const clickArrow = () => emit('click-arrow')

function parseStyle(str: string): Record<string, string> {
	const obj: Record<string, string> = {}
	str.split(';').forEach(part => {
		const idx = part.indexOf(':')
		if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
	})
	return obj
}
</script>

<style lang="scss">
.mx-nav-bar {
	position: relative;
	background: var(--mx-background-2);

	&__content {
		position: relative;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 44px;
	}

	&__title {
		position: absolute;
		left: 100px;
		right: 100px;
		top: 50%;
		text-align: center;
		transform: translateY(-50%);

		&-text {
			color: var(--mx-text-color);
			font-size: 16px;
			font-weight: 600;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			display: block;
		}
	}

	&__left,
	&__right {
		display: flex;
		align-items: center;
		z-index: 3;
		min-width: 60px;
		height: 100%;
		padding: 0 12px;
	}

	&__left {
		justify-content: flex-start;
		gap: 4px;
	}

	&__right {
		justify-content: flex-end;
	}

	&__left-inner {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	&__arrow {
		display: flex;
		align-items: center;
	}

	&__text {
		color: var(--mx-text-color);
		font-size: 14px;
	}

	&--borderless::after {
		display: none;
	}

	&::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		background: var(--mx-border-color);
		transform: scaleY(0.5);
		transform-origin: center;
	}

	&__placeholder {
		width: 100%;
		height: 44px;
		background: transparent;
	}
}
</style>
