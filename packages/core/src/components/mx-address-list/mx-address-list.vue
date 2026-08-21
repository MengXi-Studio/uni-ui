<template>
  <view class="mx-address-list" :class="customClass" :style="customStyle">
    <view class="mx-address-list__body">
      <slot>
        <view
          v-for="(item, index) in list"
          :key="item.id !== undefined ? item.id : index"
          class="mx-address-list__item"
          :class="{ 'mx-address-list__item--selected': chosenId === item.id }"
          @click="onSelect(item, index)"
        >
          <view class="mx-address-list__info">
            <view class="mx-address-list__name-row">
              <text class="mx-address-list__name">{{ item.name }}</text>
              <text class="mx-address-list__tel">{{ item.tel }}</text>
              <text v-if="item.isDefault" class="mx-address-list__tag">{{ defaultTagText }}</text>
            </view>
            <text class="mx-address-list__address">{{ item.address }}</text>
          </view>
          <text class="mx-address-list__edit" @click.stop="onEdit(item, index)">编辑</text>
        </view>
      </slot>
    </view>

    <view class="mx-address-list__footer">
      <slot name="footer">
        <text class="mx-address-list__add" @click="onAdd">+ 新增地址</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeStringProp, makeBooleanProp } from '../shared/props'

type AddressItem = {
  id: string | number
  name?: string
  tel?: string
  address?: string
  isDefault?: boolean
  [key: string]: any
}

const props = withDefaults(
  defineProps({
    /** 当前选中地址 id (v-model) */
    modelValue: { type: [String, Number] as any, default: '' },
    /** 地址列表 */
    list: { type: Array as any, default: () => [] },
    /** 默认标签文字 */
    defaultTagText: makeStringProp('默认'),
    /** 是否为单选模式 (点击选中) */
    selectable: makeBooleanProp(true),
    /** 是否显示新增按钮 */
    showAdd: makeBooleanProp(true),
    customClass: makeStringProp(''),
    customStyle: { type: [String, Object] as any, default: '' },
  }),
  {
    defaultTagText: '默认',
    selectable: true,
    showAdd: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'select', item: AddressItem, index: number): void
  (e: 'edit', item: AddressItem, index: number): void
  (e: 'add'): void
}>()

const chosenId = computed(() => props.modelValue)

const onSelect = (item: AddressItem, index: number) => {
  if (props.selectable && item.id !== undefined) {
    emit('update:modelValue', item.id)
  }
  emit('select', item, index)
}

const onEdit = (item: AddressItem, index: number) => emit('edit', item, index)

const onAdd = () => {
  if (props.showAdd) emit('add')
}
</script>

<style lang="scss">
.mx-address-list {
  &__item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: var(--mx-background-2);

    &--selected {
      background: var(--mx-active-color);
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__name-row {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__name {
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-lg);
    font-weight: var(--mx-font-weight-bold);
  }

  &__tel {
    margin-left: 12px;
    color: var(--mx-text-color);
    font-size: var(--mx-font-size-md);
  }

  &__tag {
    flex-shrink: 0;
    margin-left: 8px;
    padding: 0 4px;
    color: var(--mx-primary-color);
    font-size: var(--mx-font-size-xs);
    border: 1px solid currentColor;
    border-radius: 2px;
  }

  &__address {
    display: block;
    margin-top: 4px;
    overflow: hidden;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-md);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__edit {
    flex-shrink: 0;
    margin-left: 12px;
    color: var(--mx-text-color-2);
    font-size: var(--mx-font-size-md);
  }

  &__footer {
    padding: 8px 16px;
    padding-bottom: 16px;
    background: var(--mx-background-2);
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #fff;
    font-size: var(--mx-font-size-md);
    background: var(--mx-primary-color);
    border-radius: var(--mx-radius-md);
  }
}
</style>