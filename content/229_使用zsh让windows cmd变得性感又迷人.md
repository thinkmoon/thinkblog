---
title: 使用zsh让windows cmd变得性感又迷人
date: '2019-12-19 15:41:33'
modified: '2019-12-19 15:41:33'
category: 教程分享
tags:
- 折腾
thumb: https://www.thinkmoon.cn/usr/uploads/2019/03/3090454687.png
---

## 引言
> 首先看一张最终效果图

![终端.PNG][1]

## 大致思路
> 使用win10的linux子系统，安装zsh，默认切换zsh终端。（什么鬼，这和装虚拟机有什么不一样？放心，不一样的，慢慢看）

## 为什么要需要它？
1. cmd太丑，cmder略慢，然后就是命令的不统一性。
2. 一个好看的终端可以让程序员变得开心又愉快。
> 如下

![截图.PNG][2]

## 准备工作
1. win10内部版本16215.0以上
2. 打开win10开发人员模式
3. 勾选控制面板>程序>启用windows功能>linux子系统
4. 重启
5. 打开应用商店>搜索linux, 选择你喜欢的linux发行版安装，我选的是ubuntu18.04，如果卸载了应用商店可以自行百度开启方式

-- 至此：linux系统安装成功
## 在linux子系统中需要做的操作
### 在开始栏运行ubuntu
> 或者win+R，键入wsl运行。
### 安装zsh
```shell
sudo apt-get install zsh
```

## 设置默认shell
```shell
chsh -s /bin/zsh
```

### 安装oh-my-zsh
```shell
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

### (可选项)修改主题
```shell
nano ~/.zshrc
```
> 我的修改如下

![2019-03-12T07:02:46.png][3]

### 让bash每次打开自动执行zsh
重新打开终端窗口，我们目前的效果是这样的。

![ssh1.PNG][4]

> 然后就会发现，这丫的，这怎么跟我的win10保持文件共享呢？

## 让linux子系统默认打开win10用户根目录
1. 首先找到`C\\windows\\system32\\wsl.exe`，复制到你的win10用户根目录。
2. 再为根目录的bash.exe创建快捷方式发送到桌面。
3. 运行

> 看，好神奇

![2019-03-12T07:14:16.png][5]

> 可是，，，难道每次我运行命令都要回到桌面启动？而且就不能像ubuntu那样ctrl + alt + T打开？

## 为适应win10的一些配置
1. 右键点击桌面快捷方式，选择快捷键，同时按ctrl + alt + T设置快捷键。
2. 桌面右键>选择查看>取消勾选显示桌面图标
> 测试ctrl + alt + T，我可能是为数不多的秀win10桌面的程序员:) （好像还是没有linux的好看？）

![2019-03-12T07:23:44.png][6]

> 在vs code里配置默认终端为wsl.exe。效果展示

![2019-03-12T07:27:41.png][7]

## 结束语
因为截图会变模糊，实际效果比这好看的多，嗯，又多了一个装逼的东西。

  [1]: https://www.thinkmoon.cn/usr/uploads/2019/03/3090454687.png
  [2]: https://www.thinkmoon.cn/usr/uploads/2019/03/941670490.png
  [3]: https://www.thinkmoon.cn/usr/uploads/2019/03/1635360079.png
  [4]: https://www.thinkmoon.cn/usr/uploads/2019/03/1686441689.png
  [5]: https://www.thinkmoon.cn/usr/uploads/2019/03/1721161329.png
  [6]: https://www.thinkmoon.cn/usr/uploads/2019/03/360849061.png
  [7]: https://www.thinkmoon.cn/usr/uploads/2019/03/813746774.png