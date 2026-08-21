<template>
  <div class="demo-stepper">
    <mx-stepper v-model="value" :min="0" :max="10" integer />
    <text class="demo-value">{{ value }}</text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>

<style scoped>
.demo-stepper {
  display: flex;
  align-items: center;
  gap: 12px;
}
.demo-value {
  color: var(--mx-text-2);
  font-size: 14px;
}
</style>
