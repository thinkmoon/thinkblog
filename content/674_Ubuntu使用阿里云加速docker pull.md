---
title: Ubuntu使用阿里云加速docker pull
date: ''
modified: ''
category: 学习笔记
tags:
- docker
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-19T09:13:04.png
---

> 使用 Docker 时需要首先下载一个官方镜像，例如 mysql、wordpress。然而由于网络原因，下载一个 Docker 官方镜像可能会需要很长的时间，甚至下载失败。为此，阿里云容器镜像服务提供了官方的镜像站点，从而加速官方镜像的下载。

## 登陆阿里云容器镜像服务
![阿里云容器镜像服务][1]
由上图可以看到，阿里给我们分配的专享加速域名。

## 配置docker源

> 针对Docker客户端版本大于 1.10.0 的用户

可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

不过默认没有这个文件的，所以我们需要新建一个

## 新建daemon.json

```shell
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
```

## 设置源地址

```bash
{
    "registry-mirrors": ["<your accelerate address>"]
}            
```

## 重启生效

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker            
```
![Ubuntu使用阿里云加速docker pull][2]
大功吿成！！


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-19T09:13:04.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-19T09:18:44.png