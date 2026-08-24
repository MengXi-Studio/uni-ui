<template>
	<mx-popup :show="show" position="bottom" :round="true" @update:show="onUpdateShow">
		<view class="mx-area" :class="customClass" :style="customStyle">
			<view class="mx-area__toolbar">
				<text class="mx-area__cancel" @click="onCancel">{{ cancelButtonText }}</text>
				<text class="mx-area__title">{{ title }}</text>
				<text class="mx-area__confirm" @click="onConfirm">{{ confirmButtonText }}</text>
			</view>

			<view class="mx-area__columns">
				<picker-view class="mx-area__view" :value="viewValue" @change="onChange" @touchmove.stop.prevent>
					<picker-view-column v-for="(column, ci) in visibleColumns" :key="ci" class="mx-area__column">
						<view v-for="(option, oi) in column" :key="oi" class="mx-area__option" :class="{ 'mx-area__option--selected': oi === indexes[ci] }">
							<text class="mx-area__option-text">{{ option.text }}</text>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</mx-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { makeStringProp, makeBooleanProp, makeNumericProp, makeObjectProp } from '../shared/props'
import MxPopup from '../mx-popup/mx-popup.vue'

type PickOption = {
	text: string
	value: unknown
	code?: string
	children?: PickOption[]
	[k: string]: any
}

const props = defineProps({
	/** 是否显示 (v-model:show) */
	show: makeBooleanProp(false),
	/** 选中的地区编码: 数组 [provinceCode, cityCode, countyCode] 或单值 (v-model) */
	modelValue: { type: [String, Array, Number] as any, default: () => [] },
	/** 省市区数据, 键为 province/city/county 前缀映射 */
	areaList: makeObjectProp<Record<string, Record<string, string>>>({}),
	/** 列数, 2 = 省市级, 3 = 省市县级 */
	columnsNum: makeNumericProp<number | string>(3),
	/** 标题 */
	title: makeStringProp('所在地区'),
	/** 确认按钮文字 */
	confirmButtonText: makeStringProp('确认'),
	/** 取消按钮文字 */
	cancelButtonText: makeStringProp('取消'),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 显隐状态变化时触发 (用于 v-model:show) */
	(e: 'update:show', value: boolean): void
	/** 选中地区变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: any): void
	/** 点击确认时触发 */
	(e: 'confirm', value: { selectedValues: unknown[]; selectedOptions: PickOption[] }): void
	/** 点击取消时触发 */
	(e: 'cancel'): void
	/** 滑动切换选项时触发 */
	(e: 'change', value: { selectedValues: unknown[]; index: number }): void
}>()

const colNum = computed(() => (Number(props.columnsNum) === 2 ? 2 : 3))

/* ---------- 从 areaList 构建三级联动数据 ---------- */
const rootOptions = computed<PickOption[]>(() => {
	const pMap = props.areaList?.province_list || {}
	const cMap = props.areaList?.city_list || {}
	const tMap = props.areaList?.county_list || {}

	return Object.keys(pMap).map(pCode => {
		const prefix = pCode.slice(0, 2)
		const cities = Object.keys(cMap)
			.filter(c => c.startsWith(prefix))
			.map(cCode => {
				const cPrefix = cCode.slice(0, 4)
				const counties = Object.keys(tMap)
					.filter(t => t.startsWith(cPrefix))
					.map(tCode => ({ text: tMap[tCode], value: tCode, code: tCode }))
				return { text: cMap[cCode], value: cCode, code: cCode, children: counties }
			})
		return { text: pMap[pCode], value: pCode, code: pCode, children: cities }
	})
})

/** 每列选中索引 */
const indexes = ref<number[]>([])

/** 当前可见列 (省/市/区) */
const visibleColumns = computed<PickOption[][]>(() => {
	const cols: PickOption[][] = []
	let cur = rootOptions.value
	cols.push(cur)
	let lvl = 0
	while (lvl < colNum.value - 1 && indexes.value[lvl] !== undefined && cur && cur[indexes.value[lvl]]?.children?.length) {
		cur = cur[indexes.value[lvl]].children
		cols.push(cur)
		lvl++
	}
	return cols
})

const viewValue = computed(() => indexes.value.slice(0, visibleColumns.value.length))

/** 根据 modelValue 初始化选中索引 */
function syncFromModelValue() {
	const raw = Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : []
	const next: number[] = []
	const list = rootOptions.value
	let cur = list
	for (let lvl = 0; lvl < colNum.value; lvl++) {
		const target = String(raw[lvl] ?? '')
		const idx = (cur || []).findIndex(o => String(o.value) === target || String(o.code ?? o.value) === target)
		next[lvl] = idx >= 0 ? idx : 0
		cur = idx >= 0 ? cur[idx].children || [] : cur && cur[0]?.children
	}
	indexes.value = next
}

watch(
	() => props.show,
	show => {
		if (show) syncFromModelValue()
	}
)

watch(
	() => props.modelValue,
	() => {
		if (props.show) syncFromModelValue()
	},
	{ deep: true }
)

/* ---------- 事件 ---------- */
function currentOptions(): PickOption[] {
	return visibleColumns.value.map((col, i) => col[indexes.value[i]] || col[0])
}

const onChange = (event: unknown) => {
	const detail = (event as any).detail || {}
	const raw = detail.value
	const arr = (Array.isArray(raw) ? raw : [raw]).map((v: unknown) => Number(v))
	const prev = [...indexes.value]
	indexes.value = arr.slice(0, colNum.value)
	const index = arr.findIndex((v, i) => prev[i] !== v)
	emit('change', { selectedValues: currentOptions().map(o => o.value), index })
}

const onConfirm = () => {
	const selectedOptions = currentOptions()
	const selectedValues = selectedOptions.map(o => o.value)
	// 与模型约定一致: 返回编码数组
	const emitValue = Array.isArray(props.modelValue) || props.modelValue === undefined || props.modelValue === null ? selectedValues : (selectedValues[colNum.value - 1] ?? '')
	emit('update:modelValue', emitValue)
	emit('confirm', { selectedValues, selectedOptions })
	emit('update:show', false)
}

const onCancel = () => {
	emit('cancel')
	emit('update:show', false)
}

const onUpdateShow = (value: boolean) => emit('update:show', value)
</script>

<style lang="scss">
.mx-area {
	&__toolbar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 16px;
	}

	&__cancel,
	&__confirm {
		padding: 0 4px;
		font-size: 14px;
	}

	&__cancel {
		color: var(--mx-text-color-2);
	}

	&__confirm {
		color: var(--mx-primary-color);
		font-weight: var(--mx-font-weight-bold);
	}

	&__title {
		max-width: 50%;
		overflow: hidden;
		color: var(--mx-text-color);
		font-weight: var(--mx-font-weight-bold);
		font-size: 16px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__columns {
		height: 240px;
		overflow: hidden;
	}

	&__view {
		width: 100%;
		height: 100%;
	}

	&__column {
		height: 100%;
	}

	&__option {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 8px;
		height: 40px;
		color: var(--mx-text-color);
		font-size: 16px;

		&--selected {
			color: var(--mx-text-color);
			font-weight: var(--mx-font-weight-bold);
			font-size: 18px;
		}
	}

	&__option-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
