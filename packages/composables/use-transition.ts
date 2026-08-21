/**
 * useTransition: 通用显隐 + CSS 动画过渡 (多端兼容)
 * 由于小程序端不支持 Vue <transition>, 这里统一采用:
 *  - render/leaving 控制挂载与离场保留
 *  - 通过切换 enter/leave 动画类触发 CSS keyframes
 *  - 离场动画结束后延迟卸载
 */
import { computed, onUnmounted, ref, watch, type Ref } from 'vue'

export function useTransition(show: Ref<boolean>, duration = 300) {
  /** 是否挂载到 DOM */
  const render = ref(false)
  /** 是否处于离场动画中 */
  const leaving = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const enter = () => {
    clearTimer()
    render.value = true
    leaving.value = false
  }

  const leave = () => {
    leaving.value = true
    clearTimer()
    timer = setTimeout(() => {
      render.value = false
      leaving.value = false
    }, duration)
  }

  watch(
    show,
    (val) => {
      if (val) enter()
      else leave()
    },
    { immediate: true }
  )

  onUnmounted(clearTimer)

  /** 应用在根节点上的动画类 (enter/leave/空) */
  const transitionClass = computed(() => {
    if (!render.value) return ''
    return show.value ? 'mx--enter' : 'mx--leave'
  })

  return { render, leaving, enter, leave, transitionClass }
}