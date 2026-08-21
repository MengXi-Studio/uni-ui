/**
 * uni-app 标签 → Web 标签 shim
 * 让 uni 组件（使用 view/text/image 等 uni 标签）能在 VitePress（Web）中直接渲染。
 * 仅用于官网实时 Demo；真实多端运行仍依赖 uni-app 运行时。
 */
import { defineComponent, h } from 'vue'

function shim(tag: string) {
  return defineComponent({
    name: `uni-${tag}`,
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      return () => h(tag as string, { ...attrs }, slots.default?.())
    },
  })
}

export const View = shim('div')
export const Text = shim('span')
export const ScrollView = shim('div')
export const Swiper = shim('div')
export const SwiperItem = shim('div')
export const ViewP = shim('div')

export const Image = defineComponent({
  name: 'uni-image',
  inheritAttrs: false,
  setup(_props, { attrs, slots }) {
    const src = (attrs.src as string) ?? (attrs[':src'] as string) ?? ''
    return () => h('img', { ...attrs, src }, slots.default?.())
  },
})
