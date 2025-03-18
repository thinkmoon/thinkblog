---
title: 在微信小程序里使用async/await异步API及浅谈各种异步
date: '2019-03-06 15:46:37'
modified: '2019-03-06 15:46:37'
category: 教程分享
tags:
- 微信小程序
---

> 想达到本文效果，需使用wepy框架。不了解wepy？转[https://tencent.github.io/wepy/index.html](https://tencent.github.io/wepy/index.html)
## 什么是async/await?
> 在最新的ES7（ES2017）中提出的前端异步特性：async、await。
async顾名思义是“异步”的意思，async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。也就是我们平常所说的异步等待。不过需注意`await只能在async函数中使用`。

## 为什么需要async/await?
在async/await之前，我们有三种方式写异步代码
### 1. 嵌套回调
其中思想就是,a函数执行完了得到的结果后在执行b。
形如
```javascript
wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation']);
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            fail(res) {
              Toast('无法获取位置,采用默认排序');
            }
          });
        } else {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              _this.setData({ location: res });
              console.log('您的位置信息:', res);
            },
            fail() {
              Toast('无法获取位置,采用默认排序');
            }
          });
        }
      }
    });
```
> 上面的代码你不用看，就会感觉。这啥东西？乱七八糟的。这就是嵌套回调。很不巧，原生微信小程序开发就是这样的。

### 2. 以Promise为主的链式回调
> 所谓Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。形如
```javascript
var p1 = new Promise((resolve, reject) => {
 setTimeout(resolve, 1000, 'done');
 })
p1.then(data=>{
 console.log(data); // done
})
```
如果你的函数够多的话，那么就会一直then()下去。
>为了优雅，Promise提供了一个方法`Promise.all([p1,p2,p3])` ，用于将多个Promise实例，包装成一个新的Promise实例。接收的参数是一个数组,p1、p2、p3都是Promise对象
分两种情况：
1. p1、p2、p3的状态都是resolve的时候，Promise.all的状态才会变成resolve；
2. 只要p1、p2、p3中有一个的状态为reject，那么Promise.all的状态就会变成reject；
所以我们可以用Promise.all()来解决多个异步依赖调用。

### 3. 使用Generators
```javascript
function *main() {
    var x = yield 1;
    var y = yield x;
    var z = yield (y * 2);
}
```
> 上面代码中的每一条语句都会按顺序一个一个地执行。Yield关键字标明了代码中被阻塞的点（只能被generator函数自己阻塞，外部代码不能阻塞generator函数的执行），但是不会改变*main()函数中代码的执行顺序。这段代码很简单！

但是，这三种写起来都还是不够优雅，ES7做了优化改进，async/await应运而生，async/await相比较Promise 对象then 函数的嵌套，与 Generator 执行的繁琐(需要借助co才能自动执行，否则得手动调用next())， Async/Await 可以让你轻松写出同步风格的代码同时又拥有异步机制，更加简洁，逻辑更加清晰。

> 示例
```javascript
async a(){};
const b = await a();
```

## 这样做的好处？
> 唔，你不觉得一个优雅的代码就该是这样吗？好吧，其实这样更容易符合我们平常的思维逻辑

## 回到本文的题目
> 在wepy1.4.1以后的版本（之前的版本都是默认开启的），默认不支持async/await，需要用户手动加入，方法如下：
### 进入项目根目录，安装runtime包
```
npm install wepy-async-function --save
```
### 修改wepy.config.js加入runtime配置
```
        babel: {
            "presets": [
                "env"
            ],
            "plugins": [
                "transform-export-extensions",
                "syntax-export-extensions"
            ]
        }
```
### 在app.wpy中引入引入runtime包
```
import 'wepy-async-function'; 
```
### 在app.wpy中使API promise化
> 重写构造函数，使其支持async/await。
```
export default class extends wepy.app {
    constructor () {
        super();
        this.use('promisify');
    }
}
```
### 重启编译
```
wepy build --no-cache
```

## 使用示例
> 在wepy框架官方文档中已说明，对所有的微信小程序都支持async/await操作。只需将形如`wx.getuserInfo`改写为`wepy.getuserInfo`即可
```
async userInfoAsync() {
    const _this = this;
    const data = await wepy.getSetting(); //获取设置数据
    if (data.authSetting['scope.userInfo']) { //判断是否有获取用户信息的权限
      await wepy.login(); //登录
      let data = await wepy.getUserInfo();//获取用户信息
      _this.userInfo = data.userInfo;//采用wepy框架修改过后的功能，支持直接赋值数据绑定
      _this.$apply(); //在async的函数中，必须主动执行`$apply()`来进行脏数据检查
    }
  }
async onShow() {
    this.userInfoAsync(); //调用async函数
  }
```
> 以上代码实现了异步同步用户userInfo的功能

参考文献:
1. [使用Promise链式调用解决多个异步回调的问题](https://www.jb51.net/article/103068.htm)
2. [关于js的callback回调函数以及嵌套回调函数的执行过程理解](https://blog.csdn.net/samt007/article/details/54647361)
3. [ES6 Generators并发](https://www.cnblogs.com/jaxu/p/6592210.html)
4. [ES7前端异步玩法：async/await理解](https://www.cnblogs.com/leungUwah/p/7932912.html)
5. [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316?utm_source=tag-newest)
6. [Async/await学习](https://segmentfault.com/a/1190000013292562?utm_source=channel-newest)
7. [浅谈async/await](https://www.jianshu.com/p/1e75bd387aa0)
8. [wepy项目中使用async await](https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8async-await)