<template>
  <view class="mx-contact-edit" :class="customClass" :style="customStyle">
    <mx-cell-group>
      <mx-field
        v-model="contact.name"
        label="姓名"
        :maxlength="nameMaxLengthNum"
        placeholder="请输入姓名"
        :required="true"
      />
      <mx-field
        v-model="contact.tel"
        label="电话"
        type="tel"
        :maxlength="telMaxLengthNum"
        placeholder="请输入手机号"
        :required="true"
      />
      <mx-field v-if="showContactType" label="类型" :border="false">
        <view class="mx-contact-edit__types">
          <view
            v-for="opt in typeOptions"
            :key="opt.value"
            class="mx-contact-edit__type"
            @click="onPickType(opt.value)"
          >
            <view class="mx-contact-edit__radio" :class="{ 'mx-contact-edit__radio--active': contact.type === opt.value }">
              <text v-if="contact.type === opt.value" class="mx-contact-edit__radio-check">✓</text>
            </view>
            <text class="mx-contact-edit__type-text">{{ opt.label }}</text>
          </view>
        </view>
      </mx-field>
    </mx-cell-group>

    <view v-if="showError" class="mx-contact-edit__error">{{ errorMessage }}</view>

    <view class="mx-contact-edit__save">
      <mx-button block type="danger" @click="onSave"><slot name="button">保存</slot></mx-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { makeBooleanProp, makeNumericProp } from '../../shared/props'
import MxCellGroup from '../mx-cell-group/mx-cell-group.vue'
import MxField from '../mx-field/mx-field.vue'
import MxButton from '../mx-button/mx-button.vue'

type ContactType = 'company' | 'corporate'

export interface ContactInfo {
  name?: string
  tel?: string
  type?: ContactType
}

const props = withDefaults(
  defineProps({
    /** 联系人信息 (v-model) */
    modelValue: { type: Object as any, default: () => ({}) },
    /** 电话最大长度 */
    telMaxlength: makeNumericProp<number | string>(11),
    /** 姓名最大长度 */
    nameMaxlength: makeNumericProp<number | string>(20),
    /** 是否显示联系人类型单选项 */
    showContactType: makeBooleanProp(false),
    customClass: { type: String, default: '' },
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    telMaxlength: 11,
    nameMaxlength: 20,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: ContactInfo): void
  (e: 'save', value: ContactInfo): void
}>()

defineExpose({ save })

const typeOptions: { label: string; value: ContactType }[] = [
  { label: '公司', value: 'company' },
  { label: '企业', value: 'corporate' },
]

const contact = reactive<ContactInfo>({
  name: (props.modelValue as ContactInfo)?.name ?? '',
  tel: (props.modelValue as ContactInfo)?.tel ?? '',
  type: (props.modelValue as ContactInfo)?.type ?? 'company',
})

const showError = ref(false)
const errorMessage = ref('')

const telMaxLengthNum = computed(() => Number(props.telMaxlength) || 0)
const nameMaxLengthNum = computed(() => Number(props.nameMaxlength) || 0)

/** 校验并保存, 返回是否成功 (供外部调用) */
function save() {
  const name = (contact.name || '').trim()
  const tel = (contact.tel || '').trim()

  if (!name) {
    showError.value = true
    errorMessage.value = '请填写联系人姓名'
    return false
  }
  if (!tel) {
    showError.value = true
    errorMessage.value = '请填写联系电话'
    return false
  }

  showError.value = false
  errorMessage.value = ''
  const result: ContactInfo = { name, tel, type: contact.type }
  emit('update:modelValue', result)
  emit('save', result)
  return true
}

const onSave = () => save()
const onPickType = (value: ContactType) => {
  contact.type = value
}
</script>

<style lang="scss">
.mx-contact-edit {
  &__types {
    display: flex;
    align-items: center;
  }

  &__type {
    display: inline-flex;
    align-items: center;
    margin-right: 24px;
    cursor: pointer;
  }

  &__radio {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    color: #fff;
    font-size: 11px;
    border: 1px solid var(--mx-text-color-3);
    border-radius: 50%;
    transition: border-color var(--mx-duration-fast), background-color var(--mx-duration-fast);

    &--active {
      background: var(--mx-primary-color);
      border-color: var(--mx-primary-color);
    }

    &-check {
      line-height: 1;
    }
  }

  &__type-text {
    margin-left: 6px;
    color: var(--mx-text-color);
    font-size: 14px;
  }

  &__error {
    margin: 12px 16px 0;
    color: var(--mx-danger-color);
    font-size: var(--mx-font-size-sm);
    line-height: var(--mx-line-height-sm);
  }

  &__save {
    margin: 24px 16px;
  }
}
</style>