<template>
  <view v-show="active" class="mx-tab-pane" :class="customClass" :style="customStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { makeBooleanProp, makeStringProp } from '../shared/props'

type TabsContext = {
  active: { value: string | number }
  register: (pane: { name: string | number; title: string; disabled: boolean }) => void
}

const props = withDefaults(
  defineProps({
    /** 标签页名称 */
    name: makeStringProp(''),
    /** 标题 */
    title: makeStringProp(''),
    /** 是否禁用 */
    disabled: makeBooleanProp(false),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  })
)

const instance = getCurrentInstance()

const tabs = inject<TabsContext>('mxTabs', null)

const name = computed(() => (props.name !== '' ? props.name : props.title))

const active = computed(() => (tabs ? tabs.active.value === name.value : true))

onMounted(() => {
  tabs?.register({ name: name.value, title: props.title, disabled: props.disabled })
  void instance
})
</script>

<style lang="scss">
.mx-tab-pane {
  box-sizing: border-box;
}
</style>