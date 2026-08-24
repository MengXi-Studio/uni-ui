<template>
	<mx-popup :show="showState" :position="'bottom'" :round="true" :safe-area-inset-bottom="true" :custom-class="customClass" :custom-style="customStyle" @update:show="onSyncShow">
		<view class="mx-share-sheet">
			<!-- 标题区 -->
			<view v-if="title || description" class="mx-share-sheet__header">
				<text v-if="title" class="mx-share-sheet__title">{{ title }}</text>
				<text v-if="description" class="mx-share-sheet__description">{{ description }}</text>
			</view>

			<!-- 分享选项栅格 -->
			<view class="mx-share-sheet__options">
				<view v-for="(option, index) in options" :key="index" class="mx-share-sheet__option" hover-class="mx-share-sheet__option--active" @click="onSelect(option)">
					<view class="mx-share-sheet__icon" :style="option.color ? { color: option.color } : {}">
						<image v-if="isImage(option.icon)" class="mx-share-sheet__icon-img" :src="option.icon" mode="aspectFit" />
						<text v-else class="mx-share-sheet__icon-char">{{ option.icon }}</text>
					</view>
					<text class="mx-share-sheet__name">{{ option.name }}</text>
				</view>
			</view>

			<!-- 取消按钮 -->
			<view v-if="cancelText" class="mx-share-sheet__cancel" hover-class="mx-share-sheet__cancel--active" @click="onCancel">
				<text class="mx-share-sheet__cancel-text">{{ cancelText }}</text>
			</view>
		</view>
	</mx-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeArrayProp } from '../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'

interface ShareOption {
	/** 分享名称 */
	name: string
	/** 图标: url 或字符/emoji */
	icon: string
	/** 描述 */
	description?: string
	/** 颜色 (字符图标用) */
	color?: string
}

const props = defineProps({
	/** 是否显示 */
	show: makeBooleanProp(false),
	/** 分享选项 */
	options: makeArrayProp<ShareOption>(),
	/** 标题 */
	title: makeStringProp(''),
	/** 取消按钮文案 */
	cancelText: makeStringProp('取消'),
	/** 描述文案 */
	description: makeStringProp(''),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 显示状态变化 (v-model) */
	(e: 'update:show', value: boolean): void
	/** 选中分享选项 */
	(e: 'select', option: ShareOption): void
	/** 点击取消 */
	(e: 'cancel'): void
}>()

const showState = ref(props.show)

const onSyncShow = (val: boolean) => {
	showState.value = val
	emit('update:show', val)
}

const isImage = (icon: string) => /^(https?:)?\/\//.test(icon) || /^data:image/.test(icon)

const close = () => {
	showState.value = false
	emit('update:show', false)
}

const onSelect = (option: ShareOption) => {
	emit('select', option)
}

const onCancel = () => {
	emit('cancel')
	close()
}

defineExpose({
	/** 打开分享面板 */
	show: () => {
		showState.value = true
		emit('update:show', true)
	},
	/** 关闭分享面板 */
	close
})
</script>

<style lang="scss">
.mx-share-sheet {
	padding: var(--mx-padding-sm) 0;

	&__header {
		padding: var(--mx-padding-sm) var(--mx-padding-md);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__title {
		color: var(--mx-text-color);
		font-weight: var(--mx-font-weight-bold);
		font-size: var(--mx-font-size-md);
		line-height: var(--mx-line-height-md);
	}

	&__description {
		margin-top: 8px;
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-sm);
		line-height: var(--mx-line-height-md);
	}

	&__options {
		display: flex;
		flex-wrap: wrap;
		padding: var(--mx-padding-md) 0;
	}

	&__option {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 33.333%;
		padding: var(--mx-padding-sm) 0;

		&--active {
			.mx-share-sheet__icon {
				transform: scale(0.94);
			}
		}
	}

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		margin-bottom: 8px;
		font-size: 28px;
		line-height: 1;
		transition: transform 0.15s;
	}

	&__icon-img {
		width: 36px;
		height: 36px;
	}

	&__icon-char {
		line-height: 1;
	}

	&__name {
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-xs);
		line-height: var(--mx-line-height-sm);
		text-align: center;
	}

	&__cancel {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		margin-top: var(--mx-padding-xs);
		border-top: 1px solid var(--mx-border-color);

		&--active {
			background: var(--mx-active-color);
		}
	}

	&__cancel-text {
		color: var(--mx-text-color);
		font-size: var(--mx-font-size-md);
		line-height: var(--mx-line-height-md);
	}
}
</style>
