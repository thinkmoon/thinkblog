---
title: 进化版的Server酱——PushBear
date: '2019-10-28 17:16:07'
modified: '2019-10-28 17:16:07'
category: 学习笔记
tags:
- 软件推荐
---

一个利用PHP群发微信消息的工具。上一篇讲到了如何用Server酱推送消息到个人微信，这篇我们一起来了解一下Server酱的进化版——pushbear，一对多微信消息推送
<!-- more -->
### Server酱的局限
- ==首先这里的SCKEY与userID只是简单的一对一的关系，但其实如果做成一对多更好。因为这样便可以群发通知 #801400==
- ==她这儿的的分享链接里面包含了很多个人敏感的信息，而其实这在微信的标准里面是不安全的。 #801900==

### 老规矩，PushBear官网([https://pushbear.ftqq.com/admin/#/][1])

![PushBear][2]

### 使用流程

1.使用微信扫码登录网站

![扫码登录][3]

> 这个比Server好的地方就是它不需要使用github账号登录了，直接扫码即可。

2.新建通道

![新建通道][4]

> 这里的通道的意思你可以把它，看作一个群。每一个通道负责群发消息到绑定这个管道 的微信。

3.绑定用户到通道

![绑定用户][5]

> 这个也特别的方便，直接扫描订阅二维码即可

4.发送测试消息

![发送测试消息][6]

> 打开测试表单啦，然后测试

![测试表单][7]

5.使用PHP群发消息到微信

一个函数就可以了，



``` php5
function weixin_notify($header,$content){
    $SENDKEY = "1218-f6*************0b98d0a2e10fdd2";//微信通知KEY
    file_get_contents('https://pushbear.ftqq.com/sub?sendkey='.$SENDKEY.'&text='.urlencode($header).'&desp='.urlencode($content));
}
```
6.效果展示

![预览消息][8]

![消息内容][9]

### 总结
> 原理什么的，这次就不解释了，上一篇已经解释过了。

现在我们已经可以利用Server酱发送服务器报警消息至开发者微信。
然后再利用PushBear群发业务消息到用户微信。完美对接业务以及管理逻辑。
是不感觉特别的方便？


  [1]: https://pushbear.ftqq.com/admin/#/
  [2]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509353273542.jpg
  [3]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509353583536.jpg
  [4]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509353779939.jpg
  [5]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509353872869.jpg
  [6]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509353979228.jpg
  [7]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509354217642.jpg
  [8]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509354665128.jpg
  [9]: https://blog.cdn.thinkmoon.cn/%E5%B0%8F%E4%B9%A6%E5%8C%A0/1509354685511.jpg
