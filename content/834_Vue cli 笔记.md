---
title: Vue cli 笔记
date: '2020-06-23 08:59:51'
modified: '2020-06-23 08:59:51'
category: 学习笔记
tags:
- vue
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-04-19T02:47:53.png
---

![2020-04-19T02:47:53.png][1]


## 安装

全局安装`@vue/cli`

```shell
yarn global add @vue/cli
```

检查是否安装成功(需重启更新环境变量)

```bash
vue --version
```

![2020-04-19T02:36:37.png][2]

## 快速原型开发

新版本Vue中增加了该功能，方便快速进行单个Vue文件开发，需要先额外安装一个全局的扩展。

```shell
yarn global add @vue/cli-service-global
```

入手尝鲜

### 新建index.vue文件

```html
<template>
    <div>Hello Vue</div>
</template>
```

### 运行服务

```shell
vue serve index.vue
```

### 效果

![2020-04-19T02:47:22.png][3]

## 创建项目

略

## vue.config.js
在vue cli 3.x/4.x 中，使用vue.cofig.js来进行一些包括webpack的配置。比如我们可以想要一个控制台输出编译时间的配置，可以在如下设置
```javascript
const moment = require('moment')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '三只蜜桔后台管理系统·商户版',
        args[0].buildTime = moment().format('YYYY.MM.DD.HH.mm')
        return args
      })
  }
}

````

亦或者，我们想要在生产环境禁用console.log
```javascript
const moment = require('moment')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '三只蜜桔后台管理系统·商户版',
        args[0].buildTime = moment().format('YYYY.MM.DD.HH.mm')
        return args
      })
    config.optimization
      .minimizer('terser')
      .tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log']
        })
        return args
      })
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: `${moment().format('YYYY.MM.DD.HH.mm')}.${process.env.NODE_ENV}.[name].js`,
      chunkFilename: `${moment().format('YYYY.MM.DD.HH.mm')}.${process.env.NODE_ENV}.[name].js`
    }
  }
}
```





  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-04-19T02:47:53.png
  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-04-19T02:36:37.png
  [3]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-04-19T02:47:22.png