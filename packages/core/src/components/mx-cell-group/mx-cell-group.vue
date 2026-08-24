<template>
	<view class="mx-cell-group" :class="[`mx-cell-group--${direction}`, { 'mx-cell-group--inset': inset, 'mx-cell-group--borderless': !border }, customClass]" :style="customStyle">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { makeStringProp, makeBooleanProp } from '../shared/props'

defineProps({
	/** 分组标题 */
	title: makeStringProp(''),
	/** 分组标题栏样式 */
	titleClass: { type: String, default: '' },
	/** 排列方向 */
	direction: makeStringProp<'vertical' | 'horizontal'>('vertical'),
	/** 是否为卡片风格 */
	inset: makeBooleanProp(false),
	/** 是否显示单元格边框 */
	border: makeBooleanProp(true),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

defineSlots<{ default?: () => unknown }>()
</script>

<style lang="scss">
.mx-cell-group {
	background: var(--mx-background-2);

	&--vertical {
		.mx-cell:last-child::after,
		.mx-cell:last-child > .mx-cell__title-wrapper::after {
			display: none;
		}
	}

	&--inset {
		margin: 0 16px;
		border-radius: var(--mx-radius-lg);
		overflow: hidden;
	}

	&--borderless {
		.mx-cell::after {
			display: none;
		}
	}
}
</style>
