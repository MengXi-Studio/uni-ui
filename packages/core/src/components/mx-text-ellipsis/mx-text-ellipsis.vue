<template>
	<view class="mx-text-ellipsis" :class="customClass" :style="ellipsisStyle">
		<!-- 内容区: 支持 default slot 自定义, 缺省渲染 text -->
		<view
			class="mx-text-ellipsis__content"
			:class="{ 'mx-text-ellipsis__content--collapsed': !expanded }"
			:style="expanded ? '' : { WebkitLineClamp: String(rows), '-webkit-line-clamp': String(rows) }"
			@click="expandTrigger === 'click' ? toggle() : null">
			<text v-if="!slotted" class="mx-text-ellipsis__text">{{ text }}</text>
			<slot v-else />
		</view>

		<!-- 展开/收起提示 -->
		<text v-if="(showExpand || showCollapse) && expandTrigger === 'click'" class="mx-text-ellipsis__action" @click.stop="toggle">
			{{ !expanded ? expandText : collapseText }}
		</text>
	</view>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

type ExpandTrigger = 'click' | 'none'

const props = defineProps({
	/** 需要省略的文本 */
	text: makeStringProp(''),
	/** 容器宽度 (unset 或具体值) */
	width: makeStringProp(''),
	/** 省略行数 */
	rows: makeNumericProp<number>(2),
	/** 展开文案 */
	expandText: makeStringProp('展开'),
	/** 收起文案 */
	collapseText: makeStringProp('收起'),
	/** 展开触发方式: click / none */
	expandTrigger: makeStringProp<ExpandTrigger>('click'),
	/** 初始是否展开 */
	defaultExpanded: makeBooleanProp(false),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 展开/收起状态变化 */
	(e: 'change', value: boolean): void
	/** 展开状态变化 (v-model) */
	(e: 'update:expanded', value: boolean): void
}>()

const slots = useSlots()
const slotted = computed(() => !!slots.default)

const expanded = ref(props.defaultExpanded)

watch(
	() => props.defaultExpanded,
	val => {
		expanded.value = val
	}
)

const toggle = () => {
	expanded.value = !expanded.value
	emit('update:expanded', expanded.value)
	emit('change', expanded.value)
}

/** 展开时显示收起文案, 点击的触发条件 */
const showExpand = computed(() => !expanded.value)
const showCollapse = computed(() => expanded.value)

const ellipsisStyle = computed(() => {
	const style: Record<string, string> = {}
	if (props.width) style.width = addUnit(props.width as any) as string
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
</script>

<style lang="scss">
.mx-text-ellipsis {
	display: block;
	font-size: var(--mx-font-size-md);
	color: var(--mx-text-color);
	line-height: 1.5;

	&__content {
		&--collapsed {
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
		}
	}

	&__action {
		display: inline-flex;
		color: var(--mx-primary-color);
		font-size: var(--mx-font-size-sm);
	}
}
</style>
