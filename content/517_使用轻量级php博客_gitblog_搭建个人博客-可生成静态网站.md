---
title: 使用轻量级php博客(gitblog)搭建个人博客-可生成静态网站
date: '2019-10-28 17:25:10'
modified: '2019-10-28 17:25:10'
category: 教程分享
tags: []
---

> 一说到搭建个人博客，大家一定是第一时间想到WordPress了吧？
其实使用WordPress非常的方便，实用性也非常高,如果不知如何搭建wordpress博客，
可以去隔壁Benny的学习日记(公众号)看教程。但是如果你只是想要一个简洁的博客文章页，那么你可以试着用一下**gitblog**。

<!-- more -->

### 什么是markdown(md)文件

> markdown是一种轻量级的标记语言，它允许人们使用易读易写的纯文本格式编写文档。唔，通俗点就跟HTML一样。约定一些特定的符号来决定它的显示形式。它相对于HTML的优势就是，简单，使作者将关注重点放在内容上。相信大家也经历过调CSS的绝望吧？

它的语法极其简单,语法内容:
[我的简书](http://www.jianshu.com/p/de9c98bba332)
像我这篇文章就是md文件复制的。


### 了解gitblog 网址[http://www.gitblog.cn](http://www.gitblog.cn)

![gitblog官网](https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/5.PNG)


github地址[https://github.com/jockchou/gitblog](https://github.com/jockchou/gitblog)

> Gitblog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。 它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。 同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。 Gitblog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。 Gitblog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。


### gitblog与WordPress的区别

1.  数据库，gitblog只有文件，没有数据库。也就是说它不需数据库，这样做的优点是简洁，适合与那些网站内容修改频率不高博客。系统更轻量级，移植性高，还可以到全站导出为静态文件。然后把它们部署到类似于githubpage平台。
2.  框架，gitblog是使用codeigniter[http://codeigniter.org.cn](http://codeigniter.org.cn)
框架(一个小型的轻量级php框架)。WordPress是完全使用自己的设计思想，不依赖于主流框架，如果你了解框架的思想，如果你想好好学习，和修改开发博客源码，你可以选择使用前者。当然对自己足够自信，你可以去研究WordPress源码。
3.  完善性，如果你只是想搭个稳定完善的个人博客，那么不建议你使用gitblog。如果你自己的diy，探索精神比较强，或者你是个简洁控，你可以试试gitblog。

### 如何配置安装gitblog

1.  去github下载源码
2.  安装Apache+php环境
3.  解压到网站根目录
4.  修改配置文件conf.yaml,文件说明[https://github.com/jockchou/gitblogdoc/blob/master/posts/gitblog/config.md]
(https://github.com/jockchou/gitblogdoc/blob/master/posts/gitblog/config.md)
```yaml
url: / #域名地址
title: thinkmoon #站点名称
    subtitle: #副标题
    theme: quest #主题名
    enableCache: false #是否开启缓存
    highlight: true #是否开启代码高亮
    mathjax: false #数学公式支持
    katex: false #？
    youyan: #有言ID
    baiduAnalytics: #百度统计ID
    keywords: thinkmoon #网站关键字
    description: &gt;
        thinkmoon #网站描述
    version: 2.2
    author:
        name: 醉月思 #作者
        email: tim@thinkmoon.cn #邮箱
        github: thinkmoon #github地址
        weibo: your-weibo #微博地址
        avatar:
    blog:
        recentSize: 5
        pageSize: 6
        pageBarSize: 5
        allBlogsForPage: false
    text:
        title: 介绍
        intro: &gt;
            本博客使用Gitblog搭建,
            wordpress博客请访问https://thinkmoonmagic.wordpress.com
    ```

   > 你可能需要修改的配置参数：
   
   ```yaml
    url: 修改成你的域名，http://yourdomain.com，注意最后没有杠。
    title： 修改成你的博客标题
    subtitle： 修改成你的副标题
    duoshuo： GitBlog采用多说评论框，你需要申请多说账号，并在这里填写你的多说ID
    baiduAnalytics： GitBlog采用百度统计，你需要申请百度统计账号，在这里填写你的统计Key
    author：修改为你个人的信息即可
    如果你不需要评论和统计功能，删除duoshuo和baiduAnalytics这两荐即可。其他信息，可根据浏览博客页面的效果进行修改调整。
    ```

5.访问，OK了


### 编写一篇博客

> 在gitblog里面，一篇文章就是markdown文件。所有的文章都在/blog目录下，你把你写好的md文件放到这个文件夹就可以了

博客文章的属性，包括作者，题目，标签，分类目录等，由md文件里面的注释决定。[注释规范](https://github.com/jockchou/gitblogdoc/blob/master/posts/gitblog/edit.md)

例如use_gitblog_setup_blog.md

![gitblog博客文章编](https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1.PNG )


上传到blog文件夹之后，主页界面刷新效果

![gitblog效果展示](https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2.PNG)

文章页效果

![gitblog文章页效果展示](https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/3.PNG)

> 这儿需注意，gitblog默认是开启网站缓存的，如果你的网站更新不够频繁，你可以不用改配置，在配置conf.yaml里面修改。


### 同步wp博客到gitblog

1.  首先从wordpress后台中导出xml数据
2.  重命名为wordpress.xml
3.  使用PHP 网站根目录/index.php wp2gb 命令同步

    例如: php /var/www/html/index.php wp2gb

    运行成功会提示finished！运行后的主页俯视图
![wordpress迁移到gitblog](https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/4.PNG "4")

### 完成gitblog的搭建

好啦，大功告成啦，一个gitblog博客网站就已经搭建成功了[www.thinkmoon.cn](http://www.thinkmoon.cn)

