<template>
	<view class="mx-sidebar" :class="customClass" :style="sidebarStyle">
		<view v-for="(child, index) in slotsChildren" :key="index" class="mx-sidebar__item" :class="{ 'mx-sidebar__item--active': index === activeIndex }" @click="onSelect(index, child)">
			<view class="mx-sidebar__bar" :class="{ 'mx-sidebar__bar--active': index === activeIndex }" />
			<view class="mx-sidebar__content">
				<component :is="child" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { makeNumericProp, makeStringProp } from '../shared/props'

const props = defineProps({
	/** 当前选中索引 (v-model) */
	modelValue: makeNumericProp<number | string>(0),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 双向绑定 (v-model) 同步选中索引 */
	(e: 'update:modelValue', index: number): void
	/** 选中项变化时触发 */
	(e: 'change', index: number): void
	/** 点击选项时触发 */
	(e: 'click', index: number): void
}>()

const slots = useSlots()

/** 默认插槽里的每个直接子节点即为一个选项 */
const slotsChildren = computed(() => (slots.default?.() as any[]) ?? [])

const activeIndex = computed(() => Number(props.modelValue))

const onSelect = (index: number, _child: unknown) => {
	emit('click', index)
	if (index === activeIndex.value) return
	emit('update:modelValue', index)
	emit('change', index)
}

provide('mxSidebar', { activeIndex, onSelect })

const sidebarStyle = props.customStyle
</script>

<style lang="scss">
.mx-sidebar {
	width: 80px;
	overflow: hidden;
	background: var(--mx-active-color);

	&__item {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 48px;
		padding-left: 20px;
		cursor: pointer;
		background: transparent;

		&--active {
			background: var(--mx-background-2);

			.mx-sidebar__content {
				color: var(--mx-text-color);
			}
		}
	}

	&__bar {
		position: absolute;
		left: 0;
		top: 50%;
		width: 4px;
		height: 16px;
		background: transparent;
		transform: translateY(-50%);
		border-radius: 2px;

		&--active {
			background: var(--mx-primary-color);
		}
	}

	&__content {
		display: flex;
		align-items: center;
		color: var(--mx-text-color-2);
		font-size: 14px;
		line-height: 1.5;
	}

	&__inner {
		overflow: hidden;
	}
}
</style>
