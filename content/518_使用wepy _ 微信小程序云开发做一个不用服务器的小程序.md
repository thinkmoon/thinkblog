---
title: 使用wepy + 微信小程序云开发做一个不用服务器的小程序
date: ''
modified: ''
category: 学习笔记
tags: []
---

## 技术介绍
### [Wepy](https://tencent.github.io/wepy/)
![image](https://thinkmoon.cn/images/1545989271602.png)
### [云开发](https://tencent.github.io/wepy/)
开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。

云开发为开发者提供完整的云端支持，弱化后端和运维概念，无需搭建服务器，使用平台提供的 API 进行核心业务开发，即可实现快速上线和迭代，同时这一能力，同开发者已经使用的云服务相互兼容，并不互斥。

目前提供三大基础能力支持：

1. 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码

2. 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库

3. 存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

## 安装WePy
> WePY的安装或更新都通过npm进行。

如果你未安装过npm，你可能需要先[安装npm](https://thinkmoon.cn/2a94.html)

```shell
npm install wepy-cli -g
```

> 注: 我这使用的版本是

## 创建一个WePy项目
### 首先，查看一下项目模板
```shell
wepy list
```

他会在这里列出一些模板，你选择你喜欢的安装。
`wepy init standard my-project`
