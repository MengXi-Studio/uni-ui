<template>
	<section v-if="isComponentDoc" class="mobile-simulator">
		<!-- 工具条：缩放、新窗口打开 -->
		<div class="toolbar">
			<div class="toolbar-btn-group">
				<button class="toolbar-btn minus" @click="onMinus">-</button>
				<button class="toolbar-btn plus" @click="onPlus">+</button>
			</div>
			<div class="toolbar-scale-text">{{ scaleText }}</div>
			<a class="toolbar-link" :href="routePath" target="_blank" rel="noreferrer"> 在新窗口打开⤴ </a>
		</div>

		<!-- iPhone 机身 -->
		<div
			class="iphone"
			:style="{
				transform: `scale(${scale})`
			}">
			<!-- 屏幕 -->
			<div class="screen">
				<!-- 状态栏：时间 | 灵动岛 | 信号·WiFi·电池 -->
				<div class="statusbar">
					<span class="statusbar-time">9:41</span>
					<span class="statusbar-island" />
					<div class="statusbar-battery">
						<!-- 蜂窝信号 -->
						<svg viewBox="0 0 18 12" width="20" height="13">
							<g fill="currentColor">
								<rect x="0" y="8" width="3" height="4" rx="0.8" />
								<rect x="5" y="6" width="3" height="6" rx="0.8" />
								<rect x="10" y="3" width="3" height="9" rx="0.8" />
								<rect x="15" y="0" width="3" height="12" rx="0.8" />
							</g>
						</svg>
						<!-- WiFi（标准：点 + 两层同心弧） -->
						<svg viewBox="0 0 16 12" width="18" height="13">
							<path d="M8 9.8a1.5 1.5 0 1 0 0 .01z" fill="currentColor" />
							<path d="M8 6.4c1.7 0 3.3.7 4.4 1.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
							<path d="M8 2.9c2.9 0 5.5 1.2 7.5 3.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.9" />
						</svg>
						<!-- 电池（含约六成电量） -->
						<svg viewBox="0 0 27 13" width="26" height="13">
							<rect x="1" y="1" width="21" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.2" />
							<rect x="4" y="3.5" width="11" height="6" rx="1.5" fill="currentColor" opacity="0.95" />
							<rect x="23.5" y="4" width="3" height="5" rx="1" fill="currentColor" />
						</svg>
					</div>
				</div>

				<!-- 展示内容：同页渲染 demo-live 注册的当前组件 -->
				<div class="sim-content">
					<component :is="getDemo(slot)" v-for="slot in slots" :key="slot" />
				</div>

				<!-- 底部指示条 -->
				<div class="home-indicator"></div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { h } from 'vue'
import type { Slot, VNode } from 'vue'
import { useRoute } from 'vitepress'
import { simulatorSlots } from '../simulator-store'

const route = useRoute()

// 仅组件文档页显示模拟器（含 base 前缀与 /en/：path 为 /uni-ui/components/... /uni-ui/en/components/...）
const isComponentDoc = computed(() => route.path.includes('/components/'))
const routePath = computed(() => route.path)

const slots = computed(() => simulatorSlots.value)

// 每个插槽缓存为稳定的内联渲染组件，避免身份变化反复卸载导致事件丢失
const demoCache = new Map<Slot, { render: () => VNode }>()
function getDemo(slot: Slot) {
	if (!demoCache.has(slot)) {
		demoCache.set(slot, { render: () => h('div', { class: 'mx-sim__demo' }, slot()) })
	}
	return demoCache.get(slot)!
}

// ============================ scale ============================
const scale = ref(1)
const scaleText = computed(() => {
	return Math.round(scale.value * 100) + '%'
})
const onMinus = () => {
	scale.value = Math.max(scale.value - 0.05, 0.5)
}
const onPlus = () => {
	scale.value = Math.min(scale.value + 0.05, 1)
}
</script>
<style scoped lang="scss">
/* ===== 工具条（对齐 Sard） ===== */
.toolbar {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 54px;
	padding: 0 16px;
	border-radius: 9999px;
	background: rgb(0.139 0.139 0.139);
	margin-bottom: 10px;

	&::after {
		content: '';
		position: absolute;
		pointer-events: none;
		top: 1px;
		right: 1px;
		bottom: 1px;
		left: 1px;
		border: 2px solid rgb(62 62 62);
		border-radius: 9999px;
	}
}
.toolbar-btn-group {
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
.toolbar-btn {
	color: #c4c4c4;
	&:is(button) {
		width: 50px;
		height: 30px;
		font-size: 20px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		&:first-child {
			border-top-left-radius: 9999px;
			border-bottom-left-radius: 9999px;
		}
		&:last-child {
			border-left: 0;
			border-top-right-radius: 9999px;
			border-bottom-right-radius: 9999px;
		}
	}
}
.toolbar-scale-text {
	color: #fff;
	font-size: 14px;
	margin-left: 8px;
}
.toolbar-link {
	margin-left: auto;
	color: #fff;
	font-size: 12px;
}

/* ===== iPhone 机身（对齐 Sard MobileEmulator 原样） ===== */
.iphone {
	position: relative;
	width: 393px;
	height: 852px;
	padding: 12px;
	background: #1a1a1a;
	border-radius: 58px;
	box-shadow:
    /* 外发光 */
		0 0 0 2px rgba(255, 255, 255, 0.08),
		/* 机身厚度 */ 0 0 0 4px #2a2a2a,
		0 0 0 6px rgba(0, 0, 0, 0.3),
		/* 主阴影 */ 0 2px 16px rgba(0, 0, 0, 0.8);
	overflow: hidden;
	transform-origin: top center;
}
/* 钛金属边框 */
.iphone::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border-radius: 58px;
	padding: 3px;
	background: linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 20%, #1a1a1a 50%, #2a2a2a 80%, #4a4a4a 100%);
	-webkit-mask:
		linear-gradient(#fff 0 0) content-box,
		linear-gradient(#fff 0 0);
	mask:
		linear-gradient(#fff 0 0) content-box,
		linear-gradient(#fff 0 0);
	-webkit-mask-composite: xor;
	mask-composite: exclude;
	pointer-events: none;
	z-index: 10;
}
/* 边框高光 */
.iphone::after {
	content: '';
	position: absolute;
	top: 3px;
	right: 3px;
	bottom: 3px;
	left: 3px;
	border-radius: 55px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	pointer-events: none;
	z-index: 11;
}

/* ===== 屏幕 ===== */
.screen {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background: #000;
	border-radius: 48px;
	overflow: hidden;
}
/* 屏幕内边框 */
.screen::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border-radius: 48px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
	pointer-events: none;
	z-index: 100;
}
/* 状态栏（悬浮在内容上，透明，跟随主题黑/白字） */
.statusbar {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 6;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 54px;
	padding: 0 24px;
	color: #000;
	background: transparent;
	pointer-events: none;
}
/* 暗色下状态栏文字/图标变白：见 style.css（html.dark .mobile-simulator .statusbar） */
.statusbar-time {
	display: flex;
	align-items: center;
	gap: 6px;
	padding-top: 2px;
	font-size: 15px;
	font-weight: 600;
}
/* 灵动岛（Sard 原样：126×36，全胶囊） */
.statusbar-island {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 126px;
	height: 36px;
	background: #000;
	border-radius: 9999px;
}
.statusbar-battery {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 20px;
}
/* 展示内容滚动区 */
.sim-content {
	flex: 1;
	padding-top: 54px;
	overflow-y: auto;
	overscroll-behavior: contain;
	background: #f7f8fa;
}
/* 底部指示条 */
.home-indicator {
	position: absolute;
	bottom: 8px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 101;
	width: 134px;
	height: 5px;
	border-radius: 3px;
	background: #000;
}
</style>
