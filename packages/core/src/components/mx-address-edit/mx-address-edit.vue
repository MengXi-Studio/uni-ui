<template>
  <view class="mx-address-edit" :class="customClass" :style="customStyle">
    <!-- 姓名 -->
    <view class="mx-address-edit__cell">
      <text class="mx-address-edit__label">姓名</text>
      <input
        class="mx-address-edit__input"
        :value="form.name"
        :placeholder="namePlaceholder"
        maxlength="20"
        @input="onField('name', $event)"
      />
    </view>

    <!-- 电话 -->
    <view class="mx-address-edit__cell">
      <text class="mx-address-edit__label">电话</text>
      <input
        class="mx-address-edit__input"
        type="tel"
        :value="form.tel"
        :placeholder="telPlaceholder"
        maxlength="15"
        @input="onField('tel', $event)"
      />
    </view>

    <!-- 省市区 -->
    <view class="mx-address-edit__cell" @click="onOpenArea">
      <text class="mx-address-edit__label">所在地区</text>
      <text class="mx-address-edit__value" :class="{ 'mx-address-edit__value--empty': !regionText }">
        {{ regionText || areaPlaceholder }}
      </text>
      <text class="mx-address-edit__arrow">›</text>
    </view>

    <!-- 详细地址 -->
    <view v-if="showDetail" class="mx-address-edit__cell mx-address-edit__cell--textarea">
      <view class="mx-address-edit__textarea-head">
        <text class="mx-address-edit__label">详细地址</text>
      </view>
      <textarea
        class="mx-address-edit__textarea"
        :value="form.addressDetail"
        :placeholder="detailPlaceholder"
        :maxlength="detailMaxlength"
        auto-height
        @input="onField('addressDetail', $event)"
      />
    </view>

    <!-- 邮政编码 -->
    <view v-if="showPostal" class="mx-address-edit__cell">
      <text class="mx-address-edit__label">邮政编码</text>
      <input
        class="mx-address-edit__input"
        type="number"
        :value="form.postalCode || ''"
        :placeholder="postalPlaceholder"
        maxlength="6"
        @input="onField('postalCode', $event)"
      />
    </view>

    <!-- 设为默认 -->
    <view v-if="showSetDefault" class="mx-address-edit__cell mx-address-edit__cell--switch">
      <text class="mx-address-edit__label">设为默认地址</text>
      <mx-switch v-model="form.isDefault" @change="onField('isDefault', $event)" />
    </view>

    <!-- 保存 -->
    <view class="mx-address-edit__footer">
      <mx-button type="primary" block :round="true" @click="onSave">{{ saveButtonText }}</mx-button>
    </view>

    <!-- 省市区选择 -->
    <mx-picker
      :show="showArea"
      :columns="areaColumns"
      :title="areaTitle"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @update:show="showArea = $event"
      @confirm="onAreaConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  makeStringProp,
  makeBooleanProp,
  makeNumericProp,
  makeObjectProp,
} from '../shared/props'
import MxSwitch from '../mx-switch/mx-switch.vue'
import MxButton from '../mx-button/mx-button.vue'
import MxPicker from '../mx-picker/mx-picker.vue'

type ModelInfo = {
  name?: string
  tel?: string
  province?: string
  city?: string
  county?: string
  areaCode?: string
  addressDetail?: string
  email?: string
  isDefault?: boolean
  postalCode?: string
  [key: string]: any
}

type PickerOption = { text: string; value: unknown; children?: PickerOption[]; [k: string]: any }

const props = withDefaults(
  defineProps({
    /** 地址信息对象 (v-model) */
    modelValue: makeObjectProp<ModelInfo>({}),
    /** 省市区数据, 键为 province/city/county 前缀映射 */
    areaList: makeObjectProp<Record<string, Record<string, string>>>({}),
    /** 是否显示详细地址 */
    showDetail: makeBooleanProp(true),
    /** 是否显示邮政编码 */
    showPostal: makeBooleanProp(true),
    /** 是否显示设为默认 */
    showSetDefault: makeBooleanProp(true),
    /** 是否显示搜索结果 */
    showSearchResult: makeBooleanProp(false),
    /** 姓名占位符 */
    namePlaceholder: makeStringProp('请填写收货人姓名'),
    /** 电话占位符 */
    telPlaceholder: makeStringProp('请填写手机号码'),
    /** 详细地址占位符 */
    detailPlaceholder: makeStringProp('街道、门牌号等'),
    /** 详细地址最大长度 */
    detailMaxlength: makeNumericProp<number | string>(200),
    /** 地区占位符 */
    areaPlaceholder: makeStringProp('省 / 市 / 区'),
    /** 省市区标题 */
    areaTitle: makeStringProp('所在地区'),
    /** 邮政编码占位符 */
    postalPlaceholder: makeStringProp('请输入邮政编码'),
    /** 保存按钮文字 */
    saveButtonText: makeStringProp('保存'),
    /** 校验失败提示文案 */
    errorMessage: makeStringProp('请填写完整信息'),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    modelValue: () => ({}),
    areaList: () => ({}),
    showDetail: true,
    showPostal: true,
    showSetDefault: true,
    detailMaxlength: 200,
    saveButtonText: '保存',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelInfo): void
  (e: 'save', value: ModelInfo): void
  (e: 'change', value: ModelInfo): void
  (e: 'change-area', detail: ModelInfo): void
}>()

/** 内部表单状态 (与 modelValue 同步) */
const form = ref<ModelInfo>({ ...(props.modelValue || {}) })

watch(
  () => props.modelValue,
  (val) => {
    form.value = { ...(val || {}) }
  },
  { deep: true }
)

/** 省市区弹层 */
const showArea = ref(false)

function onField(key: string, event: unknown) {
  const value = (event as any)?.detail?.value
  if (key === 'isDefault') {
    form.value.isDefault = !!value
  } else {
    form.value[key] = value
  }
  emit('update:modelValue', { ...form.value })
  emit('change', { ...form.value })
}

/* ---------- 省市区解析 (从 areaList 构建三级联动数据) ---------- */
const areaColumns = computed<PickerOption[]>(() => {
  const pMap = props.areaList?.province_list || {}
  const cMap = props.areaList?.city_list || {}
  const tMap = props.areaList?.county_list || {}

  return Object.keys(pMap).map((pCode) => {
    const prefix = pCode.slice(0, 2)
    const cities = Object.keys(cMap)
      .filter((c) => c.startsWith(prefix))
      .map((cCode) => {
        const cPrefix = cCode.slice(0, 4)
        const counties = Object.keys(tMap)
          .filter((t) => t.startsWith(cPrefix))
          .map((tCode) => ({ text: tMap[tCode], value: tCode, code: tCode }))
        return { text: cMap[cCode], value: cCode, code: cCode, children: counties }
      })
    return { text: pMap[pCode], value: pCode, code: pCode, children: cities }
  })
})

/** 当前地区展示文本 */
const regionText = computed(() => {
  const { province, city, county } = form.value
  return [province, city, county].filter(Boolean).join(' ')
})

function onOpenArea() {
  showArea.value = true
}

function onAreaConfirm(payload: { selectedOptions: PickerOption[] }) {
  const opts = payload.selectedOptions || []
  if (opts.length >= 1) form.value.province = String(opts[0].text)
  if (opts.length >= 2) form.value.city = String(opts[1].text)
  if (opts.length >= 3) form.value.county = String(opts[2].text)
  const last = opts[opts.length - 1]
  form.value.areaCode = last?.code !== undefined ? String(last.code) : String(last?.value ?? '')
  emit('update:modelValue', { ...form.value })
  emit('change', { ...form.value })
  emit('change-area', { ...form.value })
}

/* ---------- 校验与保存 ---------- */
function isFieldEmpty(v: unknown) {
  return v === undefined || v === null || String(v).trim() === ''
}

/** 校验, 通过返回 true */
function validate(): boolean {
  if (isFieldEmpty(form.value.name)) return false
  if (isFieldEmpty(form.value.tel)) return false
  return true
}

async function onSave() {
  if (!validate()) {
    // 校验不通过时仍给出保存事件, 由使用方决定展示错误提示
    emit('save', { ...form.value })
    return
  }
  emit('update:modelValue', { ...form.value })
  emit('save', { ...form.value })
}

defineExpose({
  validate,
})
</script>

<style lang="scss">
.mx-address-edit {
  background: var(--mx-background-2);

  &__cell {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 10px 16px;

    &::after {
      position: absolute;
      right: 16px;
      bottom: 0;
      left: 16px;
      content: ' ';
      transform: scaleY(0.5);
      transform-origin: center;
      border-bottom: 1px solid var(--mx-border-color);
    }

    &--switch,
    &--textarea {
      align-items: flex-start;
    }
  }

  &__label {
    flex-shrink: 0;
    width: 76px;
    color: var(--mx-text-color);
    font-size: 14px;
    line-height: 28px;
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 28px;
    color: var(--mx-text-color);
    font-size: 14px;
  }

  &__value {
    flex: 1;
    min-width: 0;
    color: var(--mx-text-color);
    font-size: 14px;
    text-align: right;

    &--empty {
      color: var(--mx-text-color-3);
    }
  }

  &__arrow {
    margin-left: 8px;
    color: var(--mx-text-color-3);
    font-size: 16px;
  }

  &__textarea-head {
    display: flex;
    align-items: center;
    width: 76px;
  }

  &__textarea {
    flex: 1;
    min-width: 0;
    padding: 4px 0;
    color: var(--mx-text-color);
    font-size: 14px;
    line-height: 20px;
  }

  &__cell--switch {
    align-items: center;

    .mx-address-edit__label {
      line-height: 28px;
    }
  }

  &__footer {
    padding: 24px 16px;
    padding-bottom: calc(24px + env(safe-area-inset-bottom));
  }
}
</style>