<template>
  <div class="page-content">
    <Title>第{{ route.params.pageIndex }}页 | {{ config.TITLE }}</Title>
    <div class="post-container">
      <PostList :post-list="postList" />
      <div class="pagination-div">
        <div>
          <el-link
            v-if="Number(pageIndex) !== 1"
            :href="`/page/${Number(pageIndex) - 1}`"
            type="primary"
          >
            上一页
          </el-link>
        </div>
        <div>
          <el-link
            v-if="Number(pageIndex) !== data.pages"
            :href="`/page/${Number(pageIndex) + 1}`"
            type="primary"
          >
            下一页
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArticleApi from '@/api/ArticleApi';

import { pushUrl } from '~/utils/BaiduSite';

const config = useAppConfig();
const route = useRoute();
const pageData = {
  total: 0,
  current: 0,
};
const pageIndex = route.params.pageIndex;
pageData.current = Number(pageIndex);
const { data } = await useAsyncData('res', () => ArticleApi.getList({ current: pageIndex }));

const postList = reactive(data.value.records);
postList.forEach((item) => {
  if (item.fields instanceof Array) {
    const fields = {};
    item.fields?.forEach((i) => {
      fields[i.name] = i.value;
    });
    item.fields = fields;
  }
});
pageData.total = data.value.total;
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
  justify-content: space-between;
}

</style>
