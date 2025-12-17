---
title: javascript的一些笔记
date: '2019-03-13 14:51:30'
lastmod: '2019-03-13 14:51:30'
categories:
- 学习笔记
tags:
- javascript
---


### js类似于printf那样的格式化字符串

> 安装包

```

npm install sprintf-js

```

> 调用包

```

var sprintf = require('sprintf-js').sprintf,

```



> 操作实例：时间前补零操作

```

for (let i = 46; i >= 0; i--) {

        console.log(sprintf('%2d:%02d', i / 2, (i % 2 ? 0 : 30)))

      }

```