---
title: win10下使用wsl配置Clion toolchain
date: '2019-03-28 13:16:13'
modified: '2019-03-28 13:16:13'
category: 学习笔记
tags: []
thumb: https://www.thinkmoon.cn/usr/uploads/2019/03/3388117114.png
---

## 前言
为什么要使用wsl来配置呢？因为我个人感觉这个比较方便，不用安装一堆包。直接敲命令就好。

## 准备工作
安装好Clion后，打开toolchain是这样的。
![2019-03-28T01:51:00.png][1]
> 前提是先装好wsl

## 选择wsl toolchain
会出现下面这个情况
![2019-03-28T01:52:22.png][2]
这是因为wsl没有配置ssh服务

## 配置wsl的ssh

```bash
sudo vi /etc/ssh/sshd_config
```
把密码认证的no改为yes
```
PasswordAuthentication yes
```
## restart ssh
```
sudo service ssh restart 
```
如果出现以下提示
![2019-03-28T02:15:33.png][3]
则需要生成key
```
sudo dpkg-reconfigure openssh-server
```
## 查看ssh运行状态
```
service ssh status
```

## configure remote credentials
![2019-03-28T02:00:48.png][4]
![2019-03-28T02:16:37.png][5]

## 配置编译环境
在wsl里面执行
```
sudo apt-get install build-essential gcc g++ cmake gdb
```
![2019-03-28T05:16:09.png][6]


  [1]: https://www.thinkmoon.cn/usr/uploads/2019/03/3388117114.png
  [2]: https://www.thinkmoon.cn/usr/uploads/2019/03/3588185930.png
  [3]: https://www.thinkmoon.cn/usr/uploads/2019/03/1786204809.png
  [4]: https://www.thinkmoon.cn/usr/uploads/2019/03/827550189.png
  [5]: https://www.thinkmoon.cn/usr/uploads/2019/03/3808045947.png
  [6]: https://www.thinkmoon.cn/usr/uploads/2019/03/4186950507.png