<template>
  <view
    v-if="transition.render"
    class="mx-image-preview"
    :class="[transition.transitionClass, customClass]"
    :style="rootStyle"
  >
    <!-- 遮罩渐变黑 -->
    <view class="mx-image-preview__overlay" />

    <!-- 关闭按钮 -->
    <text v-if="closeable" class="mx-image-preview__close" @click="onClose">×</text>

    <!-- 顶部索引 1/3 -->
    <view v-if="showIndex" class="mx-image-preview__index">{{ current + 1 }}/{{ images.length }}</view>

    <!-- 全屏 swiper 多图 -->
    <swiper
      class="mx-image-preview__swiper"
      :current="current"
      @change="onChange"
      @touchmove.stop
    >
      <swiper-item v-for="(img, i) in images" :key="i" class="mx-image-preview__item">
        <view class="mx-image-preview__image-wrap" @click="onClickImage">
          <image
            class="mx-image-preview__image"
            :src="img"
            mode="aspectFit"
            :style="zoomStyle"
            @click.stop
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp, makeArrayProp } from '../shared/props'
import { useTransition } from '../../composables/use-transition'

const props = withDefaults(
  defineProps({
    /** 是否显示 */
    show: makeBooleanProp(false),
    /** 图片地址列表 */
    images: makeArrayProp<string>([]),
    /** 初始展示第几张 */
    startPosition: makeNumericProp<number>(0),
    /** 是否显示关闭按钮 */
    closeable: makeBooleanProp(true),
    /** 是否显示索引 */
    showIndex: makeBooleanProp(true),
    /** 是否显示指示器 (轮播点) */
    showIndicators: makeBooleanProp(false),
    /** 是否显示遮罩 */
    overlay: makeBooleanProp(true),
    /** z-index */
    zIndex: makeNumericProp<number | string>(2000),
    /** 过渡时长 */
    duration: makeNumericProp<number | string>(300),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    show: false,
    images: [],
    startPosition: 0,
    closeable: true,
    showIndex: true,
    showIndicators: false,
    overlay: true,
    zIndex: 2000,
    duration: 300,
  }
)

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
  (e: 'change', value: number): void
}>()

const transition = useTransition(computed(() => props.show), Number(props.duration) || 300)

const current = ref(Number(props.startPosition) || 0)

// 打开时重置到起始位置
watch(
  () => props.show,
  (val) => {
    if (val) current.value = Number(props.startPosition) || 0
  }
)

/** 简化捏合缩放 */
const zoom = ref(1)

const rootStyle = computed(() => {
  const style: Record<string, string> = { zIndex: String(props.zIndex) }
  if (props.overlay) style.background = 'rgba(0, 0, 0, 0.9)'
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const zoomStyle = computed(() => (zoom.value !== 1 ? { transform: `scale(${zoom.value})` } : {}))

function parseStyle(str: string): Record<string, string> {
  const obj: Record<string, string> = {}
  str.split(';').forEach((part) => {
    const idx = part.indexOf(':')
    if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
  })
  return obj
}

const onChange = (event: any) => {
  const index = Number(event.detail.current) || 0
  zoom.value = 1
  current.value = index
  emit('change', index)
}

const onClickImage = () => {
  zoom.value = zoom.value === 1 ? 1.8 : 1
}

const onClose = () => {
  emit('close')
  emit('update:show', false)
}
</script>

<style lang="scss">
.mx-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.mx--enter {
    animation: mx-fade-in var(--mx-duration-base) both;
  }
  &.mx--leave {
    animation: mx-fade-out var(--mx-duration-base) both;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
  }

  &__close {
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 10;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28px;
    line-height: 1;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }

  &__index {
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    z-index: 9;
    color: #fff;
    font-size: var(--mx-font-size-md);
    text-align: center;
  }

  &__swiper {
    width: 100%;
    height: 100%;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>