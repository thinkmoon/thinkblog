---
title: el-upload视频上传支持回显和预览的一种异教徒解决方案
date: '2020-06-18 11:28:57'
modified: '2020-06-18 11:28:57'
category: 学习笔记
tags:
- 前端
- element-ui
- vue
desc: 该文章为异教徒解决方案，各位看官看下即可，切勿模仿！！！
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-06-03T05:42:34.png
---

> 该文章为异教徒解决方案，各位看官看下即可，切勿模仿！！！

## 问题描述

原生的el-upload只支持上传图片时候的预览和回显，这是因为只针对img标签做了适配，如下图。

![2020-06-03T05:42:34.png][1]

而如果我们上传视频，则会出现一个白方框，用户体验不佳。

![2020-06-03T05:45:07.png][2]

## 解决思路

其实正确的解决思路应该是
1. 将`show-file-list`属性设置为`false`。然后再自己循环显示file-list，以及追加对应的预览，删除按钮及功能。
2. 设置自定义模板内容(推荐使用)

但是我觉得这样太麻烦了(时间问题）。

于是我突发奇想，如果我将img标签改成video标签呢？如下图

![2020-06-03T05:46:56.png][3]

发现居然完美契合，毫无违和感。

## 预览的实现

在做到把img改为video标签之前，还需要解决的另一个问题就是，如何让视频也支持预览。老规矩，我们先来看看官方Demo怎么实现预览的。

![2020-06-03T05:54:03.png][4]

官方的做法是增加一个dialog，然后在点击预览图片时将文件url传给dialog。我们先来实现一下改写一下dialog

```vue
<el-dialog :visible.sync="dialogVisible" :modal-append-to-body="true">
      <video width="100%" muted autoplay="autoplay" loop="loop" v-if="dialogImageUrl[dialogImageUrl.length - 1] == 4" :src="dialogImageUrl"></video>
      <img width="100%" v-else :src="dialogImageUrl" alt />
    </el-dialog>
```
> tips: 我这种判断MP4格式的方式实属异端，不建议模仿。

## 替换img标签

一到标签节点的操作，我第一想到的就是document操作（异端+1），直接上代码。

```javascript
 changeVideoTag(){
      let videoTag = document.querySelector('.video img')
      console.log('检测到应为video的img标签', videoTag)
      if(videoTag){
        let parentNode = videoTag.parentNode
        let newElement = document.createElement('video')
        newElement.setAttribute('class', videoTag.getAttribute('class'))
        newElement.setAttribute('src', videoTag.getAttribute('src'))
        parentNode.insertBefore(newElement, videoTag)
      }
    },
```

该函数负责寻找video类下的img标签，然后在img标签之前，添加一个同样的videos元素节点，此处你可以选择是否移除原img标签。

## 最终实现效果

![gif.gif][5]

## 最后的话

1. 这种方法非常不推荐使用，强烈建议使用自定义模板缩略图
2. 这种方法非常不推荐使用，强烈建议使用自定义模板缩略图
3. 这种方法非常不推荐使用，强烈建议使用自定义模板缩略图


  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-06-03T05:42:34.png
  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-06-03T05:45:07.png
  [3]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-06-03T05:46:56.png
  [4]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-06-03T05:54:03.png
  [5]: http://blog.cdn.thinkmoon.cn/blog/typecho/gif.gif