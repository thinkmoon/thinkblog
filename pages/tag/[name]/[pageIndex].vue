<template>
  <div>
    <Title>标签" {{ tag[0].name }}"下的文章 | {{ config.TITLE }}</Title>
    <PostList :post-list="postList" />
  </div>
</template>

<script lang="ts" setup>
import TagApi from '@/api/TagApi';
import { useRoute } from 'vue-router';
import ArticleApi from '@/api/ArticleApi';

const config = useAppConfig();
const route = useRoute();
const pageData = {
  total: 0,
  current: 0,
};

pageData.current = Number(route.params.pageIndex);
const [{ data: tag }, { data: post }] = await Promise.all([
  useAsyncData('tag', () => TagApi.getTag({ name: route.params.name })),
  useAsyncData('post', () => ArticleApi.getListByTag({ name: route.params.name })),
]);
const postList = reactive(post.value);
postList.forEach((item) => {
  if (item.fields instanceof Array) {
    const fields = {};
    item.fields.forEach((i) => {
      fields[i.name] = i.value;
    });
    item.fields = fields;
  }
});
</script>

<style scoped>

</style>
