---
title: 使用console的一些骚操作来封装API请求及输出相关日志
date: '2019-04-02 11:39:22'
lastmod: '2019-04-02 11:39:22'
categories:
- 学习笔记
tags: []
---


## 最终效果如下

![2019-04-02T02:54:35.png][1]

![2019-04-02T02:57:55.png][2]



## 代码如下

```javascript

const baseURL = 'http://wxlc.wezoz.com/' // your base url

async function request(api, method, header, params) {

	console.group(api)

	console.log('%c' + method + ' REQUEST:', "color:green")

	console.log({

		'api': api,

		'header': header,

		'params': params

	})

	return await new Promise((resolve, reject) => {

		uni.request({

			url: baseURL + api,

			method: method,

			header: header,

			data: params,

			success: (result) => {

				console.log('%c' + method + ' SUCCESS RETURN DATA:', "color:green")

				console.log(result)

				console.groupEnd(api)

				resolve(result.data);

			},

			fail: (e) => {

				reject(e);

			}

		})

	})

}

async function post(api, params, success) {

	const POST_METHOD = 'POST'

	const POST_HEADER = {

		'content-type': 'application/x-www-form-urlencoded',

		'token': wx.getStorageSync('token')

	}

	return await request(api, POST_METHOD, POST_HEADER, params)

}

async function get(api, params, success) {

	const GET_METHOD = 'GET'

	const GET_HEADER = {

		'content-type': 'application/x-www-form-urlencoded',

		'token': wx.getStorageSync('token')

	}

	return await request(api, GET_METHOD, GET_HEADER, params)

}

module.exports = {

	POST: post,

	GET: get

}



```

## 所用到的一些consloe骚操作



### console内使用CSS样式

consloe里面使用%c进行css样式格式化输出实例

```

console.log("%c Hello World", "color:green")

```

上述语句会输出绿色的`Hello world`, 效果如下。



![2019-04-02T03:25:00.png][3]



然后你就可以根据你的css功底进行创造啦



### console内获取程序运行时间



一般大家看到这个题目，第一时间想到的绝对是获取startTime，endTime再求差对不？

其实console提供一个内嵌的console.time()和console.timeEnd()，代码如下

![2019-04-02T03:30:19.png][4]



### console分组输出

有得时候，大家打开控制台看见一堆输出是不是很头疼？如何在茫茫数据中找到自己想要的数据呢？你可以使用ground分组数据，让console变得清晰明了。

效果如下

![2019-04-02T02:57:55.png][2]



### 结语



我这里只是写了一些我自己常用到的一些功能，其实console对象还有很多函数。想玩一下的可以自己去尝试以下，发挥自己的想象力就会发现一些很有意思的玩法



  [1]: https://www.thinkmoon.cn/usr/uploads/2019/04/1897065195.png

  [2]: https://www.thinkmoon.cn/usr/uploads/2019/04/798221859.png

  [3]: https://www.thinkmoon.cn/usr/uploads/2019/04/3326939580.png

  [4]: https://www.thinkmoon.cn/usr/uploads/2019/04/116410319.png