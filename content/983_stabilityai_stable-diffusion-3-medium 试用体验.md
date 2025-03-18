---
title: stabilityai/stable-diffusion-3-medium 试用体验
date: '2024-06-21 23:23:30'
modified: '2024-06-21 23:23:30'
category: 学习笔记
tags:
- AI
desc: '在当今的科技领域，人工智能和深度学习技术的发展日新月异。其中，稳定扩散模型（Stable Diffusion Model）作为一种强大的生成模型，在图像生成、视频处理等领域展现出了巨大的潜力。而
  ComfyUI 则是一款功能强大的图形用户界面，为用户提供了便捷的操作和可视化的工作流程。

  本文将详细介绍如何在 ComfyUI 中安装和使用稳定扩散模型，并通过实际案例展示其在图像生成方面的应用。无论你是初学者还是有一定经验的开发者，都可以通过本文了解到稳定扩散模型的基本原理和使用方法，从而为你的研究和项目提供有力的支持。'
thumb: https://blog.cdn.thinkmoon.cn/2024-06-21/23-13-51
---

> 在当今的科技领域，人工智能和深度学习技术的发展日新月异。其中，稳定扩散模型（Stable Diffusion Model）作为一种强大的生成模型，在图像生成、视频处理等领域展现出了巨大的潜力。而 ComfyUI 则是一款功能强大的图形用户界面，为用户提供了便捷的操作和可视化的工作流程。
本文将详细介绍如何在 ComfyUI 中安装和使用稳定扩散模型，并通过实际案例展示其在图像生成方面的应用。无论你是初学者还是有一定经验的开发者，都可以通过本文了解到稳定扩散模型的基本原理和使用方法，从而为你的研究和项目提供有力的支持。

## 背景知识-名词解释

1. `Stable Diffusion`: 是一种强大的人工智能图像生成模型。它的主要功能是根据用户输入的文本描述，生成逼真、富有创意和多样化的图像。用户可以通过输入详细的描述，如主题、场景、颜色、风格、物体的特征等，Stable Diffusion 能够理解这些文本信息，并运用其学习到的知识和算法，生成相应的图像。
2. `ComfyUI`: 是一个用于生成图像的用户界面。它通常与图像生成模型（如 Stable Diffusion）结合使用，为用户提供了一种更直观、更易于操作的方式来控制和调整图像生成的参数和设置。ComfyUI 允许用户通过图形化的界面，以拖放、选择、输入数值等方式来定制图像生成的各种条件，例如模型选择、提示词权重、采样方法、步数、分辨率等。
3. `CLIP`（Contrastive Language-Image Pre-Training）是一种多模态预训练神经网络，由OpenAI在2021年发布。它的核心思想是使用大量图像和文本的配对数据进行预训练，以学习图像和文本之间的对齐关系。

## 官方地址

[https://huggingface.co/stabilityai/stable-diffusion-3-medium](https://huggingface.co/stabilityai/stable-diffusion-3-medium)

## 安装教程

1. 下载模型，我这里先直接下载16位的试试水

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/21-39-32)

2. 下载comfy UI

[https://github.com/comfyanonymous/ComfyUI?tab=readme-ov-file#installing](https://github.com/comfyanonymous/ComfyUI?tab=readme-ov-file#installing)

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-23-35)

3. 解压下载好的 comfy UI 7z包

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-44-15)

4. 运行`run_nvidia_gpu.bat`

出现工作流界面则说明安装成功

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-45-52)

## 导入checkPoint

将下载好的SD模型导入到，ComfyUI的checkpoint文件夹`ComfyUI\models\checkpoints`

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-58-21)

当在工作流界面可以选择到下载的模型的时候，则说明导入成功

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-59-06)

## 导入工作流

下载SD3官方的3个流程图文件

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/22-59-56)

点击load选择要导入的流程图

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-01-32)

流程图文件解释

1. sd3_medium_example_workflow_basic.json -- 基础工作流
2. sd3_medium_example_workflow_multi_prompt.json -- 多prompt工作流
3. sd3_medium_example_workflow_upscaling.json -- 带图片放大的工作流

## 配置流程图

1. 切换模型，切换到下载的模型

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-09-59)

2. 删除原Clip节点，从模型节点中拖出clip指向prompt。

因为我上面下载的模型自带Clip能力，从模型中引入即可。

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-11-35)


## 运行SD3模型

1. 输入prompt

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-05-08)

2. 运行生图队列

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-05-59)

等待一小会，开始运行则说明启动成功

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-13-51)

## 大功告成

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-14-39)

## 性能占用

我的显卡是4070ti super。运行的模型为16位的，一次运行耗时约10s左右，显存占用90%，基本hold住。

![Description](https://blog.cdn.thinkmoon.cn/2024-06-21/23-17-09)