<template>
  <view class="mx-sign-board" :class="customClass" :style="customStyle">
    <!-- 签名区 -->
    <view class="mx-sign-board__area">
      <canvas
        :id="canvasId"
        class="mx-sign-board__canvas"
        :canvas-id="canvasId"
        :style="{ width: canvasW + 'px', height: canvasH + 'px', background: bgColor }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      />
      <text v-if="!hasStroke && tipText" class="mx-sign-board__tip">{{ tipText }}</text>
    </view>

    <!-- 操作按钮 -->
    <view v-if="closeButtonText || showConfirm" class="mx-sign-board__actions">
      <text
        v-if="closeButtonText"
        class="mx-sign-board__action mx-sign-board__action--clear"
        @click="onClear"
      >
        {{ closeButtonText }}
      </text>
      <text
        v-if="showConfirm"
        class="mx-sign-board__action mx-sign-board__action--submit"
        @click="onSubmit"
      >
        {{ confirmButtonText }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'

type Point = { x: number; y: number }

const props = defineProps({
  /** 笔画颜色 */
  color: makeStringProp('#000'),
  /** 笔迹线宽 */
  penSize: makeNumericProp<number | string>(3),
  /** 背景色 */
  bgColor: makeStringProp('#fff'),
  /** 生成图片 (v-model) */
  modelValue: makeStringProp(''),
  /** 空白时的提示文字 */
  tipText: makeStringProp(''),
  /** 清除按钮文字, 为空则不显示 */
  closeButtonText: makeStringProp('清除'),
  /** 确认按钮文字 */
  confirmButtonText: makeStringProp('确认'),
  /** 是否显示确认按钮 (true 时确定自动触发 submit) */
  confirm: makeBooleanProp(false),
  /** 签名区高度 (px) */
  height: makeNumericProp<number | string>(200),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
  (e: 'clear'): void
  (e: 'start'): void
  (e: 'end'): void
}>()

const instance = getCurrentInstance()
const canvasId = 'mx-sign-board-canvas'

const canvasW = ref(0)
const canvasH = computed(() => Number(props.height) || 200)

/** 笔迹集合: 一组 stroke 为一个连续的笔画 */
const strokes = ref<Point[][]>([])
let currentStroke: Point[] = []
let painting = false
let rect = { left: 0, top: 0 }

/** 当前是否已有笔迹 */
const hasStroke = computed(() => strokes.value.length > 0)

const showConfirm = computed(
  () => props.confirm || !props.closeButtonText || props.confirmButtonText
)

/* ---------- 画布尺寸测量 ---------- */
function measure() {
  const query = uni.createSelectorQuery().in(instance)
  query
    .select('.' + 'mx-sign-board__area')
    .boundingClientRect((res: any) => {
      if (res) {
        canvasW.value = res.width
        rect.left = res.left
        rect.top = res.top
      }
    })
    .exec()
}

/* ---------- 绘制 ---------- */
function draw() {
  const ctx = uni.createCanvasContext(canvasId, instance)
  ctx.setFillStyle(props.bgColor)
  ctx.fillRect(0, 0, canvasW.value, canvasH.value)
  ctx.setLineCap('round')
  ctx.setLineJoin('round')
  strokes.value.forEach((stroke) => drawStroke(ctx, stroke))
  if (currentStroke.length >= 2) drawStroke(ctx, currentStroke)
  ctx.draw()
}

function drawStroke(ctx: any, stroke: Point[]) {
  ctx.setStrokeStyle(props.color)
  ctx.setLineWidth(Number(props.penSize))
  ctx.beginPath()
  ctx.moveTo(stroke[0].x, stroke[0].y)
  for (let i = 1; i < stroke.length; i++) {
    ctx.lineTo(stroke[i].x, stroke[i].y)
  }
  ctx.stroke()
}

/* ---------- 触摸处理 ---------- */
function pointFromTouch(touch: any): Point {
  const x = touch.x !== undefined ? touch.x : touch.clientX
  const y = touch.y !== undefined ? touch.y : touch.clientY
  return { x: x - rect.left, y: y - rect.top }
}

function onTouchStart(e: any) {
  const touch = e.touches && e.touches[0]
  if (!touch) return
  painting = true
  currentStroke = [pointFromTouch(touch)]
  emit('start')
}

function onTouchMove(e: any) {
  if (!painting) return
  const touch = e.touches && e.touches[0]
  if (!touch) return
  currentStroke.push(pointFromTouch(touch))
  draw()
}

function onTouchEnd() {
  if (!painting) return
  if (currentStroke.length > 0) {
    strokes.value.push(currentStroke)
  }
  currentStroke = []
  painting = false
  draw()
  emit('end')
}

/* ---------- 导出与操作 ---------- */
function exportTempPath(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (canvasW.value <= 0) {
      reject(new Error('canvas size is zero'))
      return
    }
    uni.canvasToTempFilePath(
      {
        canvasId,
        x: 0,
        y: 0,
        width: canvasW.value,
        height: canvasH.value,
        destWidth: canvasW.value,
        destHeight: canvasH.value,
        success: (res: any) => resolve(res.tempFilePath),
        fail: reject,
      },
      instance
    )
  })
}

/** 将临时文件读取为 base64 (dataURL) */
function pathToDataURL(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const fs = uni.getFileSystemManager()
      const data = fs.readFileSync(filePath, 'base64')
      resolve('data:image/png;base64,' + data)
    } catch (err) {
      reject(err)
    }
  })
}

/** 清除画布 */
function onClear() {
  strokes.value = []
  currentStroke = []
  draw()
  emit('clear')
  emit('update:modelValue', '')
}

/** 确定 */
async function onSubmit() {
  try {
    const tempPath = await exportTempPath()
    emit('submit', tempPath)
    emit('update:modelValue', tempPath)
  } catch (err) {
    emit('update:modelValue', '')
  }
}

/** 获取 base64 dataURL (exposed) */
function getDataURL(): Promise<string> {
  return exportTempPath().then(pathToDataURL)
}

/** 清空 (exposed, 别名 onClear) */
function clear() {
  onClear()
}

/** 提交 (exposed, 别名 onSubmit) */
function submit() {
  return onSubmit()
}

defineExpose({ clear, submit, dataURL: getDataURL })

measure()
</script>

<style lang="scss">
.mx-sign-board {
  &__area {
    position: relative;
    width: 100%;
    border: 1px solid var(--mx-border-color);
    border-radius: var(--mx-radius-md);
    overflow: hidden;
  }

  &__canvas {
    display: block;
    width: 100%;
  }

  &__tip {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mx-text-color-3);
    font-size: 14px;
    text-align: center;
    pointer-events: none;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
    gap: 12px;
  }

  &__action {
    padding: 4px 12px;
    font-size: 14px;
    border-radius: var(--mx-radius-md);

    &--clear {
      color: var(--mx-text-color-2);
      border: 1px solid var(--mx-border-color);
    }

    &--submit {
      color: #fff;
      background: var(--mx-primary-color);
      border: 1px solid var(--mx-primary-color);
    }
  }
}
</style>
