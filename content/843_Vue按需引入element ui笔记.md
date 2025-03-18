---
title: ' Vue按需引入element ui笔记'
date: ''
modified: ''
category: 学习笔记
tags:
- vue
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-01T03:05:01.png
---

> 按官网文档一键配置按需引入总是无法生效，目测可能是激进式预设没有选babel的原因。故写此文详细记录折腾过程，望有效！

## vue ui创建新项目

选择预设，bable，eslint，vuex，vue-router(历史模式)

## vue ui安装element插件

选择配置

![2020-05-01T03:05:01.png][1]

## 改动的内容

1. 自动创建了`bable.config.js`,并添加了内容。
2. 创建了`@/src/plugins/element.js,设置了按需引入
3. 改写了`app.vue`,添加了element按钮组件

## 运行测试

![2020-05-01T03:10:21.png][2]

加载成功

![2020-05-01T03:11:11.png][3]

## Q&A
1. 为什么需要bable来支持按需加载
如果不使用bable转码，那你按需引入会找不到该组件。这是由于bable在将组件库转码的过程中把element整个组件库编译成了各种独立的组件模块，进而实现按需加载的功能

2. 如何添加需要的组件
使用vue ui添加后的组件会在plugins目录下创建element.js文件，然后在main.js中引入该文件。文件内容如下：
```javascript
import Vue from "vue";
import { Button } from "element-ui";

Vue.use(Button);
```
这就是只引入Button的方法，如果要按需添加，只需要依葫芦画瓢即可！

  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-01T03:05:01.png
  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-01T03:10:21.png
  [3]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-01T03:11:11.png