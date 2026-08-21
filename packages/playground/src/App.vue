<template>
  <view class="demo-container">
    <!-- 按钮 -->
    <view class="demo-section">
      <text class="demo-title">Button 按钮</text>
      <view class="demo-row">
        <mx-button type="primary">主要按钮</mx-button>
        <mx-button type="success">成功</mx-button>
        <mx-button type="danger" round>危险</mx-button>
        <mx-button plain type="primary">朴素</mx-button>
        <mx-button size="small">small</mx-button>
        <mx-button size="mini">mini</mx-button>
        <mx-button type="warning" loading loading-text="加载中…" />
      </view>
    </view>

    <!-- Cell -->
    <view class="demo-section">
      <text class="demo-title">Cell 单元格</text>
      <mx-cell-group inset>
        <mx-cell title="单元格" value="内容" is-link />
        <mx-cell title="带描述" label="描述信息" />
        <mx-cell title="禁用" value="禁用" :disabled="true" />
      </mx-cell-group>
    </view>

    <!-- 表单 -->
    <view class="demo-section">
      <text class="demo-title">Feld 输入框</text>
      <mx-field v-model="fieldValue" label="用户名" placeholder="请输入用户名" clearable />
      <mx-field v-model="pwdValue" label="密码" type="password" placeholder="请输入密码" />
    </view>

    <!-- 选择类 -->
    <view class="demo-section">
      <text class="demo-title">Switch / Checkbox / Rate / Stepper</text>
      <view class="demo-row">
        <mx-switch v-model="switchValue" />
        <mx-rate v-model="rateValue" />
      </view>
      <view class="demo-row">
        <mx-checkbox v-model="checkedValue">复选框</mx-checkbox>
        <mx-stepper v-model="stepValue" integer />
      </view>
    </view>

    <!-- 标签 / 徽标 / 骨架屏 -->
    <view class="demo-section">
      <text class="demo-title">Tag / Badge / Skeleton</text>
      <view class="demo-row">
        <mx-tag type="primary">标签</mx-tag>
        <mx-tag type="danger" round>danger</mx-tag>
        <mx-tag type="success" plain>plain</mx-tag>
        <mx-badge :content="5"><mx-tag>徽标</mx-tag></mx-badge>
      </view>
      <mx-skeleton v-if="skeletonLoading" :row="4" :avatar="true" />
    </view>

    <!-- 反馈 -->
    <view class="demo-section">
      <text class="demo-title">Dialog / Toast / Popup / ActionSheet</text>
      <view class="demo-row">
        <mx-button size="small" @click="showDialog = true">Dialog</mx-button>
        <mx-button size="small" @click="showToast = true">Toast</mx-button>
        <mx-button size="small" @click="showPopup = true">Popup</mx-button>
        <mx-button size="small" @click="showSheet = true">ActionSheet</mx-button>
      </view>
    </view>

    <!-- Tabs -->
    <view class="demo-section">
      <text class="demo-title">Tabs 标签页</text>
      <mx-tabs v-model="activeTab">
        <mx-tab-pane title="标签 1" name="1">内容 1</mx-tab-pane>
        <mx-tab-pane title="标签 2" name="2">内容 2</mx-tab-pane>
        <mx-tab-pane title="标签 3" name="3">内容 3</mx-tab-pane>
      </mx-tabs>
    </view>

    <!-- 底部 Tabbar -->
    <mx-tabbar v-model="activeTabbar" fixed safe-area-inset-bottom>
      <mx-tabbar-item name="home" :icon="'🏠'" text="首页" />
      <mx-tabbar-item name="search" :icon="'🔍'" text="搜索" />
      <mx-tabbar-item name="user" :icon="'👤'" text="我的" />
    </mx-tabbar>

    <!-- Popup -->
    <mx-popup v-model:show="showPopup" position="bottom" round closeable @click-overlay="showPopup = false">
      <view class="popup-content"><text>这是 Popup 内容</text></view>
    </mx-popup>

    <!-- Dialog -->
    <mx-dialog
      v-model:show="showDialog"
      title="标题"
      content="这是弹窗内容"
      confirm-button-text="确定"
      cancel-button-text="取消"
    />

    <!-- Toast (命令式展示) -->
    <mx-toast v-model:show="showToast" type="success" message="操作成功" />

    <!-- ActionSheet -->
    <mx-action-sheet
      v-model:show="showSheet"
      :actions="sheetActions"
      cancel-text="取消"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 表单
const fieldValue = ref('')
const pwdValue = ref('')
const switchValue = ref(true)
const checkedValue = ref(true)
const rateValue = ref(3)
const stepValue = ref(1)

// 反馈
const showDialog = ref(false)
const showToast = ref(false)
const showPopup = ref(false)
const showSheet = ref(false)
const skeletonLoading = ref(true)

// Tabs
const activeTab = ref('1')
const activeTabbar = ref('home')

// ActionSheet 动作
const sheetActions = [
  { name: '选项一', color: '#ee0a24' },
  { name: '选项二', subname: '描述信息' },
  { name: '禁用选项', disabled: true },
]

// 模拟骨架屏加载
setTimeout(() => {
  skeletonLoading.value = false
}, 1500)
</script>

<style lang="scss">
// 引入库全局样式 (reset + CSS 变量 + 通用过渡动画)
@use '@mengxi/uni-ui/src/styles/index.scss';
</style>

<style lang="scss" scoped>
.demo-container {
  padding: 32rpx;
  padding-bottom: 120rpx;
  background: var(--mx-background);
  min-height: 100vh;
  box-sizing: border-box;
}

.demo-section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  background: var(--mx-background-2);
  border-radius: var(--mx-radius-lg);
}

.demo-title {
  display: block;
  margin-bottom: 20rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: var(--mx-text-color);
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
}

.popup-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200rpx;
  color: var(--mx-text-color-2);
}
</style>