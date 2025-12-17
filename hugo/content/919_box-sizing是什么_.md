---
title: box-sizing是什么？
date: '2020-09-20 22:42:43'
lastmod: '2020-09-20 22:42:43'
categories:
- 学习笔记
tags:
- html
- css
description: 笔者初学前端时，遇到一些具有padding/border的子元素铺满父元素时，常常采用人工计算width的方式来实现效果。知道后来了解到box-sizing，才知道那种实现方式是多么的尴尬！
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-09-20T09:55:28.png
---


笔者初学前端时，遇到一些具有padding/border的子元素铺满父元素时，常常采用人工计算width的方式来实现效果。知道后来了解到box-sizing，才知道那种实现方式是多么的尴尬！



## box-sizing



> box-sizing 属性允许你以某种方式定义某些元素，以适应指定区域。



box-sizing具有三个值



1. content-box，默认值，指定盒模型为 W3C 标准模型，设置 border、padding 会增加元素 width与 height 的尺寸。

2. border-box，指定盒模型为 IE模型（怪异模式），设置 border、padding 不会影响元素 width 与 height 的尺寸。	

3. inherit，继承



## 举个例子



```html

<template>

<block>

  <div class="parent"></div>

 <div class="child"></div>

</block>

</template>



<script>

export default {

  name: "HelloWorld",

  props: {

    msg: String

  }

};

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

div{

  display: inline-block;

  height: 100px;

  width: 100px;

  padding: 10px;

  border-width: 10px;

  margin: 10px;

}

.parent {

  box-sizing: content-box;

}

 .child {

    box-sizing: border-box;

  }

</style>



```



## 效果展示



> parent



![2020-09-20T14:40:14.png][1]



上图我们可以看到，content-box下，width的宽度只是content的宽度，元素的实际宽度等于width+border+padding



> child



![2020-09-20T14:42:40.png][2]



而在border-box，width的宽度指的是边框盒子的宽度，元素的实际宽度就等于width





  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-09-20T14:40:14.png

  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-09-20T14:42:40.png