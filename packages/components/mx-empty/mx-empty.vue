<template>
  <view class="mx-empty" :class="customClass" :style="emptyStyle">
    <!-- 图片区: url 走 image, 内置类型 / 字符传 emoji -->
    <view class="mx-empty__image" :style="{ width: imageSizeUnit, height: imageSizeUnit }">
      <image
        v-if="isImageUrl"
        class="mx-empty__img"
        :src="image"
        mode="aspectFit"
        :style="{ width: imageSizeUnit, height: imageSizeUnit }"
      />
      <text v-else class="mx-empty__emoji" :style="{ fontSize: emojiFontSize }">{{ emojiText }}</text>
    </view>

    <!-- 描述文案 -->
    <text v-if="description" class="mx-empty__description">{{ description }}</text>

    <!-- 底部操作区 (默认插槽) -->
    <view v-if="$slots.default" class="mx-empty__bottom">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

/** 内置占位类型 -> emoji 字符 */
const EMOJI_MAP: Record<string, string> = {
  error: '💥',
  network: '📡',
  search: '🔍',
  cart: '🛒',
  message: '💬',
  default: '🛍',
}

const props = withDefaults(
  defineProps({
    /** 图片地址, 或内置类型 (error/network/search/cart/message/default), 或直接传 emoji 字符 */
    image: makeStringProp(''),
    /** 图片大小 */
    imageSize: makeNumericProp<number | string>('80px'),
    /** 描述文字 */
    description: makeStringProp(''),
    /** 图片文案色 (字符占位用) */
    imageColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    imageSize: '80px',
  }
)

/** 是否为真实图片地址 (http / 相对路径 / data:) */
const isImageUrl = computed(() => /^(https?:)?\/\//.test(props.image) || /^\.{1,2}\//.test(props.image) || /^data:image/.test(props.image))

/** 字符占位: emoji 映射或直接原样 */
const emojiText = computed(() => EMOJI_MAP[props.image] ?? (props.image ? props.image : EMOJI_MAP.default))

const imageSizeUnit = computed(() => addUnit(props.imageSize) as string)

const emojiFontSize = computed(() => (typeof props.imageSize === 'number' ? `${props.imageSize * 0.5}px` : '36px'))

const emptyStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.imageColor) style.color = props.imageColor
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
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
</script>

<style lang="scss">
.mx-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px 0;
  color: var(--mx-text-color-3);

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img {
    display: block;
  }

  &__emoji {
    line-height: 1;
  }

  &__description {
    margin-top: 16px;
    padding: 0 60px;
    color: var(--mx-text-color-3);
    font-size: var(--mx-font-size-md);
    line-height: var(--mx-line-height-md);
    text-align: center;
  }

  &__bottom {
    margin-top: 24px;
  }
}
</style>