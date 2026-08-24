<template>
	<view class="mx-card" :class="[{ 'mx-card--centered': centered }, customClass]" :style="customStyle" @click="onClick">
		<view v-if="img" class="mx-card__thumb" @click.stop="onClickThumb">
			<slot name="thumb">
				<image v-if="img" class="mx-card__image" :src="img" mode="aspectFit" :lazy-load="lazyLoad" />
			</slot>
		</view>

		<view class="mx-card__content">
			<slot name="tag">
				<text v-if="tag" class="mx-card__tag" @click.stop="onClickTag">{{ tag }}</text>
			</slot>

			<view class="mx-card__title">{{ title }}</view>

			<slot name="desc">
				<view v-if="desc" class="mx-card__desc">{{ desc }}</view>
			</slot>

			<slot name="tags" />

			<view class="mx-card__footer">
				<slot name="foot">
					<view class="mx-card__price">
						<text class="mx-card__price-currency">{{ currency }}</text>
						<text class="mx-card__price-integer">{{ priceMain }}</text>
						<text v-if="priceDecimal" class="mx-card__price-decimal">.{{ priceDecimal }}</text>
						<text v-if="originPrice" class="mx-card__origin-price">{{ originPriceText }}</text>
					</view>
					<text v-if="num" class="mx-card__num" :class="[`mx-card__num--${numType}`]">
						{{ numText }}
					</text>
				</slot>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'

type CardNumType = 'text' | 'grid'

const props = defineProps({
	/** 商品图片地址 */
	img: makeStringProp(''),
	/** 商品名称 */
	title: makeStringProp(''),
	/** 商品描述 */
	desc: makeStringProp(''),
	/** 商品标签 */
	tag: makeStringProp(''),
	/** 商品数量 */
	num: makeStringProp(''),
	/** 价格 */
	price: makeNumericProp<number | string>(0),
	/** 原价 */
	originPrice: makeNumericProp<number | string>(0),
	/** 价格货币符号 */
	currency: makeStringProp('¥'),
	/** 数量显示方式: text 文本 / grid 网格角标 */
	numType: makeStringProp<CardNumType>('text'),
	/** 商品图点击跳转地址 (由使用方自行处理导航) */
	thumbLink: makeStringProp(''),
	/** 是否懒加载图片 */
	lazyLoad: makeBooleanProp(false),
	/** 内容是否居中 */
	centered: makeBooleanProp(false),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 点击卡片 */
	(e: 'click', event: Event): void
	/** 点击商品图 */
	(e: 'click-thumb', event: Event): void
	/** 点击标签 */
	(e: 'click-tag', event: Event): void
}>()

function toPrice(value: number | string): number {
	const num = Number(value)
	return Number.isFinite(num) ? num : 0
}

/** 价格小数部分 (保留 2 位) */
const priceText = computed(() => toPrice(props.price).toFixed(2))
const priceMain = computed(() => priceText.value.split('.')[0])
const priceDecimal = computed(() => (priceText.value.split('.')[1] === '00' ? '' : priceText.value.split('.')[1]))

/** 原价文本 */
const originPriceText = computed(() => {
	const v = toPrice(props.originPrice)
	return v > 0 && v !== toPrice(props.price) ? `${props.currency}${v.toFixed(2)}` : ''
})

const numText = computed(() => (props.num ? `x${props.num}` : ''))

const onClick = (event: Event) => emit('click', event)
const onClickThumb = (event: Event) => emit('click-thumb', event)
const onClickTag = (event: Event) => emit('click-tag', event)
</script>

<style lang="scss">
.mx-card {
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	color: var(--mx-text-color);
	font-size: 14px;
	background: var(--mx-background-2);

	&--centered {
		align-items: center;
	}

	&__thumb {
		position: relative;
		display: block;
		overflow: hidden;
		width: 88px;
		height: 88px;
		flex-shrink: 0;
		margin-right: 12px;
		background: var(--mx-active-color);
		border-radius: var(--mx-radius-md);
	}

	&__image {
		width: 100%;
		height: 100%;
		display: block;
	}

	&__content {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	&__tag {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		padding: 0 4px;
		color: #fff;
		font-size: 10px;
		line-height: 16px;
		background: var(--mx-danger-color);
		border-radius: 0 var(--mx-radius-md) var(--mx-radius-md) 0;
	}

	&__title {
		margin-top: 2px;
		line-height: var(--mx-line-height-md);
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	&__desc {
		margin-top: 6px;
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-sm);
		line-height: var(--mx-line-height-sm);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		margin-top: 8px;
		min-height: 24px;
	}

	&__price {
		display: inline-flex;
		align-items: baseline;
		color: var(--mx-danger-color);
		font-weight: var(--mx-font-weight-bold);
	}

	&__price-currency {
		font-size: var(--mx-font-size-sm);
	}

	&__price-integer,
	&__price-decimal {
		font-size: 18px;
	}

	&__price-decimal {
		font-size: 14px;
	}

	&__origin-price {
		margin-left: 6px;
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-xs);
		font-weight: normal;
		text-decoration: line-through;
	}

	&__num {
		color: var(--mx-text-color-2);
		font-size: var(--mx-font-size-sm);
		line-height: 20px;

		&--grid {
			min-width: 16px;
			box-sizing: border-box;
			padding: 0 4px;
			color: var(--mx-text-color-2);
			font-size: var(--mx-font-size-xs);
			background: var(--mx-active-color);
			border-radius: var(--mx-radius-max);
			text-align: center;
		}
	}
}
</style>
