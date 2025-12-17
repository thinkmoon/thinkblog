---
title: 一些在Jetson设备的开发经验
date: '2025-10-27 10:30:00'
lastmod: '2025-10-27 10:30:00'
categories:
- 技术实践
tags:
- Jetson
- 深度学习
- YOLO
- TensorRT
description: NVIDIA Jetson系列设备作为边缘AI计算的重要平台，在计算机视觉和深度学习应用中发挥着关键作用。本文将详细介绍Jetson设备的刷机、SDK安装、YOLO模型部署以及TensorRT优化等开发经验，帮助开发者快速上手并实现高性能的AI应用部署。
---


# 一些在Jetson设备的开发经验

> NVIDIA Jetson系列设备作为边缘AI计算的重要平台，在计算机视觉和深度学习应用中发挥着关键作用。本文将详细介绍Jetson设备的刷机、SDK安装、YOLO模型部署以及TensorRT优化等开发经验，帮助开发者快速上手并实现高性能的AI应用部署。

## 一、Jetson设备概述

### 1.1 什么是NVIDIA Jetson？

NVIDIA Jetson是一系列基于ARM架构的嵌入式AI计算平台，专为边缘计算和机器人应用设计。Jetson设备集成了高性能的GPU、CPU和深度学习加速器，能够在低功耗环境下运行复杂的AI模型。

### 1.2 Jetson系列对比

| 设备型号 | GPU | CPU | 内存 | 功耗 | 适用场景 |
|---------|-----|-----|------|------|----------|
| Jetson AGX Orin (64GB) | 2048-core Ampere | 12-core Arm Cortex-A78AE | 64GB LPDDR5 | 60W | 高性能AI推理 |
| Jetson Orin NX 16GB | 1024-core Ampere | 8-core Arm Cortex-A78AE | 16GB LPDDR5 | 25W | 中等性能应用 |
| Jetson Orin Nano | 1024-core Ampere | 6-core Arm Cortex-A78AE | 8GB LPDDR5 | 15W | 入门级AI应用 |

## 二、JetPack SDK安装与配置

### 2.1 什么是NVIDIA JetPack？

JetPack是NVIDIA为Jetson设备提供的软件开发套件，包含了完整的操作系统、CUDA、cuDNN、TensorRT等深度学习框架和工具链。

### 2.2 刷机步骤

#### 2.2.1 准备工作
- 下载JetPack SDK Manager
- 准备USB线缆和电源适配器

#### 2.2.2 刷机流程
1. **下载JetPack SDK Manager**
   ```bash
   # 从NVIDIA官网下载对应版本的SDK Manager
   ```

2. **启动SDK Manager**
   ```bash
   # 在Ubuntu主机上运行
   sudo ./sdkmanager
   ```
   如果有图形化界面就直接双击运行

3. **选择目标设备**
   - 选择对应的Jetson设备型号（连上usb数据线时，会自动检测对应的型号）
   - 选择JetPack版本（推荐6.1）
   - 选择安装组件，必选cuda，否则后续自行安装会很麻烦。时间充裕时，可选择全部SDK

4. **刷写系统**
   - 如果能够进入系统，可直接执行`sudo reboot –force forced-recovery`。若是无法进入系统（刷机失败的情况下）可通过短接进入恢复模式。
   - 判断恢复模式是否进入成功，可以在SDK Manager上查看对应jetson status
   - 然后执行flash，如果使用sdk manager可视化刷机失败。可通过命令行进行刷机。

### 2.3 首次启动配置

```bash
# 启用最大性能模式
sudo nvpmodel -m 0

# 启用Jetson时钟
sudo jetson_clocks

# 安装jetson-stats监控工具
sudo apt update
sudo pip install jetson-stats
sudo reboot

# 启动监控界面
jtop
```

## 三、深度学习环境配置

### 3.1 PyTorch安装

#### 3.1.1 卸载现有版本
```bash
# 卸载可能存在的PyTorch版本
pip uninstall torch torchvision
```

#### 3.1.2 安装ARM64兼容版本PyTorch 和 Torchvision
```bash
# 对于JetPack 6.1
pip install https://github.com/ultralytics/assets/releases/download/v0.0.0/torch-2.5.0a0+872d972e41.nv24.08-cp310-cp310-linux_aarch64.whl
pip install https://github.com/ultralytics/assets/releases/download/v0.0.0/torchvision-0.20.0a0+afc54f7-cp310-cp310-linux_aarch64.whl

```
> 注意事项：请勿直接通过pip安装，通过 pip 安装的这两个包与基于 ARM64 架构的 Jetson 平台不兼容。因此，我们需要手动安装预构建的 PyTorch pip wheel 并从源代码编译/安装 Torchvision

### 3.2 安装Ultralytics YOLO

```bash
# 安装Ultralytics包
pip install ultralytics

# 验证安装
python -c "import ultralytics; print('YOLO安装成功')"
```

### 3.3 安装ONNX Runtime GPU

```bash
pip install https://github.com/ultralytics/assets/releases/download/v0.0.0/onnxruntime_gpu-1.20.0-cp310-cp310-linux_aarch64.whl
```

> YOLO官网上说要安装gpu版本的，但是我发现直接使用jetson的onnxruntime默认就支持了GPU

## 四、YOLO模型部署与优化

### 4.1 基础YOLO推理

```python
from ultralytics import YOLO

# 加载预训练模型
model = YOLO("yolo11n.pt")

# 运行推理
results = model("path/to/image.jpg")

# 显示结果
results[0].show()
```

### 4.2 模型格式转换

```python
from ultralytics import YOLO

# Load a YOLO11n PyTorch model

model = YOLO("yolo11n.pt")

# Export the model to TensorRT
model.export(format="engine", half=True)  # creates 'yolo11n.engine'

# Load the exported TensorRT model
trt_model = YOLO("yolo11n.engine")

# Run inference
results = trt_model("https://ultralytics.com/images/bus.jpg")
```

该命令会自动下载对应的yolo模型，并进行tensorrt编译导出。

## 五、常见问题与解决方案

### 5.1 安装问题

**问题：PyTorch安装失败**
```bash
# 解决方案：使用预编译的wheel包
pip install torch==1.13.0+cu117 torchvision==0.14.0+cu117 --index-url https://download.pytorch.org/whl/cu117
```

**问题：CUDA版本不匹配**
```bash
# 检查CUDA版本
nvcc --version

# 安装对应版本的PyTorch
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

### 7.2 性能问题

**问题：推理速度慢**
- 启用最大性能模式：`sudo nvpmodel -m 0`
- 使用TensorRT优化：`model.export(format="engine")`
- 启用FP16精度：`half=True`

**问题：conda环境无法识别tensorrt，提示moudle not found**
这是因为jetson内嵌tensorrt，但是conda环境没有对应的path。可通过增加环境变量，如：

```
PYTHONPATH="/usr/lib/python3.10/dist-packages:$PYTHONPATH" python yolo-export.py
# "/usr/lib/python3.10/dist-packages"这个路径为系统内置python的路径。
```

**问题：pytorch运行报错**

可能是因为pytorch版本大于24.06，此时需要安装一个稀疏矩阵乘加速的库` cusparselt`
```
wget 
raw.githubusercontent.com/pytorch/pytorch/5c6af2b583709f6176898c017424dc9981023c28/.ci/docker/
common/install_cusparselt.sh 
export CUDA_VERSION=12.1 # as an example   
bash ./install_cusparselt.sh
```

## 参考文献

1. [Ultralytics YOLO官方文档 - NVIDIA Jetson指南](https://docs.ultralytics.com/zh/guides/nvidia-jetson/)
2. [NVIDIA深度学习框架安装指南 - PyTorch Jetson平台](https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html)
3. [JetsonHacks - Jetson特定命令参考](https://jetsonhacks.com/jetson-specific-commands/)
4. [NVIDIA Jetson开发者文档](https://developer.nvidia.com/embedded/jetson-linux)
5. [TensorRT开发者指南](https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html)
