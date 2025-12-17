---
title: scss/sass实现列表顺序加载动画
date: '2020-06-23 19:49:04'
lastmod: '2020-06-23 19:49:04'
categories:
- 教程分享
tags:
- scss
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-04T04:02:50.png
---


## 效果展示



![列表顺序加载动画][1]



本文会讲述如何使用scss/sass在微信小程序中实现列表顺序加载的动画。



## 所用的css特性



### CSS animations



> CSS animations 使得可以将从一个CSS样式配置转换到另一个CSS样式配置。动画包括两个部分:描述动画的样式规则和用于指定动画开始、结束以及中间点样式的关键帧。



相较于传统的脚本实现动画技术，使用CSS动画有三个主要优点：



1. 能够非常容易地创建简单动画，你甚至不需要了解JavaScript就能创建动画。

2. 动画运行效果良好，甚至在低性能的系统上。渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用JavaScript实现的动画通常表现不佳（除非经过很好的设计）。

3. 让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率。



`css animations`的属性和子属性见[https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations#%E9%85%8D%E7%BD%AE%E5%8A%A8%E7%94%BB](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations#%E9%85%8D%E7%BD%AE%E5%8A%A8%E7%94%BB)



可主要分为两大部分，动画的实现形式和动画的属性规则。



以下仅列出本文所用的属性。



### animation-timing-function

animation-timing-function 规定动画的速度曲线。



![速度曲线][2]



### animation-delay

顾名思义，设置动画的持续时间，单位秒



### animation-fill-mode

> animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。



![animation-fill-mode][3]



### 使用keyframes定义动画序列



keyframes就是一个描述关键帧的属性，通过使用@keyframes建立两个或两个以上关键帧来实现。每一个关键帧都描述了动画元素在给定的时间点上应该如何渲染。

> 因为动画的时间设置是通过CSS样式定义的，关键帧使用percentage来指定动画发生的时间点。0%表示动画的第一时刻，100%表示动画的最终时刻。因为这两个时间点十分重要，所以还有特殊的别名：from和to。这两个都是可选的，若from/0%或to/100%未指定，则浏览器使用计算值开始或结束动画。



### 示例



```css

@keyframes list {

		0% {

			transform: scale(0);

		}



		100% {

			transform: scale(1);

		}

	}

```

如上代码所示，定义了一个@keyframe名字叫list，在动画开始时使用缩放0%，结束时缩放100%。那么它在整个动画的过程中，便会根据浏览器的性能展示一个从0%-100%渐变的动画。是不是根据有点意思？当然，你也可包含设置任何额外可选的关键帧，描述动画开始和结束之间的状态，比如45%。



![animation.gif][4]



至此我们已经实现了组件显示时逐渐放大的效果





## 所用的scss特性



以下为简介，详细内容请转至官方文档



### 嵌套规则 (Nested Rules)



> scss/Sass允许将一个 CSS 样式嵌套进另一个样式中，内层样式仅适用于外层样式的选择器范围内。



### 引用父选择器:&



> 你可以 & 字符来明确地表示插入指定父选择器。



### 变量: $（Variables: $ ）



以美元符开头，可当变量使用。



### @mixin混入指令 (Mixin Directives)



> 混入(mixin)允许您定义可以在整个样式表中重复使用的样式，而避免了使用无语意的类（class），比如 .float-left。混入(mixin)还可以包含所有的CSS规则，以及任何其他在Sass文档中被允许使用的东西。

他们甚至可以带arguments，引入变量，只需少量的混入(mixin)代码就能输出多样化的样式。



### 插值：#{}（Interpolation: #{}）



> 你可以通过 #{} 插值语法在选择器和属性名中使用 SassScript 变量：



### @for



顾名思义，循环，要留意一下`to`和`through`的区别



### 引用混合样式:@include （Including a Mixin: @include）



## 实现方式

wxml文件

```xml

<view class="list__item">

<view>...</view>

</view>

```



编译前的scss/sass

```css

	.list {

		&__item {

			animation: list 1s ease both;

		}

	}



	@keyframes list {

		0% {

			transform: scale(0);

		}



		100% {

			transform: scale(1);

		}

	}



	@mixin item($num) {

		$waitTime: ($num)*0.2;

		animation-delay: #{$waitTime}s;

	}



	@for $i from 1 through 7 {

		.list__item:nth-child(#{$i}) {

			@include item($i);

		}

	}

```

less版

```css

// list动画

	.list__item {

		animation: list .8s ease both

	}



	@keyframes list {

		0% {

			transform: scale(0);

		}



		100% {

			transform: scale(1);

		}

	}



	.generate-columns(7);



	.generate-columns(@n, @i: 1) when (@i =< @n) {

		.list__item:nth-child(@{i}) {

			animation-delay: @i * 0.2;

		}



		.generate-columns(@n, (@i + 1));

	}



```

编译后的css

```css

.list__item {

  -webkit-animation: list 1s ease both;

          animation: list 1s ease both;

}

@-webkit-keyframes list {

0% {

    -webkit-transform: scale(0);

            transform: scale(0);

}

100% {

    -webkit-transform: scale(1);

            transform: scale(1);

}

}

@keyframes list {

0% {

    -webkit-transform: scale(0);

            transform: scale(0);

}

100% {

    -webkit-transform: scale(1);

            transform: scale(1);

}

}

.list__item:nth-child(1) {

  -webkit-animation-delay: 0.2s;

          animation-delay: 0.2s;

}

.list__item:nth-child(2) {

  -webkit-animation-delay: 0.4s;

          animation-delay: 0.4s;

}

.list__item:nth-child(3) {

  -webkit-animation-delay: 0.6s;

          animation-delay: 0.6s;

}

.list__item:nth-child(4) {

  -webkit-animation-delay: 0.8s;

          animation-delay: 0.8s;

}

.list__item:nth-child(5) {

  -webkit-animation-delay: 1s;

          animation-delay: 1s;

}

.list__item:nth-child(6) {

  -webkit-animation-delay: 1.2s;

          animation-delay: 1.2s;

}

.list__item:nth-child(7) {

  -webkit-animation-delay: 1.4s;

          animation-delay: 1.4s;

}

```

![列表顺序加载动画效果展示](https://blog.cdn.thinkmoon.cn/blog/typecho/list.gif)



## 参考资料



[使用CSS动画](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

[CSS3 animation-timing-function 属性](https://www.w3school.com.cn/cssref/pr_animation-timing-function.asp)

[sass中文文档](https://www.sasscss.com/docs/)



  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/list.gif

  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-04T03:58:02.png

  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-04T04:02:50.png

  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/animation.gif