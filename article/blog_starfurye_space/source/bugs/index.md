---
title: Xuanlogy玄学
date: 2020-05-27 22:42:14
---

本文用来记录一些平时捣鼓各种技术时遇到的坑（至少在里面挣扎2h），由于这些问题都比较复杂或者我懒得去调查，虽然鬼使神差地解决了，也许掉进了更大的坑也说不定，以后有空（？）再做研究。

## Manjaro Nginx php解析


我日常使用的操作系统为 Windows10+Manjaro(dual boot)，另外还有一个备用的OS X。平时在一些云服务器（Ubuntu）上配置LNMP或者LAMP也没碰到什么困难，但有一次我想在本地解析一些php网页，于是还是按以前的方法一通操作，结果HTML页面可以解析，但php文件无法解析。

首先问题一定处在php-fpm上，于是到处搜索，终于在[这个](https://segmentfault.com/q/1010000007300680)网页上获得了一些灵感。其实中文互联网上大部分用的都是CentOS，Manjaro的`www.conf`之类的文件存放位置和CentOS存在细微的区别，我的系统在`/etc/php/php-fpm.d/www.conf`下。将`;listen = /var/run/php5-fpm.sock`改成`listen = 127.0.0.1:9000`即可。
