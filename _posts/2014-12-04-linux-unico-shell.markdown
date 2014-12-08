---
title: linux上文件整理心得（含shell脚本）
layout: post
guid: urn:uuid:1ef3450f-8cf3-410b-a55b-c512c9af8b2a
tags:
  - linux
  - shell
  - 文件
---

####linux运维需要经验积累与实践磨练，使用心得的整理与记录是相当重要的部分
最近遇到一个运维问题，关于文件的分类整理。
其实说起来也简单，就是把一个文件夹下的大量文件分别整理到他们创建日期命名的文件夹下。
但是由于文件数量巨大找不到更好的解决方法，决定采用shell脚本，但是结果还是失败了。文件量过于巨大，导致脚本运行卡死。
这个思维过程还是值得借鉴的。

过程中发现shell脚本语法相当的严格，尤其是对于空格和换行符；
比如再for循环中的参数、括号之间的空格需要注意，很容易就少了空格报错造成运行失败，这样的错误还是最不好查的那种；
再比如换行符，必须是 \n。而我们在windows环境下的编辑器很有可能出现ctrl+\n或者\r的换行符。
所以 *建议直接使用vi编辑器编码* ，如果在windows上编辑的建议复制到linux环境下的编辑器中，直接使用SSH拖文件容易产生问题。

* 首先是查看文件夹内文件总数的shell命令

	ls -l |grep "^-"|wc -l
	或
	find ./company -type f | wc -l
	查看某文件夹下文件的个数，包括子文件夹里的。
	ls -lR|grep "^-"|wc -l
	查看某文件夹下文件夹的个数，包括子文件夹里的。
	ls -lR|grep "^d"|wc -l
	说明：
	ls -l
	长列表输出该目录下文件信息(注意这里的文件，不同于一般的文件，可能是目录、链接、设备文件等)
	grep "^-"
	这里将长列表输出信息过滤一部分，只保留一般文件，如果只保留目录就是 ^d
	wc -l
	统计输出信息的行数，因为已经过滤得只剩一般文件了，所以统计结果就是一般文件信息的行数，又由于
	一行信息对应一个文件，所以也就是文件的个数。
	 
	Linux查看文件夹大小
	du -sh 查看当前文件夹大小

	du -sh * | sort -n 统计当前文件夹(目录)大小，并按文件大小排序

	du -sk filename 查看指定文件大小

* 其次是获取文件属性
文件属性需要截取stat命令打印出的信息

	stat $file | grep Modify | awk '{print $2}'|cut -b 1-4

###下面是完整的代码，检索脚本所在目录
	
	export HOME='/home/sybase'


	filelist=.
	list=`ls $fileist`

	for file in $list
	do
	  if [ ! -d $filelist"/"$file ];
	  then
	     echo $file
	     y=`stat $file | grep Modify | awk '{print $2}'|cut -b 1-4`
	     m=`stat $file | grep Modify | awk '{print $2}'|cut -b 6-7`
	     d=`stat $file | grep Modify | awk '{print $2}'|cut -b 9-10`

	    if [ ! -e $filelist"/"$y ] || [ ! -d $filelist"/"$y ]; then
	      `mkdir $filelist"/"$y`
	    fi
	    if [ ! -e $filelist"/"$y"/"$m ] || [ ! -d $filelist"/"$y"/"$m ]; then
	      `mkdir $filelist"/"$y"/"$m`

	    fi
	    if [ ! -e $filelist"/"$y"/"$m"/"$d ] || [ ! -d $filelist"/"$y"/"$m"/"$d ]; then
	      `mkdir $filelist"/"$y"/"$m"/"$d`
	    fi
	    `mv $filelist"/"$file $filelist"/"$y"/"$m"/"$d"/"`

	  fi

	done
	exit

*注意引入本地环境变量export HOME='/home/sybase'*
