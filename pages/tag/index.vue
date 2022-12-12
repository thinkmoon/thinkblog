<template>
  <div class="page-content">
    <Title>标签 | {{ config.TITLE }}</Title>

    <el-tag
      v-for="tag in data"
      :key="tag.tid"
      type="info"
      class="tag-list"
    >
      <el-link
        :href="`/tag/${tag.name}/1`"
        type="info"
      >
        {{ tag.name }}({{ tag.count }})
      </el-link>
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import TagApi from '@/api/TagApi';

const config = useAppConfig();
const { data } = await useAsyncData('tag', () => TagApi.getTag());
</script>

<style scoped>
.tag-list {
  margin: 10px;
}
</style>
