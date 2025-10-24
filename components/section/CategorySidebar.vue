<template>
  <div class="sidebar-section">
    <h3 class="sidebar-title">文章分类</h3>
    <div class="category-list">
      <el-tag
        v-for="category in categories"
        :key="category.name"
        type="primary"
        class="category-item"
        size="small"
      >
        <el-link
          :href="`/category/${category.name}/1`"
          type="primary"
          class="category-link"
        >
          {{ category.name }}({{ category.count }})
        </el-link>
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Category {
  name: string;
  count: number;
}

// 获取所有文章并统计分类
const { data: categories } = await useAsyncData<Category[]>('sidebar-categories', async () => {
  const articles = await queryCollection('content')
    .select('category')
    .all();

  // 统计每个分类的文章数量
  const categoryCounts = (articles || []).reduce((acc, article) => {
    const category = article.category || '未分类';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 转换为数组格式并按文章数量排序
  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count);
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

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-item {
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

.category-link {
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
}
</style>
