<template>
	<view class="mx-rate" :class="[{ 'mx-rate--disabled': disabled, 'mx-rate--readonly': readonly }, customClass]" :style="customStyle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<view v-for="k in count" :key="k" class="mx-rate__item" :class="`mx-rate__item--${k}`" :style="itemStyle">
			<text class="mx-rate__star mx-rate__star--void" :style="starStyle">{{ voidGlyph }}</text>
			<view v-if="fillLevel(k) > 0" class="mx-rate__mask" :style="maskStyle(k)">
				<text class="mx-rate__star mx-rate__star--fill" :style="starStyle">{{ iconGlyph }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { addUnit, toNumber } from '../../utils/unit'

const props = defineProps({
	/** 当前分值 */
	modelValue: { type: Number, default: 0 },
	/** 图标总数 (星级总数) */
	count: { type: Number, default: 5 },
	/** 是否允许半选 */
	allowHalf: makeBooleanProp(false),
	/** 是否禁用 */
	disabled: makeBooleanProp(false),
	/** 是否为只读 */
	readonly: makeBooleanProp(false),
	/** 图标大小 */
	size: makeNumericProp<number | string>('20px'),
	/** 选中时的颜色 */
	color: makeStringProp(''),
	/** 未选中时的颜色 */
	voidColor: makeStringProp(''),
	/** 图标之间的间距 */
	gutter: makeNumericProp<number | string>(''),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 分值变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: number): void
	/** 分值变化时触发 */
	(e: 'change', value: number): void
}>()

const instance = getCurrentInstance()

/** 未选中星形 (☆ / ☆) */
const voidGlyph = '\u2606'
/** 选中星形 (★) */
const iconGlyph = '\u2605'

const starStyle = computed(() => ({
	fontSize: addUnit(props.size) as string,
	lineHeight: '1'
}))

const itemStyle = computed(() => (props.gutter ? ({ marginRight: props.gutter } as Record<string, string>) : {}))

/** 每个星标的填充程度, 返回 0 / 0.5 / 1 */
function fillLevel(starIndex: number): number {
	const value = toNumber(props.modelValue)
	const filled = Math.max(0, Math.min(1, value - (starIndex - 1)))
	if (props.allowHalf) {
		return filled >= 1 ? 1 : filled <= 0 ? 0 : 0.5
	}
	return filled >= 1 ? 1 : 0
}

function maskStyle(starIndex: number): Record<string, string> {
	return {
		width: `${fillLevel(starIndex) * 100}%`
	}
}

/** 触摸选择 */
let trackRect: { left: number; width: number } | null = null
let dragging = false

function onTouchStart(event: any) {
	if (props.disabled || props.readonly) return
	dragging = true
	queryRect().then(() => updateRating(event))
}

function onTouchMove(event: any) {
	if (props.disabled || props.readonly || !dragging) return
	updateRating(event)
}

function onTouchEnd() {
	dragging = false
}

function queryRect(): Promise<void> {
	return new Promise(resolve => {
		if (!instance) {
			resolve()
			return
		}
		const query = (uni as any).createSelectorQuery()
		if (instance.proxy) query.in(instance.proxy)
		query
			.select('.mx-rate')
			.boundingClientRect((rect: any) => {
				trackRect = rect ? { left: rect.left, width: rect.width || 0 } : null
				resolve()
			})
			.exec()
	})
}

function updateRating(event: any) {
	if (!trackRect || !trackRect.width) return
	const touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0])
	if (!touch) return
	const offsetX = touch.clientX - trackRect.left
	const step = trackRect.width / props.count
	const index = offsetX / step
	let value: number
	if (props.allowHalf) {
		value = Math.max(0, Math.min(props.count, Math.round(index * 2) / 2))
	} else {
		value = Math.max(0, Math.min(props.count, Math.round(index)))
	}
	if (value !== toNumber(props.modelValue)) {
		emit('update:modelValue', value)
		emit('change', value)
	}
}
</script>

<style lang="scss">
.mx-rate {
	position: relative;
	display: inline-flex;
	align-items: center;
	user-select: none;

	&--disabled {
		cursor: not-allowed;
		opacity: var(--mx-disabled-opacity);
	}

	&__item {
		position: relative;
		line-height: 1;
	}

	&__star {
		display: inline-block;
		font-family: initial;

		&--void {
			color: var(--mx-text-color-3);
		}

		&--fill {
			color: var(--mx-primary-color);
		}
	}

	&__mask {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		overflow: hidden;
	}
}
</style>
