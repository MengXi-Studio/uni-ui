<template>
  <view class="mx-skeleton" :class="[{ 'mx-skeleton--animate': animate }, customClass]" :style="customStyle">
    <!-- 头像 -->
    <view v-if="avatar" class="mx-skeleton__header">
      <view class="mx-skeleton__avatar" :class="[`mx-skeleton__avatar--${avatarShape}`]" :style="{ width: avatarSizeUnit, height: avatarSizeUnit }"></view>
    </view>

    <!-- 段落 -->
    <view class="mx-skeleton__content" :style="contentStyle">
      <slot name="title">
        <view v-if="title" class="mx-skeleton__title" :style="{ width: titleWidth }"></view>
      </slot>
      <slot name="row">
        <view
          v-for="(row, index) in rows"
          :key="index"
          class="mx-skeleton__row"
          :style="{ width: Array.isArray(rowWidth) ? rowWidth[index % rowWidth.length] : rowWidth }"
        ></view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 段落行数 */
    row: makeNumericProp<number | string>(0),
    /** 是否显示标题占位 */
    title: makeBooleanProp(true),
    /** 是否显示头像占位 */
    avatar: makeBooleanProp(false),
    /** 头像形状 */
    avatarShape: makeStringProp<'round' | 'square'>('round'),
    /** 头像尺寸 */
    avatarSize: makeNumericProp<number | string>('32px'),
    /** 标题宽度 */
    titleWidth: makeStringProp('40%'),
    /** 段落行宽度 */
    rowWidth: { type: [String, Array] as any, default: '100%' },
    /** 是否显示骨架动画 */
    animate: makeBooleanProp(true),
    /** 是否圆角 */
    round: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    row: 0,
    title: true,
    rowWidth: '100%',
    animate: true,
  }
)

const rows = computed(() => Math.max(0, Number(props.row) || 0))
const avatarSizeUnit = computed(() => addUnit(props.avatarSize))

const contentStyle = computed(() => (props.avatar ? { paddingLeft: `calc(${avatarSizeUnit.value} + 16px)` } : {}))

defineSlots<{
  default?: () => unknown
  title?: () => unknown
  row?: () => unknown
}>()
</script>

<style lang="scss">
.mx-skeleton {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;

  &--animate {
    .mx-skeleton__avatar,
    .mx-skeleton__title,
    .mx-skeleton__row {
      animation: mx-skeleton-blink 1.2s ease-in-out infinite;
    }
  }

  &__header {
    padding-right: 16px;
  }

  &__avatar {
    border-radius: var(--mx-radius-sm);
    background: var(--mx-active-color);

    &--round {
      border-radius: 50%;
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    height: 18px;
    margin: 0;
    border-radius: var(--mx-radius-sm);
    background: var(--mx-active-color);
  }

  &__row {
    height: 14px;
    margin-top: 12px;
    border-radius: var(--mx-radius-sm);
    background: var(--mx-active-color);

    &:first-of-type {
      margin-top: 16px;
    }
  }
}

@keyframes mx-skeleton-blink {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}
</style>