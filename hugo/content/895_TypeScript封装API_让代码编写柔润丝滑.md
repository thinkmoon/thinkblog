---
title: TypeScript封装API，让代码编写柔润丝滑
date: '2020-07-21 09:20:02'
lastmod: '2020-07-21 09:20:02'
categories:
- 教程分享
tags:
- typescript
- vuejs
description: 干前端工作，大致离不开三大任务：切图，对接口，写页面逻辑。说到对接口，那肯定是离不开网络请求API的封装的。我将网络请求的封装模式大致分为三个派系：
featured_image: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-07-17T08:19:34.png
---


![2020-07-17T08:19:34.png][1]



## 引言



干前端工作，大致离不开三大任务：切图，对接口，写页面逻辑。说到对接口，那肯定是离不开网络请求API的封装的。我将网络请求的封装模式大致分为三个派系：



1. 无拘无束派 （只封装请求根地址，想咋请求就咋请求，最强的封装就是不封装）

2. 拦截请求派 （使用一个拦截器配置请求行为和一些错误的拦截处理）

3. 接口集成派（使用一个或多个文件，统一管理所有请求，约定不允许使用文件中未定义的接口）。



我属于第三个派系，首先介绍一下各派的风格



## 各派风格



无拘无束派在快速成型方面略有优势，自由度也相对较高，但是维护起来并不容易，遇到接口改版的时候一部小心就会遗漏。



![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594979834976&di=28e83b987d0093019b168e1b3cfe69e5&imgtype=0&src=http%3A%2F%2Fpic.yupoo.com%2Fniuguozhu_v%2FGpjU9ut9%2FTtozu.jpg)



拦截请求派属于较优雅的一个派系，没有太多多余的内容，剩下的内容都是为解决问题而生。一般使用一个第三方请求库（如axios，flyio等）完成封装。大致像是这样



```typescript

import { FlyError, FlyResponse } from "flyio";

const Fly = require("flyio/dist/npm/wx");

let fly = new Fly();

// 配置请求根地址

fly.config.baseURL = process.env.VUE_APP_BASE_URL;

// 配置响应拦截器

fly.interceptors.response.use(

   // 如果请求成功,即请求状态码2xx

  (response: FlyResponse) => {

    // 并且操作成功

    if (response.data.success) {

       // 返回响应数据体

      return Promise.resolve(response.data);

    } else {

    // 请求成功，但是操作失败，提示后端返回的msg，并抛出错误

      uni.showToast({

        icon: "none",

        title: response.data.msg,

      });

      return Promise.reject(response.data);

    }

  },

  // 如果请求失败，即状态非2xx

  (err: FlyError) => {

    console.error(err);

    // 状态码为401，即跳转登录

    if (err.status === 401) {

      uni.reLaunch({

        url: "/pages/login",

      });

      return;

    }

    // 其他错误状态码，就先弹个框吧

    uni.showModal({

      title: err!.request!.url + "接口状态" + err.status,

      content: "错误原因:" + err.engine.response.msg,

    });

    return Promise.reject(err);

  }

);

```



然后使用的时候就直接采用第三方的请求，如`fly.get()`,`fly.post`



现在来介绍我所属的派系，我比上面更极端一点，除了封装请求拦截器暴露POST，GET外，还将所有的接口集中到一个API文件（太多了就按类型拆分，如user，shop，setting）



## 我的实现



基本请求文件http.ts，已引入上文提及的拦截器



```typescript

function GET(url: string, params = {}): Promise<ApiResponse> {

  let config = {

    headers: {

      Authorization: store.state.token,

    }

  };

  return fly.get(url, params, config);

}

function POST(url: string, params = {}): Promise<ApiResponse> {

  let config = {

    headers: {

      Authorization: store.state.token,

    }

  };

  return fly.post(url, params, config);

}

export { GET, POST };

```



api.ts，负责集成Api



```typescript

import { GET, POST } from "./http";

export default class Api {

  /**

   * 登录接口

   * @param params phone,password

   */

  login(params: object) {

    return POST("/user/login", params);

  }

  /**

   * 获取账户下所有店铺

   */

  getShop() {

    return POST("/shop/getShopListByUserId");

  }

  /**

   * 获取首页数据总览

   * @param params {shopId}

   */

  getOverview(params: {}) {

    return POST("/user/homepage/statistics", params);

  }

  /**

   * 根据店铺Id获取二级分类

   * @param params {shopId}

   */

  getCommodityType(params: {}) {

    return POST("/cnccommodity/commodity_type/by_shop", params);

  }

  /**

   * 分页获取商品列表

   */

  getCommodityList(params: {}) {

    return POST("/cnccommodity/commodity_by_page", params);

  }

}

```



然后将Api文件，挂载到Vue的原型链。



```javascript

import API from "./plugins/fly/api";

Vue.prototype.$api = new API();

```



在组件中使用



```javascript

 this.$api.login(this.loginForm).then((res) => {

 console.log(res)

 })

```



这样高度封装的好处是，任何一个接口要改内容，或者自定义功能，都可以只维护Api文件就行了。假设有一需求，要在获取商品之后提示用户”恭喜发财“，而这个接口又在多个页面中使用，我可以只做如下修改即可。



```javascript

 /**

   * 分页获取商品列表

   */

  getCommodityList(params: {}) {

    showToast("恭喜发财")

    return POST("/cnccommodity/commodity_by_page", params);

  }

```



这是一个荒诞的需求，但是如果需求是部分请求超过1s就显示加载中呢？或者部分接口需要显示后端返回的msg呢？我可以这样做。



api.ts



```typescript

updatePw(params: object) {

    return Post("/adminmanage/updatePassWard", params, true);

},

```



http.ts



```typescript

export async function Post(api: string, params = {}, needToast = false) {

  let data = await axios.post(api, params);

  if (data.success && needToast) {

    Message.success(data.msg);

  }

  return data;

}

```



为了应对频繁更改的需求，我真是煞费苦心。



## Typescript的加持



上面一直在说接口封装的事情，好像对Typescript只字未提。虽然上面都使用了typescript但是都只是铺垫，真正让代码编写柔润丝滑的是声明文件。



### 原型Api的声明



上面我们已经将api挂载到vue的原型，但是typescript的作用并未完全发挥。typescript有两个强大的作用，1. 减少代码出错率 2. 提高代码书写效率。要启用ts强大的语法提示功能，我们需要先写一个d.t文件。



vue-property.d.ts



```typescript

import Vue from "vue";

import Api from "./plugins/fly/api";

declare module "vue/types/vue" {

  interface Vue {

    $api: Api;

  }

}

```



该文件的作用就是将Vue原型链上的$api类型设置为Api Class, 接下来我们来一起看看它的效果。



![typescript推导api](http://blog.cdn.thinkmoon.cn/blog/typecho/typescript推导api.gif)



Vs code贴心的语法提示，从注释提示到参数。无与伦比的代码护航能力几乎能让你无脑写请求。



### 响应结构体的声明



人不能满足现状，光有请求推导可还不够。我们还要让它推导响应结构体。假设项目后端返回的响应结构如下



```json

{

    "code": 200,

    "success": true,

    "msg": "操作成功",

    "result": {

    }

}

```



我们再创建一个响应的d.ts文件



index.d.ts



```typescript

interface ApiResponse {

  /**

   * code: 响应状态码

   */

  code: number;

  /**

   * success: 操作是否成功标准

   */

  success: boolean;

  /**

   * msg： 请求的附带信息

   */

  msg: string;

  /**

   * result: 请求返回结果

   */

  result: Object | any;

}

```



同时声明接口请求返回为ApiResponse



```typescript

function GET(url: string, params = {}): Promise<ApiResponse> {

  let config = {

    headers: {

      Authorization: store.state.token,

    }

  };

  return fly.get(url, params, config);

}

function POST(url: string, params = {}): Promise<ApiResponse> {

  let config = {

    headers: {

      Authorization: store.state.token,

    }

  };

  return fly.post(url, params, config);

}

export { GET, POST };



```



看看语法提示效果



![ts推导响应体](http://blog.cdn.thinkmoon.cn/blog/typecho/ts推导响应体.gif)



同时如果有分页，还可以声明分页的结构体。总之，声明文件写得好，效率提高绝对少不了。



## 后记



ts给我一种以前写C++的感觉，需要先写声明文件`.h`然后在写`.cpp`，这样做的好处是约束你的代码，让你的代码更规范。不过，缺点就是声明文件有种给自己找事的感觉，不过我依旧强烈建议在前端项目下使用ts。这在后期的维护是绝对有利的，而且也并非所有文件都需要写声明文件，要不要写声明文件，取决于你的实现方式。比如本文中的Api文件就没写声明文件，照样可以类型推导，语法提示。祝我早日实现无脑编码~





  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-07-17T08:19:34.png