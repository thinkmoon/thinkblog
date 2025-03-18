---
title: Ubutnu使用问题记录贴
date: ''
modified: ''
category: 学习笔记
tags:
- bash
- ubuntu
- apt
- linux
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-18T05:46:47.png
---

## 安装软件未满足依赖关系

> 安装软件curl时提示以下内容

```shell
下列软件包有未满足的依赖关系：
 curl : 依赖: libcurl4 (= 7.64.0-2ubuntu1.2) 但是 7.65.3-1ubuntu3 正要被安装
E: 无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系。
```

这是由于版本不符的导致的，可能是以前卸载的时候未卸载干净。所以我们需要使用`purge`选项来重新卸载一次。

```shell
sudo apt-get purge libcurl4
```

然后重新安装，解决问题！！

![Ubutnu安装软件未满足依赖关系][1]


## 执行bash命令提示`bash: /dev/fd/63: 没有那个文件或目录`

![bash: /dev/fd/63: 没有那个文件或目录][2]

原因：`<（…）`运算符称为进程替换，是运行命令的一种方式，其输出进入匿名管道。这就是/dev/fd/63。其思想是允许外部命令（这里是bash）将另一个命令输出视为一个文件。通常形式是使用<将伪文件对象重定向到bash的输入流中。

![解决方案，使用两个`<`][3]


解决方案，使用两个`<`

## 用户不在sudo列表

> 别问为什么出现这个问题，，，

### 解决方法
1. 重启进恢复模式
2. 选择root用户
3. 添加用户至sudo组
```bash
adduser username sudo
```

## 系统没有设置图标
![ubuntu没有设置.png][4]
> 天哪，为啥我的电脑老是出现些奇怪的问题。

### 解决方法
1. -sudo apt update-
2. sudo apt  install gnome-control-center
![系统修复设置][5]


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-18T05:46:47.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-18T07:27:55.png
  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-18T07:28:44.png
  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/ubuntu%E6%B2%A1%E6%9C%89%E8%AE%BE%E7%BD%AE.png
  [5]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-20T11:51:33.png