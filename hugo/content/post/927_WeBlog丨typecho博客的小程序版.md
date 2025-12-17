---
title: WeBlog丨typecho博客的小程序版
date: '2020-10-11 12:43:06'
lastmod: '2020-10-11 12:43:06'
categories:
- 源码解剖
tags:
- vuejs
- weblog
- 博客
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/weblog.png
---


[Meting]

[Music title="执着" author="许巍" url="//blog.cdn.thinkmoon.cn/blog/typecho/KocBAFuKZUGAL5WlAEPNUPyXTc8102.mp3" pic="//p3fx.kgimg.com/stdmusic/400/20150718/20150718081906562115.jpg" /]

[/Meting]



![weblog.png][1]



# WeBlog



<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" /></a>



typecho博客的小程序版,支持微信小程序，QQ小程序



## 特性



## 音频播放



支持Aplayer插件播放audio/音乐



![2020-02-21T03:36:30.png][2]



## 跨平台编译



基于uni-app开发，支持多端编译。包括但不限于，APP，微信小程序，快应用，QQ小程序，支付宝小程序，H5移动端



|  微信小程序   | QQ小程序 |

|  ----  | ----  | ----  |

| ![微信小程序二维码][3]  | ![QQ小程序二维码][4] |





## 一键换肤



采用互补色彩设计原则，支持一键修改主题色。修改[文件](https://github.com/thinkmoon/WeBlog/blob/master/uni-app/common/tmui.less)中的RGB值，即可一键换肤。下面提供一些颜色供以参考。



### 知乎蓝



|  首页   | 文章页 | 关于页 |

|  ----  | ----  | ----  |

| ![2020-02-21T02:35:52.png][5] | ![2020-02-21T02:36:10.png][6] | ![2020-02-21T02:36:31.png][7] |





### 思否绿



|  首页   | 文章页 | 关于页 |

|  ----  | ----  | ----  |

| ![2020-02-21T02:42:26.png][8] | ![2020-02-21T02:42:41.png][9] | ![2020-02-21T02:42:52.png][10] |



### CSDN红



|  首页   | 文章页 | 关于页 |

|  ----  | ----  | ----  |

| ![2020-02-21T02:44:27.png][11] | ![2020-02-21T02:44:41.png][12] | ![2020-02-21T02:44:53.png][13] |



### 掘金蓝



|  首页   | 文章页 | 关于页 |

|  ----  | ----  | ----  |

| ![2020-02-21T02:46:51.png][14] | ![2020-02-21T02:47:06.png][15] | ![2020-02-21T02:47:16.png][16] |



### 简书红



|  首页   | 文章页 | 关于页 |

|  ----  | ----  | ----  |

| ![2020-02-21T02:48:58.png][17] | ![2020-02-21T02:49:07.png][18] | ![2020-02-21T02:49:17.png][19] |



### GitHub灰



|  首页   | 文章页 | 关于页  |

|  ----  | ----  | ----  |

| ![2020-02-21T02:50:57.png][20] | ![2020-02-21T02:51:07.png][21] | ![2020-02-21T02:51:16.png][22] |





## 开发框架



本项目采用[uni-app](https://uniapp.dcloud.io/component/README)+[colorUI](https://github.com/weilanwl/ColorUI)开发



## 快速开始



## 小程序端



### 自行编译



适用于有前端基础的同学



1. 下载Hbuilderx

2. 将文件夹 `uni-app` 导入项目

3. 发行至微信小程序



### 不编译直接使用



适用于零基础或基础较差的同学



1. 打开[uni-app/unpackage/dist/build/mp-weixin](https://github.com/thinkmoon/WeBlog/tree/master/uni-app/unpackage/dist/build/mp-weixin)目录导入小程序开发者工具

2. ~~激活插件后，修改请求链接文件 `@/static/utils/api.js` 中的baseUrl, 将域名更换为你的域名。~~ 请修改文件`@/common/vendor.js`,搜索`www.thinkmoon.cn`替换为你的域名。



### Typecho插件端



复制 `WeBlog` 到插件目录， 在后台激活并设置



## 特别鸣谢



虽然项目的作者显示的只有我一个，但是我一个人是无法完成该项目的，我想感谢与该项目相关的一些开源项目及作者。



* [uni-app](https://github.com/dcloudio/uni-app)

* [ColorUI](https://github.com/weilanwl/ColorUI)

* [WeTypecho](https://github.com/MingliangLu/WeTypecho)

* [Moment](https://momentjs.com/)

* [flyio](https://github.com/wendux/fly)

* [towxml](https://github.com/sbfkcel/towxml)



> 感谢各位开源作者优秀的作品！



## 意见反馈



我会尽最大的努力确保文档和代码没有错误。可是，金无赤足，错误在所难免。如果您发现本项目中的任何错误，如错别字或代码错误等，希望您能及时给我反馈，您的反馈不仅可以让其他使用者收益，更可以提高项目的质量。



如果您对于项目有些好的建议，或者想法，欢迎您加入QQ群与我讨论。



## QQ群



如果您想与本项目作者或者其他使用者沟通，欢迎加入项目开发交流群:1062676924



## 开发计划



- [x] 浏览量和点赞量数据表



- [x] 评论功能



- [x] 点击图片预览功能



- [x] 点击链接复制功能



- [x] Aplayer插件的支持



- [x] 一键修改主题色



- [x] 文章搜索



- [x] 接口加密



- [ ] 评论回复功能



- [ ] 评论通知功能



- [ ] 网页端微信登录



- [ ] 夜间模式



## 更新日志



v0.2.0

feature

1. 采用完全的自定义组件模式，适配一键换肤

2. 优化一键换肤的功能。



v0.1.9

feature

1. 采用互补色彩设计原则，支持一键修改主题色

fixed

1. 修复文章分类不同步的BUG

2. 修复在部分情况下缩略图不显示的BUG

3. 修复遇到<!--more-->文章不解析的BUG



v0.1.8

1. 美化界面

2. 优化小程序页面收录

3. 新增文章分享缩略图



v0.1.7

1. 更新towxml到3.0

2. 修复音乐播放混乱的问题

3. 更新动态版权年



v0.1.6

1. 支持Aplayer插件

2. 支持默认缩略图地址自定义



v0.1.5

1. 美化关于页界面

2. 优化页面下拉，上拉功能

3. 适配QQ小程序登录



v0.1.4

1. 采用触底加载文章的分页形式

2. 优化文章页分享标题

3. 美化关于页界面



v0.1.3

1. 修复todo list样式问题

2. 为关于页面添加overView

3. 让页面支持转发操作

3. 修复获取文章数错误的问题



v0.1.2

1. 修复评论后台没有名字的BUG

2. 弃用Vuex

3. 支持博客多作者显示



  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/weblog.png

  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T03:36:30.png

  [3]: http://blog.cdn.thinkmoon.cn/blog/typecho/2019-11-22T07:58:08.png

  [4]: http://blog.cdn.thinkmoon.cn/blog/typecho/2576c006617a8efb2218a1e9145646a4.png

  [5]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:35:52.png

  [6]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:36:10.png

  [7]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:36:31.png

  [8]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:42:26.png

  [9]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:42:41.png

  [10]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:42:52.png

  [11]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:44:27.png

  [12]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:44:41.png

  [13]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:44:53.png

  [14]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:46:51.png

  [15]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:47:06.png

  [16]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:47:16.png

  [17]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:48:58.png

  [18]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:49:07.png

  [19]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:49:17.png

  [20]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:50:57.png

  [21]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:51:07.png

  [22]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-02-21T02:51:16.png