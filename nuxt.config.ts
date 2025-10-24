// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

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
  css: ['~/assets/css/index.less'],
  experimental: {
    writeEarlyHints: false
  },
  modules: ['@nuxtjs/sitemap', '@nuxt/content', ['@pinia/nuxt', {
    autoImports: [
      // 自动引入 `usePinia()`
      'defineStore',
      // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
      ['defineStore', 'definePiniaStore'],
    ],
  }], '@nuxtjs/tailwindcss', '@nuxtjs/seo'],
  sitemap: {
    exclude: ['/admin/**'],
    autoLastmod: true
  },
  content: {
    // 静态模式使用文件系统存储
    preview:{
      api: 'https://api.nuxt.studio'
    },
    // 强制禁用数据库，使用文件系统
    sources: {
      content: {
        driver: 'fs',
        prefix: '/api/_content'
      }
    }
  },
  // 静态生成配置
  nitro: {
    prerender: {
      routes: ['/']
    },
    rollupConfig: {
      external: ['better-sqlite3', 'bindings']
    }
  },
  // 静态生成模式
  ssr: false
});