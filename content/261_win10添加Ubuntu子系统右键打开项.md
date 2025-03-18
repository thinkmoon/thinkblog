---
title: win10添加Ubuntu子系统右键打开项
date: '2019-03-29 10:31:17'
modified: '2019-03-29 10:31:17'
category: 闲余折腾
tags: []
thumb: https://www.thinkmoon.cn/usr/uploads/2019/03/1039522002.png
---

## 大致思路
1. 注册表新建目录右键项
2. 填写WSL命令行
> 如果你觉得添加起来过于麻烦，你可以双击执行下列注册表文件

[wsl.reg][1]

## 一些简介

### 注册表百科
> 注册表（Registry，繁体中文版Windows操作系统称之为登录档）是Microsoft Windows中的一个重要的数据库，用于存储系统和应用程序的设置信息。早在Windows 3.0推出OLE技术的时候，注册表就已经出现。随后推出的Windows NT是第一个从系统级别广泛使用注册表的操作系统。但是，从Microsoft Windows 95操作系统开始，注册表才真正成为Windows用户经常接触的内容，并在其后的操作系统中继续沿用至今。

### 打开方式
1. `Win + R`键入`regedit`

### 操作流程  
1. 目录导航输入`HKEY_CLASSES_ROOT\Directory\shell`
2. 新建项`ubuntu`
3. 选择ubuntu项，新建字符串值：名称为默认，值为WSL
如图：![2019-03-25T02:28:02.png][2]
4. 在ubuntu项内添加command项
5. 字符串名称为默认，值为`wsl.exe --cd "%V"`
如图：![2019-03-25T02:30:30.png][3]

## 截至目前，存在的问题
就是只有在选择一个目录时才会出现这个东西，右键空白处啥都不会发生

## 解决方法
在`HKEY_CLASSES_ROOT\Directory\Background\shell`也同样操作一波

## 效果预览
我去，我不知道怎么截右键这个状态。


  


  [1]: https://www.thinkmoon.cn/usr/uploads/2019/03/213852166.reg
  [2]: https://www.thinkmoon.cn/usr/uploads/2019/03/743952179.png
  [3]: https://www.thinkmoon.cn/usr/uploads/2019/03/3295443921.png