---
title: uni-app对微信小程序云函数的适配
date: '2021-05-16 13:27:29'
modified: '2021-05-16 13:27:29'
category: 教程分享
tags:
- uni-app
- 云函数
- 微信小程序
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:28:39.png
---

## 引言

熟悉uni-app的人应该都知道，uni-app并未对微信小程序云函数（本文统称云函数）进行相应的适配。但是，如果我们在某些业务场景的下需要使用云函数呢？我们知道，云函数可以复制到微信开发者工具，这样的话我们不得不每次编译一次就手动复制一次，不得不说麻烦至极。本文就问题做出以下解决方案。

### 本文环境
1. Hbuilder X

![Hbuilder X版本][1]

2. 微信开发者工具

![微信开发者工具版本][2]

## 创建云函数目录

首先，我们需要在uni-app项目文件夹下，创建一个云函数目录，路径随意，我这里是`functions`。然后先随便在里面放一些文件，这里以`new_file.css`为例。

## 修改`manifest.json`

在uni-app根目录下，修改`manifest.json`中的微信小程序项，结构如下
```json
"mp-weixin" : {
        /* 小程序特有相关 */
        "appid" : "wxd7de467f6e6cf741",
        "cloudfunctionRoot": "./functions/", // 这一行就是标记云函数目录的字段
        "setting" : {
            "urlCheck" : false
        },
        "usingComponents" : true
    }
```

## 编写`vue.config.js`

1. 我们在项目根目录创建`vue.config.js`文件
2. 写入以下内容（如路径不一样请做相应适配）

```javascript
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, 'cloudFunctions'),
				to: path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env
					.UNI_PLATFORM, 'cloudFunctions')
			}])
		]
	}
}

```
3. 编译运行

发现提示如下内容

![提示内容][3]

说明未安装`copy-webpack-plugin`插件，我们手动安装一下。
```shell
npm install -save copy-webpack-plugin
```
> TIPS: 截至2020.6.4， uni-app暂不支持copy-webpack-plugin 6.0版，请安装5.0版

![安装copy-webpack-plugin][4]

然后编译运行，发现微信开发者工具里面出现以下内容。

![微信开发者工具里面的内容][5]

---

截止目前，已打通Hbuilder X到微信开发者工具的自动复制，即已解决本文的核心内容。以下为进一步测试。

## 创建云函数

> 我们在云函数根目录上右键，在右键菜单中，可以选择创建一个新的 Node.js 云函数，我们将该云函数命名为check。开发者工具在本地创建出云函数目录和入口 index.js 文件，同时在线上环境中创建出对应的云函数。创建成功后，工具会提示是否立即本地安装依赖，确定后工具会自动安装 wx-server-sdk。我们会看到以下内容。

创建好后将其同步复制到uni-app项目，即可为以后自动同步行方便，又可避免在输出文件夹中云函数的意外丢失。至此，相关文件编写工作转至`Hbuilder X`，云函数上传部署依旧在微信开发者工具。

![云函数模板内容][6]

## 编写云函数

默认的云函数只是一个返回用户基本数据的内容，我们将其修改至满足我们的业务需求，以内容安全云调用为例。

在云函数文件中写入以下内容

```javascript
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    console.log('待检测文本:' + event.content);
    let result = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    console.log('result:' + JSON.stringify(result));

    if (result && result.errCode.toString() === '87014') {
      return {
        code: 300,
        msg: '内容含有违法违规内容',
        data: result
      }
    } else {
      return {
        code: 200,
        msg: 'ok',
        data: result
      }
    }

  } catch (err) {
    if (err.errCode.toString() === '87014') {
      return {
        code: 300,
        msg: '内容含有违法违规内容',
        data: err
      }
    }
    return {
      code: 400,
      msg: '调用security接口异常',
      data: err
    }
  }
}
```

## 权限申明

![云函数config权限声明][7]

如上图，在函数目录下，创建一个`config.json`,文档说会自动创建，但是我实际操作时未自动创建。`config.json`内容如下。

```json
{
	"permissions": {
		"openapi": [
			"security.msgSecCheck"
		]
	}
}

```

然后在函数目录右键，上传并部署。

## 小程序调用云函数

### App.vue

```javascript
<script>
  export default {
    onLaunch() {
      wx.cloud.init();
    }
  }
</script>
```
### index.vue

```javascript
let res = await wx.cloud.callFunction({
          name: 'checkText',
          data: {
            "content": this.displayString
          }
        })
        if (res.result.code != 200) {
          uni.showModal({
            title: "温馨提示",
            content: "你所输入的内容可能含有违法违规内容，不支持进行下一步操作"
          })
          return
        }
```

## 效果展示

![微信图片_20191022110949.png][8]


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:28:39.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:32:01.png
  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:18:43.png
  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:34:09.png
  [5]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:35:15.png
  [6]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-10-22T01:45:21.png
  [7]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-10T06:54:47.png
  [8]: https://blog.cdn.thinkmoon.cn/blog/typecho/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191022110949.png