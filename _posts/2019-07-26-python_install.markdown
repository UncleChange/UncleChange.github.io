---
title: python包安装小贴士
layout: post
guid: urn:uuid:3ef3410k-8cf3-410b-a550-c512c9af8b8a2
tags:
  - python
  - 作业	
  - hive
  - mysql
---



关于Python，由于他的灵活易用性与丰富的工具包得以广泛使用，现在大热。但是正是由于他的包很多是第三方开发，依赖c或者c++库，所以有些包对于window不友好，而有些包依赖需要特别注意。今天我就针对Hive和Mysql的python客户端安装进行一些简单梳理包括其连接原理，算是小贴士吧。

## Hive

一般的包安装只需要使用pip工具进行pip install就可以了，但是有些包需要隐藏的依赖需要注意，比如hive 对于thrift-sasl包的依赖。

HiveServer2为客户端在远程执行hive查询提供了接口，就是通过Thrift RPC来实现，还提供了多用户并发和认证功能。而thrift-sasl正是负责Thrift RPC的连接安全，所以无论你用的是pyhive 还是impala.dbapi包都需要安装thrift与thrift-sasl包进行辅助：

```
pip install sasl
pip install thrift
pip install thrift-sasl==0.2.1
```

但是如果你的linux环境没有不完整的话执行脚本还是会报错，这里我给出其中主要依赖包，根据报错有选择性的安装：

```
sudo yum install gcc-c++ python-devel.x86_64 cyrus-sasl-devel.x86_64
sudo yum install libffi-devel;
sudo yum install libgsasl-devel;
sudo yum install libmemcached-devel;
sudo yum install cyrus-sasl-plain  cyrus-sasl-devel  cyrus-sasl-gssapi;
```

好了，这样你终于能执行你的hive sql了!

## Mysql

Python-MySQL的连接方式在菜鸟教程有很好的说明，见：[Python 操作 MySQL 数据库]( https://www.runoob.com/python/python-mysql.html)。

linux中需要注意的是需要安装mysql-devel才能使用MySQLdb库：

```
sudo yum install python-devel mysql-devel
```

但是由于Python-MySQL年久失修，在windows下安装一切好像都没有那么美好。但是好在我们有很多第三方库
**LFD** 请见：[Python扩展包的非官方Windows二进制文件LFD](https://www.lfd.uci.edu/~gohlke/pythonlibs/#gevent)



之前用pip install安装python库时，时不时会出现需要一些依赖库的无奈错误，解决方法就是使用这个封装好的库
我切到它的主页，看到它的解释是“A NIH research center for biomedical fluorescence spectroscopy at the University of California, Irvine”，是美国国立卫生研究院设在加利福尼亚州大学生物医学荧光光谱学的研究中心的网址，好大学就是好大学……
在上面的网址搜到你需要的python库的.whl文件，然后在cmd下cd到此文件的目录下并按照pip install xxxx.whl的格式安装即可，xxxx.whl1就是你下载的文件的名称。

*提示一下，别把它放在有中文的目录下，不然会报错*

我们还有更好的选择**PyMysql**

Python-MySQL资格最老，核心由C语言打造，接口精炼，性能最棒，缺点是环境依赖较多，安装复杂，近两年已停止更新，只支持Python2，不支持Python3。

PyMySQL为替代Python-MySQL而生，纯python打造，接口与Python-MySQL兼容，安装方便，支持Python3。

仅仅需要：

```
pip install pymysql
```

