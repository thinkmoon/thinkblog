<template>
  <div class="page-content">
    <Title>所有分类 | {{ config.TITLE }}</Title>
    <el-tag
      v-for="category in categories"
      :key="category.name"
      type="info"
      class="category-list"
    >
      <el-link
        :href="`/category/${category.name}/1`"
        type="info"
      >
        {{ category.name }}({{ category.count }})
      </el-link>
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
interface Category {
  name: string;
  count: number;
}

const config = useAppConfig();

// 获取所有文章并统计分类
const { data: categories } = await useAsyncData<Category[]>('categories', async () => {
  const articles = await queryCollection('content')
    .select('category')
    .all();

  // 统计每个分类的文章数量
  const categoryCounts = (articles || []).reduce((acc, article) => {
    const category = article.category || '未分类';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 转换为数组格式
  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  }));
});
</script>

<style lang="less" scoped>
.category-list {
  margin: 10px;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
