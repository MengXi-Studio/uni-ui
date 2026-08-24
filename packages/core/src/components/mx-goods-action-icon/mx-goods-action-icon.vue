<template>
	<view class="mx-goods-action-icon" :class="[{ 'mx-goods-action-icon--disabled': disabled }, customClass]" :style="customStyle" :hover-class="!disabled ? 'mx-goods-action-icon--hover' : ''" @click="onClick">
		<view class="mx-goods-action-icon__icon">
			<slot name="icon">
				<mx-icon v-if="icon" :name="icon" :color="iconColor" :badge="badge" />
			</slot>
		</view>
		<text class="mx-goods-action-icon__text">{{ text }}</text>
		<slot />
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import MxIcon from '../mx-icon/mx-icon.vue'

const props = defineProps({
	/** 图标名称 (图标名或字符) */
	icon: makeStringProp(''),
	/** 图标下文字 */
	text: makeStringProp(''),
	/** 图标颜色 */
	color: makeStringProp(''),
	/** 徽标内容 */
	badge: makeNumericProp<number | string | undefined>(undefined),
	/** 是否禁用 */
	disabled: makeBooleanProp(false),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

/** 点击时触发 */
const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const iconColor = computed(() => props.color || 'var(--mx-text-color)')

const onClick = (event: Event) => {
	if (props.disabled) return
	emit('click', event)
}
</script>

<style lang="scss">
.mx-goods-action-icon {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 48px;
	flex: 1;
	height: 50px;
	color: var(--mx-text-color);
	cursor: pointer;

	&--hover {
		background: var(--mx-active-color);
	}

	&--disabled {
		cursor: not-allowed;
		opacity: var(--mx-disabled-opacity);
	}

	&__icon {
		display: flex;
		font-size: 20px;
		line-height: 1;
	}

	&__text {
		margin-top: 4px;
		font-size: var(--mx-font-size-xs);
		line-height: 1;
	}
}
</style>
