---
title: uni-app使用fly封装网络请求接口
date: ''
modified: ''
category: 学习笔记
tags: []
thumb: https://www.thinkmoon.cn/usr/uploads/2019/05/3661142475.png
---

## 介绍

本文采用`uni-app`框架开发，使用[flyio](https://github.com/wendux/fly)库封装请求。

### 安装方式

```shell
npm install --save flyio
```

### 引入方式

新建`api.js`文件，编写以下内容

```javascript
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;
```

### 配置方式

```javascript
// 配置请求根域名
fly.config.baseURL = "http://whisper.wezoz.com"
// 配置响应拦截器
fly.interceptors.response.use(
	(response) => {
			// 如果请求报错
			if (response.data.code != 10000) {
				uni.showModal({
					title:'温馨提示',
					content:response.data.data
				})
			}else{
				//只将请求结果的data字段返回
				return response.data.data
			}
		},
		(err) => {
			//发生网络错误后会走到这里
			return Promise.resolve("网络请求：ERROR！")
		}
)
// 配置请求拦截器
fly.interceptors.request.use((request) => {
	request.headers["token"] = uni.getStorageSync('token');
	return request;
})
```

## 同步封装微信登录

```javascript
async function wxLogin() {
	return await new Promise((resolve, reject) => {
		wx.login({
			success(res) {
				if (res.code) {
					resolve(res.code)
				}
			}
		})
	})
}
```

写一个接口如login

```javascript
// 登录
export const login = async (params) => {
	console.log('开始登录...')
	let code = await wxLogin();
	let res = await fly.get('/user/login', {code: code})
	uni.setStorageSync('token', res.token)
	uni.setStorageSync('openid', res.openid)
}
```

## 封装普通请求

```javascript
export const updateUserInfo = (params) => {
	return fly.get('/user/update', params)
}
```

## 引入方式

在`App.vue` 或者`main.js`添加以下代码

```javascript
import * as API from './static/utils/api'
Vue.prototype.$api = API
```

## 调用方式

> test.vue

```javascript
this.$api.login()
```

  [1]: https://www.thinkmoon.cn/usr/uploads/2019/05/3661142475.png