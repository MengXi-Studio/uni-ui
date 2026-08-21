<template>
  <view class="mx-tabs" :class="customClass" :style="tabsStyle">
    <scroll-view
      scroll-x
      :show-scrollbar="false"
      class="mx-tabs__nav"
      :class="{ 'mx-tabs__nav--sticky': sticky }"
      :scroll-with-animation="true"
      :scroll-left="scrollLeft"
    >
      <view class="mx-tabs__wrap">
        <mx-tab
          v-for="(pane, index) in panes"
          :key="pane.name"
          :title="pane.title"
          :name="String(pane.name)"
          :disabled="pane.disabled"
          @click="clickTab(pane, index)"
        />
        <view v-if="panes.length" class="mx-tabs__line" :style="lineStyle" />
      </view>
    </scroll-view>

    <view class="mx-tabs__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, provide, reactive, ref } from 'vue'
import { makeBooleanProp, makeNumericProp, makeStringProp } from '../shared/props'
import MxTab from '../mx-tab/mx-tab.vue'

type Pane = { name: string | number; index?: number; title: string; disabled: boolean }

const props = withDefaults(
  defineProps({
    /** 当前激活标签名称 (v-model) */
    modelValue: makeNumericProp<string | number>(''),
    /** 是否吸顶 */
    sticky: makeBooleanProp(false),
    /** 是否开启切换动画 */
    animated: makeBooleanProp(false),
    /** 是否开启手势滑动切换 */
    swipeable: makeBooleanProp(false),
    /** 底部指示条宽度 */
    lineWidth: makeNumericProp<string | number>(40),
    /** 激活颜色 */
    activeColor: makeStringProp(''),
    /** 未激活文字颜色 */
    color: makeStringProp(''),
    /** 指示条颜色, 默认跟随 activeColor */
    lineColor: makeStringProp(''),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    lineWidth: 40,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', name: string | number): void
  (e: 'change', name: string | number, title: string): void
  (e: 'click-tab', name: string | number, title: string): void
}>()

const instance = getCurrentInstance()
const scrollLeft = ref(0)

const panes = reactive<Pane[]>([])

const currentActive = computed(() => {
  const v = props.modelValue
  if (v === '' || v === undefined || v === null) return panes[0]?.name ?? ''
  return v
})

/** 供 mx-tab-pane 注册自身 */
const register = (pane: Omit<Pane, 'index'>) => {
  if (!panes.some((p) => p.name === pane.name)) panes.push(pane)
}

const setActive = (name: string | number, title = '') => {
  if (currentActive.value !== name) emit('update:modelValue', name)
  emit('change', name, title)
  scrollIntoView(name)
}

const findIndex = (name: string | number) => {
  const idx = panes.findIndex((p) => p.name === name)
  return idx === -1 ? 0 : idx
}

const activeIndex = computed(() => findIndex(currentActive.value))

const lineStyle = computed<Record<string, string>>(() => {
  const style: Record<string, string> = {}
  const idx = activeIndex.value
  const count = Math.max(1, panes.length)
  style.width = `${Number(props.lineWidth)}px`
  style.left = `calc(${(idx + 0.5) * (100 / count)}% - ${Number(props.lineWidth) / 2}px)`
  style.background = props.lineColor || props.activeColor || 'var(--mx-primary-color)'
  return style
})

function scrollIntoView(name: string | number) {
  const idx = findIndex(name)
  const count = panes.length
  const offset = idx * (100 / count)
  const half = 50 / count
  scrollLeft.value = Math.max(0, offset * 2000 - 30)
  void half
}

provide('mxTabs', {
  active: currentActive,
  activeColor: computed(() => props.activeColor),
  color: computed(() => props.color),
  lineWidth: computed(() => props.lineWidth),
  setActive,
  register,
})

provide('mxTabPaneRegister', register)
defineExpose({ register, panes, setActive, currentActive })

const clickTab = (pane: Pane, index: number) => {
  void index
  emit('click-tab', pane.name, pane.title)
  if (pane.disabled) return
  setActive(pane.name, pane.title)
}

const onSticky = () => props.sticky
void onSticky

onMounted(() => {
  const iv = props.modelValue
  if ((iv === '' || iv === undefined || iv === null) && panes.length) {
    emit('update:modelValue', panes[0].name)
  }
  void instance
})

const tabsStyle = props.customStyle
</script>

<style lang="scss">
.mx-tabs {
  &__nav {
    background: var(--mx-background-2);
    white-space: nowrap;
  }

  &__wrap {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 44px;
  }

  &__line {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: var(--mx-primary-color);
    border-radius: 2px;
    transition: left 0.3s var(--mx-ease-in-out);
  }
}
</style>