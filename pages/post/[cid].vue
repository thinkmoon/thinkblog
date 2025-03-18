<template>
  <div class="">
    <Title>{{ content?.title }} | {{ config.TITLE }}</Title>
    <div class="article-content">
      <ContentRenderer v-if="content" :value="content" class="markdown-body" />
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
import { useRoute } from 'vue-router';
import { pushUrl } from '~/utils/BaiduSite';
import { computed } from 'vue';
import { getContentById, type Content } from '~/utils/content';

const config = useAppConfig();
const route = useRoute();

const { data: content } = await useAsyncData(route.path, () => {
  return getContentById(route.params.cid as string)
})

const url = `https://www.thinkmoon.cn/post/${route.params.cid}`;

const copyRight = computed(() => {
  if (!content.value) return '';
  return `> 版权声明: （${url}）\n 本文首发于[指尖魔法屋-${content.value.title}](${url})\n转载或引用必须申明原指尖魔法屋来源及源地址！`;
})

const markdownContent = computed(() => {
  if (!content.value) return '';
  return `# ${content.value.title} \r\n ${content.value.rawbody?.replace(/\n/g, '')} \r\n ${copyRight.value}`;
})

pushUrl(`/post/${route.params.cid}`);

if(process.client && content.value){
  useHead({
    meta: [
      { name: 'keywords', content: content.value.tag?.map((i: { name: string }) => i.name).join(',') || config.KEYWORDS },
      { name: 'description', content: content.value.fields?.desc || config.DESCRIPTION },
    ],
  });
}
</script>

<style lang="less">
@import '~/assets/css/github-markdown.css';
.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>