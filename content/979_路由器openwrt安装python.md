---
title: 路由器openwrt安装python
date: '2023-12-25 21:10:14'
modified: '2023-12-25 21:10:14'
category: 闲余折腾
tags:
- linux
- python
desc: 使用u盘当路由器的系统盘，一不小心碰到它，路由器又挂了。决定把U盘作为挂载盘安装软件
thumb: https://blog.cdn.thinkmoon.cn/2023-12-18/22-08-33
---

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-08-33)

> 使用u盘当路由器的系统盘，一不小心碰到它，路由器又挂了。决定把U盘作为挂载盘安装软件

## 挂载U盘

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-14-40)

启用挂载的设备

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-15-23)

## opkg包配置安装目录

增加一个opkg安装路径

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-16-29)

## 配置PATH路径

```bash
export PATH=$PATH:/mnt/sda/opkg/usr//bin
echo 'export PATH=$PATH:/mnt/sda/opkg/usr/bin' >> /etc/profile
```

## 指定路径安装okpg包

```bash
opkg update
opkg -d usb install python3 
opkg -d usb install python3-pip
```
请注意：`-d usb`为必需的，否则依旧会安装到根目录

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-21-15)

打开对应目录可以看到，已经多了一个opkg目录

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-22-02)

输出python3，测试是否安装成功

## 安装pip

```
python -m pip install -U --force pip
```

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-41-39)

## 安装python依赖

```bash
pip3 install requests
```

![Description](https://blog.cdn.thinkmoon.cn/2023-12-18/22-45-57)

## 换国内源

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 后记

> 现在换成挂载overlays了，直接在系统盘上面再套一层，避免u盘掉线后的系统启动不了的情况

## 参考文章

1. [OPKG 软件包管理](https://openwrt.org/zh/docs/techref/opkg)

