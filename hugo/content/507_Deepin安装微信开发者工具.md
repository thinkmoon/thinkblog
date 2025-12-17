---
title: Deepin安装微信开发者工具
date: '2019-10-28 17:14:44'
lastmod: '2019-10-28 17:14:44'
categories:
- 学习笔记
tags:
- linux
---


> 我们都知道，微信开发者工具是没有linux版的，还是有点难受。好在有大神迁移了。



<!-- more -->



### 1. 下载项目

``` bash

git clone https://github.com/cytle/wechat_web_devtools.git

```



### 2. 进入目录

``` bash

cd wechat_web_devtools

```



### 3. 自动下载最新 `nw.js` , 同时部署目录 `~/.config/微信web开发者工具/`

``` bash

./bin/wxdt install

```

> 最好先切换npm淘宝源[npm太慢使用淘宝npm镜像](https://thinkmoon.cn/7e1.html)



### 4. 运行

``` bash

./bin/wxdt

```



### 7. 错误排除



#### 1. 提示“小程序重启耗时过久，请确认业务逻辑中是否有复杂运算或死循环”

> 解决方案：`apt-get install wine-binfmt`