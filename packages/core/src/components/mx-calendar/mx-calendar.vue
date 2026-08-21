<template>
  <mx-popup
    :show="show"
    position="bottom"
    :round="round"
    :z-index="zIndex"
    @update:show="onUpdateShow"
  >
    <view class="mx-calendar" :class="customClass" :style="customStyle">
      <!-- 顶部栏 -->
      <view class="mx-calendar__header">
        <text class="mx-calendar__cancel" @click="onCancel">{{ cancelButtonText }}</text>
        <text class="mx-calendar__title">{{ title }}</text>
        <text class="mx-calendar__header-right" />
      </view>

      <!-- 年月切换 -->
      <view class="mx-calendar__nav">
        <text
          class="mx-calendar__nav-arrow"
          :class="{ 'mx-calendar__nav-arrow--disabled': !canGoPrev }"
          @click="prevMonth"
        >
          ‹
        </text>
        <text class="mx-calendar__nav-title">{{ viewYear }}年{{ viewMonth + 1 }}月</text>
        <text
          class="mx-calendar__nav-arrow"
          :class="{ 'mx-calendar__nav-arrow--disabled': !canGoNext }"
          @click="nextMonth"
        >
          ›
        </text>
      </view>

      <!-- 星期表头 -->
      <view class="mx-calendar__weekdays">
        <text v-for="(w, i) in weekdays" :key="i" class="mx-calendar__weekday">{{ w }}</text>
      </view>

      <!-- 日期网格 -->
      <view class="mx-calendar__body">
        <view class="mx-calendar__days">
          <view v-for="(cell, ci) in cells" :key="ci" class="mx-calendar__cell">
            <view v-if="cell" class="mx-calendar__day-wrap">
              <text
                class="mx-calendar__day"
                :class="{
                  'mx-calendar__day--today': cell.today,
                  'mx-calendar__day--disabled': cell.disabled,
                  'mx-calendar__day--selected': cell.selected,
                  'mx-calendar__day--range-start': cell.isRangeStart,
                  'mx-calendar__day--range-end': cell.isRangeEnd,
                  'mx-calendar__day--in-range': cell.inRange,
                }"
                @click="onSelect(cell)"
              >
                {{ cell.day }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部确定栏 -->
      <view v-if="showConfirm" class="mx-calendar__footer">
        <mx-button type="primary" block :disabled="!hasSelected" @click="onConfirm">确认</mx-button>
      </view>
    </view>
  </mx-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeBooleanProp, makeStringProp, makeNumericProp } from '../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'
import MxButton from '../mx-button/mx-button.vue'

type CalendarType = 'single' | 'multiple' | 'range'

const props = defineProps({
  /** 是否显示 (v-model:show) */
  show: makeBooleanProp(false),
  /** 标题 */
  title: makeStringProp('日期选择'),
  /** 选择模式: single / multiple / range */
  type: makeStringProp<CalendarType>('single'),
  /** 选中日期 (v-model, 时间戳或时间戳数组) */
  modelValue: { type: [Number, Array] as any, default: null },
  /** 默认选中日期 (时间戳, single 为 number, multiple/range 为数组) */
  defaultDate: { type: [Number, Array] as any, default: null },
  /** 可选择的最小日期时间戳 */
  minDate: { type: Number as any, default: null },
  /** 可选择的最大日期时间戳 */
  maxDate: { type: Number as any, default: null },
  /** 是否显示底部确定按钮 */
  showConfirm: makeBooleanProp(true),
  /** 是否圆角 */
  round: makeBooleanProp(true),
  /** 取消按钮文字 */
  cancelButtonText: makeStringProp('取消'),
  /** 每周起始日 (0=周日, 1=周一) */
  firstDayOfWeek: makeNumericProp<number>(0),
  /** z-index */
  zIndex: makeNumericProp<number | string>(1000),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'update:modelValue', value: unknown): void
  (e: 'confirm', detail: unknown): void
  (e: 'cancel'): void
  (e: 'select', detail: unknown): void
}>()

const startOfDay = (ts: number) => {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

const todayStart = () => startOfDay(Date.now())

/** 当前视图年月 */
const now = new Date()
const viewYear = ref(now.getFullYear())
const viewMonth = ref(now.getMonth())

/** 已选日期 (时间戳数组, 已按天取整) */
const selectedDates = ref<number[]>([])

/** 初始选中 */
const initSelected = () => {
  const src =
    props.modelValue != null && (props.modelValue as any).toString() !== ''
      ? props.modelValue
      : props.defaultDate
  if (src == null) {
    selectedDates.value = []
    return
  }
  if (Array.isArray(src)) {
    selectedDates.value = (src as number[]).map((t) => startOfDay(Number(t))).sort((a, b) => a - b)
  } else {
    selectedDates.value = [startOfDay(Number(src))]
  }
}
initSelected()

/** 外部 v-model 变化时同步选中态 */
watch(
  () => props.modelValue,
  (val) => {
    if (props.type === 'single') {
      selectedDates.value = val != null ? [startOfDay(Number(val))] : []
    } else {
      selectedDates.value = Array.isArray(val)
        ? (val as number[]).map((t) => startOfDay(Number(t))).sort((a, b) => a - b)
        : []
    }
  }
)

const hasSelected = computed(() => selectedDates.value.length > 0)

/** 星期表头 */
const weekdays = computed(() => {
  const names = ['日', '一', '二', '三', '四', '五', '六']
  const start = Number(props.firstDayOfWeek) % 7
  return Array.from({ length: 7 }, (_, i) => names[(start + i) % 7])
})

/** 是否可切换上月 */
const canGoPrev = computed(() => {
  if (props.minDate == null) return true
  const cur = new Date(viewYear.value, viewMonth.value, 1).getTime()
  const min = new Date(Number(props.minDate))
  min.setDate(1)
  min.setHours(0, 0, 0, 0)
  return cur > min.getTime()
})

/** 是否可切换下月 */
const canGoNext = computed(() => {
  if (props.maxDate == null) return true
  const cur = new Date(viewYear.value, viewMonth.value, 1).getTime()
  const max = new Date(Number(props.maxDate))
  max.setDate(1)
  max.setHours(0, 0, 0, 0)
  max.setMonth(max.getMonth() + 1)
  return cur < max.getTime() - 1
})

const prevMonth = () => {
  if (!canGoPrev.value) return
  viewMonth.value--
  if (viewMonth.value < 0) {
    viewMonth.value = 11
    viewYear.value--
  }
}

const nextMonth = () => {
  if (!canGoNext.value) return
  viewMonth.value++
  if (viewMonth.value > 11) {
    viewMonth.value = 0
    viewYear.value++
  }
}

interface DayCell {
  ts: number
  day: number
  today: boolean
  disabled: boolean
  selected: boolean
  inRange: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
}

/** 当前选中区间 (range) */
const rangeBounds = (): { start?: number; end?: number } => {
  if (props.type !== 'range') return {}
  const s = [...selectedDates.value].sort((a, b) => a - b)
  if (s.length >= 2) return { start: s[0], end: s[1] }
  if (s.length === 1) return { start: s[0] }
  return {}
}

/** 当前月份日期表 (含前置空位) */
const cells = computed<Array<DayCell | null>>(() => {
  const year = viewYear.value
  const month = viewMonth.value
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = new Date(year, month, 1).getDay()
  const leading = (firstWeekday - (Number(props.firstDayOfWeek) % 7) + 7) % 7

  const minTs = props.minDate != null ? startOfDay(Number(props.minDate)) : -Infinity
  const maxTs = props.maxDate != null ? startOfDay(Number(props.maxDate)) : Infinity
  const t = todayStart()
  const { start, end } = rangeBounds()

  const arr: Array<DayCell | null> = []
  for (let i = 0; i < leading; i++) arr.push(null)

  const selectedSet = new Set(selectedDates.value)

  for (let d = 1; d <= daysInMonth; d++) {
    const ts = new Date(year, month, d).getTime()
    const disabled = ts < minTs || ts > maxTs
    const inRange =
      !disabled && props.type === 'range' && start != null && end != null && ts > start && ts < end
    arr.push({
      ts,
      day: d,
      today: ts === t,
      disabled,
      selected: props.type === 'range' ? ts === start || ts === end : selectedSet.has(ts),
      inRange,
      isRangeStart: start != null && ts === start,
      isRangeEnd: end != null && ts === end,
    })
  }
  return arr
})

/** 返回按当前类型序列化后的选中值 */
const getSelectResult = (): unknown => {
  const s = [...selectedDates.value].sort((a, b) => a - b)
  if (props.type === 'single') return s[0]
  if (props.type === 'range') return s.length ? [s[0], s[1]] : []
  return s
}

const applySelection = (ts: number): unknown => {
  if (props.type === 'single') {
    selectedDates.value = [ts]
  } else if (props.type === 'multiple') {
    const idx = selectedDates.value.indexOf(ts)
    if (idx > -1) selectedDates.value.splice(idx, 1)
    else selectedDates.value.push(ts)
  } else {
    if (selectedDates.value.length === 0) {
      selectedDates.value = [ts]
    } else if (selectedDates.value.length === 1) {
      selectedDates.value.push(ts)
    } else {
      selectedDates.value = [ts]
    }
  }
  return getSelectResult()
}

const onSelect = (cell: DayCell) => {
  if (cell.disabled) return
  const result = applySelection(cell.ts)
  emit('select', result)
  emit('update:modelValue', result)
  // single 模式不显示确定按钮时直接确认并关闭
  if (props.type === 'single' && !props.showConfirm) {
    emit('confirm', result)
    emit('update:show', false)
  }
}

const onConfirm = () => {
  if (!hasSelected.value) return
  const result = getSelectResult()
  emit('confirm', result)
  emit('update:modelValue', result)
  emit('update:show', false)
}

const onCancel = () => {
  emit('cancel')
  emit('update:show', false)
}

const onUpdateShow = (v: boolean) => emit('update:show', v)
</script>

<style lang="scss">
.mx-calendar {
  font-size: var(--mx-font-size-md);
  background: var(--mx-background-2);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 16px;
  }

  &__cancel,
  &__header-right {
    min-width: 48px;
    font-size: var(--mx-font-size-sm);
  }

  &__cancel {
    color: var(--mx-text-color-2);
  }

  &__title {
    color: var(--mx-text-color);
    font-weight: var(--mx-font-weight-bold);
    font-size: var(--mx-font-size-lg);
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
  }

  &__nav-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 20px;
    font-weight: var(--mx-font-weight-bold);
    color: var(--mx-text-color);
    line-height: 1;

    &--disabled {
      color: var(--mx-text-color-3);
    }
  }

  &__nav-title {
    color: var(--mx-text-color);
    font-weight: var(--mx-font-weight-bold);
    font-size: var(--mx-font-size-md);
  }

  &__weekdays {
    display: flex;
    padding: 0 8px;
  }

  &__weekday {
    flex: 1;
    text-align: center;
    padding: 6px 0;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-xs);
  }

  &__days {
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px 8px;
  }

  &__cell {
    width: 14.2857%;
    padding: 4px 0;
  }

  &__day-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    height: 38px;
    box-sizing: border-box;
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: var(--mx-radius-max);
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
    box-sizing: border-box;

    &--today {
      color: var(--mx-primary-color);
      font-weight: var(--mx-font-weight-bold);
    }

    &--disabled {
      color: var(--mx-text-color-3);
    }

    &--in-range {
      border-radius: 0;
      background: var(--mx-primary-color);
      opacity: 0.12;
    }

    &--range-start,
    &--range-end {
      color: #fff;
      font-weight: var(--mx-font-weight-bold);
      background: var(--mx-primary-color);
    }

    &--selected:not(&--range-start):not(&--range-end) {
      color: #fff;
      font-weight: var(--mx-font-weight-bold);
      background: var(--mx-primary-color);
    }
  }

  &__body {
    max-height: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    padding: 8px 16px;
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
}
</style>
