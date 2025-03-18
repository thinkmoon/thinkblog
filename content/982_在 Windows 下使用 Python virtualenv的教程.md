---
title: 在 Windows 下使用 Python virtualenv的教程
date: '2024-06-07 22:15:03'
modified: '2024-06-07 22:15:03'
category: 学习笔记
tags:
- python
desc: 在 Python 开发中，使用虚拟环境是一种常见的最佳实践。它可以帮助我们在同一台计算机上管理多个具有不同依赖关系的项目，避免依赖冲突和版本混乱。本文将介绍如何在
  Windows 系统下使用 Python 的 virtualenv 工具创建和管理虚拟环境，并提供一些实用的技巧和建议。
thumb: https://blog.cdn.thinkmoon.cn/2024-05-19/18-28-59
---

> 在 Python 开发中，使用虚拟环境是一种常见的最佳实践。它可以帮助我们在同一台计算机上管理多个具有不同依赖关系的项目，避免依赖冲突和版本混乱。本文将介绍如何在 Windows 系统下使用 Python 的 virtualenv 工具创建和管理虚拟环境，并提供一些实用的技巧和建议。

## 什么是 virtualenv？
virtualenv 是一个用于创建隔离的 Python 环境的工具。它可以帮助你在同一台计算机上同时运行多个具有不同依赖关系的 Python 项目，而不会相互干扰。


## 安装 virtualenv
确保你已经安装了 Python。你可以从 Python 官方网站下载并安装适合你操作系统的版本。
打开命令提示符（CMD）或 PowerShell。
使用以下命令安装 virtualenv：
```plaintext
   pip install virtualenv
```
## 创建虚拟环境并指定 Python 版本
在命令提示符或 PowerShell 中，导航到你想要创建虚拟环境的目录。
使用以下命令创建一个新的虚拟环境，并指定所需的 Python 版本：
```plaintext
   virtualenv myenv --python=python3.8
```
在上述命令中，--python=python3.8 指定了要使用的 Python 版本为 3.8。你可以根据需要将其替换为任何其他已安装的 Python 版本。
## 激活虚拟环境
创建虚拟环境后，你需要激活它才能在其中安装和使用包。
在命令提示符或 PowerShell 中，导航到虚拟环境的目录（在本例中为 myenv）。
输入以下命令激活虚拟环境：
对于 Windows CMD：
```plaintext
     myenv\Scripts\activate.bat
```
对于 Windows PowerShell：
```plaintext
     myenv\Scripts\Activate.ps1
```
激活虚拟环境后，你的命令提示符或 PowerShell 前缀将显示虚拟环境的名称，表明你现在正在虚拟环境中工作。
## 安装包
在激活的虚拟环境中，你可以使用 pip 安装所需的包。
例如，要安装 numpy 包，可以使用以下命令：
```plaintext
   pip install numpy
```
所有安装的包将仅在当前虚拟环境中可用。
## 对比 virtualenv 和 venv 的优势
1. virtualenv 和 venv 都是用于创建虚拟环境的工具，但它们在一些方面有所不同：
2. virtualenv 是一个第三方工具，需要单独安装。而 venv 是 Python 3.3 及更高版本中内置的模块，无需额外安装。
3. virtualenv 支持更多的 Python 版本，并且可以在较旧的 Python 版本上使用。而 venv 仅在 Python 3.3 及更高版本中可用。
4. virtualenv 提供了更多的选项和灵活性，例如可以指定不同的 Python 解释器路径、创建共享环境等。而 venv 的功能相对较简单。

## 退出虚拟环境
当你完成在虚拟环境中的工作后，可以使用以下命令退出虚拟环境：
```plaintext
   deactivate
```
退出虚拟环境后，你将回到系统的默认 Python 环境。
## 删除虚拟环境
如果你不再需要某个虚拟环境，可以将其删除。
在命令提示符或 PowerShell 中，导航到虚拟环境的目录。
删除整个虚拟环境目录及其包含的所有文件和文件夹。
## 生成 requirements.txt 文件

安装 pipreqs：
```plaintext
   pip install pipreqs
```
使用以下命令生成 requirements.txt 文件：
```plaintext
   pipreqs --encoding=utf8
```
这将在当前目录下生成一个名为 requirements.txt 的文件，其中包含了虚拟环境中安装的所有依赖包及其版本信息。

请注意，pipreqs 可能无法完全准确地识别所有依赖关系，特别是对于一些复杂的项目或使用了特定的安装方式的包。在实际使用中，建议你手动检查 requirements.txt 文件，并根据项目的实际需求进行调整。

另外，如果你使用的是 pipenv 等其他虚拟环境管理工具，它们通常会自动生成或管理 requirements.txt 文件，你可以参考相应工具的文档进行操作。