<template>
  <div class="page-content">
    <Title>标签 | {{ config.TITLE }}</Title>

    <el-tag
      v-for="tag in tags"
      :key="tag.name"
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
const config = useAppConfig();

// 获取所有文章内容
const { data: articles } = await useAsyncData('articles', () => 
  queryCollection('content').all()
);

// 计算标签及其文章数量
const tags = computed(() => {
  if (!articles.value) return [];
  
  // 收集所有标签并计数
  const tagCount = new Map();
  articles.value.forEach(article => {
    if (!article.tags) return;
    
    const articleTags = Array.isArray(article.tags) 
      ? article.tags 
      : [article.tags];
      
    articleTags.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  // 转换为数组格式
  return Array.from(tagCount.entries()).map(([name, count]) => ({
    name,
    count
  }));
});
</script>

<style scoped>
.tag-list {
  margin: 10px;
}
</style>
