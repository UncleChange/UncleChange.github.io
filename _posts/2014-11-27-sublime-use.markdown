---
title:  Sublime Text 2 爱我就来摸摸我（使用篇）
layout: post
guid: urn:uuid:0ef3450f-8cf3-410b-a55b-c512c9af8b2d
tags:
  - sublime
  - 编辑器
  - code
---

上一篇讲述sublime及其插件的安装要领与窍门，这篇将列出一些使用技巧与快捷键。
###常用快捷键速查：
	
	F7 或 Ctrl+B                      运行当前文件，ruby文件可以直接运行。
	Ctrl+R                               方法定位
	Ctrl+P                               文件定位
	Ctrl+Shift+P                        命令定位
	Tab                                  自动补全
	Alt+Shift+1                        打开一个视图
	Alt+Shift+2                        打开二个垂直视图
	Alt+Shift+3                        打开三个垂直视图
	Alt+Shift+8                        打开两个水平视图
	Ctrl+L                                选择整行(按住-继续选择下行)
	Ctrl+KK                              从光标处删除至行尾
	Ctrl+Shift+K                       删除整行
	Ctrl+Shift+D                       复制光标所在整行，插入在该行之前
	Ctrl+J                                合并行(已选择需要合并的多行时)
	Ctrl+KU                             改为大写
	Ctrl+KL                              改为小写
	Ctrl+D                               选词(按住-继续选择下个相同的字符串)
	Ctrl+M                              光标移动至括号内开始或结束的位置
	Ctrl+Shift+M                      选择括号内的内容(按住-继续选择父括号)
	Ctrl+/                               注释整行(如已选择内容，同“Ctrl+Shift+/”效果)
	Ctrl+Shift+/                       注释已选择内容
	Ctrl+Space                        自动完成(win与系统快捷键冲突，需修改)
	Ctrl+Z                              撤销
	Ctrl+Y                              恢复撤销
	Ctrl+Shift+V                      粘贴并自动缩进(粘贴尽量使用这个，自动缩进)
	Alt+.                                闭合当前标签
	Ctrl+Shift+A                      选择光标位置父标签对儿
	Ctrl+Shift+[                       折叠选中代码
	Ctrl+Shift+]                       展开选中代码
	Ctrl+KT                             折叠属性(是属性，标签内的id，class等)
	Ctrl+K0                             展开所有折叠(是0-零不是O)
	Ctrl+U                               软撤销
	Ctrl+T                              词互换(选中多个词，按顺序互相交换)
	Ctrl+Enter                         插入行后
	Ctrl+Shift Enter                  插入行前
	Ctrl+K Backspace                从光标处删除至行首
	Ctrl+Shift+UP                     与上行互换
	Ctrl+Shift+DOWN                与下行互换
	Shift+Tab                          去除缩进
	Tab                                   缩进
	F9                                     行排序(按a-z)

      vim模式下部分快捷键
       H                                      左
       J                                       下
       K                                      上
       L                                       右
       A                                      光标后插入
       Shift+A                              行尾插入
       I                                       光标钱插入
       Shift+I                               行首插入
       O                                      光标下一行插入新行
       Shift+O                              光标上一行插入新行
       S                                       删除当前字符并插入
       Shift+S                               删除当前行并插入
       CC                                     删除当前行并插入
       DD                                     删除当前行，3DD，删除当前行开始向后共3行
       W                                      光标移到下个词首
       Shift+W                              光标移动到下个词组首字母（忽略.()[]{}''""等）
       B                                       光标移到上一个词首
       Shift+B                               光标移动到上个词组首字母（忽略.()[]{}''""等）
       E                                       光标移到下个词尾
       Shift+E                               光标移动到下个词组尾字母（忽略.()[]{}''""等）
       X                                       删除当前光标字符，3X，删除当前光标开始向后共3个字符
       Shift+X                               删除光标前一个字符，3Shift+X，删除当前光标开始向前共3个字符
       Ctrl+X                                删除当前行
       Shift+J                               将下一行提到当前行
       R                                       替换字符
       YY                                     复制当前行
       P                                       光标下一行插入复制内容
       Shift+P                               光标上一行插入复制内容
       V                                       当前字符选中
       Shift+V                               当前行选中
       Shift+>>                            缩进
       Shift+<<                            去缩进

###vim模式开启及设置
       //激活VIM模式,默认值为 "Vintage"
       "ignored_packages":[],
       //定义软件打开时为VIM的命令模式
       "vintage_start_in_command_mode": true,
       //开启当前行高亮
       "highlight_line": true,

###动画演示快捷键

* 获取已保存项目
		
		Mac OS X:
		CMD+CTRL+P
		Windows/Linux:
		ALT+CTRL+P
![](/media/files/2014/11/27/1.jpeg)

* 搜索打开的文件

		Mac OS X:
		CMD+P
		Windows/Linux:
		CTRL+P
![](/media/files/2014/11/27/2.png)

* 标签控制

		Mac OS X:
		CMD+2- 添加2个标签
		CMD+3- 添加3个标签
		CMD+4- 添加4个标签，依此类推
![](/media/files/2014/11/27/3.gif)
	
	* CMD + ALT + 左箭头 - 上一个标签
	
	* CMD + ALT + 右箭头 - 下一个标签
![](/media/files/2014/11/27/4.gif)

	* Windows/Linux:
		alt+1 选择标签1
		alt+2 选择标签2
		alt+3 选择标签3
		以此类推。。。

* 选择相同内容（一行接一行）

		Mac OS X:
		CMD + D
		Windows/Linux:
		Ctrl + D
![](/media/files/2014/11/27/5.gif)

* 选择相同内容（一次性选中全部）

		Mac OS X:
		CMD+CTRL+G
		Windows/Linux:
		ALT+F3
![](/media/files/2014/11/27/6.gif)

* 按行选择

		Mac OS X:
		CMD+L
		Windows/Linux:
		CTRL+L
![](/media/files/2014/11/27/7.gif)

* 选择全部子元素

		Mac OS X:
		CMD + SHIFT + J
		Windows/Linux:
		未知
![](/media/files/2014/11/27/8.gif)

* 跳转到函数

		Mac OS X:
		CMD + R
		Windows/Linux:
		未知
![](/media/files/2014/11/27/9.gif)

* 复制当前行

		Mac OS X:
		CMD+SHIFT+D
		Windows/Linux:
		CTRL + SHIFT + D
![](/media/files/2014/11/27/10.gif)

* 上下移动当前行位置

		Mac OS X:
		CMD+CTRL+↓或CMD+CTRL+↑上下移动当前行。
		Windows/Linux:
		CTRL+SHIFT+↓或CTRL+SHIFT+↑上下移动当前行。

![](/media/files/2014/11/27/11.gif)

* 关闭当前HTML标签

		Mac OS X:
		CMD + ALT + .
		Windows/Linux:
		ALT + .
![](/media/files/2014/11/27/12.gif)

* 隐藏、显示侧边栏

		Mac OS X:
		CMD+K+B
		Windows/Linux:
		CTRL+K+B
![](/media/files/2014/11/27/13.gif)

* 多个光标（方法一）

		Mac OS X:
		按住CMD键，在需要放光标的位置点击鼠标左键
		Windows/Linux:
		按住Ctrl键，在需要放光标的位置点击鼠标左键
![](/media/files/2014/11/27/14.gif)




