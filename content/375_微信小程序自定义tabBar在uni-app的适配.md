---
title: 微信小程序自定义tabBar在uni-app的适配
date: '2020-07-10 09:12:17'
modified: '2020-07-10 09:12:17'
category: 学习笔记
tags:
- webpack
- uni-app
- 微信小程序
---

> 引言：此方法可用作大部分微信小程序支持，但uni-app文档中却找不到相关说明的API

## 需求
需要在微信小程序中，实现一个中间图标突出显示的异形导航栏。

### 如下图

![2019-08-14T09:17:36.png][1]

## 实现方法设计
要做这种异形的导航栏，用直接在配置文件里面写list的方法肯定做不到。那么，就有以下两种可替代方法。
1. 在每一个页面都加载一个tabBar组件，与页面同时渲染。
2. 设置自定义tabBar,修改tabBar的样式。

优缺点分析：方法1实现起来略为简单，但是会出现代码可重用率低，降低性能，已经界面跳动等问题。方法2则是微信官方提供的，自定义方式，相信在性能方面也会有很大的优势。故选择方法2。

## 1. 查看文档及官方Demo

[官方文档][2]

简要描述一下就是需要在根目录中加入一个`custom-tab-bar`目录，里面的文件结构与自定义组件的结构一致。然后再在小程序配置文件中修改tabbar为custom模式。

[官方代码][3]

主要重点为三个部分

 - 配置文件

![配置文件][4]

 - custom-tab-bar目录

![2019-08-14T09:25:15.png][5]

 - 页面生命周期中的设置索引方法

![2019-08-14T09:26:43.png][6]

> 这段代码其实很容易理解，pageLifetimes就是监听组件所在页面的生命周期。上述代码就是监听页面显示。当页面显示后，获取到tabBar的对象，然后再设置tabBar中的index索引。

## 2. 迁移到uni-app框架
上面的方法是使用微信小程序的开发方式，而我使用的是uni-app框架开发微信小程序的。所以我们需要把它们移植到uni-app框架内。

 - 配置文件的修改
uni-app中，page.json被编译为微信小程序的app.json。所以，我们直接修改page.json

![page.json所需要的修改][7]

 - custom-tab-bar目录的适配
我们知道，uni-app使用的是类Vue开发，将一个Vue文件编译为四个微信页面文件（wxml，wxss，json，js）。那么，是否可以直接写一个`custom-tab-bar.vue`的文件呢？刚开始我也是这么想的，后来发现uni-app只会编译page目录和component目录下的vue文件。而微信小程序要求`custom-tab-bar`必须在项目的根目录下。那么就只能在uni-app下创建一个`custom-tab-bar`目录，并老老实实写微信四件套了。

![custom-tab-bar目录的适配][8]

> 写完后，uni-app会将该目录完美的复制至微信小程序项目的根目录。

 - tab页面内的适配方法
这个在我实际开发中，是最令我头痛的了。因为微信小程序的`this`引用与uni-app的`this`引用并不相同。所以如果直接复制代码是会编译出错的。而另一个问题则是，uni-app并未提供`pageLifetimes`的事件监听。

在我经过一番摸索之后，发现将设置索引方法写在onShow事件里面，效果是等效的。接下来便只剩下this的问题了。

如果直接复制的话，会出现无任何效果的情况

![直接复制设置方法][9]

因为uni-app的this引用不一样，所以它在判断`getTabBar`的时候，获取的是“undefined”所以不会执行下面的操作。如果你将判断去掉，则会直接报“undefined”错误。

难道实现不了？其实不然，万变不离其宗。uni-app也是编译到小程序的，所以绝对有迹可循。

我们首先看看uni-app里面this的内容。

![this的指向内容][10]

我们可以很明显的看到里面有个`$mp`的对象，说明这应该是微信小程序专用的对象。接下来我们继续分析`$mp`。

![$mp的指向内容][11]

这里面有一个隐藏很深的`getTabBar`方法，我们直接调用它，和在微信小程序里面调用`this.getTabBar`是等效的。

所以我们就可以把`onShow`里面的内容写成这样。

![设置索引方法][12]

## 一些优雅点的封装

### 设置索引方法独立出来
在methods对象中，添加
```JavaScript
setTabBarIndex(index){
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected:index
				})
			}
		}
```

### 使用`mixin`避免重复书写复制
在`main.js`中，添加
```JavaScript
Vue.mixin({
	methods:{
		setTabBarIndex(index){
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected:index
				})
			}
		}
	}
})
```

### 混入后的使用
在页面文件中
```JavaScript
onShow() {
			this.setTabBarIndex(0) //index为当前tab的索引
		}
```

> over!


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:17:36.png
  [2]: https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html
  [3]: https://developers.weixin.qq.com/s/jiSARvmF7i55
  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:23:22.png
  [5]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:25:15.png
  [6]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:26:43.png
  [7]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:32:50.png
  [8]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:39:45.png
  [9]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-14T09:48:14.png
  [10]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-20T02:41:06.png
  [11]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-20T03:00:18.png
  [12]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-08-20T03:03:40.png