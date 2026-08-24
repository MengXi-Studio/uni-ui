<template>
	<view class="mx-swipe-cell" :class="customClass" :style="rootStyle">
		<!-- 轨道容器 (整体随滑动移动) -->
		<view class="mx-swipe-cell__track" :style="trackStyle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
			<!-- 左侧扩展区 -->
			<view v-if="hasLeft" class="mx-swipe-cell__left" :style="leftStyle">
				<slot name="left" />
			</view>
			<!-- 主题内容 -->
			<view class="mx-swipe-cell__wrapper" @click="onClick">
				<slot />
			</view>
			<!-- 右侧扩展区 -->
			<view v-if="hasRight" class="mx-swipe-cell__right" :style="rightStyle">
				<slot name="right" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSlots } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../shared/props'

const props = defineProps({
	/** 左侧扩展区宽度 */
	leftWidth: makeNumericProp<number>(0),
	/** 右侧扩展区宽度 */
	rightWidth: makeNumericProp<number>(0),
	/** 是否禁用滑动 */
	disabled: makeBooleanProp(false),
	/** 展开状态控制 (受控: 'left' / 'right' / 'close') */
	modelValue: makeStringProp(''),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 展开 */
	(e: 'open', direction: 'left' | 'right'): void
	/** 关闭 */
	(e: 'close'): void
	/** 点击内容 */
	(e: 'click'): void
	/** 滑动偏移变化 */
	(e: 'change', offsetX: number): void
	/** 展开状态变化 (v-model) */
	(e: 'update:modelValue', value: string): void
}>()

const slots = useSlots()
const hasLeft = computed(() => !!slots.left)
const hasRight = computed(() => !!slots.right)

const leftNum = computed(() => Number(props.leftWidth) || 0)
const rightNum = computed(() => Number(props.rightWidth) || 0)

/** 轨道偏移: 负值=露出右侧, 正值=露出左侧 */
const offsetX = ref(0)
let dragging = false
let startX = 0
let startOffset = 0
let moved = false

const rootStyle = computed(() => {
	const style: Record<string, string> = { position: 'relative', overflow: 'hidden' }
	if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
	else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
	return style
})

/** 轨道宽度 = 左扩展 + 内容 + 右扩展; 内容占满剩余 */
const trackStyle = computed(() => {
	return {
		transform: `translateX(${offsetX.value}px)`,
		transition: dragging ? 'none' : 'transform .2s ease',
		display: 'flex',
		alignItems: 'stretch',
		width: '100%'
	}
})

const leftStyle = computed(() => ({
	order: 0,
	width: leftNum.value + 'px',
	minWidth: leftNum.value + 'px',
	display: 'flex',
	alignItems: 'stretch'
}))

const rightStyle = computed(() => ({
	order: 2,
	width: rightNum.value + 'px',
	minWidth: rightNum.value + 'px',
	display: 'flex',
	alignItems: 'stretch'
}))

function parseStyle(str: string): Record<string, string> {
	const obj: Record<string, string> = {}
	str.split(';').forEach(part => {
		const idx = part.indexOf(':')
		if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
	})
	return obj
}

const clamp = (x: number) => Math.max(-rightNum.value, Math.min(leftNum.value, x))

const onTouchStart = (event: TouchEvent) => {
	if (props.disabled) return
	dragging = true
	moved = false
	startX = event.touches[0].clientX
	startOffset = offsetX.value
}

const onTouchMove = (event: TouchEvent) => {
	if (!dragging || props.disabled) return
	const dx = event.touches[0].clientX - startX
	if (Math.abs(dx) > 4) moved = true
	offsetX.value = clamp(startOffset + dx)
	emit('change', offsetX.value)
}

const onTouchEnd = () => {
	if (!dragging) return
	dragging = false
	if (!moved) return

	const threshold = Math.max(leftNum.value, rightNum.value) / 2
	let target = 0
	let dir: 'left' | 'right' | 'close' = 'close'

	if (offsetX.value < -threshold && rightNum.value > 0 && !props.modelValue) {
		target = -rightNum.value
		dir = 'right'
	} else if (offsetX.value < 0 && rightNum.value > 0) {
		target = -rightNum.value
		dir = 'right'
	} else if (offsetX.value > threshold && leftNum.value > 0) {
		target = leftNum.value
		dir = 'left'
	}
	offsetX.value = target

	if (dir === 'close') {
		emit('close')
		emit('update:modelValue', 'close')
	} else {
		emit('open', dir)
		emit('update:modelValue', dir)
	}
}

/** 关闭方法 (供父组件调用) */
const close = () => {
	offsetX.value = 0
	emit('close')
	emit('update:modelValue', 'close')
}

const open = (dir: 'left' | 'right') => {
	if (dir === 'left') offsetX.value = leftNum.value
	else offsetX.value = -rightNum.value
	emit('open', dir)
	emit('update:modelValue', dir)
}

const onClick = () => {
	if (moved) {
		moved = false
		return
	}
	emit('click')
}

defineExpose({
	/** 关闭 */
	close,
	/** 展开指定方向 */
	open,
	/** 展开左侧 */
	openLeft: () => open('left'),
	/** 展开右侧 */
	openRight: () => open('right')
})
</script>

<style lang="scss">
.mx-swipe-cell {
	position: relative;
	overflow: hidden;

	&__track {
		flex: 1;
		height: 100%;
	}

	&__wrapper {
		flex: 1;
		background: var(--mx-background-2);
		order: 1;
	}

	&__left,
	&__right {
		align-items: stretch;
		color: #fff;
	}

	&__left {
		background: var(--mx-primary-color);
	}

	&__right {
		background: var(--mx-danger-color);
	}
}
</style>
