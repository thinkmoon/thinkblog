---
title: 为typecho增加Ctrl+S保存文章功能
date: '2019-10-28 15:45:32'
lastmod: '2019-10-28 15:45:32'
categories:
- 闲余折腾
tags: []
---


## 前言



本文使用jQuery修改typecho让其在文章编辑页内支持`CTRL + S`保存文章草稿，typecho的版本为1.2 (18.10.23).



## 为什么需要？



由于个人博客使用的typecho，在编辑文章的过程中经常习惯性的点击`CTRl + S`，然后就会非常不友好的提示了这个。



![2019-10-28T06:59:58.png][1]



这对追求优雅的本宅来说，简直无法容忍。难道我要因此弃用typecho?这也太夸张了。那就来发挥我modify的能力吧，毕竟闲余折腾是我的一大乐趣，而且自己动手，丰衣足食嘛！



## 心路历程



1. 首先，我知道这个理论上绝对可行，因为我用过很多此类功能。



2. 经查阅资料，chrome的适配最好，当然我也没考虑别的浏览器，因为我眼中的浏览器只有两种，chrome和不是chrome。随便一提：不用chrome的程序员不是优雅的程序员。



3. 分析实现方法，大致分为两步，监听`ctrl+s`时间和模拟点击保存草稿按钮



4. 选型方面，由于typecho内置jquery，因此采用最快捷的办法



## 实现过程



### 确认页面是否支持jQuery



为了避免重复引入，我们可在console中输入`$`，根据提示来确认是否已有jQuery



![确认是否已有jQuery][2]



如图，则表示已有jQuery。



### 找到编辑文章的php页面



嗯，就是这个路径`typecho/admin/write-post.php`



### 找个合适位置放script



请在文件末尾插入一个script节点，以防止在jquery定义之前使用或者在`if`语句中未应用。



### 监听`ctrl + S`



在script节点中插入以下代码



```

$(window).keydown(function(event) {

        if (event.ctrlKey && event.which == 83) {

            alert("Ctrl+S pressed.");

            return false;

        } else {

            return true;

        }

    });

```



刷新编辑文章页，提示以下内容则监听成功。



![好像暗黑背景有点看不清？][3]



## 模拟点击保存



通过源代码分析，我们可以发现，保存文章的按钮id为`btn-save`。现在我们修改代码里面的内容如下



```

$(window).keydown(function(event) {

        if (event.ctrlKey && event.which == 83) {

            $("#btn-save").click();

            return false;

        } else {

            return true;

        }

    });

```



## 大功告成



![2019-10-28T07:33:26.png][4]



## 结语



本文从技术层面上来说没什么亮点，这是我在尝试一种新的写作方式的练手篇。在原先只记录如何做的基础上，增加了了心路历程这一项，侧重于记录我在实际过程中一个想法到把它实现出来的整个过程，目的在于分享如何思考，从哪里开始，怎么实现的整个思维过程。大家且当抛砖引玉看看吧！



## 参考资料



[JavaScript或jQuery模拟点击超链接和按钮][5]

[javascript屏蔽Ctrl+s，F1，F3各浏览器兼容写法][6]





  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-28T06:59:58.png

  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-28T07:14:31.png

  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-28T07:29:12.png

  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-28T07:33:26.png

  [5]: https://www.cnblogs.com/freeweb/p/4797872.html

  [6]: https://blog.csdn.net/milaner337/article/details/49835555