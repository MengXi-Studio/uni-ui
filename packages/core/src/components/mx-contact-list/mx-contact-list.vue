<template>
  <view class="mx-contact-list" :class="customClass" :style="customStyle">
    <mx-cell-group>
      <mx-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :label="item.tel"
        :center="true"
        @click="onSelect(item)"
      >
        <view
          class="mx-contact-list__radio"
          :class="{ 'mx-contact-list__radio--active': isSelected(item) }"
        >
          <text v-if="isSelected(item)" class="mx-contact-list__radio-check">✓</text>
        </view>
      </mx-cell>
    </mx-cell-group>

    <view class="mx-contact-list__add">
      <mx-button block type="danger" :custom-class="'mx-contact-list__add-btn'" @click="onAdd">
        <text class="mx-contact-list__add-icon">+</text>
        <text>添加{{ addText }}</text>
      </mx-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { makeStringProp } from '../shared/props'
import MxCellGroup from '../mx-cell-group/mx-cell-group.vue'
import MxCell from '../mx-cell/mx-cell.vue'
import MxButton from '../mx-button/mx-button.vue'

export interface ContactListItem {
  id: string | number
  name: string
  tel: string
}

const props = defineProps({
  /** 选中的联系人 id (v-model) */
  modelValue: { type: [String, Number] as any, default: '' },
  /** 联系人列表 */
  list: { type: Array as any, default: () => [] as ContactListItem[] },
  /** 底部添加按钮文字补充 */
  addText: makeStringProp('联系人'),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'select', item: ContactListItem): void
  (e: 'add'): void
}>()

function isSelected(item: ContactListItem) {
  return String(props.modelValue) === String(item.id)
}

const onSelect = (item: ContactListItem) => {
  emit('update:modelValue', item.id)
  emit('select', item)
}

const onAdd = () => emit('add')
</script>

<style lang="scss">
.mx-contact-list {
  &__radio {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 12px;
    border: 1px solid var(--mx-text-color-3);
    border-radius: 50%;
    transition:
      border-color var(--mx-duration-fast),
      background-color var(--mx-duration-fast);

    &--active {
      background: var(--mx-primary-color);
      border-color: var(--mx-primary-color);
    }

    &-check {
      line-height: 1;
    }
  }

  &__add {
    margin: 12px 16px;
  }

  &__add-btn {
    &.mx-button {
      font-size: 14px;
    }
  }

  &__add-icon {
    margin-right: 4px;
  }
}
</style>
