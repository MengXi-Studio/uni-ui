<template>
	<view class="mx-col" :class="{ 'mx-col--hidden': span === 0, customClass }" :style="colStyle">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { makeNumericProp } from '../shared/props'

const props = defineProps({
	/** 列占位 (1~24) */
	span: makeNumericProp<number | string>(24),
	/** 左侧偏移 */
	offset: makeNumericProp<number | string>(0),
	/** 自定义类名 */
	customClass: { type: String, default: '' },
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const gutter = (inject<Ref<number>>('mxRowGutter', undefined) as Ref<number> | undefined)?.value || 0

const colStyle = computed(() => {
	const span = Number(props.span) || 24
	const offset = Number(props.offset) || 0
	const width = (span / 24) * 100
	const style: Record<string, string> = {
		boxSizing: 'border-box',
		flex: `0 0 ${width}%`,
		maxWidth: `${width}%`
	}
	if (offset > 0) {
		const offsetWidth = (offset / 24) * 100
		style.marginLeft = `${offsetWidth}%`
	}
	if (gutter > 0) {
		style.paddingLeft = `${gutter / 2}px`
		style.paddingRight = `${gutter / 2}px`
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
.mx-col {
	&--hidden {
		display: none;
	}
}
</style>
