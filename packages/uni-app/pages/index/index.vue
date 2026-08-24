<template>
	<view class="container">
		<text class="title">@mengxi/uni-ui 示例</text>

		<view class="section">
			<text class="section-title">Button</text>
			<view class="row">
				<mx-button type="primary">主要按钮</mx-button>
				<mx-button type="danger" round>危险</mx-button>
				<mx-button plain type="primary">朴素</mx-button>
			</view>
		</view>

		<view class="section">
			<text class="section-title">Cell</text>
			<mx-cell-group inset>
				<mx-cell title="单元格" value="内容" is-link />
				<mx-cell title="带描述" label="描述信息" />
			</mx-cell-group>
		</view>

		<view class="section">
			<text class="section-title">Field / Switch / Rate</text>
			<mx-field v-model="value" label="输入框" placeholder="请输入" clearable />
			<view class="row">
				<mx-switch v-model="switched" />
				<mx-rate v-model="rate" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const switched = ref(true)
const rate = ref(3)
</script>

<style lang="scss" scoped>
.container {
	padding: 32rpx;
	background: var(--mx-background);
	min-height: 100vh;
}
.title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	color: var(--mx-text-color);
	margin-bottom: 32rpx;
}
.section {
	margin-bottom: 32rpx;
	padding: 24rpx;
	background: var(--mx-background-2);
	border-radius: var(--mx-radius-lg);
}
.section-title {
	display: block;
	font-size: 28rpx;
	font-weight: 500;
	color: var(--mx-text-color);
	margin-bottom: 20rpx;
}
.row {
	display: flex;
	align-items: center;
	gap: 20rpx;
	flex-wrap: wrap;
}
</style>
