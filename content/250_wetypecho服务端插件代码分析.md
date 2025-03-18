---
title: wetypecho服务端插件代码分析
date: ''
modified: ''
category: 源码解剖
tags:
- 博客
---

## 引言
我在很久之前就想研究这个项目，然后再进行些自定义的修改了。就以本文作为笔记开始吧。
## 项目目录树
```
.
├── Action.php
├── Plugin.php
├── Users.php
├── res //一些图片资源
│   ├── cvbg.jpeg
│   ├── cvborder.jpeg
│   ├── resend.png
│   └── test.bin
├── sql // 创建了两个数据库
│   ├── wetypecho.sql
│   └── wetypecholike.sql
└── tree.txt
```
## 查看数据库结构
> wetypecho.sql
```
CREATE TABLE `typecho_wetypecho` (
  `id`                int(10) unsigned NOT NULL auto_increment,
  `openid`            varchar(255)     default ''  ,
  `createtime`        int(10)          default 0   ,
  `lastlogin`         int(10)          default 0   ,
  `nickname`          varchar(255)     default ''  ,
  `avatarUrl`         varchar(255)      default ''  ,
  `city`              varchar(255)      default ''  ,
  `country`           varchar(255)      default ''  ,
  `gender`            varchar(255)      default ''  ,
  `province`          varchar(255)     default ''  ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
看内容可以推测，这是微信用户数据表。
> wetypecholike.sql
```
CREATE TABLE `typecho_wetypecholike` (
  `id`                int(10) unsigned NOT NULL auto_increment,
  `openid`            varchar(255)     default ''  ,
  `cid`               int(10)          default 0   ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
这应该是个微信点赞表

## php代码分析
激活进行的初始化操作代码
```
Helper::addRoute('jsonp', '/api/[type]', 'WeTypecho_Action');
        Helper::addAction('json', 'WeTypecho_Action');
        Helper::removePanel(1, 'WeTypecho/users.php');
        Helper::addPanel(1, 'WeTypecho/Users.php', 'WeTypecho', '我的用户', 'administrator');
        $db = Typecho_Db::get();
        $prefix = $db->getPrefix();
        Typecho_Plugin::factory('Widget_Archive')->beforeRender = array('WeTypecho_Plugin','view_count');
        //创建用户数据库
        $scripts = file_get_contents('usr/plugins/WeTypecho/sql/wetypecho.sql');
        $scripts = str_replace('typecho_', $prefix, $scripts);
        $scripts = explode(';', $scripts);
        try {
            if (!$db->fetchRow($db->query("SHOW TABLES LIKE '{$prefix}wetypecho';", Typecho_Db::READ))) {
                foreach ($scripts as $script) {
                    $script = trim($script);
                    if ($script) {
                        $db->query($script, Typecho_Db::WRITE);
                    }
                }
            }
        } catch (Typecho_Db_Exception $e) {
            throw new Typecho_Plugin_Exception(_t('数据表建立失败，插件启用失败，错误信息：%s。', $e->getMessage()));
        } catch (Exception $e) {
            throw new Typecho_Plugin_Exception($e->getMessage());
        }
        //创建赞数据库
        $scriptslike = file_get_contents('usr/plugins/WeTypecho/sql/wetypecholike.sql');
        $scriptslike = str_replace('typecho_', $prefix, $scriptslike);
        $scriptslike = explode(';', $scriptslike);
        try {
            if (!$db->fetchRow($db->query("SHOW TABLES LIKE '{$prefix}wetypecholike';", Typecho_Db::READ))) {
                foreach ($scriptslike as $script) {
                    $script = trim($script);
                    if ($script) {
                        $db->query($script, Typecho_Db::WRITE);
                    }
                }
            }
        } catch (Typecho_Db_Exception $e) {
            throw new Typecho_Plugin_Exception(_t('数据表建立失败，插件启用失败，错误信息：%s。', $e->getMessage()));
        } catch (Exception $e) {
            throw new Typecho_Plugin_Exception($e->getMessage());
        }
        //创建赞数据库
        try {
            //增加点赞和阅读量
            if (!array_key_exists('views', $db->fetchRow($db->select()->from('table.contents'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'contents` ADD `views` INT DEFAULT 0;'
                );
            }
            if (!array_key_exists('likes', $db->fetchRow($db->select()->from('table.contents'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'contents` ADD `likes` INT DEFAULT 0;'
                );
            }
            if (!array_key_exists('authorImg', $db->fetchRow($db->select()->from('table.comments'))))
            {
                $db->query(
                    'ALTER TABLE `' . $prefix
                    . 'comments` ADD `authorImg` varchar(500) DEFAULT NULL;'
                );
            }
        } catch (Exception $e) {
            echo($e->getMessage());
        }
```


