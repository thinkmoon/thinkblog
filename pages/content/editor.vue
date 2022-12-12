<template>
  <div class="content-editor-page">
    <ContentEditor :path="path" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const path = computed(() => {
  // 从 URL 参数中获取路径，如果没有则返回空字符串
  return (route.query.path as string) || ''
})
</script>

<style scoped>
.content-editor-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 