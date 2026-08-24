<template>
	<view class="mx-uploader" :class="customClass" :style="customStyle">
		<view class="mx-uploader__wrap">
			<!-- 文件预览 -->
			<view v-for="(file, index) in modelValue" :key="index" class="mx-uploader__preview" :class="{ 'mx-uploader__preview--disabled': disabled }" @click="onPreview(file, index)">
				<mx-image v-if="isImage(file)" class="mx-uploader__image" :src="fileUrl(file)" :width="previewSize" :height="previewSize" />
				<view v-else class="mx-uploader__file" :style="fileStyle">
					<text class="mx-uploader__file-name">{{ file.name || '文件' }}</text>
				</view>

				<!-- 删除按钮 -->
				<view v-if="!disabled" class="mx-uploader__delete" @click.stop="onDelete(file, index)">
					<text class="mx-uploader__delete-icon">×</text>
				</view>

				<!-- 状态遮罩 -->
				<view v-if="file.status && file.status !== 'done'" class="mx-uploader__mask">
					<text class="mx-uploader__mask-text">{{ statusText(file.status) }}</text>
				</view>
			</view>

			<!-- 添加按钮 -->
			<view v-if="!disabled && modelValue.length < maxCount" class="mx-uploader__upload" :class="{ 'mx-uploader__upload--readonly': readonly }" @click="onChoose">
				<text class="mx-uploader__upload-icon">＋</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeNumericProp, makeStringProp, makeBooleanProp } from '../shared/props'
import MxImage from '../mx-image/mx-image.vue'

type UploaderResultType = 'dataUrl' | 'text' | 'arrayBuffer'
type FileStatus = '' | 'uploading' | 'downloading' | 'done' | 'failed'

interface UploaderFile {
	url: string
	name?: string
	size?: number
	type?: string
	status?: FileStatus
	message?: string
	[key: string]: any
}

const props = defineProps({
	/** 已上传文件列表 (v-model) */
	modelValue: { type: Array as any, default: () => [] } as any,
	/** 最大上传数量 */
	maxCount: makeNumericProp<number | string>(1),
	/** 文件类型过滤 (逗号分隔的 MIME 或扩展名) */
	accept: makeStringProp('image/*'),
	/** 上传文件大小限制 (byte) */
	maxSize: makeNumericProp<number | string>(Infinity),
	/** 是否多选 */
	multiple: makeBooleanProp(false),
	/** 是否禁用上传 (仍可预览) */
	disabled: makeBooleanProp(false),
	/** 是否只读 (完全不可交互) */
	readonly: makeBooleanProp(false),
	/** 预览尺寸 (rpx / px / number) */
	previewSize: makeNumericProp<number | string>(80),
	/** 读取结果类型 */
	resultType: makeStringProp<UploaderResultType>('dataUrl'),
	/** 是否预览图片 */
	previewImage: makeBooleanProp(true),
	/** 自定义类名 */
	customClass: makeStringProp(''),
	/** 自定义样式 */
	customStyle: { type: [String, Object] as any, default: '' }
})

const emit = defineEmits<{
	/** 文件列表变化时触发 (用于 v-model) */
	(e: 'update:modelValue', value: UploaderFile[]): void
	/** 新增文件时触发 */
	(e: 'change', files: UploaderFile[], detail: { name: string; index: number }): void
	/** 文件大小超出限制时触发 */
	(e: 'oversize', file: UploaderFile, files: UploaderFile[]): void
	/** 删除文件时触发 */
	(e: 'delete', file: UploaderFile, detail: { name: string; index: number }): void
	/** 预览文件时触发 */
	(e: 'preview', file: UploaderFile, index: number): void
}>()

const fileStyle = computed(() => ({
	width: typeof props.previewSize === 'number' ? `${props.previewSize}px` : (props.previewSize as string),
	height: typeof props.previewSize === 'number' ? `${props.previewSize}px` : (props.previewSize as string)
}))

const isImage = (file: UploaderFile) => (file.type ? file.type.indexOf('image') === 0 : /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(file.url))

const fileUrl = (file: UploaderFile) => file.url

const statusText = (status: FileStatus) => {
	const map: Record<string, string> = { uploading: '上传中', downloading: '下载中', failed: '失败' }
	return map[status] || ''
}

function onChoose() {
	if (props.readonly || props.disabled) return
	const remain = props.maxCount - (props.modelValue || []).length
	const count = props.multiple ? Math.min(remain, 9) : Math.max(1, remain)
	if (count <= 0) return

	uni.chooseImage({
		count,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res: any) => {
			if (!res.tempFilePaths || !res.tempFilePaths.length) return
			let files: UploaderFile[] = []
			res.tempFilePaths.forEach((path: string, i: number) => {
				const tmp = (res.tempFiles && res.tempFiles[i]) || {}
				const file: UploaderFile = {
					url: path,
					name: tmp.name || `image_${Date.now()}_${i}`,
					size: tmp.size || 0,
					type: tmp.type || '',
					status: 'done'
				}
				files.push(file)
			})

			// 大小校验
			const valid: UploaderFile[] = []
			let oversized: UploaderFile | null = null
			for (const f of files) {
				if (props.maxSize !== Infinity && f.size > props.maxSize) {
					if (!oversized) oversized = f
					emit('oversize', f, files)
				} else {
					valid.push(f)
				}
			}

			if (valid.length) {
				const next = [...(props.modelValue || []), ...valid].slice(0, props.maxCount)
				emit('update:modelValue', next)
				emit('change', valid, {
					name: valid[0]?.name || '',
					index: (props.modelValue || []).length
				})
			}
		}
	})
}

function onDelete(file: UploaderFile, index: number) {
	if (props.readonly || props.disabled) return
	const next = [...(props.modelValue || [])]
	next.splice(index, 1)
	emit('delete', file, { name: file.name || '', index })
	emit('update:modelValue', next)
}

function onPreview(file: UploaderFile, index: number) {
	if (props.readonly) return
	emit('preview', file, index)
	if (props.previewImage && isImage(file) && props.modelValue) {
		const urls = (props.modelValue as UploaderFile[]).filter(f => isImage(f)).map(f => f.url)
		uni.previewImage({
			current: file.url,
			urls
		})
	}
}
</script>

<style lang="scss">
.mx-uploader {
	&__wrap {
		display: flex;
		flex-wrap: wrap;
	}

	&__preview {
		position: relative;
		margin: 0 12px 12px 0;
		overflow: hidden;
		border-radius: var(--mx-radius-sm);
		background: var(--mx-active-color);
	}

	&__preview--disabled {
		opacity: 1;
	}

	&__image {
		border-radius: var(--mx-radius-sm);
	}

	&__file {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4px;
		box-sizing: border-box;
		background: var(--mx-active-color);
	}

	&__file-name {
		display: -webkit-box;
		overflow: hidden;
		color: var(--mx-text-color-2);
		font-size: 10px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
	}

	&__delete {
		position: absolute;
		top: -4px;
		right: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		font-size: 13px;
		line-height: 1;
	}

	&__delete-icon {
		line-height: 1;
	}

	&__mask {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.45);
		color: #fff;
		font-size: 12px;
	}

	&__mask-text {
		color: #fff;
	}

	&__upload {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 80px;
		height: 80px;
		border-radius: var(--mx-radius-sm);
		border: 1px dashed var(--mx-border-color);
		background: var(--mx-background-2);

		&--readonly {
			opacity: 0.4;
		}
	}

	&__upload-icon {
		color: var(--mx-text-color-3);
		font-size: 28px;
		line-height: 1;
	}
}
</style>
