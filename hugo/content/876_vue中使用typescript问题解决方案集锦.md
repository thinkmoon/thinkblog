---
title: vue中使用typescript问题解决方案集锦
date: '2020-06-23 22:04:32'
lastmod: '2020-06-23 22:04:32'
categories:
- 学习笔记
tags:
- webpack
- typescript
- vue
description: typescript是个好东西，可是在vue中使用的时候却经常会遇到很多问题，本文收集了作者遇到的一些问题，已经对应的解决方案，希望能对读者有所帮助
featured_image: http://blog.cdn.thinkmoon.cn/blog/typecho/2018-12-25-ts.jpeg
---


![typescript][1]



## 本文环境



1. @vue/cli 4.3.1

2. typescript 3.9.5



## 相关配置文件



1. vue.config.js

2. tsconfig.json

3. shims-vue.d.ts



## 问题汇总



### 导入 vue 文件报错



错误信息：Cannot find module './App.vue' or its corresponding type declarations

解决方案：修改`shims-vue.d.ts`



```typescript

declare module "*.vue" {

  import Vue from "vue";

  export default Vue;

}

```



### Vscode 报错，编译不报错



解决方案：重启 Vscode



### 挂载原型\$api 报错



解决方案：在src目录下新增`vue-property.d.ts`



```typescript

import Vue from 'vue'

declare module "vue/types/vue" {

  interface Vue {

    $api: any;

  }

}

```



### 无法使用@components别名 alias 路径



解决方案: 修改`tsconfig.json`



```json

{

  "compilerOptions": {

    "target": "esnext",

    "module": "esnext",

    "strict": true,

    "jsx": "preserve",

    "importHelpers": true,

    "moduleResolution": "node",

    "experimentalDecorators": true,

    "esModuleInterop": true,

    "allowSyntheticDefaultImports": true,

    "sourceMap": true,

    "baseUrl": ".",

    "types": ["webpack-env", "vuex"],

    "paths": {

      "@/*": ["src/*"],

      "@/components": ["src/components"] // 添加这一行

    },

    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]

  },

  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "tests/**/*.ts", "tests/**/*.tsx"],

  "exclude": ["node_modules"]

}

```





  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2018-12-25-ts.jpeg