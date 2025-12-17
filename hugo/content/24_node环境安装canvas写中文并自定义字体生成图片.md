---
title: node环境安装canvas写中文并自定义字体生成图片
date: '2019-01-16 11:09:30'
lastmod: '2019-01-16 11:09:30'
categories:
- 学习笔记
tags:
- nodejs
featured_image: https://blog.cdn.thinkmoon.cn/TIM%E5%9B%BE%E7%89%8720180620125239.png
---


> **为什么要在服务端装canvas？** 因为并不是所有的客户端都能很好的支持canvas（比如微信小程序不能修改自定义字体），所以我们需要一个

能够在服务端生成图片的，然后将图片传输





## 安装node-canvas

### 1. 更新编译环境



```bash

sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ -y

```

### 2. 安装node-canvas

```bash

npm install -g canvas

```

### 3. 测试代码

```JavaScript

var Canvas = require('canvas'),

    canvas = new Canvas(300, 200),

    ctx = canvas.getContext('2d'),

    fs = require('fs');

 

var out = fs.createWriteStream(__dirname + '/image.png')

  , stream = canvas.createPNGStream();

 

stream.on('data', function(chunk){

  out.write(chunk);

});

 

//在左边画正方形

ctx.fillStyle = '#A00'    

ctx.fillRect(0, 30,50,50);   

  

 

//在右边画正方形

ctx.fillStyle = '#aaa'    

ctx.fillRect(50, 30, 50, 50);

 

//画文字

ctx.fillStyle = "#000";

ctx.font = "20px Arial";

ctx.fillText("Hello World", 0, 20);

 

//画一个圆

ctx.beginPath();

ctx.arc(30, 110, 20, 0, 2*Math.PI);

ctx.stroke();

ctx.fillStyle = "green";                                                                                                                          

ctx.fill();

ctx.save();  

```

## 可能遇到的问题

> 如果你按上述方法操作，并且运行成功了。那便是极好的



### 1. 自定义字体

```JavaScript

// You need to call it before the Canvas is created

Canvas.registerFont('comicsans.ttf', {family: 'Comic Sans'});



var canvas = new Canvas(500, 500),

  ctx = canvas.getContext('2d');



ctx.font = '12px "Comic Sans"';

ctx.fillText(250, 10, 'Everyone hates this font :(');

```

> 不过可能会发现`Canvas.registerFont is not a function`这是因为npm版本的没有这个函数。



所以你需要去找另一个github版`https://github.com/chearon/node-canvas#12971f64a66b`



git clone 下来



> 然后将Canvas = require('canvas')改成require('./node-canvas')，

将`var canvas = new Canvas(300, 200)`改成`var canvas = new Canvas.Canvas(300, 200)`



### 2. Error: Cannot find module '../build/Release/canvas.node'

> 如果遇到这个问题，请cd进你的node-canvas目录执行npm install



> 如果还是不行，请执行`npm install -g node-gyp`



然后再cd项目目录执行`node-gyp rebuild`，then cd 进node-canvas同样执行`node-gyp rebuild`



如果成功则会出现



![编译过程](https://blog.cdn.thinkmoon.cn/%E6%B7%B1%E5%BA%A6%E6%88%AA%E5%9B%BE_%E9%80%89%E6%8B%A9%E5%8C%BA%E5%9F%9F_20180619203241.png)



## 示例代码

### 我的项目目录

```

.

├── 1.html

├── composer.json

├── font

├── fz.ttf

├── img

├── index.js

├── node-canvas

├── node_modules

├── package.json

└── package-lock.json

```

### 我的代码

```JavaScript

var fs = require('fs'),path = require('path');

var http = require('http'),url = require("url");

var Canvas = require('./node-canvas'),Image = Canvas.Image;

var Fonts = [];

var filePath = path.resolve('./font');



let promise = new Promise(function(resolve, reject) {

  let i=0;

  fs.readdir(filePath,function(err,files){  

    if(err){  

      console.warn(err)  

    }else{

      files.forEach(function(filename){

        Canvas.registerFont(filePath + "/" + filename, {family: "font" + i});

        console.log(i);

        i++;

      });

    }

  });

  

});



promise.then(function() {

  console.log("ASDF");

  Fonts.forEach((Element) =>{

    console.log(Element);

  });

});



console.log('Hi!');





http.createServer(function (req, res) {

  var params = url.parse(req.url, true).query;

  var str = params.str + '\r',site = params.site;

  var row =  1,col = 15,width = 1500;

  row = str.length / 15 + 1;

  var fontsize = width/col;

  var height = fontsize * row + 200;

  if(height < 1000){height = 1000}

  var canvas = new Canvas.Canvas(width, height), ctx = canvas.getContext('2d')

  res.writeHead(200,{"Content-Type": "image/png"});

  ctx.fillStyle = '#FFF';

  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle = '#000';

  if(row < 2){

    let num = str.length

    fontsize = 1200 / num;

    ctx.font = fontsize + 'px "font'+ site +'"';

    ctx.fillText(str,( width - num * fontsize ) / 2, (height-fontsize)/2 -200 + fontsize);

  }

  else{

    ctx.font = fontsize + 'px "font'+ site +'"';

    for(let i = 0;i < row ; i++){

      ctx.fillText(str.substring(i*15,(i+1)*15), 0, fontsize*(i+1));

    }

  }

  

  fs.readFile(__dirname + '/img/brand.png', function(err, squid){

    if (err) throw err;

    img = new Image;

    img.src = squid;

    ctx.fillStyle = '#42b983';

    ctx.fillRect(0,canvas.height - 230,canvas.width, 230);

    ctx.drawImage(img, canvas.width - img.width / 2 - 50, canvas.height - img.height / 2 - 50, img.width / 2, img.height / 2);

    res.end(canvas.toBuffer());

  });

}).listen(8080);

```

## 效果展示

![天地玄黄](https://blog.cdn.thinkmoon.cn/TIM%E5%9B%BE%E7%89%8720180620125239.png)