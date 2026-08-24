<template>
	<view class="mx-coupon-list" :class="customClass" :style="customStyle">
		<view class="mx-coupon-list__header">
			<text class="mx-coupon-list__title">选择优惠券</text>
			<text class="mx-coupon-list__close" @click="onClose">×</text>
		</view>

		<scroll-view class="mx-coupon-list__body" scroll-y>
			<view v-if="availableCoupons.length" class="mx-coupon-list__group">
				<text class="mx-coupon-list__group-title">可用券</text>
				<mx-coupon v-for="coupon in availableCoupons" :key="coupon.id" :coupon="coupon" :currency="currency" :chosen="isChosen(coupon)" @click="onClickCoupon(coupon)" />
			</view>

			<view v-if="disabledCoupons.length" class="mx-coupon-list__group">
				<text class="mx-coupon-list__group-title">不可用</text>
				<mx-coupon v-for="coupon in disabledCoupons" :key="coupon.id" :coupon="coupon" :currency="currency" disabled @click="onClickCoupon(coupon)" />
			</view>

			<view v-if="!availableCoupons.length && !disabledCoupons.length" class="mx-coupon-list__empty">
				<text>暂无优惠券</text>
			</view>
		</scroll-view>

		<view class="mx-coupon-list__footer">
			<view v-if="showExchangeBar" class="mx-coupon-list__exchange">
				<input v-model="exchangeCode" class="mx-coupon-list__exchange-input" :placeholder="exchangePlaceholder" confirm-type="done" />
				<view class="mx-coupon-list__exchange-btn" :class="{ 'mx-coupon-list__exchange-btn--disabled': !exchangeCode }" @click="onExchange">
					<text>{{ exchangeBtnText }}</text>
				</view>
			</view>

			<view v-if="closeButtonText" class="mx-coupon-list__close-btn" @click="onClose">
				<text>{{ closeButtonText }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'
import MxCoupon from '../mx-coupon/mx-coupon.vue'

/** 优惠券数据结构 (与 mx-coupon 对齐) */
interface CouponInfo {
	id?: string | number
	value?: number | string
	condition?: number | string
	name?: string
	description?: string
	startAt?: number
	endAt?: number
	available?: boolean
}

const props = defineProps({
	/** 选中的优惠券 id 数组 (v-model) */
	modelValue: { type: Array as any, default: () => [] as (string | number)[] },
	/** 优惠券列表 */
	coupons: { type: Array as any, default: () => [] as CouponInfo[] },
	/** 货币符号 */
	currency: makeStringProp('¥'),
	/** 是否显示兑换码输入栏 */
	showExchangeBar: makeBooleanProp(true),
	/** 兑换按钮文字 */
	exchangeBtnText: makeStringProp('兑换'),
	/** 兑换码输入框占位 */
	exchangePlaceholder: makeStringProp('请输入兑换码'),
	/** 底部关闭按钮文字 */
	closeButtonText: makeStringProp(''),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 双向绑定 (v-model) 同步选中的券 id */
	(e: 'update:modelValue', value: (string | number)[]): void
	/** 选中券变化时触发 */
	(e: 'change', value: (string | number)[]): void
	/** 输入兑换码触发兑换时触发 */
	(e: 'exchange', code: string): void
	/** 点击优惠券时触发 */
	(e: 'click-coupon', coupon: CouponInfo): void
	/** 关闭列表时触发 */
	(e: 'close'): void
}>()

const exchangeCode = ref('')

const chosenIds = computed(() => (props.modelValue as (string | number)[]) || [])

/** 可用 / 不可用分组 (默认认为可用的, 除非标记不可用) */
const availableCoupons = computed(() => (props.coupons as CouponInfo[]).filter(c => c.available !== false))
const disabledCoupons = computed(() => (props.coupons as CouponInfo[]).filter(c => c.available === false))

function isChosen(coupon: CouponInfo) {
	return chosenIds.value.some(id => String(id) === String(coupon.id))
}

const onClickCoupon = (coupon: CouponInfo) => {
	emit('click-coupon', coupon)
	if (coupon.available === false) return
	const id = coupon.id as string | number
	const next = isChosen(coupon) ? chosenIds.value.filter(v => String(v) !== String(id)) : [...chosenIds.value, id]
	emit('update:modelValue', next)
	emit('change', next)
}

const onExchange = () => {
	if (!exchangeCode.value.trim()) return
	emit('exchange', exchangeCode.value.trim())
}

const onClose = () => emit('close')
</script>

<style lang="scss">
.mx-coupon-list {
	display: flex;
	flex-direction: column;
	height: 60vh;
	overflow: hidden;
	background: var(--mx-background);

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		box-sizing: border-box;
		background: var(--mx-background-2);
		border-bottom: 1px solid var(--mx-border-color);
	}

	&__title {
		font-size: 16px;
		font-weight: var(--mx-font-weight-bold);
	}

	&__close {
		position: absolute;
		top: 50%;
		right: 16px;
		transform: translateY(-50%);
		color: var(--mx-text-color-3);
		font-size: 24px;
		line-height: 1;
	}

	&__body {
		flex: 1;
		overflow: hidden;
	}

	&__group {
		padding: 12px 0;
	}

	&__group-title {
		display: block;
		margin: 0 16px 8px;
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-sm);
	}

	&__empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 160px;
		color: var(--mx-text-color-3);
		font-size: 14px;
	}

	&__footer {
		box-sizing: border-box;
		padding: 12px 16px;
		background: var(--mx-background-2);
		border-top: 1px solid var(--mx-border-color);
	}

	&__exchange {
		display: flex;
		align-items: center;
	}

	&__exchange-input {
		flex: 1;
		height: 40px;
		box-sizing: border-box;
		padding: 0 12px;
		color: var(--mx-text-color);
		font-size: 14px;
		background: var(--mx-active-color);
		border-radius: var(--mx-radius-md);
	}

	&__exchange-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 0 20px;
		margin-left: 12px;
		color: #fff;
		font-size: 14px;
		background: var(--mx-primary-color);
		border-radius: var(--mx-radius-md);

		&--disabled {
			opacity: var(--mx-disabled-opacity);
		}
	}

	&__close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44px;
		box-sizing: border-box;
		margin-top: 12px;
		color: var(--mx-text-color);
		font-size: 14px;
		background: var(--mx-background-2);
		border: 1px solid var(--mx-border-color);
		border-radius: var(--mx-radius-md);
	}
}
</style>
