---
title: 如何理解Promise
date: '2022-12-09 21:35:49'
lastmod: '2022-12-09 21:35:49'
categories:
- 学习笔记
tags:
- 前端
- js基础
- javascript
description: Promise是啥？异步函数？对象？怎么用才更自信？如何理解更好的理解Promise？本文将分享本人对于Promise的一些经验与想法。em......,
  但不保证权威，哈哈哈。
featured_image: https://blog.cdn.thinkmoon.cn/2022-06-10/23-57-00
---


> Promise是啥？异步函数？对象？怎么用才更自信？如何理解更好的理解Promise？本文将分享本人对于Promise的一些经验与想法。

## 背景知识

> 此段将介绍一些理解本文的背景知识，你可以很轻松愉快的阅读此段。

### 函数是一等公民
总所周知，在JavaScript里面，函数是一等公民。你可以用来赋值，传参，回调，包装，作为函数返回值return。

> 以下内容援引于[JavaScript 为什么说函数是一等公民？](https://github.com/felix-cao/Blog/issues/150)

1. 函数与数字一样可以存储到变量中
```js
var fortyTwo = 42
var fortyOne = function() { return 41; }
```
2. 函数与数字一样可以存储为数组的一个元素
```js
var nums = [42, function() { return 41 }]
```
3. 函数与数字一样可以在使用时直接创建出来
```js
42 + (fuction() { return 41 })();
// 83
```
4. 函数与数字一样可以被传递给另一个函数
```js
function weirdAdd( n, fun) { return n + fun()}

weirdAdd(42, function() { return 41 })
```
5. 函数与数字一样可以被另一个函数返回
```js
function add() {
  var num1 = 42;
  return function(num2) {
    return num1 + num2
  }
}

fun = add();
fun(41);

// 83
```
函数就是变量，变量可以存放函数。就是玩~

## 链式调用

由于函数可以作为对象的属性值，那我们访问形如`a.b`时就相当与访问到了一个函数体。那么，给它再加上`()`不就执行了么，比如图：`a.b()`;再拓展一下，如果这个函数又返回了一个同样的对象，那是不是可以继续执行下去了呢？比如: a.b().c().d()；这操作，实属放飞自我了。

```js
var Person = function() {};
Person.prototype.setAge = function(age){
    this.age = age; 
    return this;
}
Person.prototype.setWeight = function(weight){
    this.weight = weight; 
    return this;
}
Person.prototype.get = function(){
    return `{age: ${this.age}, weight: ${this.weight}}`;
}

var person = new Person();
var des = person.setAge(10).setWeight(30).get();
console.log(des);
```

### js的事件循环

详见[js事件循环--指尖魔法屋](https://www.thinkmoon.cn/post/907)

### - promise的用法

> Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。---来自《MDN》

```js
const myPromise = new Promise((resolve, reject) => {
  resolve()
  reject()
});
myPromise.then(handleResolvedA, handleRejectedA)
```
## 我们要如何理解promise

从实现角度，我们可以这样理解。首先Promise是对象，然后呢，这个对象有三个属性一个叫then一个叫catch，最后一个叫做finally。构造函数会传递两个参数（resolve,reject)。这两个参数本身是个封装的函数，如果调用resolve，它就执行Promise.then()里面的函数，最后再执行Prmise.finally()。catch反之。

> 注：此段只是为了便于理解编造的，实际并非这么简单。

## 举个简单例子

new Promise()就是好像在肯德基下了一个单，返回的值就是对应的单号。肯德基会接单并开始备餐，备餐完成就通知你（调用then)，如果你叫的炸鸡已经卖完了，也会给你返回异常（调用catch)

### 订阅发布者模式

从设计的角度，我可以可以把Promise看作一个订阅者发布者模式。订阅then和catch，以及finally。当发布者发布resolve或reject的时候，接收者就会执行对应的回调函数。

## 一些强化理解的实践

为啥下面的变量拿不到想要的值？

```js
let b = 0;
let a = new Promise(resolve => resolve(1)).then(res => b=res);
console.log(b)
```
原因：由于js是单线程的，线程第一次进来只管发消息和执行下面的console。在输出之前，then函数都只是绑定回调函数，还没执行呢。

> 准备好，接下来我要放飞自我了。

如果我在一个函数里面resolve或者reject了，那后面的语句还会执行么？

![Description](https://blog.cdn.thinkmoon.cn/2022-06-10/23-32-36)

在Promise入参函数里面return相等于什么？

![Description](https://blog.cdn.thinkmoon.cn/2022-06-10/23-36-44)

此时相当于啥消息都没发布，那如果我return 一个Error对象呢？

> 此处本来还有四段话加五个截图，由于自研系统的bug没保存。我们先假装它们还在，有空补上

你老说Promise就是一个订阅者发布者模式。你如何证明？脱离了Promsie构造入参函数，你还能触发Promsie.then么？

虽然业界都推荐在Promise构造入参函数内部改变Promise的状态。但是有了一等公民的地位，天下之大，何处不可去？看我来伪装一个订阅者发布者模式（虽然是一次性的）。有函数，我不调，哎，就是玩儿。。

### - 外部修改promise状态(反模式，实际不推荐用)

![Description](https://blog.cdn.thinkmoon.cn/2022-06-10/23-57-00)

### - 请求队列返回promise状态

登录失效了，后面的白写了，心累，先空着。

### ...
## 后记