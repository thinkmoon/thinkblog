<script setup lang="ts">
interface Content {
  title?: string
  description?: string
  [key: string]: any
}

const route = useRoute()
const { data: content } = await useAsyncData(route.path, () => {
  return queryCollection('content').path('/' + route.params.slug as string).first()
})

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description
})
</script>

<template>
  <ContentRenderer v-if="content" :value="content" />
  <div v-else>Content not found</div>
</template> 