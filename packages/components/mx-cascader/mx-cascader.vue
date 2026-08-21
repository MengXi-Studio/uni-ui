<template>
  <mx-popup
    :show="show"
    position="bottom"
    :round="true"
    :z-index="zIndex"
    @update:show="onUpdateShow"
  >
    <view class="mx-cascader" :class="customClass" :style="customStyle">
      <!-- 头部 -->
      <view class="mx-cascader__header">
        <text class="mx-cascader__close" @click="onClose">×</text>
        <text class="mx-cascader__title">{{ title }}</text>
      </view>

      <!-- tabs (variant=tabs) -->
      <scroll-view
        v-if="variant === 'tabs'"
        class="mx-cascader__tabs"
        scroll-x
        :show-scrollbar="false"
      >
        <view class="mx-cascader__tab-wrap">
          <view
            v-for="(tab, ti) in tabs"
            :key="ti"
            class="mx-cascader__tab"
            :class="{ 'mx-cascader__tab--active': ti === activeTab }"
            @click="onSwitchTab(ti)"
          >
            <text class="mx-cascader__tab-text">{{ tab }}</text>
          </view>
          <view
            class="mx-cascader__tab"
            :class="[activeTab === tabs.length ? 'mx-cascader__tab--active' : '']"
          >
            <text class="mx-cascader__tab-text">请选择</text>
          </view>
        </view>
      </scroll-view>

      <!-- selected 面包屑 (variant=selected) -->
      <scroll-view
        v-else
        class="mx-cascader__crumbs"
        scroll-x
        :show-scrollbar="false"
      >
        <view class="mx-cascader__crumbs-wrap">
          <view
            v-for="(c, ci) in crumbTexts"
            :key="ci"
            class="mx-cascader__crumb"
            @click="onSwitchCrumb(ci)"
          >
            <text class="mx-cascader__crumb-text">{{ c }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 选项列表 -->
      <scroll-view scroll-y class="mx-cascader__list">
        <view
          v-for="(option, oi) in currentOptions"
          :key="oi"
          class="mx-cascader__option"
          :class="{ 'mx-cascader__option--selected': oi === selectedIndex }"
          @click="onSelect(option, oi)"
        >
          <text class="mx-cascader__option-text">
            {{ option[fieldNames.text] }}
          </text>
          <text v-if="hasChildren(option)" class="mx-cascader__option-arrow">›</text>
        </view>
        <view v-if="!currentOptions.length" class="mx-cascader__empty">暂无数据</view>
      </scroll-view>

      <!-- 底部操作 -->
      <view class="mx-cascader__footer">
        <mx-button size="small" plain custom-class="mx-cascader__step" @click="onPrev">
          上一步
        </mx-button>
        <mx-button size="small" type="primary" custom-class="mx-cascader__next" :disabled="!currentSelection" @click="onNext">
          下一步
        </mx-button>
      </view>
    </view>
  </mx-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp, makeObjectProp } from '../../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'
import MxButton from '../mx-button/mx-button.vue'

interface CascaderOption {
  [key: string]: any
}

type CascaderVariant = 'tabs' | 'selected'

const props = withDefaults(
  defineProps({
    /** 是否显示 (v-model:show) */
    show: makeBooleanProp(false),
    /** 树形选项数据 */
    options: { type: Array as any, required: true } as any,
    /** 选中的值数组 (v-model) */
    value: { type: Array as any, default: () => [] } as any,
    /** 标题 */
    title: makeStringProp('选择'),
    /** 是否可点击选择每个 tab */
    activeTabAsc: makeBooleanProp(false),
    /** 展示类型: tabs / selected */
    variant: makeStringProp<CascaderVariant>('tabs'),
    /** 字段名映射 { text, value, children } */
    fieldNames: makeObjectProp<{ text?: string; value?: string; children?: string }>({}),
    /** z-index */
    zIndex: makeNumericProp<number | string>(1000),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    options: () => [],
    value: () => [],
    title: '选择',
    variant: 'tabs',
  }
)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'update:modelValue', value: CascaderOption[]): void
  (e: 'change', value: CascaderOption[]): void
  (e: 'confirm', value: CascaderOption[]): void
  (e: 'finish', value: CascaderOption[]): void
}>()

const FN = computed(() => ({
  text: props.fieldNames?.text || 'text',
  value: props.fieldNames?.value || 'value',
  children: props.fieldNames?.children || 'children',
}))

/** 每个层级当前选项数组 */
const levels = ref<CascaderOption[][]>([(props.options || []) as CascaderOption[]])
/** 每个层级当前选中索引 */
const selectedIndexes = ref<number[]>([0])

/** 当前层级 */
const activeLevel = computed(() => levels.value.length - 1)

/** 当前层级选项 */
const currentOptions = computed<CascaderOption[]>(() => levels.value[activeLevel.value] || [])

/** 当前选中项 */
const selectedIndex = computed(() => selectedIndexes.value[activeLevel.value] ?? 0)

/** 当前选中 option */
const currentSelection = computed<CascaderOption | null>(
  () => currentOptions.value[selectedIndex.value] || null
)

const hasChildren = (option: CascaderOption) =>
  Array.isArray(option?.[FN.value.children]) && option[FN.value.children].length > 0

/** tabs 文案 (含已选中路径) */
const tabs = computed(() => {
  const list: string[] = []
  for (let i = 0; i < activeLevel.value; i++) {
    const opts = levels.value[i] || []
    const sel = opts[selectedIndexes.value[i]]
    list.push(sel ? sel[FN.value.text] : '')
  }
  return list
})

/** 当前激活 tab 下标 (含末尾占位) */
const activeTab = computed(() => activeLevel.value)

/** selected 模式面包屑 (祖先路径) */
const crumbTexts = computed(() => tabs.value)

/** 回退一层 */
function goPrev() {
  if (activeLevel.value <= 0) return
  levels.value.pop()
  selectedIndexes.value.pop()
  emit('change', currentPath())
}

function onPrev() {
  goPrev()
}

/** 前进一层 (当前选中项有子级时) */
function onNext() {
  const sel = currentSelection.value
  if (!sel || !hasChildren(sel)) {
    onFinish()
    return
  }
  levels.value.push(sel[FN.value.children] as CascaderOption[])
  selectedIndexes.value.push(0)
  emit('change', currentPath())
}

/** 点击某个选项 */
function onSelect(option: CascaderOption, index: number) {
  selectedIndexes.value[activeLevel.value] = index
  const path = currentPath()
  emit('change', path)
  if (hasChildren(option)) {
    levels.value.push(option[FN.value.children] as CascaderOption[])
    selectedIndexes.value.push(0)
  } else {
    onFinish()
  }
}

/** 当前选中路径 (数组, 每层一个 option) */
function currentPath(): CascaderOption[] {
  return levels.value.map((opts, i) => opts[selectedIndexes.value[i]]).filter(Boolean)
}

/** 完成选择 */
function onFinish() {
  const path = currentPath()
  emit('confirm', path)
  emit('finish', path)
  emit('update:modelValue', path)
  emit('update:show', false)
}

/** tabs 切换 */
function onSwitchTab(index: number) {
  if (index >= levels.value.length) return
  levels.value = levels.value.slice(0, index + 1)
  selectedIndexes.value = selectedIndexes.value.slice(0, index + 1)
  emit('change', currentPath())
}

/** selected 面包屑切换 */
function onSwitchCrumb(index: number) {
  if (index >= levels.value.length) return
  levels.value = levels.value.slice(0, index + 1)
  selectedIndexes.value = selectedIndexes.value.slice(0, index + 1)
  emit('change', currentPath())
}

const onClose = () => {
  emit('update:show', false)
}

const onUpdateShow = (value: boolean) => emit('update:show', value)

/** 打开时根据传入 value 恢复选中路径 */
watch(
  () => props.show,
  (val) => {
    if (!val) return
    levels.value = [[...(props.options || [])] as CascaderOption[]]
    selectedIndexes.value = [0]
    const values = props.value || []
    if (!values.length) return
    let idx = 0
    let node: CascaderOption | undefined
    for (let i = 0; i < values.length; i++) {
      const opts = levels.value[idx] || []
      const found = opts.findIndex((o) => o[FN.value.value] === values[i])
      if (found === -1) break
      selectedIndexes.value[idx] = found
      node = opts[found]
      if (hasChildren(node)) {
        levels.value.push(node[FN.value.children] as CascaderOption[])
        selectedIndexes.value.push(0)
        idx++
      }
    }
  }
)

watch(
  () => props.options,
  () => {
    levels.value = [[...(props.options || [])] as CascaderOption[]]
    selectedIndexes.value = [0]
  },
  { deep: true }
)
</script>

<style lang="scss">
.mx-cascader {
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    border-bottom: 1px solid var(--mx-border-color);
  }

  &__title {
    font-size: 16px;
    font-weight: var(--mx-font-weight-bold);
  }

  &__close {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    color: var(--mx-text-color-3);
    font-size: 20px;
    line-height: 1;
  }

  &__tabs {
    height: 44px;
    border-bottom: 1px solid var(--mx-border-color);
    white-space: nowrap;
  }

  &__tab-wrap {
    display: inline-flex;
    align-items: center;
    padding: 0 16px;
    height: 44px;
  }

  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 8px;
    color: var(--mx-text-color-3);
    font-size: 14px;

    &--active {
      color: var(--mx-primary-color);
      font-weight: var(--mx-font-weight-bold);

      &::after {
        position: absolute;
        bottom: 0;
        left: 8px;
        right: 8px;
        content: ' ';
        height: 3px;
        border-radius: 3px;
        background: var(--mx-primary-color);
      }
    }
  }

  &__tab-text {
    white-space: nowrap;
  }

  &__crumbs {
    height: 44px;
    border-bottom: 1px solid var(--mx-border-color);
    white-space: nowrap;
  }

  &__crumbs-wrap {
    display: inline-flex;
    align-items: center;
    padding: 0 16px;
    height: 44px;
  }

  &__crumb {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 8px;
    color: var(--mx-primary-color);
    font-size: 14px;
  }

  &__crumb-text {
    white-space: nowrap;
  }

  &__list {
    height: 260px;
    overflow: hidden;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    box-sizing: border-box;
    font-size: 14px;

    &--selected {
      color: var(--mx-primary-color);
      font-weight: var(--mx-font-weight-bold);
    }
  }

  &__option-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__option-arrow {
    color: var(--mx-text-color-3);
    font-size: 16px;
    margin-left: 8px;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--mx-text-color-3);
    font-size: 14px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 16px;
    box-sizing: border-box;
    border-top: 1px solid var(--mx-border-color);
  }

  &__step,
  &__next {
    min-width: 90px;
  }
}
</style>