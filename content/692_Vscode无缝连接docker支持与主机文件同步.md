---
title: Vscode无缝连接docker支持与主机文件同步
date: ''
modified: ''
category: 学习笔记
tags:
- vscode
- docker
- tensorflow
thumb: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:33:55.png
---

## 为什么需要？
我们在上一篇[Ubuntu深度学习的相关配置](https://www.thinkmoon.cn/20191213/cid=638.html)中最后讲到，将工作目录下的文件装载到了容器之下，这样我们在主机中编写一个文件，如`tf.py`。在容器中执行，需要输入以下命令。
```bash
docker exec tf python './tf.py' 
```
这样每改一下文件，想要看效果的话，就需要输入以上命令。而且，还不方便调试。然后，我就在想能不能做到像我平常写代码那样，在VScode中，点一下就运行，而且可以调试呢？于是便有了本文。

## 准备工作
- 安装好VScode并且保证互联网连接正常。然后将工作目录装载到容器的`/root/Project`目录下，不然`/tmp`的文件实在是太乱七八糟了。
```bash
docker run --gpus all -itd --name tf --rm -v ~/Project:/root/Project  tensorflow/tensorflow:latest-gpu-py3
```

## 操作流程
首先安装两个插件`docker`和`Remote Development`

![VScode的docker插件][1]

上图中可以看到tensorflow的容器已经处于运行中了，然后再打开`Remote Development`

![Remote Development][2]

显示有一个容器待连接，然后选择它，打开容器中的`Project`文件夹

![VScode in Container][3]

然后安装Python插件和调试工具，修改tf.py文件

```python
import tensorflow as tf
print("hello tensorflow")
```
点击右边的运行图标，成功输出。

![run tensorflow][4]

打开主机文件

![docker主机文件同步][5]

发现修改也已经同步，Over，现在可以愉快的写代码了。


  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:29:10.png
  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:31:51.png
  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:33:55.png
  [4]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:55:11.png
  [5]: https://blog.cdn.thinkmoon.cn/blog/typecho/2019-12-21T01:55:50.png