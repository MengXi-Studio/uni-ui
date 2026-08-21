<template>
  <view
    class="mx-grid-item"
    :class="[{ 'mx-grid-item--square': square }, customClass]"
    :style="itemStyle"
    @click="onClick"
  >
    <view
      class="mx-grid-item__content"
      :class="{ 'mx-grid-item__content--center': center, 'mx-grid-item__content--border': border }"
    >
      <view class="mx-grid-item__icon" :style="iconStyle">
        <image
          v-if="imageIcon"
          class="mx-grid-item__icon-image"
          :src="icon"
          mode="aspectFit"
          :style="iconBoxStyle"
        />
        <text v-else class="mx-grid-item__icon-char">{{ icon }}</text>
      </view>
      <text v-if="text" class="mx-grid-item__text">{{ text }}</text>
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { makeStringProp } from '../shared/props'

type GridContext = {
  columnNum: { value: number }
  gutter: { value: number }
  border: { value: boolean }
  square: { value: boolean }
  iconSize: { value: string }
}

const grid = inject<GridContext>('mxGrid', {
  columnNum: { value: 4 },
  gutter: { value: 0 },
  border: { value: true },
  square: { value: false },
  iconSize: { value: '' },
})

const props = defineProps({
  /** 图标 (图片地址或字符) */
  icon: makeStringProp(''),
  /** 图标下方文字 */
  text: makeStringProp(''),
  /** 自定义图标颜色 */
  iconColor: makeStringProp(''),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const columnNum = computed(() => grid.columnNum.value || 4)
const gutter = computed(() => grid.gutter.value || 0)
const border = computed(() => grid.border.value)
const square = computed(() => grid.square.value)

const imageIcon = computed(
  () =>
    /^(https?:)?\/\//.test(props.icon) ||
    /^\.{1,2}\//.test(props.icon) ||
    /^data:image/.test(props.icon)
)

const itemStyle = computed(() => {
  const style: Record<string, string> = {
    width: `calc((100% - ${gutter.value * (columnNum.value - 1)}px) / ${columnNum.value})`,
    boxSizing: 'border-box',
  }
  if (gutter.value > 0) style.marginRight = `${gutter.value}px`
  if (gutter.value > 0) style.marginBottom = `${gutter.value}px`
  if (square.value) style.height = style.width
  if (typeof props.customStyle === 'string' && props.customStyle)
    Object.assign(style, parseStyle(props.customStyle))
  else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
  return style
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (grid.iconSize.value) style.fontSize = grid.iconSize.value
  if (props.iconColor) style.color = props.iconColor
  return style
})

const iconBoxStyle = computed(() => {
  const size = grid.iconSize.value ? grid.iconSize.value : '32px'
  return { width: size, height: size }
})

const onClick = (event: Event) => emit('click', event)

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
.mx-grid-item {
  position: relative;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: 16px 8px;
    background: var(--mx-background-2);

    &--border {
      border-right: 1px solid var(--mx-border-color);
      border-bottom: 1px solid var(--mx-border-color);
    }

    &--center {
      justify-content: center;
    }
  }

  &--square {
    .mx-grid-item__content {
      height: 100%;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mx-text-color);
    font-size: 32px;
    line-height: 1;

    &-char {
      line-height: 1;
    }

    &-image {
      display: block;
    }
  }

  &__text {
    max-width: 100%;
    margin-top: 8px;
    color: var(--mx-text-color);
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    word-break: break-all;
  }

  &__content + &__text {
    margin-top: 4px;
  }
}
</style>
