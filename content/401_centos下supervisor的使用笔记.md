---
title: centos下supervisor的使用笔记
date: '2019-09-03 10:47:19'
modified: '2019-09-03 10:47:19'
category: 学习笔记
tags: []
---

> supervisor是一个守护进程工具

## 安装
```
yum install -y supervisor
```

## 配置
> 安装后会生成如下内容

![2019-09-03T02:33:19.png][1]

我们查看一下`/etc/supervisord.conf`,发现文件最后一行

![2019-09-03T02:39:38.png][2]

这就是在提示我们把配置文件写`supervisord.d`目录下的`ini`文件里。

### 创建配置文件
1. 首先切换到`supervisord.d`目录
2. touch frps.ini
3. nano frps.ini
4. 复制以下内容(示例为运行frps服务端)
```
[program:frps]
user=root
command=/root/frp/frps/frps -c /root/frp/frps/frps.ini
startsecs=1
startretries=100
autorstart=true
autorestart=true
stderr_logfile=/tmp/err-frps.log
stderr_logfile_maxbytes=50MB
stderr_logfile_backups=10
stdout_logfile=/tmp/out-frps.log
stdout_logfile_maxbytes=50MB
stdout_logfile_backups=10
```

### tips
```
supervisorctl status //查看状态
supervisorctl reload //重载配置文件
```

## 运行
```
supervisorctl reload
supervisord -c /etc/supervisord.conf
```
然后再配置好开机自启就OK了


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-09-03T02:33:19.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-09-03T02:39:38.png