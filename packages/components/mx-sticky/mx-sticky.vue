<template>
  <view class="mx-sticky" :class="customClass" :style="stickyStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeNumericProp } from '../../shared/props'
import { addUnit } from '../../../utils/unit'

const props = withDefaults(
  defineProps({
    /** 吸顶距离 */
    offsetTop: makeNumericProp<number | string>(0),
    /** 吸底距离 */
    offsetBottom: makeNumericProp<number | string | undefined>(undefined),
    /** z-index */
    zIndex: makeNumericProp<number | string>(99),
    customClass: { type: String, default: '' },
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const stickyStyle = computed(() => {
  const style: Record<string, string> = {
    position: 'sticky',
    zIndex: String(props.zIndex),
  }
  if (props.offsetBottom !== undefined) style.bottom = addUnit(props.offsetBottom) as string
  else style.top = addUnit(props.offsetTop) as string
  return style
})
</script>

<style lang="scss"></style>