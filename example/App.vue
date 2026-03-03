<template>
  <view class="container">
    <view class="header">
      <text class="title">MengXi Uni-UI 组件演示</text>
    </view>

    <!-- 按钮组件演示 -->
    <view class="section">
      <text class="section-title">按钮组件</text>
      <view class="demo-row">
        <mx-button type="primary" text="主要按钮" />
        <mx-button type="success" text="成功按钮" />
        <mx-button type="warning" text="警告按钮" />
        <mx-button type="danger" text="危险按钮" />
      </view>
      <view class="demo-row">
        <mx-button size="small" text="小号按钮" />
        <mx-button size="medium" text="中号按钮" />
        <mx-button size="large" text="大号按钮" />
      </view>
      <view class="demo-row">
        <mx-button loading text="加载中" />
        <mx-button disabled text="禁用按钮" />
      </view>
    </view>

    <!-- 输入框组件演示 -->
    <view class="section">
      <text class="section-title">输入框组件</text>
      <mx-input v-model="inputValue" placeholder="请输入内容" clearable />
    </view>

    <!-- 卡片组件演示 -->
    <view class="section">
      <text class="section-title">卡片组件</text>
      <mx-card title="卡片标题" subtitle="副标题">
        <text>这是卡片内容，可以包含任何内容。</text>
      </mx-card>
    </view>

    <!-- 加载组件演示 -->
    <view class="section">
      <text class="section-title">加载组件</text>
      <view class="loading-row">
        <mx-loading type="circle" />
        <mx-loading type="dots" />
        <mx-loading type="spinner" />
      </view>
    </view>

    <!-- 用户信息卡片演示 -->
    <view class="section">
      <text class="section-title">用户信息卡片</text>
      <mx-user-info-card :user="userInfo" @click="handleUserClick" />
    </view>

    <!-- 商品卡片演示 -->
    <view class="section">
      <text class="section-title">商品卡片</text>
      <mx-product-card :product="product" @click="handleProductClick" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 输入框值
const inputValue = ref('')

// 用户信息
const userInfo = ref({
  id: 1,
  avatar: 'https://via.placeholder.com/150',
  nickname: '测试用户',
  phone: '13800138000',
  level: 'VIP',
  points: 1000,
})

// 商品信息
const product = ref({
  id: 1,
  title: '这是一个商品标题，支持多行显示',
  description: '商品描述信息',
  price: 99.9,
  originalPrice: 199.9,
  image: 'https://via.placeholder.com/300',
  sales: 1234,
  tags: ['新品', '热销'],
})

// 点击事件处理
const handleUserClick = (user: any) => {
  uni.showToast({
    title: `点击了用户：${user.nickname}`,
    icon: 'none',
  })
}

const handleProductClick = (product: any) => {
  uni.showToast({
    title: `点击了商品：${product.title}`,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  margin-bottom: 40rpx;
  text-align: center;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.section {
  margin-bottom: 40rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
}

.section-title {
  display: block;
  margin-bottom: 20rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.demo-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
}

.loading-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
