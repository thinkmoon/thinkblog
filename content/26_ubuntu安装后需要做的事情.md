---
title: ubuntu安装后需要做的事情
date: ''
modified: ''
category: 学习笔记
tags:
- linux
thumb: https://www.thinkmoon.cn/usr/uploads/2019/02/3440487827.png
---

## 1. 安装chrome
```shell
sudo wget http://www.linuxidc.com/files/repo/google-chrome.list -P /etc/apt/sources.list.d/
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add -
sudo apt update
sudo apt install google-chrome-stable
```
> 19年12月18日：现在觉得火狐也不错
## 2. 安装Shadowsocks
不然美化界面太慢了

## 3. 美化界面[参考链接][1]
> 安装工具
```shell
sudo apt-get update
sudo apt-get install gnome-tweak-tool
sudo apt-get install gnome-shell-extensions
sudo apt-get install  gnome-shell-extension-dashtodock
```
![2018-12-24 14-21-29 的屏幕截图.png][2]
 

## 3. 安装搜狗输入法[ubuntu 18.04 LTS 安装搜狗输入法][3]
实在是不喜欢默认输入法

## 4. 换阿里源
### 1. 先备份源
```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```
### 2. 删除原文件
```
sudo rm -f /etc/apt/sources.list
```

### 3. 新建源文件
```
sudo vi /etc/apt/sources.list
```

### 4. 添加内容
```vim
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
```
![2019-03-28T03:03:08.png][4]

> 其中`bionic`是系统版本代号，可使用`lsb_release -cs`查询，添加内容时需要更换为对应的版本代号

![查看ubuntu系统版本代号][5]

## 5. 安装V2ray
```shell
sudo bash < <( curl -L -s https://install.direct/go.sh)
```
### 配置
```shell
gedit /etc/v2ray/config.json
```
修改内容
```json
{
  "log": {
    "loglevel": "info"
  },
  "inbounds": [
    {
      "port": 1080,
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      },
      "settings": {
        "udp": true // 开启 UDP 协议支持
      }
    },
    {
      "port": 8080,
      "protocol": "http",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      }
    }
  ],
  "outbounds": [
    {
      "tag": "proxy-vmess",
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "8.8.8.8", // 服务器的 IP
            "port": 443, // 服务器的端口
            "users": [
              {
                // id 就是 UUID，相当于用户密码
                "id": "7d4c4078-e129-416b-a483-cf5713a96a66",
                "alterId": 4
              }
            ]
          }
        ]
      }
    },
    {
      "tag": "direct",
      "settings": {},
      "protocol": "freedom"
    }
  ],
  "dns": {
    "server": [
      "8.8.8.8",
      "1.1.1.1"
    ],
    // 你的 IP 地址，用于 DNS 解析离你最快的 CDN
    "clientIp": "203.208.40.63"
  },
  // 配置路由功能，绕过局域网和中国大陆地址
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "domain": [
          // 默认跳过国内网站，如果想要代理某个国内网站可以添加到下列列表中
          "cnblogs.com"
        ],
        "outboundTag": "proxy-vmess"
      },
      {
        "type": "field",
        "domain": [
          "geosite:cn"
        ],
        "outboundTag": "direct"
      },
      {
        "type": "field",
        "outboundTag": "direct",
        "ip": [
          "geoip:cn",
          "geoip:private"
        ]
      }
    ]
  }
}
```

## 运行
```bash
systemctl start v2ray
```



  [1]: https://www.cnblogs.com/feipeng8848/p/8970556.html
  [2]: https://www.thinkmoon.cn/usr/uploads/2018/12/3369720455.png
  [3]: https://www.jianshu.com/p/c936a8a2180e
  [4]: https://www.thinkmoon.cn/usr/uploads/2019/03/3073265614.png
  [5]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-18T06:29:35.png