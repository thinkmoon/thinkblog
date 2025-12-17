---
title: vue3.x简单实现wx.showModal()
date: '2020-11-30 23:30:53'
lastmod: '2020-11-30 23:30:53'
categories:
- 学习笔记
tags:
- tm-ui
- Vue3
description: 开发过微信小程序的同学想必都对wx.showModal不陌生。用起来还是比较方便的，以api的形式挂载在全局对象wx上，只需调用一下这个api即可显示一个弹窗，还可以根据设置的参数做一些定制。一些知名的组件库，也实现了此类功能。比如element的$message。所以，我也来分享一个简单实现方式，以此来加深对Vue的理解。
featured_image: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-11-30T13:14:59.png
---


![2020-11-30T13:14:59.png][1]



## 引言



开发过微信小程序的同学想必都对wx.showModal不陌生。用起来还是比较方便的，以api的形式挂载在全局对象wx上，只需调用一下这个api即可显示一个弹窗，还可以根据设置的参数做一些定制。一些知名的组件库，也实现了此类功能。比如element的$message。所以，我也来分享一个简单实现方式，以此来加深对Vue的理解。



## 代码结构



![2020-11-30T15:17:32.png][2]



在Message目录下，有着两个文件，vue文件负责组件内容，js负责处理服务APi。



## 实现原理



首先使用vue文件创建一个弹窗组件，然后按正常写组件方式写一个组件逻辑。唯一不同的是引入方式不一样，不在别的组件中引用该组件。使用js文件将其注册到全局api，调用该api。



## 实现过程



> 注意：本文使用的是Vue3.x版本。由于本人Vue3.x也正出于学习之处，如有理解/实现不当之处，恳请指正！



### Vue文件



```html

<template>

    <div v-if="visible" class="tm-message-wrapper">

        <div class="tm-message-dialog">

            <div class="tm-message-title">{{ title }}</div>

            <div class="tm-message-content">{{ content }}</div>

            <div class="tm-message-noRepeat" v-if="showNoRepeat"><input type="checkbox" v-model="noRepeat">不再提示</div>

            <div class="tm-message-operation-area">

                <div class="tm-message-cancel tm-message-operation" @click="action('cancel')">取消</div>

                <div class="tm-message-confirm tm-message-operation" @click="action('confirm')">确定</div>

            </div>

        </div>

    </div>

</template>



<script>

export default {

    data() {

        return {

            uid: "default",

            visible: false,

            title: "提示",

            content: "消息内容",

            showNoRepeat: false,

            noRepeat: false,

            callBack: null

        }

    },

    methods: {

        action(action) {

            this.visible = false

            if (action == "confirm" && this.showNoRepeat && this.noRepeat) {

                window.localStorage.setItem(this.uid, true)

            }

            if (this.callBack instanceof Function) {

                this.callBack(action)

            }

        }

    }

}

</script>



```

该文件没有什么特别值得注意的地方，唯一一个跟普通组件写法不一样的就是多了一个callBack回调。



### js文件



```javascript

import { createApp } from 'vue'

import Message from "./index.vue"





const msg = options => {

    const NoticeInstance = createApp(Message)

    let msgNode = document.createElement('div');

    NoticeInstance.vm = NoticeInstance.mount(msgNode);

    if (options && Object.keys(options).length > 0) {

        Object.assign(NoticeInstance.vm, options)

    }

    console.log(NoticeInstance)

    NoticeInstance.vm.visible = true;

    NoticeInstance.dom = NoticeInstance.vm.$el;

    document.body.appendChild(NoticeInstance.dom)

    return NoticeInstance.vm

}

export default msg;



```



js文件首先创建了一个app实例，然后将其挂载到一个新的html元素，随后进行一些属性的赋值操作。最后将实例追加之文档的body末尾。



## 引入



main.js

```javascript

import { createApp } from 'vue'

import App from './App.vue'



import Message from "../tm-ui/components/Message"



const app = createApp(App)

app.config.globalProperties.$message = Message;



app.mount('#app')



```



## 调用



test.vue

```html

<template>

  <div @click="showModal" class="bg-blue text-lg">

      点我弹窗(wx.showModal)

  </div>

</template>



<script>

export default {

    methods:{

        showModal(){

            this.$message({

                title:"弹窗标题",

                content:"弹窗内容",

                callBack: (action) => {

                    if(action == 'confirm') {

                        console.log("点击了确定")

                    }

                }

            })

        }

    }

}

</script>



<style>



</style>

```



![2020-11-30T15:18:35.png][3]



## 后记



相比于Vue2.x，vue3.x的设计理念更偏向于函数式编程，比如不在默认导出Vue对象，而是使用createApp的方式创建一个实例。而这个showModal的实现虽然达到了效果，但用起来依旧缺少了函数式编程的美感。相比于微信小程序showModal的对象函数回调写法。我个人更偏向于element的messag实现。返回一个Promise对象，确认操作在then()调用里面，取消操作在catch()异常处理。感觉这样会更具有与Vue3统一的编程式美感。





  [1]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-11-30T13:14:59.png

  [2]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-11-30T15:17:32.png

  [3]: https://blog.cdn.thinkmoon.cn/blog/typecho/2020-11-30T15:18:35.png