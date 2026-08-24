<template>
	<view class="mx-config-provider" :class="customClass" :style="mergedStyle">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp } from '../shared/props'

type Theme = 'light' | 'dark'

const props = defineProps({
	/** 主题: light / dark */
	theme: makeStringProp<Theme>('light'),
	/** 主题变量 (参考 CSS 变量 --mx-xxx, 传入 key 为 CSS 变量名) */
	themeVars: { type: Object as any, default: () => ({}) },
	/** 深色主题变量 */
	themeVarsDark: { type: Object as any, default: () => ({}) },
	/** 浅色主题变量 */
	themeVarsLight: { type: Object as any, default: () => ({}) },
	/** 自定义类名 */
	customClass: { type: String, default: '' },
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

/** 深色主题的默认变量 (覆盖浅色默认) */
const darkVars: Record<string, string> = {
	'--mx-text-color': '#f5f5f5',
	'--mx-text-color-2': '#a8abb2',
	'--mx-text-color-3': '#8a8c94',
	'--mx-active-color': '#303030',
	'--mx-background': '#191919',
	'--mx-background-2': '#1c1c1e',
	'--mx-border-color': '#3a3a3c'
}

const mergedStyle = computed(() => {
	const vars: Record<string, string> = Object.assign({}, props.theme === 'dark' ? darkVars : {}, props.theme === 'light' ? props.themeVarsLight : props.themeVarsDark, props.themeVars)
	const style: Record<string, string> = { display: 'contents' }
	Object.keys(vars).forEach(key => {
		style[key] = vars[key]
	})
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
.mx-config-provider {
	display: contents;
}
</style>
