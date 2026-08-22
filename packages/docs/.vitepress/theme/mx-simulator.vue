<template>
  <aside class="mx-sim" aria-hidden="simulator">
    <div class="mx-sim__frame">
      <!-- 手机状态栏 -->
      <div class="mx-sim__statusbar">
        <span class="mx-sim__time">9:41</span>
        <span class="mx-sim__notch" />
        <div class="mx-sim__indicator">
          <svg viewBox="0 0 25 11" width="24" height="11">
            <path
              fill="#fff"
              d="M0 9.5h.9V4.5h2.4v5h.9v-7h-4.2v7zM5 9.5h.9V2.2h2.4v7.3h.9V1.3H5v8.2zM9.9 9.5h.9V.5h2.5v9h1V.5h-5v9zM15 9.5h.9V7.2h2.5v2.3h.9V6.2H15v3.3z"
            />
          </svg>
          <svg viewBox="0 0 8 5" width="8" height="5">
            <path d="M0 0v2.5c0 0 1 2.5 3.9 2.5 2.9 0 4-2.5 4-2.5V0H0z" fill="#fff" />
          </svg>
          <svg viewBox="0 0 26 12" width="24" height="12">
            <path
              d="M2 1.5v9c0 1-.5 1.5-1.5 1.5S0 11.5 0 10.5v-9C0 .5.5 0 0 0h3.5C4.5 0 5 .5 5 1v10"
              fill="none"
              stroke="#fff"
              stroke-width="0.8"
            />
          </svg>
        </div>
      </div>

      <!-- 手机屏幕：渲染 demo-live 注册的当前页 demo（缓存组件身份以保持可交互） -->
      <div class="mx-sim__screen">
        <component :is="getDemo(slot)" v-for="slot in slots" :key="slot" />
      </div>

      <!-- Home 指示条 -->
      <div class="mx-sim__home" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { Slot, VNode } from 'vue'
import { computed } from 'vue'
import { simulatorSlots } from './simulator-store'

const slots = computed(() => simulatorSlots.value)

// 每个插槽缓存为一个稳定的内联渲染组件，避免 <component :is> 因身份变化反复卸载重载，
// 否则组件内部状态与事件绑定会丢失（表现为"能看不能点"）。
const demoCache = new Map<Slot, { render: () => VNode }>()
function getDemo(slot: Slot) {
  if (!demoCache.has(slot)) {
    demoCache.set(slot, { render: () => h('div', { class: 'mx-sim__demo' }, slot()) })
  }
  return demoCache.get(slot)!
}
</script>

<style scoped>
/* 对齐 Vant van-doc-simulator：360px 手机框，固定于内容区右侧 */
.mx-sim {
  position: fixed;
  top: 96px;
  right: 32px;
  z-index: 49;
  box-sizing: border-box;
  width: 360px;
  min-width: 360px;
}

/* 手机外框 */
.mx-sim__frame {
  position: relative;
  box-sizing: border-box;
  width: 360px;
  height: 640px;
  padding: 12px;
  background: #f2f3f5;
  border-radius: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 状态栏 */
.mx-sim__statusbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  padding: 0 8px;
  background: #011f3c;
  border-radius: 20px 20px 0 0;
}

.mx-sim__time {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
}

.mx-sim__notch {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 18px;
  background: #000;
  border-radius: 0 0 10px 10px;
}

.mx-sim__indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
}

/* 屏幕滚动区（Teleport 目标） */
.mx-sim__screen {
  height: calc(640px - 24px - 28px - 20px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #fff;
}

/* Home 指示条 */
.mx-sim__home {
  position: absolute;
  bottom: 11px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: #dcdee0;
  border-radius: 2px;
}
</style>
