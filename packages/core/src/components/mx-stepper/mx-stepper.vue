<template>
	<view class="mx-stepper" :class="[`mx-stepper--${theme}`, { 'mx-stepper--disabled': disabled }, customClass]" :style="customStyle">
		<view class="mx-stepper__minus" :class="{ 'mx-stepper__minus--disabled': minusDisabled }" @click="onMinus" @touchstart="onMinusStart" @touchend="onPressEnd" @touchcancel="onPressEnd">
			<text class="mx-stepper__minus-icon">−</text>
		</view>

		<input class="mx-stepper__input" :value="inputValue" :disabled="disabled" type="number" @blur="onBlur" @input="onInput" />

		<view class="mx-stepper__plus" :class="{ 'mx-stepper__plus--disabled': plusDisabled }" @click="onPlus" @touchstart="onPlusStart" @touchend="onPressEnd" @touchcancel="onPressEnd">
			<text class="mx-stepper__plus-icon">+</text>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { makeStringProp, makeNumericProp, makeBooleanProp } from '../shared/props'
import { toNumber } from '../../utils/unit'

type StepperTheme = 'default' | 'round' | 'red'

const props = defineProps({
	/** 当前值 */
	modelValue: { type: [Number, String] as any, default: '' },
	/** 最小值 */
	min: makeNumericProp(1),
	/** 最大值 */
	max: { type: Number, default: Infinity },
	/** 步长 */
	step: makeNumericProp(1),
	/** 是否只能输入整数 */
	integer: makeBooleanProp(false),
	/** 是否禁用 */
	disabled: makeBooleanProp(false),
	/** 主题风格: default / round / red */
	theme: makeStringProp<StepperTheme>('round'),
	/** 是否支持长按连续加减 */
	longPress: makeBooleanProp(true),
	/** 长按触发间隔 (ms) */
	longPressInterval: makeNumericProp<number | string>('200'),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 数值变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: number): void
	/** 数值变化时触发 */
	(e: 'change', value: number): void
	/** 数值超出边界时触发 */
	(e: 'overlimit', type: 'min' | 'max'): void
}>()

const min = computed(() => toNumber(props.min, 1))
const max = computed(() => (props.max === Infinity ? Infinity : toNumber(props.max)))
const step = computed(() => {
	const n = toNumber(props.step, 1)
	return n || 1
})

const current = computed(() => {
	if (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined) {
		return min.value
	}
	return toNumber(props.modelValue, min.value)
})

const clamped = computed(() => {
	let v = current.value
	if (v > max.value) v = max.value
	if (v < min.value) v = min.value
	return v
})

/** 输入框展示值 */
const inputValue = computed(() => (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined ? '' : String(clamped.value)))

const minusDisabled = computed(() => props.disabled || clamped.value <= min.value)
const plusDisabled = computed(() => {
	if (props.disabled) return true
	if (max.value === Infinity) return false
	return clamped.value >= max.value
})

let timer: ReturnType<typeof setInterval> | null = null

const emitChange = (value: number) => {
	emit('update:modelValue', value)
	emit('change', value)
}

const getStep = (delta: number) => {
	let next = current.value
	if (delta > 0) {
		if (next + step.value > max.value) {
			emit('overlimit', 'max')
			return
		}
		next += step.value
		if (next > max.value) next = max.value
	} else {
		if (next - step.value < min.value) {
			emit('overlimit', 'min')
			return
		}
		next -= step.value
		if (next < min.value) next = min.value
	}
	if (props.integer) next = Math.round(next)
	emitChange(next)
}

/** 点击 / 长按触发 */
const onMinus = () => {
	if (minusDisabled.value) return
	getStep(-1)
}
const onPlus = () => {
	if (plusDisabled.value) return
	getStep(1)
}

const onMinusStart = () => {
	if (!props.longPress || minusDisabled.value) return
	clearPress()
	timer = setInterval(
		() => {
			if (minusDisabled.value) {
				clearPress()
				return
			}
			getStep(-1)
		},
		toNumber(props.longPressInterval, 200)
	)
}

const onPlusStart = () => {
	if (!props.longPress || plusDisabled.value) return
	clearPress()
	timer = setInterval(
		() => {
			if (plusDisabled.value) {
				clearPress()
				return
			}
			getStep(1)
		},
		toNumber(props.longPressInterval, 200)
	)
}

const onPressEnd = () => clearPress()

const clearPress = () => {
	if (timer) {
		clearInterval(timer)
		timer = null
	}
}

/** 输入框变化: 允许自由输入, 失焦时校正 */
const onInput = (event: any) => {
	emit('update:modelValue', event.detail.value)
}

const onBlur = (event: any) => {
	const raw = event.detail.value
	if (raw === '' || raw === null || raw === undefined) {
		emitChange(min.value)
		return
	}
	let value = toNumber(raw, min.value)
	if (props.integer) value = Math.round(value)
	if (value < min.value) value = min.value
	if (max.value !== Infinity && value > max.value) value = max.value
	emitChange(value)
}

onBeforeUnmount(clearPress)
</script>

<style lang="scss">
.mx-stepper {
	display: inline-flex;
	align-items: center;
	color: var(--mx-text-color);
	user-select: none;

	&--disabled {
		cursor: not-allowed;
		opacity: var(--mx-disabled-opacity);
	}

	&__minus,
	&__plus {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 28px;
		height: 28px;
		background: var(--mx-background-2);
		border: 1px solid var(--mx-border-color);
		color: var(--mx-text-color);
		cursor: pointer;

		&--disabled {
			cursor: not-allowed;
			color: var(--mx-text-color-3);
		}
	}

	&__minus-icon,
	&__plus-icon {
		font-size: 18px;
		line-height: 1;
	}

	&__minus {
		border-radius: var(--mx-radius-md) 0 0 var(--mx-radius-md);
	}

	&__plus {
		border-radius: 0 var(--mx-radius-md) var(--mx-radius-md) 0;
	}

	&__input {
		box-sizing: border-box;
		width: 32px;
		height: 28px;
		padding: 0;
		color: var(--mx-text-color);
		font-size: 14px;
		text-align: center;
		background: var(--mx-background);
		border: 1px solid var(--mx-border-color);
		border-left: none;
		border-right: none;
	}

	&--round {
		.mx-stepper__minus,
		.mx-stepper__plus {
			border-radius: 50%;
			background: var(--mx-primary-color);
			border-color: var(--mx-primary-color);
		}

		.mx-stepper__minus-icon,
		.mx-stepper__plus-icon {
			color: #fff;
		}

		.mx-stepper__minus--disabled,
		.mx-stepper__plus--disabled {
			background: var(--mx-background);
			border-color: var(--mx-border-color);

			.mx-stepper__minus-icon,
			.mx-stepper__plus-icon {
				color: var(--mx-text-color-3);
			}
		}

		.mx-stepper__input {
			margin: 0 2px;
			border: none;
			background-color: transparent;
			text-align: center;
		}
	}

	&--red {
		.mx-stepper__minus,
		.mx-stepper__plus {
			background: var(--mx-danger-color);
			border-color: var(--mx-danger-color);
		}

		.mx-stepper__minus-icon,
		.mx-stepper__plus-icon {
			color: #fff;
		}

		.mx-stepper__minus--disabled,
		.mx-stepper__plus--disabled {
			background: var(--mx-background);
			border-color: var(--mx-border-color);

			.mx-stepper__minus-icon,
			.mx-stepper__plus-icon {
				color: var(--mx-text-color-3);
			}
		}
	}
}
</style>
