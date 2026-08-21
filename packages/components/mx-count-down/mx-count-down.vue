<template>
  <view class="mx-count-down" :class="customClass" :style="customStyle">
    <template v-for="(seg, index) in formatSegments" :key="index">
      <!-- 时间片段: 支持以片段名命名的插槽覆盖显示 -->
      <slot v-if="seg.type === 'time'" :name="seg.token" :value="seg.value">
        <text class="mx-count-down__text">{{ seg.value }}</text>
      </slot>
      <!-- 分隔符 / 字面量 -->
      <text v-else class="mx-count-down__text">{{ seg.value }}</text>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../../shared/props'

/** 时间片段 token (按长度优先匹配) */
const TOKENS = ['DD', 'SS', 'HH', 'mm', 'ss', 'S'] as const
type Token = typeof TOKENS[number]

const props = withDefaults(
  defineProps({
    /** 倒计时总时长 (毫秒) */
    time: makeNumericProp<number>(0),
    /** 时间格式化 */
    format: makeStringProp('HH:mm:ss'),
    /** 是否自动开始 */
    autoStart: makeBooleanProp(true),
    /** 是否以毫秒为单位展示 (显示 S / SS 片段) */
    millisecond: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
  }
)

const emit = defineEmits<{
  (e: 'finish'): void
  (e: 'change', value: CountDownData): void
}>()

interface CountDownData {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  millisecond: number
}

/** 剩余时间 (ms) */
const remaining = ref(Math.max(0, Number(props.time)))
let timer: ReturnType<typeof setTimeout> | null = null
let baselineTime = 0
let baselineNow = 0
let running = false

/** 时间数据 (由 remaining 派生) */
const timeData = computed<CountDownData>(() => {
  const ms = Math.max(0, remaining.value)
  const seconds = Math.floor(ms / 1000)
  return {
    total: Number(props.time),
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    millisecond: ms % 1000,
  }
})

/** padStart 兼容小程序 */
const pad = (n: number, len = 2) => String(n).padStart(len, '0')

/** 将剩余 ms 格式化为各 token 的展示值 */
const tokenValue = (token: Token): string => {
  const d = timeData.value
  switch (token) {
    case 'DD':
      return pad(d.days)
    case 'HH':
      return pad(d.hours)
    case 'mm':
      return pad(d.minutes)
    case 'ss':
      return pad(d.seconds)
    case 'S':
      return String(Math.floor(d.millisecond / 100))
    case 'SS':
      return pad(Math.floor(d.millisecond / 10))
    default:
      return ''
  }
}

/** 解析 format 为片段数组 */
const formatSegments = computed<{ type: 'time' | 'text'; token?: Token; value: string }[]>(() => {
  const segs: { type: 'time' | 'text'; token?: Token; value: string }[] = []
  let i = 0
  const fmt = props.format
  while (i < fmt.length) {
    // 尝试匹配最长 token
    let matched: Token | null = null
    for (const tk of TOKENS) {
      if (fmt.startsWith(tk, i)) {
        matched = tk
        break
      }
    }
    if (matched) {
      segs.push({ type: 'time', token: matched, value: tokenValue(matched) })
      i += matched.length
    } else {
      segs.push({ type: 'text', value: fmt[i] })
      i += 1
    }
  }
  return segs
})

const emitChange = () => emit('change', { ...timeData.value })

/** 触发单帧逻辑 */
const tick = () => {
  baselineNow = Date.now()
  if (timer) clearTimeout(timer)
  const now = Date.now()
  const elapsed = now - baselineNow
  remaining.value = Math.max(0, baselineTime - elapsed)

  if (remaining.value <= 0) {
    remaining.value = 0
    running = false
    emitChange()
    emit('finish')
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    return
  }

  emitChange()
  timer = setTimeout(tick, props.millisecond ? 100 : 1000)
}

/** 开始倒计时 */
const start = () => {
  if (running) return
  if (remaining.value <= 0) {
    remaining.value = Math.max(0, Number(props.time))
  }
  baselineTime = remaining.value
  baselineNow = Date.now()
  running = true
  tick()
}

/** 暂停倒计时 */
const pause = () => {
  if (!running) return
  running = false
  // 记录剩余，用于恢复
  baselineTime = remaining.value
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

/** 重置并(可选)重启 */
const reset = (total?: number) => {
  if (total !== undefined) {
    remaining.value = Math.max(0, Number(total))
  } else {
    remaining.value = Math.max(0, Number(props.time))
  }
  baselineTime = remaining.value
  emitChange()
  if (running && timer) {
    clearTimeout(timer)
    timer = null
    tick()
  }
}

// autoStart: 初始为 true 时自动开始
if (props.autoStart) start()

// time prop 变化: 重置
watch(
  () => props.time,
  () => {
    remaining.value = Math.max(0, Number(props.time))
    baselineTime = remaining.value
    if (running && timer) tick()
  }
)

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  timer = null
})

/** instance 方法 */
defineExpose({ start, pause, reset, remaining })
</script>

<style lang="scss">
.mx-count-down {
  display: inline-flex;
  align-items: center;
  color: var(--mx-text-color);

  &__text {
    font-size: var(--mx-font-size-md);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
}
</style>