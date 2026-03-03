<template>
  <view
    class="mx-product-card"
    :class="[className]"
    :style="customStyle"
    @click="handleClick"
  >
    <!-- 商品图片 -->
    <view class="mx-product-card__image-wrapper">
      <image
        class="mx-product-card__image"
        :src="product?.image || ''"
        mode="aspectFill"
      />
      
      <!-- 标签 -->
      <view v-if="showTags && product?.tags?.length" class="mx-product-card__tags">
        <text
          v-for="(tag, index) in product.tags"
          :key="index"
          class="mx-product-card__tag"
        >
          {{ tag }}
        </text>
      </view>
    </view>

    <!-- 商品信息 -->
    <view class="mx-product-card__info">
      <!-- 商品标题 -->
      <text class="mx-product-card__title">{{ product?.title || '' }}</text>
      
      <!-- 商品描述 -->
      <text v-if="product?.description" class="mx-product-card__desc">
        {{ product.description }}
      </text>
      
      <!-- 价格和销量 -->
      <view class="mx-product-card__footer">
        <view class="mx-product-card__price">
          <text class="mx-product-card__price-symbol">¥</text>
          <text class="mx-product-card__price-value">
            {{ formatPrice(product?.price) }}
          </text>
          
          <!-- 原价 -->
          <text
            v-if="showOriginalPrice && product?.originalPrice"
            class="mx-product-card__price-original"
          >
            ¥{{ formatPrice(product.originalPrice) }}
          </text>
        </view>
        
        <!-- 销量 -->
        <text v-if="showSales && product?.sales" class="mx-product-card__sales">
          已销{{ formatSales(product.sales) }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ProductCardProps, ProductCardEmits } from './types'

// 定义 Props
const props = withDefaults(defineProps<ProductCardProps>(), {
  showOriginalPrice: true,
  showSales: true,
  showTags: true,
  className: '',
  customStyle: '',
})

// 定义 Emits
const emit = defineEmits<ProductCardEmits>()

// 格式化价格
const formatPrice = (price: number | undefined) => {
  if (!price) return '0.00'
  return price.toFixed(2)
}

// 格式化销量
const formatSales = (sales: number | undefined) => {
  if (!sales) return '0'
  return sales >= 10000 ? `${(sales / 10000).toFixed(1)}万` : String(sales)
}

// 点击事件处理
const handleClick = () => {
  if (props.product) {
    emit('click', props.product)
  }
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--mx-bg-color-base);
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include mx-click-effect;

  // 商品图片
  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  // 标签
  &__tags {
    position: absolute;
    top: $spacing-sm;
    left: $spacing-sm;
    display: flex;
    gap: $spacing-xs;
  }

  &__tag {
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
    color: #fff;
    background-color: var(--mx-primary-color);
    border-radius: $border-radius-xs;
  }

  // 商品信息
  &__info {
    padding: $spacing-md;
  }

  // 商品标题
  &__title {
    display: block;
    font-size: $font-size-base;
    font-weight: 500;
    color: var(--mx-text-color-primary);
    line-height: 1.4;
    @include mx-text-ellipsis(2);
  }

  // 商品描述
  &__desc {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: var(--mx-text-color-secondary);
    line-height: 1.4;
    @include mx-text-ellipsis(1);
  }

  // 底部信息
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: $spacing-md;
  }

  // 价格
  &__price {
    display: flex;
    align-items: baseline;
    gap: $spacing-xs;

    &-symbol {
      font-size: $font-size-sm;
      color: var(--mx-danger-color);
    }

    &-value {
      font-size: $font-size-lg;
      font-weight: 600;
      color: var(--mx-danger-color);
    }

    &-original {
      font-size: $font-size-xs;
      color: var(--mx-text-color-placeholder);
      text-decoration: line-through;
    }
  }

  // 销量
  &__sales {
    font-size: $font-size-xs;
    color: var(--mx-text-color-secondary);
  }
}
</style>
