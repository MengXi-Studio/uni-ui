<template>
  <view class="mx-cell" :class="[{ 'mx-cell--large': size === 'large', 'mx-cell--center': center, 'mx-cell--borderless': !border }, customClass]" :style="customStyle">
    <slot name="icon">
      <view v-if="icon" class="mx-cell__left-icon">
        <mx-icon v-if="!imageIcon" :name="icon" />
        <image v-else :src="icon" class="mx-cell__icon-image" mode="aspectFit" />
      </view>
    </slot>

    <view class="mx-cell__title-wrapper">
      <view class="mx-cell__title">
        <slot name="title">{{ title }}</slot>
        <view v-if="label" class="mx-cell__label">{{ label }}</view>
      </view>
      <view class="mx-cell__value">
        <slot>{{ value }}</slot>
      </view>
    </view>

    <slot name="right-icon">
      <view v-if="isLink" class="mx-cell__right-icon" :class="[`mx-cell__arrow--${arrowDirection}`]">
        <slot name="arrow">
          <text class="mx-cell__arrow-text">{{ arrowGlyph }}</text>
        </slot>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'
import MxIcon from '../mx-icon/mx-icon.vue'

type CellSize = 'large'
type ArrowDirection = 'up' | 'down' | 'left' | 'right'

const props = withDefaults(
  defineProps({
    /** 左侧标题 */
    title: makeStringProp(''),
    /** 标题下方的描述 */
    label: makeStringProp(''),
    /** 右侧内容 */
    value: makeStringProp(''),
    /** 左侧图标 (图标名或图片地址) */
    icon: makeStringProp(''),
    /** 尺寸, 仅 large 于普通 */
    size: makeStringProp<CellSize>(''),
    /** 是否将内容区垂直居中 */
    center: makeBooleanProp(false),
    /** 是否显示右侧箭头 */
    isLink: makeBooleanProp(false),
    /** 箭头方向 */
    arrowDirection: makeStringProp<ArrowDirection>('right'),
    /** 是否显示底部边框 */
    border: makeBooleanProp(true),
    /** 必填星号 */
    required: makeBooleanProp(false),
    /** 点击跳转地址 (由使用方自行处理导航) */
    url: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    arrowDirection: 'right',
    border: true,
  }
)

const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const imageIcon = computed(() => /^(https?:)?\/\//.test(props.icon) || /^\.{1,2}\//.test(props.icon))

const arrowGlyph = computed(() => {
  const map: Record<ArrowDirection, string> = {
    up: '︿',
    down: '﹀',
    left: '‹',
    right: '›',
  }
  return map[props.arrowDirection] || '›'
})

const onClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="scss">
.mx-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: var(--mx-text-color);
  font-size: 14px;
  line-height: 24px;
  background: var(--mx-background-2);

  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    transform: scaleY(0.5);
    transform-origin: center;
    border-bottom: 1px solid var(--mx-border-color);
  }

  &--borderless::after {
    display: none;
  }

  &--large {
    padding-top: 12px;
    padding-bottom: 12px;

    .mx-cell__title {
      font-size: 16px;
    }
  }

  &--center {
    align-items: center;
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
    font-size: 16px;
  }

  &__icon-image {
    width: 20px;
    height: 20px;
  }

  &__title-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__title {
    flex: 1;
    min-width: 0;
  }

  &__label {
    margin-top: 2px;
    color: var(--mx-text-color-2);
    font-size: 12px;
    line-height: 18px;
  }

  &__value {
    flex: 1;
    text-align: right;
    color: var(--mx-text-color-2);
  }

  &__right-icon {
    display: flex;
    align-items: center;
    margin-left: 4px;
    color: var(--mx-text-color-3);
    font-size: 16px;
    line-height: 24px;
  }

  &__arrow-text {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 1;
  }

  &__arrow--left .mx-cell__arrow-text {
    transform: rotate(180deg);
  }
}
</style>