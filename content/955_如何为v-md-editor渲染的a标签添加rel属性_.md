---
title: 如何为v-md-editor渲染的a标签添加rel属性?
date: ''
modified: ''
category: 心路里程
tags:
- 编辑器
- 博客
desc: 如果不修改白名单，会出现增加的属性，无法体现在最终渲染的html上。
thumb: ''
---

## 引入`markdown-it-external-links`

```
yarn add markdown-it-external-links --dev
```

## 拓展markdown-it

拓展是为了改变markdown-it的tokens，进而改变渲染后的文本

```js
extend(md) {
      md.use(externalLinks, {
        externalClassName: 'custom-external-link',
        internalClassName: 'custom-internal-link',
        internalDomains: ['www.thinkmoon.cn'],
        externalRel: 'nofollow noopener noreferrer',
      });
    },
```

## 修改xss白名单

> 如果不修改白名单，会出现增加的属性，无法体现在最终渲染的html上。

```
 VMdPreview.xss.extend({
    // 扩展白名单
    whiteList: {
      a: ['target', 'href', 'title', 'rel'],
    },
  });
```

## 参考文档

[扩展-markdown-it](https://code-farmer-i.github.io/vue-markdown-editor/zh/theme/github.html#%E6%89%A9%E5%B1%95-markdown-it)
[markdown-it-external-links](https://github.com/rotorz/markdown-it-external-links)