---
title: 使用github Action自动部署博客
date: ''
modified: ''
category: 闲余折腾
tags:
- 折腾
desc: 为什么需要它？最开始我使用的是本地编译，然后手动上传的方式，后来发现过于麻烦。尤其是nuxt编译后，产生一大堆ouput文件，手动上传耗时费力。
thumb: https://blog.cdn.thinkmoon.cn/2022-04-11/23-48-31
---

## 背景提要

为什么需要它？最开始我使用的是本地编译，然后手动上传的方式，后来发现过于麻烦。尤其是nuxt编译后，产生一大堆ouput文件，手动上传耗时费力。

再后来我在服务器上，设置了一个定时任务。每晚从github拉取最新的代码，然后在服务器上编译。实行了一段时间，感觉还行。但是，随着服务上的服务越来越多，资源占有越来越大，我发现偶尔会出现编译nuxt时内存溢出的情况（请原谅我1核2G的服务，它已经尽力了）。

然后便产生了，使用githu action编译目标产物ouput文件，通知服务器自动拉取的想法。那么，说干就干，试试吧！

## 创建GitHub Action

使用node.js模板，该模板会自动使用预装node.js的环境。模板中有三种node.js版本，如果保持预留配置，则会三个环境都执行一次。这里我只使用16.x版本（因为跟我服务器版本一致）

![创建GitHub Action](https://blog.cdn.thinkmoon.cn/2022-04-10/23-08-15)

大致流程可分为
1. 拉取代码
2. 安装依赖
3. 编译output
4. 归档到特定分支（gh-pages）
5. web-hook通知服务器
6. 服务接收事件，拉取编译后的文件，并重启

## 拉取代码
该步骤由github完成，只需声明使用的分支名称即可

## 安装依赖

![GitHub Action 安装依赖](https://blog.cdn.thinkmoon.cn/2022-04-10/23-15-32)

## 编译output
```yaml
 - run: yarn run build
```
## 归档到特定分支（gh-page）

我这儿随便在maket place选一个开源Action（GitHub Pages v3），配置对应的参数，如下：

```yaml
- name: GitHub Pages v3
        uses: peaceiris/actions-github-pages@v3.1.12
        with:
          personal_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: .output
```

> 请注意：关于这个personal_token，github有个坑。我也是折腾了两个多小时才总结出来的。生成的personal_token是不能明文存储在yaml文件中的，必须使用变量传递。否则一旦提交的时候，github出于安全考虑会自动静默删除对应person_token。

## 完整配置

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
   runs-on: ubuntu-latest

   strategy:
      matrix:
        node-version: [16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

   steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
      - run: yarn
      - run: yarn run build

      - name: GitHub Pages v3
        uses: peaceiris/actions-github-pages@v3.1.12
        with:
          personal_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: .output
```
## 触发Action

提交代码，等待流水线执行。

![Github Action执行效果](https://blog.cdn.thinkmoon.cn/2022-04-11/23-45-08)

## webhook推送归档成功事件

绑定对应的webhook，监听gh-pages部署事件。

![webhook推送归档成功事件](https://blog.cdn.thinkmoon.cn/2022-04-11/23-48-31)

## 服务器拉取代码并执行重启

> 这里为了方便起见，我使用的是宝塔面板的webhook插件

![宝塔面板的webhook插件](https://blog.cdn.thinkmoon.cn/2022-04-11/23-50-12)

执行的脚本如下

```bash
echo "[$(date "+%Y-%m-%d %H:%M:%S")]: 开始同步"
cd /www/wwwroot/www.thinkmoon.cn/.output
git pull
kill -9 $(lsof -i:3000 |awk '{print $2}' | tail -n 1)
bash /www/server/nodejs/vhost/scripts/blogSSR.sh
echo "[$(date "+%Y-%m-%d %H:%M:%S")]: 同步完成"
```

## 各步骤成功截图

> Action执行效果

![Action执行效果](https://blog.cdn.thinkmoon.cn/2022-04-11/23-51-51)

> webhook通知记录

![webhook通知记录](https://blog.cdn.thinkmoon.cn/2022-04-11/23-52-54)

> 宝塔面板执行日志

![宝塔面板执行日志](https://blog.cdn.thinkmoon.cn/2022-04-11/23-53-45)

搞定收工！大功告成。
