<template>
	<view class="mx-pull-refresh" :class="[`mx-pull-refresh--${status}`, customClass]" :style="rootStyle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
		<!-- 下拉头部 (初始通过负位移隐藏) -->
		<view class="mx-pull-refresh__head" :style="headStyle">
			<slot v-if="status === 'pulling'" name="pulling">
				<text class="mx-pull-refresh__text">{{ pullingText }}</text>
			</slot>
			<slot v-else-if="status === 'loosing'" name="loosing">
				<text class="mx-pull-refresh__text">{{ loosingText }}</text>
			</slot>
			<slot v-else-if="status === 'success'" name="success">
				<text class="mx-pull-refresh__text">{{ successText }}</text>
			</slot>
			<slot v-else name="loading">
				<mx-loading :size="18" :color="'var(--mx-text-color-3)'" />
				<text class="mx-pull-refresh__text">{{ loadingText }}</text>
			</slot>
		</view>

		<!-- 内容区: 跟随位移 -->
		<view class="mx-pull-refresh__content" :style="contentStyle">
			<slot />
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { addUnit } from '../../utils/unit'
import MxLoading from '../mx-loading/mx-loading.vue'

type RefreshStatus = 'pulling' | 'loosing' | 'loading' | 'success'

const props = defineProps({
	/** 是否处于加载中 (v-model) */
	loading: makeBooleanProp(false),
	/** 头部高度 */
	headHeight: makeNumericProp<number | string>(50),
	/** 下拉提示 */
	pullingText: makeStringProp('下拉即可刷新'),
	/** 释放提示 */
	loosingText: makeStringProp('释放即可刷新'),
	/** 加载中提示 */
	loadingText: makeStringProp('加载中...'),
	/** 刷新成功提示 */
	successText: makeStringProp('刷新成功'),
	/** 成功提示展示时长 (ms) */
	successDuration: makeNumericProp<number>(500),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 触发刷新 */
	(e: 'refresh'): void
	/** 加载状态变化 (v-model) */
	(e: 'update:loading', value: boolean): void
}>()

const status = ref<RefreshStatus>('pulling')
const distance = ref(0)
const dragDiff = ref(0)

const headNum = computed(() => Number(props.headHeight) || 50)
const headUnit = computed(() => addUnit(props.headHeight) as string)

let startY = 0
let dragging = false
let successTimer: ReturnType<typeof setTimeout> | null = null

const rootStyle = computed(() => {
	const style: Record<string, string> = { overflow: 'hidden' }
	if (typeof props.customStyle === 'string' && props.customStyle) Object.assign(style, parseStyle(props.customStyle))
	else if (props.customStyle) Object.assign(style, props.customStyle as Record<string, string>)
	return style
})

const headStyle = computed<Record<string, string>>(() => ({
	height: headUnit.value,
	transform: `translate3d(0, ${distance.value - headNum.value}px, 0)`
}))

const contentStyle = computed<Record<string, string>>(() => ({
	transform: `translate3d(0, ${distance.value}px, 0)`
}))

const onTouchStart = (e: TouchEvent) => {
	if (status.value === 'loading') return
	startY = (e.touches[0] as unknown as { clientY: number }).clientY
	dragDiff.value = 0
	dragging = true
}

const onTouchMove = (e: TouchEvent) => {
	if (!dragging || status.value === 'loading') return
	const y = (e.touches[0] as unknown as { clientY: number }).clientY
	const diff = y - startY
	// 仅下拉
	if (diff <= 0) {
		distance.value = 0
		status.value = 'pulling'
		return
	}
	dragDiff.value = diff
	// 阻尼: 越拉阻力越大
	const resistance = Math.max(headNum.value, dragDiff.value) / headNum.value
	distance.value = Math.min(diff * (1 / resistance), headNum.value * 1.2)
	status.value = distance.value >= headNum.value ? 'loosing' : 'pulling'
}

const onTouchEnd = () => {
	if (!dragging) return
	dragging = false
	if (status.value === 'loading') return

	if (distance.value >= headNum.value) {
		// 达到阈值 -> 触发刷新
		status.value = 'loading'
		distance.value = headNum.value
		emit('update:loading', true)
		emit('refresh')
	} else {
		distance.value = 0
		status.value = 'pulling'
	}
}

/** 根据 v-model loading 对外部状态同步 */
watch(
	() => props.loading,
	val => {
		if (val) {
			status.value = 'loading'
			distance.value = headNum.value
		} else {
			// 刷新完成 -> 成功提示后复位
			if (status.value === 'loading') {
				status.value = 'success'
				distance.value = headNum.value
				if (successTimer) clearTimeout(successTimer)
				successTimer = setTimeout(
					() => {
						distance.value = 0
						status.value = 'pulling'
					},
					Number(props.successDuration) || 500
				)
			} else {
				distance.value = 0
				status.value = 'pulling'
			}
		}
	}
)

/** 实例: 手动触发刷新 */
const refresh = () => {
	if (status.value === 'loading') return
	status.value = 'loading'
	distance.value = headNum.value
	emit('update:loading', true)
	emit('refresh')
}

/** 实例: 校验当前是否可下拉刷新 */
const check = () => status.value === 'pulling'

function parseStyle(str: string): Record<string, string> {
	const obj: Record<string, string> = {}
	str.split(';').forEach(part => {
		const idx = part.indexOf(':')
		if (idx > -1) obj[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
	})
	return obj
}

defineExpose({
	/** 手动触发刷新 */
	refresh,
	/** 校验当前是否可下拉刷新 */
	check
})
</script>

<style lang="scss">
.mx-pull-refresh {
	position: relative;
	box-sizing: border-box;
	-webkit-overflow-scrolling: touch;

	&__head {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mx-text-color-3);
		font-size: var(--mx-font-size-sm);
		transition: transform 0.2s;
		will-change: transform;
	}

	&__text {
		margin: 0 8px;
	}

	&__content {
		will-change: transform;
	}
}
</style>
