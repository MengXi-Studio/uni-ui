<template>
	<view class="mx-form" :class="customClass" :style="customStyle">
		<slot />
	</view>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { makeStringProp, makeObjectProp, makeNumericProp } from '../shared/props'
import { useExpose } from '../../composables/use-expose'
import { isEmpty } from '../../utils/validator'

type FieldAlign = 'left' | 'right' | 'top'

export interface FormRule {
	/** 是否必填 */
	required?: boolean
	/** 正则校验 */
	pattern?: RegExp
	/** 最小长度 */
	min?: number
	/** 最大长度 */
	max?: number
	/** 自定义校验函数, 返回 false / string / Promise */
	validator?: (value: unknown, model: Record<string, unknown>, field: string) => boolean | string | Promise<boolean | string>
	/** 校验失败提示信息 */
	message?: string
}

export type FormRules = Record<string, FormRule[]>

type Errors = Record<string, string>

const props = defineProps({
	/** 表单数据对象 */
	model: { type: Object as any, required: true } as any,
	/** 校验规则 */
	rules: makeObjectProp<FormRules>({}),
	/** 标签宽度 */
	labelWidth: makeNumericProp<number | string | undefined>(undefined),
	/** 标签对齐 */
	labelAlign: makeStringProp<FieldAlign>('left'),
	/** 提交后是否自动触发表单内 requireValidator 字段 */
	scrollToError: { type: Boolean, default: false },
	customClass: makeStringProp(''),
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	(e: 'submit', values: Record<string, unknown>): void
	(e: 'failed', errors: Errors): void
}>()

const initial = reactive<Record<string, unknown>>({})

onBeforeMount(() => {
	Object.keys(props.model || {}).forEach(key => {
		initial[key] = props.model[key]
	})
})

/** 单条规则校验, 返回错误信息或空串 */
async function runRule(field: string, value: unknown, rule: FormRule): Promise<string> {
	const msg = rule.message || ''
	if (rule.required && isEmpty(value)) {
		return msg || `${field} 为必填项`
	}
	if (value === '' || value === undefined || value === null) return ''
	if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
		return msg || `${field} 格式不正确`
	}
	if ((rule.min !== undefined || rule.max !== undefined) && typeof value === 'string') {
		const len = value.length
		if (rule.min !== undefined && len < rule.min) return msg || `${field} 长度不能小于 ${rule.min}`
		if (rule.max !== undefined && len > rule.max) return msg || `${field} 长度不能大于 ${rule.max}`
	}
	if (typeof rule.validator === 'function') {
		const res = await rule.validator(value, props.model || {}, field)
		if (res === false) return msg || `${field} 校验失败`
		if (typeof res === 'string' && res) return res
	}
	return ''
}

/** 校验全部或指定字段 */
async function validate(fields?: string | string[]): Promise<Errors> {
	const keys = fields ? (Array.isArray(fields) ? fields : [fields]) : Object.keys(props.rules || {})
	const errors: Errors = {}
	for (const field of keys) {
		const rules = (props.rules as FormRules)?.[field]
		if (!rules || !rules.length) continue
		const value = props.model ? props.model[field] : undefined
		for (const rule of rules) {
			const message = await runRule(field, value, rule)
			if (message) {
				errors[field] = message
				break
			}
		}
	}
	return errors
}

/** 重置表单数据到初始值并返回 */
function resetForm(values?: Record<string, unknown>): Record<string, unknown> {
	if (!props.model) return {}
	const model = props.model as Record<string, unknown>
	Object.keys(initial).forEach(key => {
		model[key] = initial[key]
	})
	if (values) Object.assign(model, values)
	return model
}

/** 校验并触发 submit / failed */
async function submitForm(): Promise<Errors | null> {
	const errors = await validate()
	if (Object.keys(errors).length) {
		emit('failed', errors)
		return errors
	}
	const values = { ...(props.model || {}) }
	emit('submit', values)
	return null
}

/** 对外暴露校验 / 重置 / 提交方法 */
useExpose({ validate, resetForm, submitForm })
</script>

<style lang="scss">
.mx-form {
	width: 100%;
}
</style>
