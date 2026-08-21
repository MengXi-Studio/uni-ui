<template>
  <view class="mx-icon" :class="[{ 'mx-icon--dot': dot, badge ? 'mx-icon__badge--active' : '' }, customClass]" :style="iconStyle">
    <!-- 图片图标 -->
    <image
      v-if="imageSrc"
      class="mx-icon__image"
      :src="imageSrc"
      :style="{ width: iconSizeUnit, height: iconSizeUnit }"
      mode="aspectFit"
    />
    <!-- 字体/符号图标 -->
    <text
      v-else
      class="mx-icon__name"
      :class="name ? classPrefix + ' ' + classPrefix + '-' + name : ''"
      :style="{ color, fontSize: iconSizeUnit }"
      >{{ glyph }}</text
    >

    <!-- 徽标 -->
    <view v-if="badge || dot" class="mx-icon__badge" :style="badgeStyle">
      <text v-if="badge && !dot" class="mx-icon__badge-text">{{ badge }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 图标名称 (字体图标名或符号) */
    name: makeStringProp(''),
    /** 图片图标地址 */
    src: makeStringProp(''),
    /** 图片图标地址 (Vant 风格别名) */
    image: makeStringProp(''),
    /** 图标颜色 */
    color: makeStringProp(''),
    /** 图标尺寸 */
    size: makeNumericProp<number | string>('16px'),
    /** 字体类前缀 */
    classPrefix: makeStringProp('mx-icon'),
    /** 是否显示圆点 */
    dot: makeBooleanProp(false),
    /** 徽标内容 */
    badge: makeNumericProp<number | string | undefined>(undefined),
    /** 徽标背景色 */
    badgeColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    size: '16px',
    classPrefix: 'mx-icon',
  }
)

const imageSrc = computed(() => props.image || props.src || (looksLikeImage(props.name) ? props.name : ''))

/** 当 name 直接是 URL/路径时当作图片 */
function looksLikeImage(str: string): boolean {
  return /^(https?:)?\/\//.test(str) || /^\.{1,2}\//.test(str) || /^data:image/.test(str)
}

const iconSizeUnit = computed(() => addUnit(props.size))

const glyph = computed(() => (imageSrc.value ? '' : props.name))

const iconStyle = computed(() => {
  const base: Record<string, string> = {}
  if (props.color) base.color = props.color
  if (!imageSrc.value) base.fontSize = iconSizeUnit.value
  if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(base, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(base, props.customStyle as Record<string, string>)
  return base
})

const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.badgeColor) style.backgroundColor = props.badgeColor
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
.mx-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &__image {
    display: block;
  }

  &__name {
    line-height: 1;
  }

  &--dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--mx-danger-color);
    min-width: 8px;
    min-height: 8px;
  }

  &__badge {
    position: absolute;
    top: -6px;
    right: -10px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--mx-danger-color);
    color: #fff;
    font-size: 10px;
    line-height: 1;
    transform: translate(50%, -50%);

    &-text {
      color: #fff;
      font-size: 10px;
    }
  }
}
</style>