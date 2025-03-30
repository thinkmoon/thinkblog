<template>
  <div class="search-page">
    <Title>搜索结果 | {{ config.TITLE }}</Title>
    <div class="search-header">
      <h1>搜索结果</h1>
      <p v-if="keywords">关键词: "{{ keywords }}"</p>
    </div>
    
    <div v-if="searchResults.length === 0" class="no-result">
      未找到相关文章
    </div>
    <div v-else class="search-results">
      <div v-for="result in searchResults" :key="result.path" class="search-item">
        <NuxtLink :to="result.path" class="result-link">
          <h3 class="result-title">{{ result.title }}</h3>
          <p class="result-excerpt">{{ result.excerpt }}</p>
          <div class="result-meta">
            <span class="result-date">{{ formatDate(result.date) }}</span>
            <span class="result-category">{{ result.category }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  date: string;
  category: string;
}

interface SearchableContent {
  id: string;
  title: string;
  titles: string[];
  level: number;
  content: string;
}

const config = useAppConfig();
const route = useRoute();
const keywords = ref(route.query.q as string || '');
const searchResults = ref<SearchResult[]>([]);

// 获取所有可搜索的内容
const { data: searchableContent } = await useAsyncData<SearchableContent[]>('searchable-content', () => {
  return queryCollectionSearchSections('content');
});

// 执行搜索
const performSearch = () => {
  if (!keywords.value.trim()) return;
  
  const searchTerm = keywords.value.toLowerCase();
  const results = (searchableContent.value || []).filter((item: SearchableContent) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const contentMatch = item.content.toLowerCase().includes(searchTerm);
    return titleMatch || contentMatch;
  }).map((item: SearchableContent) => ({
    title: item.title,
    path: `/content${item.id}`,
    excerpt: item.content.substring(0, 200) + '...',
    date: '', // 由于搜索结果中没有日期信息，暂时留空
    category: '' // 由于搜索结果中没有分类信息，暂时留空
  }));

  searchResults.value = results;
};

// 监听路由参数变化
watch(() => route.query.q, (newQuery) => {
  keywords.value = newQuery as string || '';
  performSearch();
});

// 初始执行搜索
onMounted(() => {
  performSearch();
});

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-header {
  margin-bottom: 30px;
}

.search-header h1 {
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
}

.search-header p {
  margin: 0;
  color: #666;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-item:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.result-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.result-title {
  margin: 0 0 10px;
  color: #409EFF;
  font-size: 18px;
}

.result-excerpt {
  margin: 0 0 10px;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.result-meta {
  font-size: 12px;
  color: #999;
}

.result-date {
  margin-right: 15px;
}

.result-category {
  color: #409EFF;
}

.no-result {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
}
</style> 