<template>
	<view class="mx-tabbar-item" :class="customClass" :style="customStyle" @click="onClick">
		<view class="mx-tabbar-item__icon">
			<slot name="icon" :active="active">
				<image v-if="imageIcon" class="mx-tabbar-item__icon-image" :src="icon" mode="aspectFit" :style="iconImageStyle" />
				<text v-else class="mx-tabbar-item__icon-char" :style="iconColorStyle">{{ icon }}</text>
			</slot>
			<view v-if="dot || (badge !== undefined && badge !== '')" class="mx-tabbar-item__badge" :class="{ 'mx-tabbar-item__badge--dot': dot }">
				<text v-if="!dot" class="mx-tabbar-item__badge-text">{{ badge }}</text>
			</view>
		</view>
		<view class="mx-tabbar-item__text">
			<slot name="text" :active="active">
				<text :style="iconColorStyle">{{ text }}</text>
			</slot>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'

type TabbarContext = {
	active: { value: string | number }
	activeColor: { value: string }
	inactiveColor: { value: string }
	setActive: (name: string | number) => void
}

const props = defineProps({
	/** 标签名称 */
	name: makeNumericProp<string | number>(''),
	/** 图标 (图片地址或字符) */
	icon: makeStringProp(''),
	/** 文字 */
	text: makeStringProp(''),
	/** 徽标内容 */
	badge: makeNumericProp<string | number>(''),
	/** 是否显示圆点 */
	dot: makeBooleanProp(false),
	/** 图标大小 */
	iconSize: makeStringProp(''),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const tabbar = inject<TabbarContext>('mxTabbar', null)

const itemName = computed(() => props.name || props.text || props.icon)

const active = computed(() => (tabbar ? tabbar.active.value === itemName.value : false))

const itemColor = computed(() => {
	if (!tabbar) return ''
	return active.value ? tabbar.activeColor.value : tabbar.inactiveColor.value
})

const iconColorStyle = computed<Record<string, string>>(() => {
	const style: Record<string, string> = {}
	if (itemColor.value) style.color = itemColor.value
	return style
})

const iconImageStyle = computed<Record<string, string>>(() => {
	const style: Record<string, string> = {}
	const size = props.iconSize ? props.iconSize : '22px'
	style.width = size
	style.height = size
	return style
})

const imageIcon = computed(() => /^(https?:)?\/\//.test(props.icon) || /^\.{1,2}\//.test(props.icon) || /^data:image/.test(props.icon))

const onClick = () => {
	if (props.dot) void 0
	tabbar?.setActive(itemName.value)
}

/** 暴露当前是否激活状态 */
defineExpose({ active: computed(() => active.value) })
</script>

<style lang="scss">
.mx-tabbar-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	cursor: pointer;

	&__icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 22px;

		.mx-tabbar-item__icon-char {
			font-size: 22px;
			line-height: 1;
		}

		.mx-tabbar-item__icon-image {
			display: block;
		}
	}

	&__text {
		margin-top: 2px;

		text {
			color: var(--mx-text-color-2);
			font-size: 12px;
			line-height: 16px;
		}
	}

	&__badge {
		position: absolute;
		top: -4px;
		right: -8px;
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: var(--mx-danger-color);
		color: #fff;

		&--dot {
			width: 8px;
			height: 8px;
			min-width: 8px;
			min-height: 8px;
			padding: 0;
			top: -2px;
			right: -4px;
			border-radius: 50%;
		}

		&-text {
			color: #fff;
			font-size: 10px;
			line-height: 1;
		}
	}
}
</style>
