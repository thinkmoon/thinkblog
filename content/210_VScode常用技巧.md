---
title: VScode常用技巧
date: ''
modified: ''
category: 闲余折腾
tags:
- vscode
desc: 本文记录着一些在使用vscode时的一些常用小技巧，不定期更新
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/20629e8034bd3d3f64b721249131dd52.jpg
---

![vscode][1]

## Vscode 格式化vue Template代码段
1.安装 vetur
2.在User Setting中增加设置:
"vetur.format.defaultFormatter.html": "js-beautify-html"

> 2020.07.08留：我现在已经使用`prettier`来格式化代码了

## Vs code 添加 wepy template 代码
1. 打开File > preference > user snippets, 选择vue
2. 编辑vue.json
```json
{
"Print to console": {
		"prefix": "vue",
		"body": [
			"<!-- $0 -->",
			"<template>",
			"  <view class='page'> </view>",
			"</template>",
			"",
			"<script>",
			"import wepy from 'wepy'",
			"export default class Index extends wepy.page {",
			"config = {",
			"    navigationBarTitleText: '场馆预订',",
			"    usingComponents: {}",
			"};",
			"",
			"components = {};",
			"",
			"mixins = [];",
			"",
			"data = {};",
			"",
			"computed = {};",
			"",
			"methods = {};",
			"",
			"events = {};",
			"",
			"onLoad() {}",
			"}",
			"</script>",
			"<style lang='less'>",
			"</style>"
		],
		"description": "Log output to console"
	}
}
```

## 使用emmet自动代码补全
1. 打开File > preference > setting, 搜索emmet.triggerExpansionOnTab
2. 设置为true

## 自动读取eslint文件并进行修复
1. 先安装eslint
2. 设置中添加以下内容
```json
{
  "eslint.autoFixOnSave": true, //  启用保存时自动修复,默认只支持.js文件
  "eslint.validate": [
    "javascript", //  用eslint的规则检测js文件
    {
      "language": "vue", // 检测vue文件
      "autoFix": true //  为vue文件开启保存自动修复的功能
    },
    {
      "language": "html",
      "autoFix": true
    },
  ],
}
```
> 2020.07.08留：这个配置已经过时了

## 正则删除HTML标签
`Ctrl + H` 正则匹配 `<[^>]+>` 替换为空

## 正则替换换行
`Ctrl + H` 正则匹配 `\n` 替换为你想要的

## tab无法缩进代码
按`Ctrl + M`试试

## 多光标操作

1、按住alt，用鼠标左键点击，可以出现多个光标，输入的代码可以在光标处同时增加。
2、按住Ctrl + Alt，再按键盘上向上或者向下的键，可以使一列上出现多个光标。
3、选中一段文字，按shift+alt+i，可以在每行末尾出现光标
4、按shift+alt，再使用鼠标拖动，也可以出现竖直的列光标，同时可以选中多列。


  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/20629e8034bd3d3f64b721249131dd52.jpg