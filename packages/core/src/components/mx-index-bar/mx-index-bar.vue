<template>
	<view class="mx-index-bar" :class="customClass" :style="barStyle">
		<scroll-view ref="scrollViewRef" class="mx-index-bar__scroll" scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" @scroll="onScroll">
			<slot />
		</scroll-view>

		<view
			class="mx-index-bar__sidebar"
			:style="{ zIndex }"
			@touchstart.stop.prevent="onSidebarStart"
			@touchmove.stop.prevent="onSidebarMove"
			@touchend.stop.prevent="onSidebarEnd"
			@touchcancel.stop.prevent="onSidebarEnd">
			<view v-if="showTip" class="mx-index-bar__tip" :style="{ zIndex: +zIndex + 1 }">
				<text>{{ activeIndex }}</text>
			</view>
			<view v-for="item in indexList" :key="item" class="mx-index-bar__index" :class="{ 'mx-index-bar__index--active': item === activeIndex }" :data-index="item">
				<text>{{ item }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide, reactive, ref } from 'vue'
import { makeArrayProp, makeNumericProp, makeBooleanProp, makeStringProp } from '../shared/props'

type AnchorItem = { index: string }
type BarContext = {
	activeIndex: { value: string }
	setActive: (index: string) => void
	scrollTo: (index: string) => void
	register: (item: AnchorItem) => void
}

const props = defineProps({
	/** 索引字符列表 */
	indexList: makeArrayProp<string>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']),
	/** z-index */
	zIndex: makeNumericProp<number | string>(500),
	/** 是否吸附顶部的锚点索引栏 */
	sticky: makeBooleanProp(true),
	/** 顶部吸附高度 (rpx 使用) */
	stickyOffsetTop: makeNumericProp<number | string>(0),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 激活索引变化时触发 */
	(e: 'change', index: string): void
	/** 选中索引时触发 */
	(e: 'select', index: string): void
}>()

const instance = getCurrentInstance()
const scrollViewRef = ref<any>(null)
const scrollTop = ref(0)
const activeIndex = ref('')
const showTip = ref(false)

const anchors = reactive<AnchorItem[]>([])

const register = (item: AnchorItem) => {
	if (!anchors.some(a => a.index === item.index)) anchors.push(item)
}

const setActive = (index: string) => {
	if (activeIndex.value === index) return
	activeIndex.value = index
	emit('change', index)
	emit('select', index)
}

const context: BarContext = { activeIndex, setActive, scrollTo, register }
provide('mxIndexBar', context)

/** 滚动到指定索引对应的锚点 */
function scrollTo(index: string) {
	setActive(index)
	const scrollEl = scrollViewRef.value as any
	if (!scrollEl) return
	const query = uni.createSelectorQuery().in(scrollEl)
	query
		.selectAll('.mx-index-anchor')
		.fields({ rect: true, dataset: true }, (res: any[] = []) => {
			const target = res.find(r => r?.dataset?.index === String(index))
			if (target) {
				scrollTop.value = Math.max(0, target.top)
			} else {
				scrollTop.value = 0
			}
		})
		.exec()
}

function onSidebarStart(event: any) {
	showTip.value = true
	handleTouch(event)
}

function onSidebarMove(event: any) {
	handleTouch(event)
}

function onSidebarEnd(event: any) {
	showTip.value = false
	handleTouch(event)
}

function handleTouch(event: any) {
	// 依赖实际触摸位置, 延迟到 query 回调中统一处理
	const scrollEl = scrollViewRef.value as any
	if (!scrollEl) return
	const touch = (event.touches && event.touches[0]) || event.changedTouches?.[0]
	if (touch === undefined) return
	const query = uni.createSelectorQuery().in(scrollEl)
	query.select('.mx-index-bar__sidebar').boundingClientRect((rect: any) => {
		if (!rect) return
		const offsetY = (touch.clientY || 0) - rect.top
		const each = rect.height / props.indexList.length
		const rawIndex = Math.floor(offsetY / each)
		const clamped = Math.max(0, Math.min(props.indexList.length - 1, rawIndex))
		const index = props.indexList[clamped]
		if (index) scrollTo(index)
	})
	query.exec()
}

const onScroll = (event: any) => {
	// 滚动时同步当前所处的锚点 (简化: 不作高精度同步)
	void event
}

const barStyle = computed(() => {
	const style: Record<string, string> = {}
	style.zIndex = String(props.zIndex)
	if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
	else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
	return style
})

function parseStyle(str: string): Record<string, string> {
	const obj: Record<string, string> = {}
	str.split(';').forEach(part => {
		const idx = part.indexOf(':')
		if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
	})
	return obj
}

void instance
</script>

<style lang="scss">
.mx-index-bar {
	position: relative;

	&__scroll {
		width: 100%;
		height: 100%;
	}

	&__sidebar {
		position: fixed;
		top: 50%;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4px 2px;
		z-index: 500;
		transform: translateY(-50%);

		&--percentage {
			top: auto;
		}
	}

	&__index {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 16px;
		padding: 2px 4px;
		color: var(--mx-text-color-2);
		font-size: 10px;
		line-height: 18px;
		text-align: center;

		&--active {
			color: var(--mx-primary-color);
			font-weight: var(--mx-font-weight-bold);
		}
	}

	&__tip {
		position: absolute;
		top: 0;
		left: -44px;
		box-sizing: border-box;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mx-text-color);
		font-size: 14px;
		border-radius: 50%;
		background: var(--mx-background-2);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
		transform: translateY(-50%);

		text {
			color: var(--mx-text-color);
		}
	}
}
</style>
