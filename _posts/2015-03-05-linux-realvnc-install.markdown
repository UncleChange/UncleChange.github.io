---
title: redhat下安装realvnc
layout: post
guid: urn:uuid:3ef3450k-8cf3-410b-a55b-c512c9af8b2a1
tags:
  - linux
  - vnc
---

###今天安装了realvnc，使用的系统是64位redhat。
在这里写下安装的步骤，供大家参考。

* 1、从官网下载源码包，www.realvnc.com。在这里选择相应的源码包进行下载。我下载的是VNC-5.2.2-Linux-x64-ANY.tar.gz。

* 2、解压该源码包，使用命令: 

     tar -zxvf VNC-5.2.2-Linux-x64-ANY.tar.gz

* 3、进入到刚解压到的安装目录（用cd VNC-5.2.2-Linux-x64/ 命令），使用如下的命令进行安装：
	
	./vncinstall /usr/local/bin/

* 4、运行命令vnserver，可能会出现如下的错误：

		VNC(R) Server 5.2.2 (r7974) 64-bit (Nov 28 2014 14:43:49)
		Copyright (C) 2002-2014 RealVNC Ltd.
		VNC is a registered trademark of RealVNC Ltd in the U.S. and in other
		countries.
		Protected by UK patent 2481870; US patent 8760366.
		See http://www.realvnc.com for information on VNC.
		For third party acknowledgements see:
		http://www.realvnc.com/products/vnc/documentation/5.2/acknowledgements.txt

		Error: No license keys found.
		Run vnclicense to apply a license key. [NoLicense]

	这里的错误是说，缺少通行证，可以在网上随便找个。这里我使用的是：WHJRK-UXY7V-Q34M9-CZU8L-8KGFA。
	使用如下的命令进行通行证的添加：

		vnclicense -add WHJRK-UXY7V-Q34M9-CZU8L-8KGFA

* 5、添加完通行证后，再次执行: vncserver，可能会出现如下问题：

		VNC(R) Server 5.2.2 (r7974) 64-bit (Nov 28 2014 14:43:49)
		Copyright (C) 2002-2014 RealVNC Ltd.
		VNC is a registered trademark of RealVNC Ltd in the U.S. and in other
		countries.
		Protected by UK patent 2481870; US patent 8760366.
		See http://www.realvnc.com for information on VNC.
		For third party acknowledgements see:
		http://www.realvnc.com/products/vnc/documentation/5.2/acknowledgements.txt

		xauth: (argv):1:  bad display name "linux-o70w:2" in "add" command
		Error: could not run xauth

	主要是下面两句，在网上找了很久，都说在网上查资料发现这个错误是由于/etc/hosts文件中缺少配置造成的，应该在/etc/hosts文件中添加一句127.0.0.1 localhost的语句在最后。但当我打开该文件时，发现里面已经有这句了。通过向实验室的另一个人请教，他告诉了我如下可行方法。
	注意到上述错误中，我设置成红色的部分（linux-o70w:2），这里有linux-o70w，将linux-o70w添加到//etc/hosts中，方法如下：
	打开/etc/hosts文件，在其中添加下面这句，根据你的错误对linux-o70w进行相应的修改：
	127.0.0.1       linux-o70w
	下面是我的/etc/hosts的文件内容，我只在里面加了一行：127.0.0.1       linux-o70w
	
		#
		# hosts         This file describes a number of hostname-to-address
		#               mappings for the TCP/IP subsystem.  It is mostly
		#               used at boot time, when no name servers are running.
		#               On small systems, this file can be used instead of a
		#               "named" name server.
		# Syntax:
		#    
		# IP-Address  Full-Qualified-Hostname  Short-Hostname
		#

		127.0.0.1       localhost
		127.0.0.1       linux-o70w
		# special IPv6 addresses
		::1             localhost ipv6-localhost ipv6-loopback

		fe00::0         ipv6-localnet

		ff00::0         ipv6-mcastprefix
		ff02::1         ipv6-allnodes
		ff02::2         ipv6-allrouters
		ff02::3         ipv6-allhosts
		211.69.192.12  hust hust

* 6、再次输入vncserver命令，出现以下类似输出说明是对的：

		VNC(R) Server 5.2.2 (r7974) 64-bit (Nov 28 2014 14:43:49)
		Copyright (C) 2002-2014 RealVNC Ltd.
		VNC is a registered trademark of RealVNC Ltd in the U.S. and in other
		countries.
		Protected by UK patent 2481870; US patent 8760366.
		See http://www.realvnc.com for information on VNC.
		For third party acknowledgements see:
		http://www.realvnc.com/products/vnc/documentation/5.2/acknowledgements.txt

		If a desktop environment fails to load for this virtual desktop, please see:
		http://www.realvnc.com/kb-345
		Running applications in /root/.vnc/xstartup

		VNC Server catchphrase: "Flute recycle Oliver. Forward detect penguin."
		             signature: 17-4e-07-97-3f-26-02-57

		Log file is /root/.vnc/linux-o70w:2.log
		New desktop is linux-o70w:2 (211.69.192.12:2)

	*注意红色部分，它是进行远程登录时所会用到的IP和端口。*

* 7、使用vncviewert，连接到远程控制服务器。
	假设，另外一台电脑已经装有vncviewet，上述安装vnc的方法，会同时安装vncserver和vncviewer。使用下面的命令连接远程的电脑：
	命令行输入：vncviewer
	在弹出的 窗口：VNC Server一栏中输入上述红色部分：211.69.192.12:2
	单击connect，在弹出框中输入远程主机的用户名和密码即可。