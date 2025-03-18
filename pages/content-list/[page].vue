<script setup lang="ts">
interface Content {
  title: string
  description?: string
  date: string
  modified?: string
  category?: string
  tags?: string[]
  [key: string]: any
}

const route = useRoute()
const pageSize = 10
const currentPage = computed(() => Number(route.params.page) || 1)

const { data: contentList } = await useAsyncData<Content[]>('content-list', () => {
  return queryCollection('content')
    .order('date', 'DESC')
    .skip((currentPage.value - 1) * pageSize)
    .limit(pageSize)
    .all()
})

const { data: total } = await useAsyncData('content-total', () => {
  return queryCollection('content').count()
})

const totalPages = computed(() => Math.ceil((total.value || 0) / pageSize))

// 生成分页链接
const getPageUrl = (page: number) => {
  return `/content-list/${page}`
}

// 生成文章链接
const getArticleUrl = (path: string) => {
  console.log(path.path)
  return `/content${path.path}`
}
</script>

<template>
  <div class="content-list">
    <div v-if="contentList" class="list">
      <div v-for="item in contentList" :key="item.path" class="item">
        <NuxtLink :to="getArticleUrl(item)">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <div class="meta">
            <span v-if="item.date">{{ new Date(item.date).toLocaleDateString() }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <NuxtLink
        v-if="currentPage > 1"
        :to="getPageUrl(currentPage - 1)"
        class="page-link"
      >
        上一页
      </NuxtLink>
      
      <span v-for="page in totalPages" :key="page" class="page-number">
        <NuxtLink
          :to="getPageUrl(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </NuxtLink>
      </span>

      <NuxtLink
        v-if="currentPage < totalPages"
        :to="getPageUrl(currentPage + 1)"
        class="page-link"
      >
        下一页
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.content-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.list {
  margin-bottom: 30px;
}

.item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.item a {
  text-decoration: none;
  color: inherit;
}

.item h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.item p {
  margin: 0 0 10px 0;
  color: #666;
}

.meta {
  font-size: 0.9em;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.page-link, .page-number a {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.page-number a.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-link:hover, .page-number a:hover {
  background-color: #f8f9fa;
}

.page-number a.active:hover {
  background-color: #0056b3;
}
</style>