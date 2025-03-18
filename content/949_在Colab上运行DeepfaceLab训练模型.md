---
title: 在Colab上运行DeepfaceLab训练模型
date: ''
modified: ''
category: 闲余折腾
tags:
- 机器学习
desc: 利用开源的DeepFaceLab_Colab，在谷歌colab上运行deepfacelab开源项目。实现云GPU训练
thumb: https://blog.cdn.thinkmoon.cn/2022-04-10/16-11-03
---


## 环境
1. Colab：https://colab.research.google.com/

## 利用开源的DeepFaceLab_Colab
> 地址[DeepFaceLab_Colab](https://github.com/dream80/DeepFaceLab_Colab)

## 打开最新版本V5

[DeepFaceLab_Colab_V5.ipynb](https://github.com/dream80/DeepFaceLab_Colab/blob/master/DeepFaceLab_Colab_V5.ipynb)

## 操作步骤

### 1. 挂载谷歌云盘

运行第一步挂载云盘命令，会弹出谷歌云盘授权窗口，点击允许。

![挂载谷歌云盘](https://blog.cdn.thinkmoon.cn/2022-07-09/16-20-55)

### 2. 初始化项目

该命令会在你的谷歌云盘上创建一个DeepFaceLab的文件夹，如果你使用的tensorflow 1还会安装cuda 10

![初始化项目](https://blog.cdn.thinkmoon.cn/2022-07-09/16-27-23)

### 3. 准备素材
![准备素材](https://blog.cdn.thinkmoon.cn/2022-07-09/16-28-59)

该命令会从demo仓库下载一份示例数据。同时你可以指定上传文件，覆盖对应的素材。

### 4. 安装软件

![安装软件](https://blog.cdn.thinkmoon.cn/2022-07-09/16-31-11)

我这里安装的是最新版本，静候安装完成。

![安装失败](https://blog.cdn.thinkmoon.cn/2022-07-09/16-32-43)

然后我第一次安装失败了。莫慌，这里只需要重新点一下“重启运行时”重新运行即可。

![重启运行时](https://blog.cdn.thinkmoon.cn/2022-07-09/16-34-00)

重启时这里会发生变化

![重启初始化](https://blog.cdn.thinkmoon.cn/2022-07-09/16-34-49)

重新执行`初始化项目`,`安装软件`这两个命令操作

### 提取源面部和目标面部

![提取面部](https://blog.cdn.thinkmoon.cn/2022-07-09/16-38-53)

![目标抽取](https://blog.cdn.thinkmoon.cn/2022-07-09/16-42-11)

### 开始训练

![开始训练](https://blog.cdn.thinkmoon.cn/2022-07-09/16-43-26)

## 注意事项

1. colab上面使用的是linux平台，linux平台拥有更好的合成效果
2. 训练时，可以直接在谷歌云盘`workspace/model`中查看最新的训练预览效果。
3. 如果挂载的云盘上面已经安装了deepface的时候，可以修改初始化代码，如下：

> 一键训练
```bash
! /opt/bin/nvidia-smi
from google.colab import drive
drive.mount('/content/drive')
import os 
root = "/content/drive/MyDrive/" #@param {type:"string"}

%cd $root
deepfacelab=os.path.join(root,"DeepFaceLab")
workspace=os.path.join(deepfacelab,"workspace")
deepfacelab_cloab=os.path.join(deepfacelab,"DeepFaceLab_Colab")

#@title 训练模型
Model = "SAEHD" #@param ["SAEHD","AMP","Quick96","XSeg"]
%cd $deepfacelab_cloab
!pip install -r requirements-colab.txt  
cmd = "main.py train --training-data-src-dir ../workspace/data_src/aligned --training-data-dst-dir ../workspace/data_dst/aligned --model-dir ../workspace/model --model "+Model+" --no-preview"
!python $cmd
```

3. src素材库一定需要各种角度，光线的高清素材，此时训练效果最好

![效果展示](https://blog.cdn.thinkmoon.cn/2022-04-10/16-11-03)