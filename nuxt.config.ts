// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { name: 'keywords', content: 'thinkmoon,指尖魔法屋,醉月思的博客' },
        { name: 'description', content: '醉月思的博客——指尖魔法屋：分享和记录日常学习的笔记。总结与记录是两个极其优秀的学习习惯、对知识和技术保持敬畏之心！' },
      ],
    },
  },
  sourcemap: {
    "server": false,
    "client": false
  },
  css: ['assets/css/index.less'],
  experimental: {
    writeEarlyHints: false
  },
  modules: ['@nuxt/content', ['@pinia/nuxt', {
    autoImports: [
      // 自动引入 `usePinia()`
      'defineStore',
      // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
      ['defineStore', 'definePiniaStore'],
    ],
  }], '@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/seo'],
  content: {
    preview:{
      api: 'https://api.nuxt.studio'
    },
    database: {
      type: 'd1',
      bindingName: 'blog'
    }
  }
});