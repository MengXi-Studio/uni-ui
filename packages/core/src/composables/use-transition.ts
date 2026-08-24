import { computed, onUnmounted, ref, watch, type Ref } from 'vue'

/**
 * useTransition: 通用显隐 + CSS 动画过渡 (多端兼容)
 * 由于小程序端不支持 Vue <transition>, 这里统一采用:
 *  - render/leaving 控制挂载与离场保留
 *  - 通过切换 enter/leave 动画类触发 CSS keyframes
 *  - 离场动画结束后延迟卸载
 */
export function useTransition(show: Ref<boolean>, duration = 300) {
	/** 是否挂载到 DOM */
	const render = ref(false)
	/** 是否处于离场动画中 */
	const leaving = ref(false)
	/** 离场动画定时器 */
	let timer: ReturnType<typeof setTimeout> | null = null

	/** 清除离场动画定时器 */
	const clearTimer = () => {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
	}

	/** 进入动画 */
	const enter = () => {
		clearTimer()

		render.value = true
		leaving.value = false
	}

	/** 离场动画 */
	const leave = () => {
		leaving.value = true
		clearTimer()

		/** 离场动画结束后延迟卸载 */
		timer = setTimeout(() => {
			render.value = false
			leaving.value = false
		}, duration)
	}

	/** 监听 show 变化 */
	watch(
		show,
		val => {
			if (val) enter()
			else leave()
		},
		{ immediate: true }
	)

	/** 组件卸载时清除离场动画定时器 */
	onUnmounted(clearTimer)

	/** 应用在根节点上的动画类 (enter/leave/空) */
	const transitionClass = computed(() => {
		if (!render.value) return ''
		return show.value ? 'mx--enter' : 'mx--leave'
	})

	return { render, leaving, enter, leave, transitionClass }
}
