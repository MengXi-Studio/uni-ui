<template>
  <div class="demo-switch">
    <mx-switch v-model="value" />
    <text class="demo-value">{{ value ? '开' : '关' }}</text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>

<style scoped>
.demo-switch {
  display: flex;
  align-items: center;
  gap: 12px;
}
.demo-value {
  color: var(--mx-text-2);
  font-size: 14px;
}
</style>
