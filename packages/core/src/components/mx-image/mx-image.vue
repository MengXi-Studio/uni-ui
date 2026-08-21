<template>
  <view class="mx-image" :class="customClass" :style="wrapperStyle" @click="emit('click')">
    <image
      class="mx-image__img"
      :class="{ 'mx-image__img--round': round }"
      :src="src"
      :mode="mode"
      :style="imgStyle"
      @load="onLoad"
      @error="onError"
    />
    <!-- 加载占位 -->
    <view v-if="loading && showLoading" class="mx-image__loading">
      <slot name="loading"><mx-loading :size="20" /></slot>
    </view>
    <!-- 错误占位 -->
    <view v-else-if="error && showError" class="mx-image__error">
      <slot name="error"><text class="mx-image__error-text">加载失败</text></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../shared/props'
import { addUnit } from '../../utils/unit'
import MxLoading from '../mx-loading/mx-loading.vue'

const props = withDefaults(
  defineProps({
    /** 图片地址 */
    src: makeStringProp(''),
    /** 图片裁剪/缩放模式 */
    mode: makeStringProp('aspectFill'),
    /** 宽度 */
    width: makeNumericProp<number | string | undefined>(undefined),
    /** 高度 */
    height: makeNumericProp<number | string | undefined>(undefined),
    /** 圆角 */
    radius: makeNumericProp<number | string | undefined>(undefined),
    /** 是否圆形 */
    round: makeBooleanProp(false),
    /** 是否显示加载占位 */
    showLoading: makeBooleanProp(true),
    /** 是否显示错误占位 */
    showError: makeBooleanProp(true),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    mode: 'aspectFill',
    showLoading: true,
    showError: true,
  }
)

const emit = defineEmits<{ (e: 'click'): void; (e: 'load'): void; (e: 'error'): void }>()

const loading = ref(true)
const error = ref(false)

const wrapperStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width !== undefined) style.width = addUnit(props.width) as string
  if (props.height !== undefined) style.height = addUnit(props.height) as string
  if (props.radius !== undefined) style.borderRadius = addUnit(props.radius) as string
  if (props.round && props.radius === undefined) style.borderRadius = '50%'
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const imgStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width !== undefined) style.width = addUnit(props.width) as string
  if (props.height !== undefined) style.height = addUnit(props.height) as string
  return style
})

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

const onLoad = () => {
  loading.value = false
  error.value = false
  emit('load')
}

const onError = () => {
  loading.value = false
  error.value = true
  emit('error')
}
</script>

<style lang="scss">
.mx-image {
  position: relative;
  display: block;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__loading,
  &__error {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--mx-active-color);
    color: var(--mx-text-color-3);
    font-size: 12px;
  }
}
</style>