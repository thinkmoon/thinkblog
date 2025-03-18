---
title: Vue3使用customRef()主动触发响应更新
date: ''
modified: ''
category: 学习笔记
tags:
- 前端
- vuejs
- vue
desc: 在vue3中（尤其是setup语法）vue框架会自动处理事件响应。但是假设有个场景，我们实现了一个数据结构，只要触发对应操作时，就刷新视图。这个问题在选项式API有个公共API，提供强制刷新能力，那就是`$forceUpdate()`。`$forceUpdate()`会全量刷新，而且组合式API不支持该方法，这个时候如果我们想主动触发视图更新，可以使用Vue3提供的customRef()自定义一个ref。
thumb: https://blog.cdn.thinkmoon.cn/2022-12-12/21-07-40
---

![customRef()](https://blog.cdn.thinkmoon.cn/2022-12-12/21-07-40)

## 前言

在vue3中（尤其是setup语法）vue框架会自动处理事件响应。但是假设有个场景，我们实现了一个数据结构，只要触发对应操作时，就刷新视图。这个问题在选项式API有个公共API，提供强制刷新能力，那就是`$forceUpdate()`。`$forceUpdate()`会全量刷新，而且组合式API不支持该方法，这个时候如果我们想主动触发视图更新，可以使用Vue3提供的`customRef()`自定义一个ref。

## 介绍

customRef()，创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

形如
```typescript
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```

其中，track函数告诉框架这是一个需要追踪变更的变量，一般在get里面调用。trigger则是数据变化时调用，用以通知框架，该变量已发生变化触发视图更新。

## 示例

> 实现一个日志展示功能，当日志增加时，触发视图更新

![Description](https://blog.cdn.thinkmoon.cn/2022-12-12/21-53-09)

这是一个简陋的日志系统，永远展示最后十条日志(截图少了个.slice(-10))。而且我在程序最后加了个定时器，每隔一秒定时增加一条日志。

从图中的结果可以发现，对应的数据变化并未相应的渲染在视图上。这个使用我们就需要customRef实现一个自定义的ref，当日志增加时主动触发trigger通知视图更新

## 使用customRef改造

![Description](https://blog.cdn.thinkmoon.cn/2022-12-12/22-03-09)

## 总结

使用customRef的好处就是可以把trigger暴露到外部，直接触发trigger就会触发刷新，实现按需加载的效果。