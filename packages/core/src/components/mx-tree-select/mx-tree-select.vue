<template>
  <view class="mx-tree-select" :class="customClass" :style="treeSelectStyle">
    <view class="mx-tree-select__nav" :style="{ width: '104px', paddingTop: navPadding }">
      <scroll-view scroll-y class="mx-tree-select__nav-scroll" :style="scrollStyle">
        <view
          v-for="(item, navIndex) in items"
          :key="getNavKey(item, navIndex)"
          class="mx-tree-select__nav-item"
          :class="{ 'mx-tree-select__nav-item--active': navIndex === mainActiveIndexValue }"
          @click="clickNav(navIndex)"
        >
          <text class="mx-tree-select__nav-text" :class="{ 'mx-tree-select__nav-text--active': navIndex === mainActiveIndexValue }">
            {{ item.text }}
          </text>
        </view>
      </scroll-view>
    </view>

    <view class="mx-tree-select__content" :style="scrollStyle">
      <scroll-view scroll-y class="mx-tree-select__content-scroll">
        <view class="mx-tree-select__inner">
          <view
            v-for="child in currentChildren"
            :key="getChildKey(child)"
            class="mx-tree-select__item"
            :class="[{ 'mx-tree-select__item--active': isActive(child) }, { 'mx-tree-select__item--disabled': child.disabled }]"
            @click="clickItem(child)"
          >
            <slot name="item" :item="child" :active="isActive(child)" :disabled="child.disabled">
              <text class="mx-tree-select__item-text" :class="[{ 'mx-tree-select__item-text--active': isActive(child) }, { 'mx-tree-select__item-text--disabled': child.disabled }]">
                {{ child.text }}
              </text>
              <text v-if="isActive(child)" class="mx-tree-select__check">√</text>
            </slot>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeNumericProp, makeStringProp } from '../shared/props'

type TreeItem = {
  text?: string
  textValue?: string
  name?: string | number
  children?: TreeItem[]
  disabled?: boolean
  [k: string]: unknown
}

const props = withDefaults(
  defineProps({
    /** 已选中的 id (v-model, 支持字符串或数组) */
    modelValue: { type: [String, Number, Array] as any, default: '' },
    /** 树形数据 */
    items: { type: Array as any, default: () => [] as TreeItem[] },
    /** 左侧主栏选中索引 */
    mainActiveIndex: makeNumericProp<number | string>(0),
    /** 高度 (带单位或数字) */
    height: makeStringProp(''),
    /** 选中颜色 */
    activeColor: makeStringProp(''),
    /** 可选中的最大数量 */
    max: makeNumericProp<number | string>(Infinity),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    mainActiveIndex: 0,
    max: Infinity,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'update:activeText', value: string | (string | object)[]): void
  (e: 'update:mainActiveIndex', index: number): void
  (e: 'click-nav', index: number): void
  (e: 'click-item', data: { text: string; value: string | number }): void
}>()

const mainActiveIndexValue = computed(() => Number(props.mainActiveIndex))

const activeArray = computed<(string | number)[]>(() => {
  const v = props.modelValue as unknown
  if (v === '' || v === undefined || v === null) return []
  return Array.isArray(v) ? (v as (string | number)[]) : [v as string | number]
})

const maxValue = computed(() => (Number(props.max) === Infinity ? Infinity : Number(props.max)))

const currentChildren = computed<TreeItem[]>(() => {
  const main = props.items[mainActiveIndexValue.value]
  if (!main || !Array.isArray(main.children)) return []
  return main.children as TreeItem[]
})

const isSelected = (item: TreeItem) => {
  const v = getNodeValue(item)
  return activeArray.value.some((id) => id === v)
}

const isActive = (item: TreeItem) => {
  return Boolean(isSelected(item))
}

const validName = computed(() => !Number.isNaN(mainActiveIndexValue.value))

const getNavKey = (item: TreeItem, index: number) => `${item.name ?? item.text ?? ''}-${index}`

const getChildKey = (item: TreeItem) => `${getNodeValue(item)}-${item.text ?? ''}`

/** 获取节点的 value */
function getNodeValue(item: TreeItem): string | number {
  if (item.value !== undefined && item.value !== null) return item.value as string | number
  if (item.id !== undefined && item.id !== null) return item.id as string | number
  if (item.name !== undefined && item.name !== null) return item.name as string | number
  return item.text ?? ''
}

function getNodeText(item: TreeItem): string {
  return item.textValue ?? item.text ?? ''
}

function clickNav(navIndex: number) {
  emit('click-nav', navIndex)
  emit('update:mainActiveIndex', navIndex)
}

function clickItem(item: TreeItem) {
  if (item.disabled) return
  const v = getNodeValue(item)
  const selected = activeArray.value

  // 多选模式且超过 max 上限
  if (maxValue.value !== Infinity && activeArray.value.length >= maxValue.value && !isSelected(item)) {
    return
  }

  let newValue: string | number | (string | number)[]
  if (isSelected(item)) {
    newValue = selected.filter((id) => id !== v)
  } else {
    newValue = selected.concat(v)
  }
  // 单选模式 (items 多层但单选用字符串) 时取最新值
  if (!Array.isArray(props.modelValue) && maxValue.value === Infinity) {
    newValue = v
  }

  emit('update:modelValue', newValue)
  const itemData = { text: getNodeText(item), value: v }
  emit('click-item', itemData)

  // 更新 activeText: 多选拼接 / 单选取当前
  if (Array.isArray(props.modelValue)) {
    emit('update:activeText', newValue.map((id) => getNodeText(item)))
  } else {
    emit('update:activeText', getNodeText(item))
  }
}

const navPadding = '0px'

const scrollStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  const h = props.height
  if (h) style.height = /^\d+(\.\d+)?$/.test(h) ? `${h}px` : h
  return style
})

const treeSelectStyle = props.customStyle
void validName
</script>

<style lang="scss">
.mx-tree-select {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  &__nav {
    flex-shrink: 0;
    background: var(--mx-active-color);

    &-scroll {
      height: 100%;
    }

    &-item {
      box-sizing: border-box;
      padding: 14px 12px;
      cursor: pointer;

      &--active {
        background: var(--mx-background-2);
      }
    }

    &-text {
      display: block;
      width: 100%;
      color: var(--mx-text-color-2);
      font-size: 14px;
      line-height: 1.4;
      word-break: break-all;

      &--active {
        color: var(--mx-text-color);
        font-weight: var(--mx-font-weight-bold);
      }
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;
    background: var(--mx-background-2);

    &-scroll {
      height: 100%;
    }
  }

  &__inner {
    padding: 8px 16px;
    box-sizing: border-box;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;

    &-text {
      color: var(--mx-text-color);
      font-size: 14px;

      &--disabled {
        color: var(--mx-text-color-3);
      }
    }

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__check {
    color: var(--mx-primary-color);
    font-size: 16px;
  }
}
</style>