<template>
  <div class="section">
    <el-input
      v-model="keywords"
      class="input-with-select"
      placeholder="站内搜索"
      @keyup.enter="handleSearch"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import type { ContentCollectionItem } from '@nuxt/content';
import { useRouter } from 'vue-router';

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

const router = useRouter();
const keywords = ref('');
const dialogVisible = ref(false);
const searchResults = ref<SearchResult[]>([]);

// 获取所有可搜索的内容
const { data: searchableContent } = await useAsyncData<SearchableContent[]>('searchable-content', () => {
  return queryCollectionSearchSections('content');
});

// 处理搜索
const handleSearch = () => {
  if (!keywords.value.trim()) return;
  router.push({
    path: '/search',
    query: { q: keywords.value }
  });
};

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
.section {
  margin-bottom: 20px;
}

.input-with-select {
  width: 100%;
}

.search-results {
  max-height: 60vh;
  overflow-y: auto;
}

.search-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.search-item:last-child {
  border-bottom: none;
}

.result-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.result-title {
  margin: 0 0 8px;
  color: #409EFF;
  font-size: 16px;
}

.result-excerpt {
  margin: 0 0 8px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
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
  padding: 20px;
  color: #999;
}
</style>
