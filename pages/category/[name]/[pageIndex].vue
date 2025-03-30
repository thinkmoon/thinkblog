<template>
  <div>
    <Title>分类"{{ route.params.name }}"下的文章 | {{ config.TITLE }}</Title>
    <PostList :post-list="posts || []" />
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="10"
        :total="total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content'

interface PostItem {
  id: string;
  title: string;
  path: string;
  date: string;
  tags: string[];
  category: string;
  meta: {
    thumb?: string;
    desc: string;
  };
  views: number;
  likes: number;
  fields: Record<string, any>;
}

const config = useAppConfig();
const route = useRoute();
const router = useRouter();
const currentPage = ref(Number(route.params.pageIndex));
const total = ref(0);

// 获取指定分类的所有文章总数
const { data: totalCount } = await useAsyncData(`category-${route.params.name}-count`, async () => {
  const count = await queryCollection('content')
    .where('category', '=', route.params.name)
    .count();
  return count;
});

total.value = totalCount.value || 0;

// 获取指定分类的所有文章
const { data: posts } = await useAsyncData<PostItem[]>(`category-${route.params.name}`, async () => {
  const articles = await queryCollection('content')
    .where('category', '=', route.params.name)
    .order('date', 'DESC')
    .skip((currentPage.value - 1) * 10)
    .limit(10)
    .select('title', 'path', 'date', 'description', 'fields', 'tags', 'category', 'meta')
    .all();

  return (articles || []).map((article) => ({
    id: article.path,
    title: article.title || '',
    path: article.path,
    date: article.date,
    description: article.description || '',
    tags: article.tags || [],
    category: article.category || '',
    meta: {
      thumb: typeof article.meta?.thumb === 'string' ? article.meta.thumb : '',
      desc: article.description || ''
    },
    views: 0,
    likes: 0,
    fields: article.fields || {}
  }));
});

// 处理页码变化
const handlePageChange = (page: number) => {
  router.push(`/category/${route.params.name}/${page}`);
};

// 如果没有找到文章，重定向到404页面
if (!posts.value?.length) {
  throw createError({
    statusCode: 404,
    message: `No posts found in category "${route.params.name}"`
  });
}
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
