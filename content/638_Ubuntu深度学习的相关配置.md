---
title: Ubuntu深度学习的相关配置
date: '2019-12-20 22:06:35'
modified: '2019-12-20 22:06:35'
category: 学习笔记
tags: []
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-19T14:19:05.png
---

![tensorflow][1]

## 安装NVIDIA驱动 

1. 查看显卡信息
```shell
ubuntu-drivers devices
```

2. 自动安装显卡驱动

```shell
sudo ubuntu-drivers autoinstall
```

3. 确认是否安装成功
```shell
nvidia-smi
```

## 安装docker

[安装文档](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

使用阿里源安装

```shell
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
# step 2: 安装GPG证书
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
# Step 3: 写入软件源信息
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
# Step 4: 更新并安装Docker-CE
sudo apt-get -y update
sudo apt-get -y install docker-ce

# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# apt-cache madison docker-ce
#   docker-ce | 17.03.1~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
#   docker-ce | 17.03.0~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
# Step 2: 安装指定版本的Docker-CE: (VERSION例如上面的17.03.1~ce-0~ubuntu-xenial)
# sudo apt-get -y install docker-ce=[VERSION]
```

> tips: 由于使用的是19.10版本，暂时没有对应的源，故手动将step 3切换至19.04 

```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu disco stable"
```

## 安装NVIDIA Container Toolkit

### Add the package repositories
```shell
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

## 测试
```bash
sudo docker run --gpus all -it --rm tensorflow/tensorflow:latest-gpu-py3    python -c "import tensorflow as tf; print(tf.reduce_sum(tf.random.normal([1000, 1000])))"
```

## 装载工作目录至容器
```bash
docker run --gpus all -itd --name tf --rm -v $PWD:/tmp -w /tmp tensorflow/tensorflow:latest-gpu-py3
```
以上命令在后台创建了一个支持GPU的tensorflow:latest-gpu-py3容器，将其命名为tf（方便后面容器操作），并将工作目录切换至主机当前目录。

![装载工作目录至tensorflow容器][2]


## 参考资料

[Ubuntu 18.04 安装NVIDIA驱动 实践](https://blog.csdn.net/yy2yy99/article/details/88569589)
[tensorflow官网](https://www.tensorflow.org/)


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-19T14:19:05.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-20T13:55:02.png