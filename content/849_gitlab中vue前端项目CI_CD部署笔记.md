---
title: gitlab中vue前端项目CI/CD部署笔记
date: ''
modified: ''
category: 学习笔记
tags:
- gitlab
desc: 持续部署（continuous deployment）是持续交付的下一步，指的是代码通过评审以后，自动部署到生产环境。持续部署的目标是，代码在任何时刻都是可部署的，可以进入生产阶段。
thumb: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-22T06:04:52.png
---

## 持续集成

略

## Gitlab的持续集成

我们可以将整个运行机制，看作一个赏金猎人接任务，执行任务，并完成任务的过程。

### GitLab-CI

简单来说，这就是一个任务发布平台。运行在gitlab服务器，监听代码状态变化，并发布对应的任务。

### GitLab-Runner

而每个runner就是一位赏金猎人，是任务的执行者。

![2020-05-22T06:04:52.png][1]

### .gitlab-ci.yml

任务的发布者，规定什么时候触发任务，任务的具体内容。

## 配置流程

经过前面的解释，整个思路就很清晰了。我们需要做的有三件事。

1. 编写`.gitlab-ci.yml`文件，设置对应的任务
2. 部署Runner，激活赏金猎人
3. 配置ci，邀请赏金猎人加入系统

### 部署Runner

这一步需要一个服务器，能run起来赏金猎人。

#### 安装

请务必安装最新版，不然会出现很多未知的问题

1. 下载二进制文件
```bash
# Linux x86-64
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Linux x86
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-386

# Linux arm
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-arm

# Linux arm64
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-arm64
```

2. 授予执行权限

```bash
sudo chmod +x /usr/local/bin/gitlab-runner
```

3. Create a GitLab CI user:

```bash
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
```

4. Install and run as service:

```bash
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start
```

#### 加入任务系统

注册

```bash
sudo gitlab-runner register
```

然后就是一些简单的配置，配置完成后就将该Runner注册到任务发布平台了，然后就可以接任务了。详细见参考文献【1】


#### 编写.gitlab-ci.yml任务

本机部署版本
.gitlab-ci.yml
```yml
stages:
  - deploy

cache:
  paths:
    - node_modules/
    - public/

deployJob:
  stage: deploy 
  script:
    - npm install 
    - npm run build
    - rm -rf /home/data/three_miju_shopper_manager_system_front/*
    - cp -rf ./dist/* /home/data/three_miju_shopper_manager_system_front/
    - sh ./bot.sh ${CI_COMMIT_REF_SLUG} ${CI_COMMIT_SHA:0:8} ${CI_COMMIT_MESSAGE}
  tags:
    - shared_test_machine_runner
  only:
    - dev
```
这个版本具有企业微信群机器人推送功能，需要配置`./bot.sh`
```shell
#!/usr/bin/env bash
curl '群机器人地址' \
      -H 'Content-Type: application/json' \
      -d '
      {
        "msgtype": "markdown",
        "markdown": {
          "content": "商户端代码已更新，分支:'$1' 提交:'$2'
          更新：'$3'
          已发布，[点击测试](http://test.shop.gileey.cn)"
        }
      }'
```
远程推送版本
```shell
stages:
  - deploy

cache:
  paths:
    - node_modules/
    - public/

deployJob:
  stage: deploy 
  script:
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" >> ~/.ssh/id_dsa
    - chmod 600 ~/.ssh/id_dsa
    - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
    - rsync -avzu --progress ./dist/* root@thinkmoon.cn:/www/wwwroot/3ju.psyannabel.cn/
  tags:
    - shared_test_machine_runner
  only:
    - dev
```
该版本在gitlab-runner机器上执行编译等工作，编译完成后使用rsync同步到云服务器，需要配置私钥变量`$SSH_PRIVATE_KEY`

![2020-05-30T14:20:12.png][2]

## 遇到的问题

导入自定义组件时一直报错：`This dependency was not found:`

出现背景：由于以前命名组件是"clickImg",后改成"ClickImg",由于linux的区分大小写，所以会一直没找到。

解决方案：换个名字？？？

## 参考文献

1. [前端的gitlab的ci初尝试](https://juejin.im/post/5b03963a51882542821ca56a)
2. [Install GitLab Runner manually on GNU/Linux](https://docs.gitlab.com/runner/install/linux-manually.html)


  [1]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-22T06:04:52.png
  [2]: http://blog.cdn.thinkmoon.cn/blog/typecho/2020-05-30T14:20:12.png