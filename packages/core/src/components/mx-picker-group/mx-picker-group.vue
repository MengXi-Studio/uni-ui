<template>
	<view class="mx-picker-group" :class="customClass" :style="customStyle">
		<!-- 标题栏 + Tab 切换 -->
		<view class="mx-picker-group__navbar">
			<text class="mx-picker-group__cancel" @click="onCancel">{{ cancelButtonText }}</text>

			<view class="mx-picker-group__tabs">
				<view v-for="(tab, i) in tabs" :key="i" class="mx-picker-group__tab" :class="{ 'mx-picker-group__tab--active': i === activeTab }" @click="setActiveTab(i)">
					<text class="mx-picker-group__tab-text">{{ tab }}</text>
				</view>
			</view>

			<view class="mx-picker-group__next">
				<text class="mx-picker-group__next-text" @click="onNext">
					{{ isLast ? confirmButtonText : nextStepText }}
				</text>
			</view>
		</view>

		<!-- 内容区: 由父级通过默认插槽渲染各 Tab 的选择器 -->
		<view class="mx-picker-group__content">
			<slot :active-tab="activeTab" :set-active-tab="setActiveTab" :value="currentValue" :on-change="onValueChange" />
		</view>

		<!-- 底部操作栏 -->
		<view class="mx-picker-group__footer">
			<view class="mx-picker-group__footer-btn" @click="onCancel">
				<text class="mx-picker-group__footer-text">{{ cancelButtonText }}</text>
			</view>
			<view class="mx-picker-group__footer-btn mx-picker-group__footer-btn--primary" @click="onFooterConfirm">
				<text class="mx-picker-group__footer-primary">
					{{ isLast ? confirmButtonText : nextStepText }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeArrayProp, makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'

const props = defineProps({
	/** 当前激活的 Tab 索引 (v-model) */
	modelValue: makeNumericProp<number>(0),
	/** Tab 标题数组 */
	tabs: makeArrayProp<string>([]),
	/** "下一步"按钮文字 */
	nextStepText: makeStringProp('下一步'),
	/** 确认按钮文字 */
	confirmButtonText: makeStringProp('确认'),
	/** 取消按钮文字 */
	cancelButtonText: makeStringProp('取消'),
	/** 是否显示底部操作栏 */
	showFooter: makeBooleanProp(true),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 激活 Tab 索引变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: number): void
	/** 点击确认时触发 */
	(e: 'confirm', detail: unknown[]): void
	/** 点击取消时触发 */
	(e: 'cancel'): void
	/** 某个 Tab 的值变化时触发 */
	(e: 'change', detail: { index: number; value: unknown }): void
}>()

/** 各 Tab 选中值 */
const tabValues = ref<unknown[]>([])

const activeTab = ref(Number(props.modelValue))

watch(
	() => props.modelValue,
	val => {
		activeTab.value = Number(val)
	}
)

const isLast = computed(() => activeTab.value >= props.tabs.length - 1)

const currentValue = computed(() => (activeTab.value >= 0 && activeTab.value < tabValues.value.length ? tabValues.value[activeTab.value] : undefined))

const setActiveTab = (index: number) => {
	if (index < 0 || index >= props.tabs.length) return
	activeTab.value = index
	emit('update:modelValue', index)
}

const onValueChange = (value: unknown) => {
	tabValues.value[activeTab.value] = value
	emit('change', { index: activeTab.value, value })
}

/** 下一步 / 最后一步确认 */
const onNext = () => {
	if (isLast.value) {
		onConfirm()
	} else {
		setActiveTab(activeTab.value + 1)
	}
}

const onFooterConfirm = () => {
	if (isLast.value) onConfirm()
	else setActiveTab(activeTab.value + 1)
}

const onConfirm = () => {
	emit('confirm', [...tabValues.value])
}

const onCancel = () => {
	emit('cancel')
}

/** 获取各 Tab 选中结果 */
const getResult = (): unknown[] => [...tabValues.value]

defineExpose({
	/** 切换到指定 Tab */
	setActiveTab,
	/** 获取各 Tab 的选中结果 */
	getResult,
	/** 进入下一步 (最后一步时确认) */
	next: () => onNext(),
	/** 重置所有 Tab */
	reset: () => {
		tabValues.value = []
		setActiveTab(0)
	}
})
</script>

<style lang="scss">
.mx-picker-group {
	font-size: var(--mx-font-size-md);
	background: var(--mx-background-2);

	&__navbar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 16px;
	}

	&__cancel,
	&__next {
		min-width: 48px;
	}

	&__cancel {
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-sm);
	}

	&__next-text {
		color: var(--mx-primary-color);
		font-weight: var(--mx-font-weight-bold);
		font-size: var(--mx-font-size-sm);
	}

	&__tabs {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		max-width: 60%;
	}

	&__tab {
		margin: 0 8px;
		padding: 6px 2px;
		font-size: var(--mx-font-size-sm);

		&--active {
			color: var(--mx-primary-color);
			font-weight: var(--mx-font-weight-bold);
			border-bottom: 2px solid var(--mx-primary-color);
		}
	}

	&__tab-text {
		display: block;
	}

	&__content {
		min-height: 200px;
	}

	&__footer {
		display: flex;
		padding: 8px 16px;
		padding-bottom: calc(8px + constant(safe-area-inset-bottom));
		padding-bottom: calc(8px + env(safe-area-inset-bottom));
	}

	&__footer-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 4px;
		height: 40px;
		border-radius: var(--mx-radius-md);
		background: var(--mx-background);
		overflow: hidden;

		&--primary {
			background: var(--mx-primary-color);
		}
	}

	&__footer-text {
		color: var(--mx-text-color);
		font-size: var(--mx-font-size-md);
	}

	&__footer-primary {
		color: #fff;
		font-size: var(--mx-font-size-md);
		font-weight: var(--mx-font-weight-bold);
	}
}
</style>
