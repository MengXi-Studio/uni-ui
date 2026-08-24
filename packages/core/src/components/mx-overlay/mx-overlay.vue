<template>
	<view
		v-if="transition.render"
		class="mx-overlay"
		:class="[`mx-overlay__transition${transition.transitionClass ? ' ' + transition.transitionClass : ''}`, customClass]"
		:style="overlayStyle"
		@click="onClick"
		@touchmove.stop.prevent>
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'
import { useTransition } from '../../composables/use-transition'

const props = defineProps({
	/** 是否显示 */
	show: makeBooleanProp(false),
	/** z-index */
	zIndex: makeNumericProp<number | string>(1),
	/** 过渡时长 (ms) */
	duration: makeNumericProp<number | string>(300),
	/** 是否可点击 (主动态) */
	clickable: makeBooleanProp(true),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 点击遮罩时触发 */
	(e: 'click'): void
	/** 显隐状态变化时触发 (用于 v-model) */
	(e: 'update:show', value: boolean): void
}>()

const transition = useTransition(
	computed(() => props.show),
	Number(props.duration) || 300
)

const overlayStyle = computed(() => {
	const style: Record<string, string> = { zIndex: String(props.zIndex) }
	if (typeof props.customStyle === 'string' && props.customStyle) {
		Object.assign(style, parseStyle(props.customStyle))
	} else if (props.customStyle) {
		Object.assign(style, props.customStyle as Record<string, string>)
	}
	return style
})

function parseStyle(str: string): Record<string, string> {
	const obj: Record<string, string> = {}
	str.split(';').forEach(part => {
		const idx = part.indexOf(':')
		if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
	})
	return obj
}

const onClick = () => {
	if (props.clickable) emit('click')
}
</script>

<style lang="scss">
.mx-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);

	&__transition {
		transition: opacity var(--mx-duration-base);
	}
}
</style>
