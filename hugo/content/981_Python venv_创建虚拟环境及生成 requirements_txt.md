---
title: Python venv：创建虚拟环境及生成 requirements.txt
date: '2024-05-19 18:29:53'
lastmod: '2024-05-19 18:29:53'
categories:
- 学习笔记
tags:
- python
description: 在 Python 开发中，管理项目的依赖是一项重要的任务。为了避免不同项目之间的依赖冲突，我们通常会使用虚拟环境来隔离每个项目的依赖。Python
  的 venv 模块就是一个用于创建虚拟环境的工具。在本文中，我们将介绍如何在 Windows 环境下使用 venv 模块创建虚拟环境，并生成 requirements.txt
  文件来管理项目的依赖。
featured_image: https://blog.cdn.thinkmoon.cn/2024-05-19/18-28-59
---


![Description](https://blog.cdn.thinkmoon.cn/2024-05-19/18-28-59)
## 引言
在 Python 开发中，管理项目的依赖是一项重要的任务。为了避免不同项目之间的依赖冲突，我们通常会使用虚拟环境来隔离每个项目的依赖。Python 的 venv 模块就是一个用于创建虚拟环境的工具。在本文中，我们将介绍如何在 Windows 环境下使用 venv 模块创建虚拟环境，并生成 requirements.txt 文件来管理项目的依赖。

## 一、什么是 Python venv？
Python venv 是 Python 标准库中的一个模块，用于创建虚拟环境。虚拟环境是一个独立的 Python 运行环境，它包含了项目所需的 Python 解释器和所有依赖包。通过使用虚拟环境，我们可以在不同的项目中使用不同的依赖版本，从而避免依赖冲突。

## 二、如何创建 Python venv？
在 Windows 环境下，我们可以使用以下命令创建 Python venv：

1. 打开命令提示符（CMD）或 PowerShell。
2. 进入项目目录。
3. 运行以下命令创建虚拟环境：
```bash
   python -m venv venv
```
> 其中，venv 是虚拟环境的名称，你可以根据需要修改。

## 4. 激活虚拟环境：
在 CMD 中，运行以下命令激活虚拟环境：
```bash
   venv\Scripts\activate
```
在 PowerShell 中，运行以下命令激活虚拟环境：
```bash
   venv\Scripts\Activate.ps1
```
激活虚拟环境后，命令提示符或 PowerShell 前面会出现 (venv) 前缀，表示当前处于虚拟环境中。

## 三、如何安装依赖？
在虚拟环境中，我们可以使用 pip 命令安装项目所需的依赖。例如，如果我们的项目需要安装 numpy 和 pandas 两个包，可以运行以下命令：

```bash
pip install numpy pandas
```

## 四、如何生成 requirements.txt？
在项目开发完成后，我们可以使用 pip freeze 命令生成 requirements.txt 文件，该文件包含了项目中所有已安装的依赖包及其版本信息。运行以下命令：
```bash
pip freeze > requirements.txt
```
生成的 requirements.txt 文件可以用于在其他环境中安装项目所需的依赖。

## 五、总结
通过使用 Python venv，我们可以在 Windows 环境下创建虚拟环境并隔离项目的依赖。在项目开发完成后，我们可以使用 pip freeze 命令生成 requirements.txt 文件，以便在其他环境中安装项目所需的依赖。希望本文对你有所帮助！