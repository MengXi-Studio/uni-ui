<template>
  <div class="demo-tabs">
    <mx-tabs v-model="active">
      <mx-tab-pane title="标签 1" name="1"><text>标签 1 内容</text></mx-tab-pane>
      <mx-tab-pane title="标签 2" name="2"><text>标签 2 内容</text></mx-tab-pane>
      <mx-tab-pane title="标签 3" name="3"><text>标签 3 内容</text></mx-tab-pane>
    </mx-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('1')
</script>

<style scoped>
.demo-tabs {
  width: 100%;
  background: #fff;
}
</style>
