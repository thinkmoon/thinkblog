---
title: 在 Windows 系统中配置 pip 清华源
date: '2024-05-15 23:46:18'
lastmod: '2024-05-15 23:46:18'
categories:
- 学习笔记
tags:
- python
description: ''
---


> 在使用 Python 进行开发时，我们经常会用到 pip 来安装各种包。但有时默认的源下载速度可能较慢，这时候配置国内的镜像源就很有必要了。这里介绍如何在 Windows 系统中配置 pip 的清华源。

## 第一步：创建配置文件

在你的用户目录下（一般是 C:\Users\你的用户名），可以通过在资源管理器的地址栏输入 `%appdata%` 后回车快速打开 appdata 文件夹。创建一个名为 pip 的文件夹，然后在该文件夹内创建一个名为 pip.ini 的文件。

## 第二步：编辑配置文件

用文本编辑器打开 pip.ini 文件，在其中添加以下内容：
```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
## 第三步：验证配置

打开命令提示符，输入 pip install 某个包，观察下载速度是否有所提升。如果配置成功，下载速度应该会比之前快很多。


