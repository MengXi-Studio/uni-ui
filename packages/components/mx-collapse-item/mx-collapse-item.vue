<template>
  <view class="mx-collapse-item" :class="customClass" :style="customStyle">
    <view
      class="mx-collapse-item__title"
      :class="[{ 'mx-collapse-item__title--is-expanded': expanded, 'mx-collapse-item__title--disabled': disabled }]"
      @click="onClickTitle"
    >
      <view class="mx-collapse-item__title-left">
        <view v-if="icon" class="mx-collapse-item__icon">
          <image v-if="imageIcon" class="mx-collapse-item__icon-image" :src="icon" mode="aspectFit" />
          <text v-else class="mx-collapse-item__icon-char">{{ icon }}</text>
        </view>
        <slot name="title">
          <text class="mx-collapse-item__title-text">{{ title }}</text>
        </slot>
      </view>
      <slot name="value">
        <text v-if="value" class="mx-collapse-item__value">{{ value }}</text>
      </slot>
      <view class="mx-collapse-item__arrow" :class="{ 'mx-collapse-item__arrow--turn': expanded }">
        <text class="mx-collapse-item__arrow-char">›</text>
      </view>
    </view>

    <view class="mx-collapse-item__wrapper" :style="wrapperStyle">
      <view class="mx-collapse-item__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../../shared/props'
import type { CollapseContext } from '../mx-collapse/mx-collapse.vue'

const props = withDefaults(
  defineProps({
    /** 唯一标识 (展开/收起时的 key) */
    name: makeNumericProp<string | number>(''),
    /** 标题 */
    title: makeStringProp(''),
    /** 标题右侧额外信息 */
    value: makeStringProp(''),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    /** 图标 (图片地址或字符) */
    icon: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const instance = getCurrentInstance()

const collapse = inject<CollapseContext>('mxCollapse', null)

const itemName = computed(() => props.name || props.title)

const expanded = computed(() => (collapse ? collapse.isActive(itemName.value) : false))

const disabled = computed(() => props.disabled || !!(collapse && collapse.disabled.value))

const imageIcon = computed(() => /^(https?:)?\/\//.test(props.icon) || /^\.{1,2}\//.test(props.icon) || /^data:image/.test(props.icon))

/** 展开/收起动画: 使用 max-height 过渡 */
const wrapperStyle = computed<Record<string, string>>(() => {
  const duration = collapse?.duration.value ?? 300
  if (expanded.value) {
    return {
      maxHeight: '9999px',
      transition: `max-height ${duration}ms ease`,
    }
  }
  return {
    maxHeight: '0px',
    overflow: 'hidden',
    transition: `max-height ${duration}ms ease`,
  }
})

const onClickTitle = () => {
  if (disabled.value) return
  collapse?.toggle(itemName.value)
}

onMounted(() => {
  void instance
})
</script>

<style lang="scss">
.mx-collapse-item {
  overflow: hidden;
  background: var(--mx-background-2);

  &__title {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 48px;
    padding: 10px 16px;
    color: var(--mx-text-color);
    font-size: 14px;
    line-height: 1.4;
    cursor: pointer;

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid var(--mx-border-color);
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__title-left {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  &__title-text {
    color: var(--mx-text-color);
    font-size: 14px;
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
    font-size: 16px;

    &-char {
      line-height: 1;
    }

    &-image {
      width: 16px;
      height: 16px;
    }
  }

  &__value {
    margin-left: auto;
    color: var(--mx-text-color-2);
    font-size: 13px;
  }

  &__arrow {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: var(--mx-text-color-3);
    transition: transform 0.3s var(--mx-ease-in-out);

    &--turn {
      transform: rotate(90deg);
    }

    &-char {
      font-size: 18px;
      line-height: 1;
    }
  }

  &__wrapper {
    width: auto;
    overflow: hidden;
    transition: max-height 0.3s var(--mx-ease-in-out);
  }

  &__content {
    box-sizing: border-box;
    padding: 12px 16px;
    color: var(--mx-text-color-2);
    font-size: 14px;
    line-height: 1.5;
    border-bottom: 1px solid var(--mx-border-color);
  }
}
</style>