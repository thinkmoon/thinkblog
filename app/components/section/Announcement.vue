<template>
  <div class="section">
    <span class="section-tile">网站公告</span>
    <v-md-preview :text="content" />
  </div>
</template>
<script setup>
const content = '# 博客持续搭建中';
</script>
