---
title: 微信小程序svg转canvas
date: ''
modified: ''
category: 学习笔记
tags:
- nodejs
---

> >首先，为什么我们需要这个？
> 
> 因为微信小程序虽然可以可以绘制svg图片，但是在真机调试的时候却渲染不出来。所以我们需要一个工具(可以将svg转成微信小程序支持的canvas并绘制出来)。

我使用的是touch-wx + vs code 开发。

> 现已启用该开发模式.因为Ubuntu下经常编译不完整

## Touch WX 是什么？

![Touch WX](https://blog.cdn.thinkmoon.cn/TIM%E6%88%AA%E5%9B%BE20180620111841.png)

Touch WX是一套完全免费的微信小程序开发框架，包含丰富的UI控件用于官方组件的补充。与Touch UI开发方式很相似，也是通过VSCode编辑器+插件的方式开发，经过编译后输出小程序代码。
与其他小程序框架最主要的区别在于：Touch UI完全是基于小程序官方的自定义组件机制实现，输出的是小程序原始代码，而不是输出开发者完全无法阅读的编译代码。这样当遇到问题时，开发者可以很方便的定位问题所在，还可以基于输出的原始代码继续开发。
当你用Touch UI开发了H5应用，可以直接导入到Touch WX进行转换，稍作调整就能生成小程序。反之也同样，当你Touch WX开发了微信小程序，可以导出为Touch UI工程来生成H5应用。

## Touch WX 的特点

![Touch WX](https://blog.cdn.thinkmoon.cn/TIM%E6%88%AA%E5%9B%BE20180620111451.png)

### 我的理解

> Touch WX 就是一个可以将特定的nodejs项目编译成微信小程序项目的框架

### Touch WX更多操作

> 更多操作见http://www.touchui.io/touchui_doc_wx/

推荐大家看一下，或许会打开新世界的大门哦！

> 接下来，我默认你已经看了Touch WX的文档，并且拥有一定的nodejs基础

## 开始流程

### 安装parse-svg-path

> `npm install parse-svg-path --save`

### 引入parse-svg-path

> `var parse = require('parse-svg-path')`

### 使用parse-svg-path

> `parse(d)`

`d`为svg中的path值

> >不了解svg？
> 
> 请转`http://www.w3school.com.cn/svg/svg_intro.asp`

## 如何获得path值？
```JavaScript
var options = {
            url:"svg的URL",
            success:function(res){
              const ctx = wx.createCanvasContext('myCanvas')
              ctx.setFillStyle('black')
              var match = res.data.match(/d="(.*?)"/);
              var d = match[1];
              console.log(d);
            }
    }
    wx.request(options); 
```
> 上图中d就是path值，我这里使用的是正则表达式查找，而且只有一个path，如不一样，请自行modify

## 解析后的值
```JavaScript
console.log(parse(d));
```
![效果展示](https://blog.cdn.thinkmoon.cn/TIM%E6%88%AA%E5%9B%BE20180620113452.png)

> 解析之后是一系列的操作序列数组

## 绘制图形

> 根据一系列的操作，找到对应的微信小程序绘制API，进行绘制
```JavaScript
parse(d).forEach(function (element){
                if(element[0] == "M"){
                  ctx.moveTo(element[1], element[2])
                }else if(element[0] == "Q"){
                  ctx.quadraticCurveTo(element[1], element[2], element[3], element[4])
                }
              });
```

> 因为我这里只有M，Q操作所以我只用了两个API，可根据实际情况自行拓展

## 实例代码
`display.wx`
```JavaScript
<template>
  <view class='page'>
    <canvas canvas-id="myCanvas" style="border: 1px solid;"/>
    <!-- <view class='content'><text class="zhuan" style="font-size:{{fontSize}}pt">{{display}}</text> -->
  <!-- </view> -->
</view>
</template>

<script>
var parse = require('parse-svg-path')
export default {
  config: {
    navigationBarTitleText: '效果展示'
  },
  data: {},
  onLoad: function (options) {
    var str = options.display;
    if(str != null){
      try {
        str=decodeURI(str);
        wx.setStorageSync('display', str)
        console.log("接受到的str："+str);
      } catch (e) {
        console.log("设置diaplay值错误")
      }
    }  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  saveTemp(){
    console.log("fdsaf");
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      fail: function(res) {
        console.log(res);
      },
      success: function(res) {
        console.log(res.tempFilePath)
        setTimeout(function(){wx.saveImageToPhotosAlbum({
          filePath:res.tempFilePath,
          fail:function(res){
            console.log(res);
          }
          
          });},5000)
        
      },
       
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    
    var options = {
            url:"http://mp.thinkmoon.cn:39999?str=我&site=0",
            success:function(res){
              const ctx = wx.createCanvasContext('myCanvas')
              ctx.setFillStyle('black')
              var match = res.data.match(/d="(.*?)"/);
              var d = match[1];
              console.log(parse(d))
              parse(d).forEach(function (element){
                if(element[0] == "M"){
                  ctx.moveTo(element[1], element[2])
                }else if(element[0] == "Q"){
                  ctx.quadraticCurveTo(element[1], element[2], element[3], element[4])
                }
              });
              ctx.fill();
              ctx.draw(false,()=>{setTimeout(() => {that.saveTemp()},5000);});
            }
    }
    wx.request(options); 
    // wx.getStorage({
    //   key: 'display',
    //   success: function (res) {
    //     console.log("display的值为" + res.data)
    //     that.setData({
    //       display: res.data,
    //       fontSize: wx.getStorageSync('pt')
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var str = this.data.display;
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route
    var inUrl = url + "?display=" + encodeURI(str);
    console.log("分享的链接为"+inUrl);
    return {
      title: '您的好友给您分享了一段篆文',
      path: inUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}
</script>

<style lang="less">
.content{
  text-align: center;
}
canvas{
  width: 256px;
  height: 256px;
}

</style>

```

## 后记
> 我这个实例本来是将svg转canvas绘制出来，再转图片，下载到本地的。但是因为draw()函数是异步的所以需要等待。才可以下载成功，否则会出现一片黑的情况，总之感觉各种麻烦。再加上画布的大小难以设置。后我还是选择在服务端生成图片再转发过来。

## 参考文献
1. [SVG简介](http://www.w3school.com.cn/svg/svg_intro.asp)
2. [Touch WX开发文档](http://www.touchui.io/touchui_doc_wx/)
3. [微信开发文档Canvas](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/intro.html)