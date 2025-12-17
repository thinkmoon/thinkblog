---
title: 使用CloudFlare反向代理七牛云存储实现SSL自由
date: 2025-03-19 14:19:00
lastmod: 2025-03-19 14:30:00
categories:
- 技术实践
tags:
- CDN加速
- 云存储
- 网络安全
description: 在混合云架构实践中，如何为第三方存储服务实现零成本HTTPS加密一直是开发者关注的焦点。本文将深入解析通过CloudFlare Workers反向代理技术，为七牛云存储资源构建全自动SSL加密体系的完整方案。该方案不仅规避了传统SSL证书部署的复杂流程，还能实现全球CDN加速与内容安全策略的统一管控。
---


# 基于CloudFlare Workers的七牛云HTTPS代理方案

## 一、方案背景与核心价值

### 1.1 问题场景

七牛云存储作为国内主流对象存储服务，其HTTP直连访问存在两大痛点：

- **SSL证书成本**：自定义域名HTTPS服务需单独购买证书
- **混合内容风险**：主站HTTPS页面加载HTTP资源触发安全警告

### 1.2 技术选型

通过CloudFlare Workers实现四大核心能力：

- **协议转换层**：将用户HTTPS请求转换为对七牛HTTP源站的请求
- **动态内容改写**：实时替换响应中的HTTP资源链接
- **全局缓存加速**：利用全球CDN节点提升访问速度
- **零运维成本**：无需维护服务器基础设施

## 二、原理说明

Cloudflare Worker 是一个无服务器计算平台，通过拦截请求并修改响应实现代理。核心思路是：

将用户 HTTPS 请求转发到原始 HTTP 站点。
修改响应头，强制 HTTPS 协议并修复混合内容问题。

## 三、操作步骤

### 1. 创建 Cloudflare Worker

- 登录 Cloudflare 控制台 → Workers & Pages → 创建新 Worker。
- 进入代码编辑界面。

### 2. 编写代理脚本

```Javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request)); 
});

async function handleRequest(request) {
  // 替换为你的 HTTP 源站地址 
  const originUrl = 'http://your-http-site.com'; 
  const url = new URL(request.url); 
  
  // 构建指向 HTTP 源站的新请求 
  const newRequest = new Request(originUrl + url.pathname  + url.search,  {
    headers: request.headers, 
    method: request.method, 
    body: request.body  
  });

  // 发送请求并获取响应 
  const response = await fetch(newRequest);
  
  // 修改响应头强制 HTTPS 
  const modifiedHeaders = new Headers(response.headers); 
  modifiedHeaders.set('Content-Security-Policy',  "upgrade-insecure-requests");
  modifiedHeaders.delete('Content-Security-Policy-Report-Only'); 

  // 返回处理后的响应 
  return new Response(response.body,  {
    status: response.status, 
    headers: modifiedHeaders 
  });
}

```

### 3. 部署并配置路由

1. 点击 Deploy 部署 Worker。
2. 在 Worker 设置中绑定自定义域名（如 <https://proxy.your-domain.com> ）。

### 4. 调整 SSL/TLS 模式

1. 进入 Cloudflare 域名控制台 → SSL/TLS → 概述。
2. 选择 Flexible 模式（允许 Cloudflare 通过 HTTPS 连接用户，但到源站使用 HTTP）。
