<template>
  <div class="sidebar-section">
    <h3 class="sidebar-title">热门标签</h3>
    <div class="tag-list">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        type="primary"
        class="tag-item"
        size="small"
      >
        <el-link
          :href="`/tag/${tag.name}/1`"
          type="primary"
          class="tag-link"
        >
          {{ tag.name }}({{ tag.count }})
        </el-link>
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Tag {
  name: string;
  count: number;
}

// 获取所有文章内容
const { data: articles } = await useAsyncData('sidebar-articles', () => 
  queryCollection('content').all()
);

// 计算标签及其文章数量
const tags = computed<Tag[]>(() => {
  if (!articles.value) return [];
  
  // 收集所有标签并计数
  const tagCount = new Map<string, number>();
  articles.value.forEach(article => {
    if (!article.tags) return;
    
    const articleTags = Array.isArray(article.tags) 
      ? article.tags 
      : [article.tags];
      
    articleTags.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  // 转换为数组格式并按文章数量排序，只显示前20个
  return Array.from(tagCount.entries())
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
});
</script>

<style lang="less" scoped>
.sidebar-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #409EFF;
  padding-bottom: 8px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  margin: 0;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
  }
}

.tag-link {
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
}
</style>
