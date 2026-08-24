<template>
	<view class="mx-search" :class="[`mx-search--${shape}`, { 'mx-search--disabled': disabled }, customClass]" :style="searchStyle">
		<view class="mx-search__content">
			<view class="mx-search__icon" :class="{ 'mx-search__icon--left': leftGlyph }">
				<slot name="left-icon">
					<text v-if="leftGlyph" class="mx-search__glyph mx-search__search-glyph">
						{{ leftGlyph }}
					</text>
				</slot>
			</view>

			<input
				class="mx-search__field"
				:value="modelValue"
				:placeholder="placeholder"
				:placeholder-class="'mx-search__placeholder'"
				:maxlength="maxlength"
				:disabled="disabled"
				confirm-type="search"
				@input="onInput"
				@confirm="onSearch"
				@focus="onFocus"
				@blur="onBlur" />

			<view v-if="clearable && modelValue" class="mx-search__clear" @click.stop="onClear">
				<text class="mx-search__glyph mx-search__clear-glyph">×</text>
			</view>

			<slot name="right-icon" />
		</view>

		<view v-if="showAction" class="mx-search__action" @click="onCancel">
			<slot name="action">{{ actionText }}</slot>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'

type SearchShape = 'round' | 'square'

const props = defineProps({
	/** 输入框的值 */
	modelValue: makeStringProp(''),
	/** 占位符 */
	placeholder: makeStringProp(''),
	/** 是否禁用 */
	disabled: makeBooleanProp(false),
	/** 是否显示清除按钮 */
	clearable: makeBooleanProp(true),
	/** 形状 */
	shape: makeStringProp<SearchShape>('square'),
	/** 背景色 */
	background: makeStringProp(''),
	/** 最大输入长度 */
	maxlength: makeNumericProp<number | string>(''),
	/** 左侧搜索图标 */
	showSearchIcon: makeBooleanProp(true),
	/** 是否显示右侧取消按钮 */
	showAction: makeBooleanProp(false),
	/** 取消按钮文字 */
	actionText: makeStringProp('取消'),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 输入值变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: string): void
	/** 输入框内容变化时触发 */
	(e: 'input', value: string): void
	/** 输入内容变化时触发 (与 input 同步) */
	(e: 'change', value: string): void
	/** 点击搜索/键盘确认时触发 */
	(e: 'search', value: string): void
	/** 点击清除按钮时触发 */
	(e: 'clear'): void
	/** 点击取消按钮时触发 */
	(e: 'cancel'): void
	/** 输入框聚焦时触发 */
	(e: 'focus'): void
	/** 输入框失焦时触发 */
	(e: 'blur'): void
}>()

/** 左侧搜索字符 */
const leftGlyph = computed(() => (props.showSearchIcon ? '\u2315' : ''))

const searchStyle = computed(() => {
	const style: Record<string, string> = {
		background: props.background || 'var(--mx-background)'
	}
	return style
})

const onInput = (event: any) => {
	const value = event.detail.value
	emit('update:modelValue', value)
	emit('input', value)
	emit('change', value)
}

const onSearch = (event: any) => {
	emit('search', event.detail.value)
}

const onClear = () => {
	emit('update:modelValue', '')
	emit('change', '')
	emit('clear')
}

const onCancel = () => {
	if (props.disabled) return
	emit('update:modelValue', '')
	emit('change', '')
	emit('cancel')
}

const onFocus = () => emit('focus')
const onBlur = () => emit('blur')
</script>

<style lang="scss">
.mx-search {
	display: flex;
	align-items: center;
	padding: 8px 12px;
	box-sizing: border-box;

	&__content {
		display: flex;
		align-items: center;
		flex: 1;
		box-sizing: border-box;
		height: 34px;
		padding: 0 8px;
		background: var(--mx-background-2);
		border: 1px solid var(--mx-border-color);

		.mx-search--round & {
			border-radius: 999px;
		}
	}

	&__icon {
		display: flex;
		align-items: center;
		margin-right: 6px;
		color: var(--mx-text-color-3);
		font-size: 16px;
	}

	&__placeholder {
		color: var(--mx-text-color-3);
	}

	&__field {
		flex: 1;
		min-width: 0;
		color: var(--mx-text-color);
		font-size: 14px;
		line-height: 20px;
		background: transparent;
		border: none;
		outline: none;
	}

	&__glyph {
		display: inline-block;
		line-height: 1;
	}

	&__search-glyph {
		font-weight: 400;
	}

	&__clear {
		display: flex;
		align-items: center;
		margin-left: 6px;
		color: var(--mx-text-color-3);
		padding: 4px;
	}

	&__clear-glyph {
		font-size: 18px;
		font-weight: 300;
	}

	&__action {
		margin-left: 12px;
		flex-shrink: 0;
		color: var(--mx-text-color);
		font-size: 14px;
		cursor: pointer;
	}

	&--disabled {
		opacity: var(--mx-disabled-opacity);

		.mx-search__field {
			cursor: not-allowed;
		}
	}
}
</style>
