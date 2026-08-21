/**
 * MengXi Uni-UI 组件库入口
 * 组件目录: packages/components/<组件名>/<组件名>.vue (easycom 规则: mx-<name>)
 */

// ---------- 基础组件 ----------
export { default as MxButton } from './mx-button/mx-button.vue'
export { default as MxIcon } from './mx-icon/mx-icon.vue'
export { default as MxImage } from './mx-image/mx-image.vue'
export { default as MxCell } from './mx-cell/mx-cell.vue'
export { default as MxCellGroup } from './mx-cell-group/mx-cell-group.vue'
export { default as MxTag } from './mx-tag/mx-tag.vue'
export { default as MxBadge } from './mx-badge/mx-badge.vue'
export { default as MxDivider } from './mx-divider/mx-divider.vue'
export { default as MxSpace } from './mx-space/mx-space.vue'
export { default as MxSkeleton } from './mx-skeleton/mx-skeleton.vue'
export { default as MxLoading } from './mx-loading/mx-loading.vue'
export { default as MxSwitch } from './mx-switch/mx-switch.vue'
export { default as MxRow } from './mx-row/mx-row.vue'
export { default as MxCol } from './mx-col/mx-col.vue'
export { default as MxConfigProvider } from './mx-config-provider/mx-config-provider.vue'
export { default as MxSticky } from './mx-sticky/mx-sticky.vue'
export { default as MxOverlay } from './mx-overlay/mx-overlay.vue'
export { default as MxPopup } from './mx-popup/mx-popup.vue'

// ---------- 表单组件 ----------
export { default as MxField } from './mx-field/mx-field.vue'
export { default as MxForm } from './mx-form/mx-form.vue'
export { default as MxCheckbox } from './mx-checkbox/mx-checkbox.vue'
export { default as MxCheckboxGroup } from './mx-checkbox-group/mx-checkbox-group.vue'
export { default as MxRadio } from './mx-radio/mx-radio.vue'
export { default as MxRadioGroup } from './mx-radio-group/mx-radio-group.vue'
export { default as MxRate } from './mx-rate/mx-rate.vue'
export { default as MxStepper } from './mx-stepper/mx-stepper.vue'
export { default as MxSearch } from './mx-search/mx-search.vue'
export { default as MxSlider } from './mx-slider/mx-slider.vue'
export { default as MxPicker } from './mx-picker/mx-picker.vue'
export { default as MxCascader } from './mx-cascader/mx-cascader.vue'
export { default as MxUploader } from './mx-uploader/mx-uploader.vue'

// ---------- 反馈组件 ----------
export { default as MxToast } from './mx-toast/mx-toast.vue'
export { default as MxNotify } from './mx-notify/mx-notify.vue'
export { default as MxDialog } from './mx-dialog/mx-dialog.vue'
export { default as MxActionSheet } from './mx-action-sheet/mx-action-sheet.vue'
export { default as MxShareSheet } from './mx-share-sheet/mx-share-sheet.vue'
export { default as MxEmpty } from './mx-empty/mx-empty.vue'
export { default as MxCountDown } from './mx-count-down/mx-count-down.vue'
export { default as MxCircle } from './mx-circle/mx-circle.vue'
export { default as MxPullRefresh } from './mx-pull-refresh/mx-pull-refresh.vue'

// ---------- 展示组件 ----------
export { default as MxCollapse } from './mx-collapse/mx-collapse.vue'
export { default as MxCollapseItem } from './mx-collapse-item/mx-collapse-item.vue'
export { default as MxProgress } from './mx-progress/mx-progress.vue'

// ---------- 导航组件 ----------
export { default as MxGrid } from './mx-grid/mx-grid.vue'
export { default as MxGridItem } from './mx-grid-item/mx-grid-item.vue'
export { default as MxIndexBar } from './mx-index-bar/mx-index-bar.vue'
export { default as MxIndexAnchor } from './mx-index-anchor/mx-index-anchor.vue'
export { default as MxNavBar } from './mx-nav-bar/mx-nav-bar.vue'
export { default as MxPagination } from './mx-pagination/mx-pagination.vue'
export { default as MxSidebar } from './mx-sidebar/mx-sidebar.vue'
export { default as MxTab } from './mx-tab/mx-tab.vue'
export { default as MxTabs } from './mx-tabs/mx-tabs.vue'
export { default as MxTabPane } from './mx-tab-pane/mx-tab-pane.vue'
export { default as MxTabbar } from './mx-tabbar/mx-tabbar.vue'
export { default as MxTabbarItem } from './mx-tabbar-item/mx-tabbar-item.vue'
export { default as MxTreeSelect } from './mx-tree-select/mx-tree-select.vue'

// ---------- 表单-进阶 ----------
export { default as MxCalendar } from './mx-calendar/mx-calendar.vue'
export { default as MxNumberKeyboard } from './mx-number-keyboard/mx-number-keyboard.vue'
export { default as MxPickerGroup } from './mx-picker-group/mx-picker-group.vue'

// ---------- 反馈-进阶 ----------
export { default as MxDropdownMenu } from './mx-dropdown-menu/mx-dropdown-menu.vue'
export { default as MxDropdownItem } from './mx-dropdown-item/mx-dropdown-item.vue'
export { default as MxImagePreview } from './mx-image-preview/mx-image-preview.vue'
export { default as MxLazyload } from './mx-lazyload/mx-lazyload.vue'
export { default as MxFloatingBubble } from './mx-floating-bubble/mx-floating-bubble.vue'
export { default as MxFloatingPanel } from './mx-floating-panel/mx-floating-panel.vue'
export { default as MxSwipeCell } from './mx-swipe-cell/mx-swipe-cell.vue'
export { default as MxBackTop } from './mx-back-top/mx-back-top.vue'

// ---------- 展示-进阶 ----------
export { default as MxTextEllipsis } from './mx-text-ellipsis/mx-text-ellipsis.vue'
export { default as MxWatermark } from './mx-watermark/mx-watermark.vue'

// ---------- 业务组件 ----------
export { default as MxCard } from './mx-card/mx-card.vue'
export { default as MxGoodsAction } from './mx-goods-action/mx-goods-action.vue'
export { default as MxGoodsActionButton } from './mx-goods-action-button/mx-goods-action-button.vue'
export { default as MxGoodsActionIcon } from './mx-goods-action-icon/mx-goods-action-icon.vue'
export { default as MxSubmitBar } from './mx-submit-bar/mx-submit-bar.vue'
export { default as MxContactCard } from './mx-contact-card/mx-contact-card.vue'
export { default as MxContactEdit } from './mx-contact-edit/mx-contact-edit.vue'
export { default as MxContactList } from './mx-contact-list/mx-contact-list.vue'
export { default as MxCoupon } from './mx-coupon/mx-coupon.vue'
export { default as MxCouponCell } from './mx-coupon-cell/mx-coupon-cell.vue'
export { default as MxCouponList } from './mx-coupon-list/mx-coupon-list.vue'
export { default as MxAddressList } from './mx-address-list/mx-address-list.vue'
export { default as MxAddressEdit } from './mx-address-edit/mx-address-edit.vue'
export { default as MxArea } from './mx-area/mx-area.vue'
export { default as MxSignBoard } from './mx-sign-board/mx-sign-board.vue'
export { default as MxSignature } from './mx-signature/mx-signature.vue'

// ---------- 导出共享基础设施 ----------
export * from './shared/props'

// 聚合导出组件类型
export type ComponentType = {
  [K in keyof typeof import('./index') as K extends `Mx${string}` ? K : never]: (typeof import('./index'))[K]
}