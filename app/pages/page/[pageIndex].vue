<template>
  <div class="page-content">
    <Title>第{{ route.params.pageIndex }}页 | {{ config.TITLE }}</Title>
    <div class="post-container">
      <PostList :post-list="postList || []" />
      <div class="pagination-div">
        <div class="pagination-container">
          <el-link
            v-if="Number(currentPage) !== 1"
            :href="`/page/${Number(currentPage) - 1}`"
            type="primary"
            class="pagination-item"
          >
            上一页
          </el-link>
          
          <template v-for="page in displayedPages" :key="page">
            <el-link
              v-if="page === '...'"
              class="pagination-item"
              disabled
            >
              {{ page }}
            </el-link>
            <el-link
              v-else
              :href="`/page/${page}`"
              :type="page === currentPage ? 'success' : 'primary'"
              class="pagination-item"
            >
              {{ page }}
            </el-link>
          </template>

          <el-link
            v-if="Number(currentPage) !== totalPages"
            :href="`/page/${Number(currentPage) + 1}`"
            type="primary"
            class="pagination-item"
          >
            下一页
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

interface Content {
  title: string
  description?: string
  date: string
  modified?: string
  category?: string
  tags?: string[]
  path?: string
  [key: string]: any
}

const route = useRoute()
const pageSize = 10
const currentPage = computed(() => Number(route.params.pageIndex) || 1)

const { data: postList } = await useAsyncData<PostItem[]>('content-list', () => {
  return queryCollection('content')
    .order('date', 'DESC')
    .skip((currentPage.value - 1) * pageSize)
    .limit(pageSize)
    .all()
    .then(articles => (articles || []).map(article => ({
      id: article.path || '',
      title: article.title || '',
      path: article.path || '',
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
    })))
})

const { data: total } = await useAsyncData('content-total', () => {
  return queryCollection('content').count()
})

const totalPages = computed(() => Math.ceil((total.value || 0) / pageSize))

// 计算要显示的页码
const displayedPages = computed(() => {
  const pages: (number | string)[] = []
  const current = currentPage.value
  const total = totalPages.value
  const maxVisible = 5 // 最大显示的页码数

  if (total <= maxVisible) {
    // 如果总页数小于等于最大显示数，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 始终显示第一页
    pages.push(1)

    // 计算中间页码的起始和结束
    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)

    // 调整start和end，确保显示固定数量的页码
    if (current <= 3) {
      start = 2
      end = 4
    } else if (current >= total - 2) {
      start = total - 3
      end = total - 1
    }

    // 添加省略号
    if (start > 2) {
      pages.push('...')
    }

    // 添加中间页码
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // 添加省略号
    if (end < total - 1) {
      pages.push('...')
    }

    // 始终显示最后一页
    pages.push(total)
  }

  return pages
})


import { pushUrl } from '~/utils/BaiduSite';

const config = useAppConfig();

pushUrl(`/page/${route.params.pageIndex}`)
</script>

<style lang="less" scoped>
@media (max-width: 1024px) {
  .page-content {
    width: 100%;

    .blog-posts {
      width: 100%;

      .posts-default-content .right,
      .post-author {
        display: none;
      }
    }

    .page-section {
      display: none;
    }
  }
}

.pagination-div {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  background: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.pagination-item {
  min-width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  }

  &.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
