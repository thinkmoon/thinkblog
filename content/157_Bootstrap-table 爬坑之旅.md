---
title: Bootstrap-table 爬坑之旅
date: ''
modified: ''
category: 学习笔记
tags:
- Bootstrap-table
---

继上次被坑后,由于未做笔记, 没想的我再次败在这个坑上, 自我感觉我还将使用bootstraap-table一段时间, 所以为了避免下次再被这个坑坑一个下午的时间. 我决定将它记录下来.

首先, 前端table插件有很多, 但是由于它是我接触的第一个,所以可能会用它一定的时间.

我采用的是, data-url,数据与视图分离的格式.
> 坑:
> 1. 在operation的formatter和events的设定时, 切记不要设置data-field的值,否则会出现events显示不了的情况 .
> 2. 在引入js拓展时,注意后面的js不能与其冲突,导致改变引入顺序
