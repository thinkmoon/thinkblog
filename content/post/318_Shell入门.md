---
title: 'Shell入门 '
date: '2019-07-01 17:09:24'
lastmod: '2019-07-01 17:09:24'
categories:
- 学习笔记
tags:
- Shell
featured_image: https://blog.cdn.thinkmoon.cn/2019/7/maxresdefault.jpg
---


> 本文诞生原因：作为一个程序员，居然不会shell，说起来也尴尬。



## 基本格式

```shell

#!/bin/bash

...

```



## Shell变量

1. Shell变量定义不需要关键字，直接定义，不要加$。如`name = "hello"`

2. Shell变量使用的时候需要加$, 花括号为可选项，但是为了让程序可以分清边界，一般使用花括号。如`echo ${name}`



### 只读变量

在前面加`readonly`

如：

```shell

#!/bin/bash

name="Hello"

readonly name

```

### 删除变量

在前面加`unset`

变量被删除后不能再次使用。unset 命令不能删除只读变量。

如：

```

#!/bin/sh

name="Hello"

unset name

```



## shell获取输入

read - 从标准输入读取数值，命令语法：

```shell

read: read [-ers] [-a array] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]

    从标准输入中读取一行。

    

    从标准输入中读取一行, 如果提供 -u 则从文件描述符FD中读取一行。该行数据与单词一样分隔, 第一个单词分给第一个变量，第二个分给第二个变量，依次类推，直至最后一个单词. 只有在$IFS中找到的字符才会被识别为单词分隔符。

    

    如果不提供变量，这一行的读取将被存在REPLY变量中。

    

    Options:

      -a 数组	将读取的单词分配给顺序数组，下标从零开始。

      -d delim	继续读取直到读取DELIM的第一个字符，而不是换行符.

      -e	use Readline to obtain the line in an interactive shell

      -i text	use TEXT as the initial text for Readline

      -n nchars	return after reading NCHARS characters rather than waiting

    		for a newline, but honor a delimiter if fewer than

    		NCHARS characters are read before the delimiter

      -N nchars	return only after reading exactly NCHARS characters, unless

    		EOF is encountered or read times out, ignoring any

    		delimiter

      -p prompt	output the string PROMPT without a trailing newline before

    		attempting to read

      -r	do not allow backslashes to escape any characters

      -s	do not echo input coming from a terminal

      -t timeout	time out and return failure if a complete line of

    		input is not read within TIMEOUT seconds.  The value of the

    		TMOUT variable is the default timeout.  TIMEOUT may be a

    		fractional number.  If TIMEOUT is 0, read returns

    		immediately, without trying to read any data, returning

    		success only if input is available on the specified

    		file descriptor.  The exit status is greater than 128

    		if the timeout is exceeded

      -u fd	read from file descriptor FD instead of the standard input

    

    Exit Status:

    The return code is zero, unless end-of-file is encountered, read times out

    (in which case it's greater than 128), a variable assignment error occurs,

    or an invalid file descriptor is supplied as the argument to -u.



```

不翻译了，反正都是很简单的英语





