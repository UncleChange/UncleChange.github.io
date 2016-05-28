---
title: PLSQL 链接oracle时的中文乱码问题
layout: post
guid: urn:uuid:3ef3410k-8cf3-410b-a55r-c512c9af8b8a2
tags:
  - oracle
---

项目中用到了64位oracle，但是当时本地用的是32位PLSQL，因此PLSQL中一直显示的中文都是乱码，开始以为是数据库问题，后经查证数据库没有问题，网上搜了一下午，终于得到答案了。原来需要在PLSQL文件夹中新建一个bat文件，内容如下
 
 其中path 是oracle客户端应用的地址

    @echo off 
    set path=G:\app\Administrator\product\11.2.0\client_1
    set ORACLE_HOME=G:\app\Administrator\product\11.2.0\client_1
    set TNS_ADMIN=G:\app\Administrator\product\11.2.0\client_1
    set NLS_LANG=SIMPLIFIED CHINESE_CHINA.ZHS16GBK
    start plsqldev.exe


放到PLSQL文件夹下即可，名称随意，以后启动PLSQL就需要通过这个bat文件来启动了。强制修改运行环境变量，系统不兼容导致运行环境不会根据注册表和环境变量的值变化。

*补充：下面再附上一些修改oracle客户端编码集的方法，（不建议修改服务端编码集）*

###首先是查询字符集：

* 数据库服务器字符集 


        select * from nls_database_parameters 


来源于props$，是表示数据库的字符集。 

* 客户端字符集环境 


        select * from nls_instance_parameters 


其来源于v$parameter，表示客户端的字符集的设置，可能是参数文件，环境变量或者是注册表

* 会话字符集环境 


        select * from nls_session_parameters 


来源于v$nls_parameters，表示会话自己的设置，可能是会话的环境变量或者是alter session完成，如果会话没有特殊的设置，将与nls_instance_parameters一致。 

* 客户端的字符集要求与服务器一致，才能正确显示数据库的非Ascii字符。如果多个设置存在的时候，alter session>环境变量>注册表>参数文件 

字符集要求一致，但是语言设置却可以不同，语言设置建议用英文。如字符集是zhs16gbk，则nls_lang可以是American_America.zhs16gbk。 

###修改客户端编码集

* 在Windows环境下有两种方式 

修改环境变量和修改注册表

新增环境变量 

    NLS_LANG=SIMPLIFIED CHINESE_CHINA.ZHS16GBK  


或者修改注册表 HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraDb10g_home1  
（其中home名 KEY_OraDb10g_home1 会根据安装目标不同而不同，找到自己的oracle安装目录）

修改 键 NLS_LANG 为数据库查出来的服务器字符集

* 在unix平台下，就是环境变量NLS_LANG。 

        $echo $NLS_LANG 
        AMERICAN_AMERICA.ZHS16GBK 

