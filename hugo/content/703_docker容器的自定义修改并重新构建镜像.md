---
title: docker容器的自定义修改并重新构建镜像
date: '2020-01-02 16:19:54'
lastmod: '2020-01-02 16:19:54'
categories:
- 学习笔记
tags:
- vscode
- docker
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-02T08:04:43.png
---


## 前言

在上篇文章中，我们已经实现了`VS code`的无缝连接docker，却依旧存在着一些问题。比如它需要安装`pylint`方便调试，但是每次stop 容器之后，重新启动又需要重新安装，不可谓不麻烦。而且我发现它也需要重新安装`VS code server`,这是一个严重影响生产力的过程。所以目前的需求就变了如何作一些自定义的修改，并让这些修改永久性的保存。那答案当然是自定义的构建镜像啦，它可以让我们在构建的实践使用容器的过程中，将所做的更新持续化保存到自定义镜像。



## 自定义修改



在这里，我手动做了两个修改，一个是安装`pylint`，一个是更新`pip`。



![自定义修改容器][1]



## 提交更改



```bash

docker commit -m="install pylint" -a="chauncey" tf chauncey/tf 

```



如上命令，将所有对容器的操作都保存至自定义镜像`chauncey/tf `中。



## 测试效果



1. 停止当前容器



```bash

docker stop tf

```



2. 使用自定义镜像创建容器



```bash

docker run --gpus all -itd --name tf --rm -v ~/Project:/root/Project  chauncey/tf  

```



3. 使用VS code远程连接，观察pip版本和pylint的安装情况。



![pip版本和pylint的安装情况][2]



如上图，我们发现pip已经是最新的版本。而且细心小伙伴会发现，连接容器时以及没有了install Dev container的提示了，这说明我们的VS code也已经预设安装进了镜像。



  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-02T08:04:43.png

  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-01-02T08:11:37.png