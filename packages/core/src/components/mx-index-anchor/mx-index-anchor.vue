<template>
  <view
    class="mx-index-anchor"
    :class="[{ 'mx-index-anchor--sticky': sticky }, customClass]"
    :data-index="index"
    :style="anchorStyle"
  >
    <template v-if="useIndexSlot">
      <slot name="index" :index="index">{{ index }}</slot>
    </template>
    <view v-else class="mx-index-anchor__header">
      <text class="mx-index-anchor__index">{{ index }}</text>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'

type BarContext = {
  activeIndex: { value: string }
  setActive: (index: string) => void
  register: (item: { index: string }) => void
  scrollTo: (index: string) => void
}

const props = withDefaults(
  defineProps({
    /** 索引字符 */
    index: makeNumericProp<number | string>(''),
    /** 自定义索引字符 */
    customIndex: makeStringProp(''),
    /** 是否使用索引插槽 */
    useIndexSlot: makeBooleanProp(false),
    /** 是否吸附在顶部 */
    sticky: makeBooleanProp(true),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const bar = inject<BarContext>('mxIndexBar', null)

const displayIndex = () =>
  props.customIndex !== '' ? props.customIndex : String(props.index)

onMounted(() => {
  bar?.register({ index: displayIndex() })
})

onBeforeUnmount(() => {
  // 卸载无需额外处理
  void 0
})

const anchorStyle = props.customStyle
</script>

<style lang="scss">
.mx-index-anchor {
  position: relative;

  &__header {
    box-sizing: border-box;
    padding: 0 16px;
    height: 32px;
    color: var(--mx-text-color);
    font-size: 14px;
    line-height: 32px;
    background: var(--mx-active-color);
  }

  &__index {
    color: var(--mx-text-color);
    font-size: 14px;
  }

  &--sticky {
    .mx-index-anchor__header {
      position: sticky;
      top: 0;
      z-index: 99;
    }
  }
}
</style>