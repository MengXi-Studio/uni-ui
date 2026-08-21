<template>
  <view
    class="mx-contact-card"
    :class="[`mx-contact-card--${type}`, customClass]"
    :style="customStyle"
    :hover-class="'mx-contact-card--hover'"
    @click="onClick"
  >
    <slot>
      <template v-if="name || tel">
        <view class="mx-contact-card__info">
          <text v-if="name" class="mx-contact-card__name">{{ name }}</text>
          <text v-if="tel" class="mx-contact-card__value">{{ tel }}</text>
        </view>
      </template>
      <view v-else class="mx-contact-card__add">
        <text class="mx-contact-card__add-icon">+</text>
        <text class="mx-contact-card__add-text">加{{ addText }}</text>
      </view>

      <text v-if="type === 'edit'" class="mx-contact-card__edit" @click.stop="onClickEdit">›</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { makeStringProp } from '../shared/props'

type ContactCardType = 'default' | 'edit'

defineProps({
  /** 添加联系人时显示的文字 */
  addText: makeStringProp(''),
  /** 联系人姓名 */
  name: makeStringProp(''),
  /** 联系人电话 */
  tel: makeStringProp(''),
  /** 卡片类型: default / edit(显示编辑箭头) */
  type: makeStringProp<ContactCardType>('default'),
  customClass: makeStringProp(''),
  customStyle: { type: [String, Object] as any, default: '' },
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
  (e: 'edit', event: Event): void
}>()

const onClick = (event: Event) => emit('click', event)
const onClickEdit = (event: Event) => emit('edit', event)
</script>

<style lang="scss">
.mx-contact-card {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  color: var(--mx-text-color);
  font-size: 14px;
  background: var(--mx-background-2);
  cursor: pointer;

  &--hover {
    opacity: var(--mx-active-opacity);
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__name {
    font-size: 16px;
    font-weight: var(--mx-font-weight-bold);
    line-height: var(--mx-line-height-lg);
  }

  &__value {
    margin-top: 4px;
    color: var(--mx-text-color-2);
    line-height: var(--mx-line-height-sm);
  }

  &__add {
    flex: 1;
    display: flex;
    align-items: center;
    color: var(--mx-text-color-2);
  }

  &__add-icon {
    margin-right: 4px;
    font-size: 16px;
  }

  &__add-text {
    font-size: 14px;
  }

  &__edit {
    margin-left: 8px;
    color: var(--mx-text-color-3);
    font-size: 18px;
    line-height: 1;
    padding: 4px;
  }
}
</style>
