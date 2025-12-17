---
title: python3 + Django + uwsgi + nginx 配置部署笔记
date: '2019-01-16 11:13:56'
lastmod: '2019-01-16 11:13:56'
categories:
- 学习笔记
tags:
- python
featured_image: https://blog.cdn.thinkmoon.cn/2018-04-10-20-07-25.png
---


> 本文环境



操作系统: Ubuntu 16.04.3

Python版本: 3.5.2

Django版本: 2.0.4

nginx版本: 1.10.3



>本文平台为腾讯云1核1G系统 

> 我的项目文件名为: `dgutpsy`



## 安装pip3(python3 的pip)

```shell

sudo apt-get install python3-pip

```

![2018-04-10-20-07-25.png][1]



> 安装成功后运行`pip3`将会出现



![2018-04-10-20-09-19.png][2]



## 安装uwsgi

```shell

pip install uwsgi

```

![2018-04-10-20-17-19.png][3]



## 测试uwsgi运行状态

> 新建文件test.py

```python

def application(env, start_response):

    start_response('200 OK', [('Content-Type','text/html')])

    return [b"Hello World"]

```

> 有些教程说是 `return "hello world"`

> 但是这样其实会出现访问空白的情况, 我的是Python3的环境，需要对hello world进行编码.

而如果你是Python2的环境，你应该写`return "hello world"`





### 使用uwsgi运行该文件

```shell

uwsgi --http :8000 --wsgi-file test.py

```

> 此语句的意思是，`使用uwsgi运行test.py文件， 采用http模式， 端口8000`



![2018-04-10-20-44-49.png][4]



### 访问页面



> 好啦,可以看到亲切的hello world 就说明uwsgi运行成功了



![2018-04-10-20-39-21.png][5]



> TIPS: 如果你访问不了,请先检查腾讯云安全组端口是否开放8000端口

## 安装Django

```shell

pip3 install Django

```

> 如在python3里面import django没有报错则安装成功.



![2018-04-10-20-55-49.png][6]



## 上传项目代码

> 现在我们开始上传项目代码



![2018-04-10-20-42-25.png][7]



> 使用MobaXterm的sftp工具拖进来,[笑着哭]不要问我为什么不用ftp,这个方便.

## 确认代码运行正常

> 切进项目目录,运行

```shell

python3 manage.py runserver 0.0.0.0:8000

```

![2018-04-10-20-59-03.png][8]

### 访问页面

![2018-04-10-21-01-32.png][9]

> 不太对?这是因为设置了ALLOWED_HOSTS的原因

> 我们在setting.py里设置一下

```python

ALLOWED_HOSTS = ['*']

```

### 再次访问页面

![2018-04-10-21-05-34.png][10]

> OK!



## uswgi运行项目

```shell

 uwsgi --http :8000 --chdir /home/ubuntu/dgutpsy  --wsgi dgutpsy.wsgi

```

> 这个语句的意思与上相似，只不过是多了一个工作路径和wsgi文件

![2018-04-10-21-05-34.png][11]

> 开什么玩笑? 你觉得没变化?



***

## *至此*

> 我们可以暂定以下内容

1. 项目没问题. 

2. 项目配置没问题

3. uwsgi没问题

4. 对项目的支持环境没问题

***



> 接下来, 我们开始配置nginx



## 安装nginx

```shell

sudo apt-get install nginx

```



## 测试nginx运行状态

![2018-04-10-21-18-53.png][12]

> nginx 安装成功



## 修改nginx配置

> 文件路径`"/etc/nginx/sites-enabled/default"`



别再费力找nginx.conf啦,新版本已经没有这个文件的.

> 我的

```conf

upstream django {

        server 127.0.0.1:8001; #web的socket端口

    }

server {

	listen 80 default_server;

	listen [::]:80 default_server;

 

	index index.html index.htm index.nginx-debian.html;



	server_name _;



	location / {

		root /home/ubuntu/dgutpsy; #项目目录

        uwsgi_pass django;

        include /home/ubuntu/dgutpsy/uwsgi_params; #uwsgi_params文件的地址

	}

}

```

完整的uwsgi_params文件内容应该是

```python

uwsgi_param  QUERY_STRING       $query_string;

uwsgi_param  REQUEST_METHOD     $request_method;

uwsgi_param  CONTENT_TYPE       $content_type;

uwsgi_param  CONTENT_LENGTH     $content_length;



uwsgi_param  REQUEST_URI        $request_uri;

uwsgi_param  PATH_INFO          $document_uri;

uwsgi_param  DOCUMENT_ROOT      $document_root;

uwsgi_param  SERVER_PROTOCOL    $server_protocol;

uwsgi_param  REQUEST_SCHEME     $scheme;

uwsgi_param  HTTPS              $https if_not_empty;



uwsgi_param  REMOTE_ADDR        $remote_addr;

uwsgi_param  REMOTE_PORT        $remote_port;

uwsgi_param  SERVER_PORT        $server_port;

uwsgi_param  SERVER_NAME        $server_name;

```

> 没有这个文件,或者这个文件写错是会报错的哦.

## 访问测试502

![2018-04-10-21-37-49.png][13]

> 这是因为我们的socket通信还没开始呢!

## nginx 与 uwsgi通信

> 先使用hello world测试

```shell

uwsgi --socket :8001 --wsgi-file test.py

```

### 访问测试页面

![图片描述][14]

*** 

至此: nginx 与 uwsgi通信成功!

> TIPS: 这里你是无法通过在浏览器里面访问8001端口来判断是否启动的，因为它是socket协议

***

## 让uwsgi后台运行

> 这样虽然看似可以, 但是当你关闭ssh时,又会出现502了!

>

> 这是因为当你关闭这个ssh进程时,uwsgi进程也被终止了.

而且,每次启动都要输一串好长的命令,好不麻烦!



这个时候,我们需要用到一个东西, 那就是ini配置文件启动.

其中`daemonize = /home/ubuntu/dgutpsy/test.log`的意思就是后台运行并规定日志输出目录。

### 新建test.ini

```ini

[uwsgi]

socket = 127.0.0.1:8001

wsgi-file = /home/ubuntu/dgutpsy/test.py

daemonize = /home/ubuntu/dgutpsy/test.log 

```

```shell

uwsgi --ini test.ini

```

## niginx与Django项目通信

### 新建dgutpsy.ini

```

[uwsgi]

socket = 127.0.0.1:8001

chdir           = /home/ubuntu/dgutpsy

module          = dgutpsy.wsgi

master          = true

processes       = 1 



threads = 2 

max-requests = 6000



daemonize = /home/ubuntu/dgutpsy/run.log



```

然后运行

```shell

uwsgi --ini dgutpsy.ini

```

## 域名映射



添加域名>解析`consult.psyannabel.cn`

### 访问页面

![](https://blog.cdn.thinkmoon.cn/2018-04-10-22-17-32.png)



## 后记:



> Q&A:

> Q: 能用manage.py运行的,为什么要用uwsgi?

> > A: 单进程的manage.py, 能和web服务器uwsgi比ma

>

> Q: 能用uwsgi的,为什么还要用nginx?

> > A: uwsgi虽然是web服务器, 但是它在处理静态文件时, 并没有nginx来得优秀.

>

> Q: 大致流程?

> > A: nginx运行web处理http请求, nginx使用socket与uwsgi通信,将动态部分转让交给uwsgi处理

> 

> Q: 为啥我的test.py运行不了？

> > A: 如果端口开放没有问题，那么请检查Python版本对应的return





  [1]: https://segmentfault.com/img/bV8qdQ

  [2]: https://segmentfault.com/img/bV8qdO

  [3]: https://segmentfault.com/img/bV8qdN

  [4]: https://segmentfault.com/img/bV8qdP

  [5]: https://segmentfault.com/img/bV8qdL

  [6]: https://segmentfault.com/img/bV8qdH

  [7]: https://segmentfault.com/img/bV8qdG

  [8]: https://segmentfault.com/img/bV8qdF

  [9]: https://segmentfault.com/img/bV8qdE

  [10]: https://segmentfault.com/img/bV8qdK

  [11]: https://segmentfault.com/img/bV8qdK

  [12]: https://segmentfault.com/img/bV8qdD

  [13]: https://segmentfault.com/img/bV8qdC

  [14]: https://segmentfault.com/img/bVbi2Qy