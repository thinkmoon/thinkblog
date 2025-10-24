<template>
  <div class="app-container" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware() {
    return navigateTo('/');
  },
});
</script>

<style></style>
