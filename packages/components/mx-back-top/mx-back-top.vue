<template>
  <view
    v-if="visible"
    class="mx-back-top"
    :class="customClass"
    :style="backTopStyle"
    :hover-class="'mx-back-top--hover'"
    @click="onClick"
  >
    <text v-if="icon" class="mx-back-top__icon">{{ icon }}</text>
    <text v-if="text" class="mx-back-top__text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 是否显示 (v-model, 双向) */
    modelValue: makeBooleanProp(false),
    /** 距右偏移 */
    right: makeNumericProp<number>(30),
    /** 距底偏移 */
    bottom: makeNumericProp<number>(40),
    /** z-index */
    zIndex: makeNumericProp<number | string>(999),
    /** 出现阈值: 页面滚动超过该高度显示 */
    offsetTop: makeNumericProp<number>(0),
    /** 图标 (Emoji 或字符) */
    icon: makeStringProp(''),
    /** 文字 */
    text: makeStringProp(''),
    /** 是否自动监听页面滚动 */
    teleportOnScroll: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    right: 30,
    bottom: 40,
    zIndex: 999,
    offsetTop: 0,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click'): void
  (e: 'scroll', detail: { scrollTop: number }): void
}>()

const visible = computed(() => props.modelValue)

const backTopStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(props.zIndex),
    right: addUnit(props.right as any) as string,
    bottom: addUnit(props.bottom as any) as string,
  }
  if (typeof props.customStyle === 'string' && props.customStyle) {
    Object.assign(style, parseStyle(props.customStyle))
  } else if (props.customStyle) {
    Object.assign(style, props.customStyle as Record<string, string>)
  }
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

/** 滚动回调: 根据阈值决定显示/隐藏并回写 v-model */
const onPageScroll = (detail: { scrollTop: number }) => {
  const scrollTop = detail.scrollTop || 0
  const shouldShow = scrollTop >= Number(props.offsetTop)
  emit('scroll', { scrollTop })
  if (shouldShow !== props.modelValue) emit('update:modelValue', shouldShow)
}

// 自动监听页面滚动 (uni API, 多端兼容; 不依赖 document/window)
if (props.teleportOnScroll) {
  const ready = typeof uni !== 'undefined'
  if (ready && typeof uni.onPageScroll === 'function') {
    uni.onPageScroll(onPageScroll as any)
  }
}

onUnmounted(() => {
  if (typeof uni !== 'undefined' && typeof uni.offPageScroll === 'function') {
    uni.offPageScroll(onPageScroll as any)
  }
})

const scrollToTop = () => {
  if (typeof uni !== 'undefined' && typeof uni.pageScrollTo === 'function') {
    uni.pageScrollTo({ scrollTop: 0, duration: 300 })
  }
}

const onClick = () => {
  emit('click')
  scrollToTop()
}
</script>

<style lang="scss">
.mx-back-top {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--mx-radius-max);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  background: var(--mx-background-2);
  color: var(--mx-text-color);
  box-sizing: border-box;

  &--hover {
    background: var(--mx-active-color);
  }

  &__icon {
    font-size: 18px;
    line-height: 1;
  }

  &__text {
    margin-top: 2px;
    font-size: 10px;
    line-height: 1;
  }
}
</style>