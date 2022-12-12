<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.replace('/content-list/1')
})
</script>

<template>
  <div>Redirecting...</div>
</template> 