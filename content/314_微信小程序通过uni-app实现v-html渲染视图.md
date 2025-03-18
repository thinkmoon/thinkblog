---
title: 微信小程序通过uni-app实现v-html渲染视图
date: '2019-07-02 11:44:51'
modified: '2019-07-02 11:44:51'
category: 学习笔记
tags:
- uni-app
- vue
- 微信小程序
thumb: https://blog.cdn.thinkmoon.cn/小书匠/2019/5/1559181160577.png
---

## v-html介绍
如果不使用v-html而是直接将html标签加入视图层会出现html标签不解析的情况，如果我们想实现解析的效果。vue中提供了v-html指令。使用 v-html 指令，你可以将html标签解析渲染到视图层。

## 微信小程序如何使用？
由于微信小程序只是类vue的，与vue存在着很多不同点。但是为了秉承将vue进行到底的宗旨，很多微信小程序开发框架如雨后春笋。在我使用的过程中，感觉uni-app与vue最为贴近，而且适配了很多vue的特性，如：v-model，filters，v-html等。官网是这样介绍的。

![uni-app支持的vue特性](https://blog.cdn.thinkmoon.cn/小书匠/2019/5/1559181160577.png)

其中，他们是通过微信小程序rich-text的属性来实现v-html的效果的。所以，我们想知道支持什么标签，就得移步至[rich-text | 微信开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)

## 开始实现Demo
> demo 中的需求是一个赛事报名list，其中赛事状态有，预报名，报名成功，正在进行，已结束等。

预实现方法：由于微信小程序的rich-text组件会禁用所有的节点事件，所以想通过@click绑定v-html节点事件，filter渲染界面。但是在实现过程中发现不支持在v-html中使用filter, 故后来采用methods的返回值来实现视图层的渲染。

![methods实现v-html渲染](https://blog.cdn.thinkmoon.cn/小书匠/2019/5/1559181971369.png)

效果如下：至此效果，v-html解析成功

![v-html 渲染效果](https://blog.cdn.thinkmoon.cn/小书匠/2019/5/1559182060169.png)

添加状态判断

![最终效果](https://blog.cdn.thinkmoon.cn/小书匠/2019/5/1559186150310.png)