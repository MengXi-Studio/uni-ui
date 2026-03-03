<template>
  <view
    class="mx-user-info-card"
    :class="[className]"
    :style="customStyle"
    @click="handleClick"
  >
    <!-- 用户头像 -->
    <image
      class="mx-user-info-card__avatar"
      :src="user?.avatar || ''"
      mode="aspectFill"
    />

    <!-- 用户信息 -->
    <view class="mx-user-info-card__content">
      <!-- 昵称 -->
      <text class="mx-user-info-card__nickname">{{ user?.nickname || '' }}</text>
      
      <!-- 手机号 -->
      <text v-if="showPhone && user?.phone" class="mx-user-info-card__phone">
        {{ formatPhone(user.phone) }}
      </text>
      
      <!-- 等级和积分 -->
      <view v-if="showLevel || showPoints" class="mx-user-info-card__meta">
        <text v-if="showLevel && user?.level" class="mx-user-info-card__level">
          {{ user.level }}
        </text>
        <text v-if="showPoints && user?.points" class="mx-user-info-card__points">
          {{ user.points }}积分
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { UserInfoCardProps, UserInfoCardEmits } from './types'

// 定义 Props
const props = withDefaults(defineProps<UserInfoCardProps>(), {
  showPhone: true,
  showLevel: true,
  showPoints: true,
  className: '',
  customStyle: '',
})

// 定义 Emits
const emit = defineEmits<UserInfoCardEmits>()

// 格式化手机号
const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 点击事件处理
const handleClick = () => {
  if (props.user) {
    emit('click', props.user)
  }
}
</script>

<style lang="scss" scoped>
@use '@styles/variables.scss' as *;
@use '@styles/mixins.scss' as *;

.mx-user-info-card {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  background-color: var(--mx-bg-color-base);
  border-radius: $border-radius-lg;
  @include mx-click-effect;

  // 用户头像
  &__avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    flex-shrink: 0;
  }

  // 用户信息内容
  &__content {
    flex: 1;
    margin-left: $spacing-md;
  }

  // 用户昵称
  &__nickname {
    display: block;
    font-size: $font-size-lg;
    font-weight: 500;
    color: var(--mx-text-color-primary);
    line-height: 1.4;
  }

  // 用户手机号
  &__phone {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: var(--mx-text-color-secondary);
    line-height: 1.4;
  }

  // 等级和积分
  &__meta {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-sm;
  }

  // 等级
  &__level {
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
    color: #fff;
    background-color: var(--mx-primary-color);
    border-radius: $border-radius-xs;
  }

  // 积分
  &__points {
    font-size: $font-size-xs;
    color: var(--mx-warning-color);
  }
}
</style>
