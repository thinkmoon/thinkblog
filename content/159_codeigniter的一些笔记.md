---
title: codeigniter的一些笔记
date: '2019-02-16 22:32:43'
modified: '2019-02-16 22:32:43'
category: 学习笔记
tags:
- codeigniter
---

---
title: codeigniter | codeigniter的一些笔记
tags: codeigniter
categories: 笔记
abbrlink: 15d8
date: 2018-04-02 13:15:42
thumbnail:
---
## codeigniter 部署坑
<!-- more -->
## session 文件路径问题

- ![](https://blog.cdn.thinkmoon.cn//2018-04-03-11-25-11.png)

### 解决方法 
> 在application/config/config.php 中最后一行, 加入
```php
$config['sess_save_path'] =BASEPATH.'../'.'session_file';
```
![](https://blog.cdn.thinkmoon.cn//2018-04-03-11-36-47.png)

### 原因
> 未设置ssesion文件路径,会默认使用php.ini的文件路径,可能会出现无路径访问权限的问题

## baseurl 修改 
> 要记得修改baseurl的值,以免出现访问不成功的情况
```php
$config['base_url'] = 'https://www.farminbackyard.com';
```
> pasue;



