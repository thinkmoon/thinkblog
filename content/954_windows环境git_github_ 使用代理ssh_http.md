---
title: windows环境git（github) 使用代理ssh/http
date: ''
modified: ''
category: 心路里程
tags:
- 折腾
desc: 遇到ssh仓库推送失败的问题，增加ssh代理
thumb: ''
---

修改或增加`~/.ssh/config`
```
ProxyCommand connect -S 127.0.0.1:10808 %h %p
```
其中`-S`代表使用socks代理。如果是http模式，则为`-H`
后接代理地址，如`127.0.0.1:10808`

如果你只想修改特定的情况做配置，可以增加如下内容

```
Host github.com
 User git
 Port 22
 Hostname github.com
```

## 参考链接
[Getting git to work through a proxy server (in Windows)](https://communary.net/2017/01/12/getting-git-to-work-through-a-proxy-server-in-windows/)


