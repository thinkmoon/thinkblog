<template>
  <div class="">
    <Title>{{ article.title }} | {{ config.TITLE }}</Title>
    <div class="article-content">
      <VMdPreview :text="content" />
      <ins
        class="adsbygoogle"
        data-ad-client="ca-pub-3208634444966567"
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-ad-slot="2621880404"
        style="display:block; text-align:center;width: 100%"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VMdPreview from "~/components/VMdPreview";
import ArticleApi from '@/api/ArticleApi';
import { useRoute } from 'vue-router';
import { pushUrl } from '~/utils/BaiduSite';
import { computed } from 'vue';

const config = useAppConfig();
const route = useRoute();

const { data: article } = await useAsyncData('article', () => ArticleApi.getDetail({ cid: route.params.cid }));

const url = `https://www.thinkmoon.cn/post/${route.params.cid}`;

if (article.value.fields instanceof Array) {
  const fields = {};
  article.value.fields.forEach((i) => {
    fields[i.name] = i.value;
  });
  article.value.fields = fields;
}
const copyRight = `> 版权声明: （${url}）\n 本文首发于[指尖魔法屋-${article.value.title}](${url})\n转载或引用必须申明原指尖魔法屋来源及源地址！`;
const content = computed(() => `# ${article.value.title} \r\n ${article.value.text} \r\n ${copyRight}`);
pushUrl(`/post/${route.params.cid}`);
if(process.client){
  useHead({
    meta: [
      { name: 'keywords', content: article.value.tag.map((i) => i.name).join(',') || config.KEYWORDS },
      { name: 'description', content: article.value.fields.desc || config.DESCRIPTION },
    ],
  });
}
</script>

<style lang="less" scoped>
.article-content {
  margin: auto;
  background: #fff;
}

:deep(.github-markdown-body) {
  font-size: 14px;
}

@media (max-width: 1024px) {
  .article-content {
    width: 100%;
  }
  :deep(.github-markdown-body) {
    padding: 4px 8px 8px;
    font-size: 12px;
    h1 {
      font-size: 22px;
      font-weight: bold;
    }
  }
}
</style>
