<template>
	<section v-if="isComponentDoc" class="mobile-simulator">
		<!-- iPhone -->
		<div class="sard-mobile-device">
			<!-- 屏幕 -->
			<div class="sard-mobile-screen">
				<!-- 状态栏 -->
				<div class="sard-mobile-statusbar">
					<span class="sard-mobile-time">9:41</span>
					<span class="sard-mobile-notch" />
					<div class="sard-mobile-battery">
						<svg viewBox="0 0 25 11" width="18" height="8">
							<path fill="currentColor" d="M0 9.5h.9V4.5h2.4v5h.9v-7h-4.2v7zM5 9.5h.9V2.2h2.4v7.3h.9V1.3H5v8.2zM9.9 9.5h.9V.5h2.5v9h1V.5h-5v9zM15 9.5h.9V7.2h2.5v2.3h.9V6.2H15v3.3z" />
						</svg>
						<svg viewBox="0 0 8 5" width="6" height="4">
							<path d="M0 0v2.5c0 0 1 2.5 3.9 2.5 2.9 0 4-2.5 4-2.5V0H0z" fill="currentColor" />
						</svg>
						<svg viewBox="0 0 26 12" width="18" height="9">
							<path d="M2 1.5v9c0 1-.5 1.5-1.5 1.5S0 11.5 0 10.5v-9C0 .5.5 0 0 0h3.5C4.5 0 5 .5 5 1v10" fill="none" stroke="currentColor" stroke-width="0.8" />
						</svg>
					</div>
				</div>

				<!-- 演示内容：同页渲染 demo-live 注册的当前组件 -->
				<div class="sard-mobile-content">
					<component :is="getDemo(slot)" v-for="slot in slots" :key="slot" />
				</div>

				<!-- Home 指示条 -->
				<div class="sard-mobile-home" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { Slot, VNode } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { simulatorSlots } from '../simulator-store'

const route = useRoute()

// 仅组件文档页显示模拟器（含 base 前缀与 /en/：path 为 /uni-ui/components/... /uni-ui/en/components/...）
const isComponentDoc = computed(() => route.path.includes('/components/'))

const slots = computed(() => simulatorSlots.value)

// 每个插槽缓存为稳定的内联渲染组件，避免身份变化反复卸载导致事件丢失
const demoCache = new Map<Slot, { render: () => VNode }>()
function getDemo(slot: Slot) {
	if (!demoCache.has(slot)) {
		demoCache.set(slot, { render: () => h('div', { class: 'mx-sim__demo' }, slot()) })
	}
	return demoCache.get(slot)!
}
</script>
