<template>
  <view class="mx-pagination" :class="customClass" :style="paginationStyle">
    <view class="mx-pagination__page-btns">
      <view class="mx-pagination__prev" :class="[{ 'mx-pagination__btn--disabled': isFirst }]" @click="setCurrent(currentPage - 1)">
        <slot name="prev-text">
          <text class="mx-pagination__btn-text">{{ prevText }}</text>
        </slot>
      </view>

      <view class="mx-pagination__items">
        <template v-for="(page, index) in displayPages" :key="index">
          <template v-if="page === '…'">
            <view class="mx-pagination__item mx-pagination__item--ellipsis">
              <text class="mx-pagination__btn-text">…</text>
            </view>
          </template>
          <view
            v-else
            class="mx-pagination__item"
            :class="[{ 'mx-pagination__item--active': page === currentPage }]"
            @click="setCurrent(page)"
          >
            <slot name="page" :page="page">
              <text class="mx-pagination__btn-text">{{ page }}</text>
            </slot>
          </view>
        </template>
      </view>

      <view class="mx-pagination__next" :class="[{ 'mx-pagination__btn--disabled': isLast }]" @click="setCurrent(currentPage + 1)">
        <slot name="next-text">
          <text class="mx-pagination__btn-text">{{ nextText }}</text>
        </slot>
      </view>
    </view>

    <view v-if="showPageSize" class="mx-pagination__page-size">
      <slot name="pageSize">
        <text class="mx-pagination__page-size-text">{{ totalItems }} 条</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeNumericProp, makeBooleanProp, makeStringProp } from '../../shared/props'

const props = withDefaults(
  defineProps({
    /** 当前页 (v-model) */
    modelValue: makeNumericProp<number | string>(1),
    /** 总条数 */
    totalItems: makeNumericProp<number | string>(0),
    /** 每页条数 */
    pageSize: makeNumericProp<number | string>(10),
    /** 页码数 */
    pageCount: makeNumericProp<number | string>(0),
    /** 是否显示总条数 */
    showPageSize: makeBooleanProp(false),
    /** 是否强制显示省略号 */
    forceEllipses: makeBooleanProp(true),
    /** 上一页文案 */
    prevText: makeStringProp('上一页'),
    /** 下一页文案 */
    nextText: makeStringProp('下一页'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: 1,
    totalItems: 0,
    pageSize: 10,
    forceEllipses: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', current: number): void
  (e: 'change', current: number): void
}>()

const currentPage = computed(() => Number(props.modelValue))

const totalPage = computed(() => {
  if (Number(props.pageCount) > 0) return Number(props.pageCount)
  const size = Number(props.pageSize)
  const total = Number(props.totalItems)
  if (size <= 0) return 1
  return Math.max(1, Math.ceil(total / size))
})

const isFirst = computed(() => currentPage.value <= 1)
const isLast = computed(() => currentPage.value >= totalPage.value)

/** 生成页码列表 (含省略号) */
const displayPages = computed<(number | '…')[]>(() => {
  const total = totalPage.value
  const current = currentPage.value
  if (total <= 7 || !props.forceEllipses) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | '…')[] = [1]
  if (current > 4) pages.push('…')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let p = start; p <= end; p++) pages.push(p)
  if (current < total - 3) pages.push('…')
  pages.push(total)
  return pages
})

const setCurrent = (page: number) => {
  const target = Math.min(Math.max(1, page), totalPage.value)
  emit('update:modelValue', target)
  emit('change', target)
}

const paginationStyle = props.customStyle
</script>

<style lang="scss">
.mx-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  &__page-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__prev,
  &__next,
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 32px;
    height: 32px;
    margin: 0 2px;
    padding: 0 6px;
    border-radius: 2px;
    background: var(--mx-background-2);
    border: 1px solid var(--mx-border-color);
  }

  &__btn-text {
    color: var(--mx-text-color);
    font-size: 12px;
  }

  &__item--active {
    background: var(--mx-primary-color);
    border-color: var(--mx-primary-color);

    .mx-pagination__btn-text {
      color: #fff;
    }
  }

  &__item--ellipsis {
    border: none;
    background: transparent;
    min-width: 24px;
  }

  &__btn--disabled {
    opacity: 0.4;
  }

  &__page-size {
    margin-top: 8px;

    &-text {
      color: var(--mx-text-color-2);
      font-size: 12px;
    }
  }
}
</style>