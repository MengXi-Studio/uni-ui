<template>
	<view class="mx-row" :class="[`mx-row--justify-${justify}`]" :style="rowStyle" custom-class="customClass">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed, provide, type Ref } from 'vue'
import { makeStringProp, makeNumericProp } from '../shared/props'

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'

const props = defineProps({
	/** 列元素之间的间距 (px) */
	gutter: makeNumericProp<number | string>(0),
	/** 主轴对齐方式 */
	justify: makeStringProp<Justify>('start'),
	/** 自定义类名 */
	customClass: { type: String, default: '' },
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const justifyMap: Record<string, string> = {
	start: 'flex-start',
	end: 'flex-end',
	center: 'center',
	'space-around': 'space-around',
	'space-between': 'space-between',
	'space-evenly': 'space-evenly'
}

// 向 Col 提供 gutter
provide<Ref<number>>('mxRowGutter', computed(() => Number(props.gutter) || 0) as any)

const rowStyle = computed(() => {
	const gutter = Number(props.gutter) || 0
	const style: Record<string, string> = {
		justifyContent: justifyMap[props.justify] || 'flex-start'
	}
	if (gutter > 0) {
		style.marginLeft = `${-gutter / 2}px`
		style.marginRight = `${-gutter / 2}px`
	}
	if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
	else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
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
</script>

<style lang="scss">
.mx-row {
	display: flex;
	flex-wrap: wrap;
}
</style>
