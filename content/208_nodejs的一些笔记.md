---
title: nodejs的一些笔记
date: '2019-03-12 16:20:43'
modified: '2019-03-12 16:20:43'
category: 学习笔记
tags:
- nodejs
---

## 安装nodejs
```
sudo apt-get install nodejs
sudo apt-get install npm
```
## 全局安装包
```
sudo npm i -g cnpm
```
## 查看全局安装的包
```
npm list -g --depth 0
```
## 全局卸载包
```
sudo npm uninstall -g cnpm
```

## 清理缓存
```
npm cache clean -f
```
## 默认镜像太慢换淘宝镜像
```bash
npm config set registry https://registry.npm.taobao.org
```
> 现在我常使用cnpm包
> 检查配置是否成功
```bash
npm config get registry
```