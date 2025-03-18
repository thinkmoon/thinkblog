---
title: uni-app使用v-model
date: ''
modified: ''
category: 学习笔记
tags:
- vue
- uni-app
- 微信小程序
---

## v-model 介绍

首先明确一点，v-model仅仅是语法糖。

```
<input type="text" v-model="something">
```

等价于

```
  <input
                type="text"
                v-bind:value="something"
                v-on:input="something = $event.target.value">
```

它将一个较复杂的input双向数据绑定简化了他的书写方式。

## 微信小程序绑定input

最开始我是使用微信推荐的写法
```
<input bindtap="input" />
```
然后在js里面解析event，然后再setData

## uni-app下v-model的写法

> 本文采用`uni-app`自定义组件模式

wxml
```
...
<form @submit="formSubmit" @reset="formReset" :model="formItem" class="tm-every-center padding bg-white">
					<view class="section flex align-center">
						<view class="section__title">姓名：</view>
						<input name="name" placeholder="请填写您的姓名" class="bg-gray" v-model="formItem.name" />
					</view>
					<view class="section flex align-center">
						<view class="section__title">手机：</view>
						<input name="name" placeholder="请填写您的姓名" class="bg-gray" v-model="formItem.phone" />
					</view>
					<view class="section flex align-center">
						<view class="section__title">赛点：</view>
						<input name="name" placeholder="请填写您的姓名" class="bg-gray" v-model="formItem.competition" />
					</view>
					<view class="btn-area margin-top"><button formType="submit" class="cu-btn">提交</button></view>
				</form>
				...
```
然后在data里面设置
```
formItem: {
				name:'',
				phone:'',
				competition: ''
			}
```
在submit事件回调里面就可以这样写
```
submit(){
	this.$api.post(formItem).then(res => {
	})
}
```
完美解决微信小程序input书写过程冗余的情况。