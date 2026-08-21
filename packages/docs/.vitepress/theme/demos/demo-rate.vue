<template>
  <div class="demo-rate">
    <mx-rate v-model="value" :count="count" allow-half />
    <text class="demo-value">{{ value }}</text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
const count = ref(5)
</script>

<style scoped>
.demo-rate {
  display: flex;
  align-items: center;
  gap: 12px;
}
.demo-value {
  color: var(--mx-text-2);
  font-size: 14px;
}
</style>
