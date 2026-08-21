<template>
  <view class="mx-lazyload" :class="customClass" :style="rootStyle" @click="onClick">
    <!-- 未加载: 占位 -->
    <view v-if="!loaded" class="mx-lazyload__placeholder" :style="placeholderStyle">
      <slot name="placeholder">
        <text class="mx-lazyload__placeholder-text">加载中…</text>
      </slot>
    </view>
    <!-- 已加载: 图片 -->
    <image
      v-else
      class="mx-lazyload__image"
      :src="image"
      :style="{ width: widthUnit, height: heightUnit }"
      mode="aspectFill"
      @load="onLoad"
      @error="onError"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import { addUnit } from '../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 图片地址 */
    image: makeStringProp(''),
    /** 宽度 */
    width: makeNumericProp<number | string | undefined>(undefined),
    /** 高度 (v-model 高度占位) */
    height: makeNumericProp<number | string | undefined>(undefined),
    /** 占位占位背景色 */
    placeholder: makeStringProp('#f2f3f5'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    image: '',
    placeholder: '#f2f3f5',
  }
)

const emit = defineEmits<{
  (e: 'load'): void
  (e: 'error'): void
  (e: 'click'): void
}>()

const loaded = ref(false)
const failed = ref(false)
let observer: any = null
let observed = false

const widthUnit = computed(() => addUnit(props.width))
const heightUnit = computed(() => addUnit(props.height))

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width !== undefined) style.width = addUnit(props.width) as string
  if (props.height !== undefined) style.height = addUnit(props.height) as string
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const placeholderStyle = computed(() => ({ background: props.placeholder }))

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

/** 进入视口触发加载 */
const triggerLoad = () => {
  if (loaded.value || observed) return
  observed = true
  loaded.value = true
  emit('load')
}

const observe = () => {
  // uni.createIntersectionObserver: H5 / 小程序 / App 均兼容
  try {
    const vm = getCurrentInstance()?.proxy
    const node = (uni.createIntersectionObserver as any)?.(vm, { observeAll: false })
    if (node) {
      observer = node
      node.relativeToViewport()
      node.observe('.mx-lazyload', () => triggerLoad())
      return
    }
  } catch (e) {
    /* ignore */
  }
  // 兜底: 直接加载
  triggerLoad()
}

const flush = () => {
  triggerLoad()
}

const resize = () => {}

const onLoad = () => {
  emit('load')
}

const onError = () => {
  failed.value = true
  emit('error')
}

const onClick = () => emit('click')

onMounted(() => {
  observe()
})

onUnmounted(() => {
  if (observer && typeof observer.disconnect === 'function') {
    observer.disconnect()
  }
  observer = null
})

defineExpose({ resize, flush, load: triggerLoad })
</script>

<style lang="scss">
.mx-lazyload {
  position: relative;
  display: block;
  overflow: hidden;

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__placeholder-text {
    color: #c8c9cc;
    font-size: 12px;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>