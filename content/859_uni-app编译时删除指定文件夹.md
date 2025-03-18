---
title: uni-app编译时删除指定文件夹
date: ''
modified: ''
category: 学习笔记
tags:
- webpack
- uni-app
desc: 本质还是webpack的配置，以及相关插件的使用
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/u=3276836620,1954497454&fm=26&gp=0.jpg
---

![u=3276836620,1954497454&fm=26&gp=0.jpg][1]

## remove-files-webpack-plugin
原理就是在项目中添加一个webpack插件，然后配置插件
项目根目录新增vue.config.js
```javascript
const path = require('path')
const RemovePlugin = require('remove-files-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new RemovePlugin({
                after: {
                    root: path.join(__dirname, './unpackage'),
                    include: [
                        path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'production' ?
                            'build' : 'dev', process.env
                            .UNI_PLATFORM, './mp-weixin/static/APPPIC')
                    ],
                    trash: false
                }
            })
        ]
    }
}

```
部分webpack类似的webpack插件
1. copy-webpack-plugin
2. clean-webpack-plugin


  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/u=3276836620,1954497454&fm=26&gp=0.jpg