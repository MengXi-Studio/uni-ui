<template>
  <mx-popup
    :show="show"
    position="bottom"
    :round="true"
    :z-index="zIndex"
    @update:show="onUpdateShow"
  >
    <view class="mx-picker" :class="customClass" :style="customStyle">
      <!-- 头部 -->
      <view class="mx-picker__toolbar">
        <text class="mx-picker__cancel" @click="onCancel">{{ cancelButtonText }}</text>
        <text class="mx-picker__title">{{ title }}</text>
        <text class="mx-picker__confirm" @click="onConfirm">{{ confirmButtonText }}</text>
      </view>

      <!-- 选择区 -->
      <view class="mx-picker__columns">
        <picker-view
          class="mx-picker__view"
          :value="viewValue"
          @change="onChange"
          @touchmove.stop.prevent
        >
          <picker-view-column
            v-for="(column, ci) in visibleColumns"
            :key="ci"
            class="mx-picker__column"
          >
            <view
              v-for="(option, oi) in column"
              :key="oi"
              class="mx-picker__option"
              :class="{ 'mx-picker__option--selected': oi === selectedIndexes[ci] }"
            >
              <text class="mx-picker__option-text">{{ option.text }}</text>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </mx-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp, makeObjectProp } from '../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'

interface PickerOption {
  text: string
  value: unknown
  children?: PickerOption[]
  [key: string]: any
}

type ColumnsFieldNames = { text?: string; values?: string; children?: string }

const props = defineProps({
  /** 是否显示 (v-model:show) */
  show: makeBooleanProp(false),
  /** 列数据: 数组 / 对象数组(含 children 级联) / 二维数组(多列独立) */
  columns: { type: Array as any, default: () => [] },
  /** 标题 */
  title: makeStringProp(''),
  /** 确认按钮文字 */
  confirmButtonText: makeStringProp('确认'),
  /** 取消按钮文字 */
  cancelButtonText: makeStringProp('取消'),
  /** 展示文案字段名 */
  valueKey: makeStringProp('text'),
  /** 列字段名映射 { text, values, children } */
  columnsFieldNames: makeObjectProp<ColumnsFieldNames>({}),
  /** 是否记住滚动位置 */
  rememberScrollPosition: makeBooleanProp(false),
  /** 是否显示加载状态 */
  loading: makeBooleanProp(false),
  /** z-index */
  zIndex: makeNumericProp<number | string>(1000),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'update:modelValue', value: unknown): void
  (e: 'confirm', detail: { selectedValues: unknown[]; selectedOptions: PickerOption[] }): void
  (e: 'cancel'): void
  (e: 'change', detail: { selectedValues: unknown[]; index: number }): void
}>()

const textKey = computed(() => props.columnsFieldNames?.text || props.valueKey)
const childrenKey = computed(() => props.columnsFieldNames?.children || 'children')

/** 是否多列独立 (columns[0] 为数组) */
const independent = computed(
  () => Array.isArray(props.columns) && props.columns.length > 0 && Array.isArray(props.columns[0])
)

function toOptions(list: any[]): PickerOption[] {
  return (list || []).map((item) => {
    if (item && typeof item === 'object') {
      return {
        ...item,
        text: item[textKey.value] ?? '',
        value: item.value !== undefined ? item.value : item[textKey.value],
        children: item[childrenKey.value],
      }
    }
    return { text: String(item), value: item }
  })
}

const rootOptions = computed(() => toOptions(props.columns as any[]))

/** 独立多列: 每列一个选项数组 */
const independentColumns = computed(() =>
  (props.columns as any[]).map((col) => toOptions(Array.isArray(col) ? col : []))
)

/** 当前可见列 (级联时随选择动态扩展) */
const visibleColumns = computed<PickerOption[][]>(() => {
  if (independent.value) return independentColumns.value
  const cols: PickerOption[][] = []
  let cur = rootOptions.value
  cols.push(cur)
  let lvl = 0
  while (
    selectedIndexes.value[lvl] !== undefined &&
    cur &&
    cur[selectedIndexes.value[lvl]]?.children?.length
  ) {
    cur = cur[selectedIndexes.value[lvl]].children
    cols.push(cur)
    lvl++
  }
  return cols
})

/** 每列当前选中索引 */
const selectedIndexes = ref<number[]>([])

/** 绑定给 picker-view 的索引数组 */
const viewValue = computed(() => selectedIndexes.value.slice(0, visibleColumns.value.length))

watch(
  visibleColumns,
  () => {
    // 列数变化时确保每列索引有效
    const len = visibleColumns.value.length
    if (selectedIndexes.value.length < len) {
      selectedIndexes.value = selectedIndexes.value.concat(
        Array(len - selectedIndexes.value.length).fill(0)
      )
    }
  },
  { immediate: true }
)

watch(
  () => props.columns,
  () => {
    selectedIndexes.value = Array(visibleColumns.value.length).fill(0)
  },
  { deep: true }
)

function currentOptions(): PickerOption[] {
  return visibleColumns.value.map((col, i) => col[selectedIndexes.value[i]] || col[0])
}

const onChange = (event: unknown) => {
  const detail = (event as any).detail || {}
  const raw = detail.value
  const arr = (Array.isArray(raw) ? raw : [raw]).map((v: unknown) => Number(v))

  if (independent.value) {
    const prev = [...selectedIndexes.value]
    selectedIndexes.value = arr
    const index = arr.findIndex((v, i) => prev[i] !== v)
    emit('change', { selectedValues: currentOptions().map((o) => o.value), index })
    return
  }

  const prev = [...selectedIndexes.value]
  selectedIndexes.value = arr
  const index = arr.findIndex((v, i) => prev[i] !== v)

  // 级联: 后续列在树中不存在时截断
  if (visibleColumns.value.length < selectedIndexes.value.length) {
    selectedIndexes.value = selectedIndexes.value.slice(0, visibleColumns.value.length)
  }
  emit('change', { selectedValues: currentOptions().map((o) => o.value), index })
}

const onConfirm = () => {
  const selectedOptions = currentOptions()
  const selectedValues = selectedOptions.map((o) => o.value)
  emit('confirm', { selectedValues, selectedOptions })
  emit('update:show', false)
}

const onCancel = () => {
  emit('cancel')
  emit('update:show', false)
}

const onUpdateShow = (value: boolean) => emit('update:show', value)
</script>

<style lang="scss">
.mx-picker {
  &__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 16px;
  }

  &__cancel,
  &__confirm {
    padding: 0 4px;
    font-size: 14px;
  }

  &__cancel {
    color: var(--mx-text-color-2);
  }

  &__confirm {
    color: var(--mx-primary-color);
    font-weight: var(--mx-font-weight-bold);
  }

  &__title {
    max-width: 50%;
    overflow: hidden;
    color: var(--mx-text-color);
    font-weight: var(--mx-font-weight-bold);
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__columns {
    height: 240px;
    overflow: hidden;
  }

  &__view {
    width: 100%;
    height: 100%;
  }

  &__column {
    height: 100%;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    height: 40px;
    color: var(--mx-text-color);
    font-size: 16px;

    &--selected {
      color: var(--mx-text-color);
      font-weight: var(--mx-font-weight-bold);
      font-size: 18px;
    }
  }

  &__option-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
