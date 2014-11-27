---
title:  Sublime Text 2 爱我就来摸摸我（安装篇）
layout: post
guid: urn:uuid:2ef3450f-8cf3-410b-a55b-c512c9af8b2d
tags:
  - sublime
  - 编辑器
  - code
---

编码需要良好的心情，然而使用一款赏心悦目功能强大的编辑器是提高我们软件工程师心情的一大利器。
sublime就曾给我愉悦的编码体验。
![](/media/files/2014/11/27/main.png)
**下面我将详诉如何安装并使你的sublime功能利用最大化。**

[sublime2官网地址](http://www.sublimetext.com/2)

相信很多人都在用，所以具体介绍我就不说，网上一搜，很多人都有详细介绍，功能很是强大，插件众多。
##安装技巧：
安装完sublime text2，在第一次运行的时候，sublime text2 会在%appdata%目录下生成一个Sublime Text 2的文件夹，用于存放配置文件，以及后面安装的各种插件(所以第一次打开sublime text2时会比较慢)。

###基本设置

要做的第一件事情就是把这个文件移动安装目录，便于设置完后打包。

* 第一步：安装完sublime text2后，不要直接运行。
	>找到sublime text2的安装目录，并在该目录下新建 Data 文件夹(注意大小写)。如果已经运行了，请先在地址栏输入 %appdata%  然后删除该目录下的sublime text2文件夹。
	>完成这一步之后再打开sublime text2所有的配置文件都会被生成在Data文件夹中了。
* 第二步：安装你需要的插件
	>这就没什么好说的了，还是默认的安装方式。安装后的插件可以在sublime text2安装目录下的 Data/Packages下找到。
* 第三步：打包sublime text2文件夹
	>打包的文件就可以在其他电脑上直接使用了。
  
###安装插件：
  
  1. 直接安装
  		安装Sublime text 2插件很方便，可以直接下载安装包解压缩到Packages目录（菜单->preferences->packages）。
  2. 使用Package Control组件安装，也可以安装package control组件，然后直接在线安装：
  按Ctrl+`调出console，粘贴以下代码到底部命令行并回车：
  		
  		import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
  
  重启Sublime Text 2。
  如果在Perferences->package settings中看到package control这一项，则安装成功。

  推荐插件：
	  1. Bracket Highlighter        高亮括号引号
	  2. ZenCoding                    快速编写，现已更名Emmet，功能更强大
	  3. ConvertToUTF8             转UTF-8
	  4. CSScomb                      css排序
	  5. jQuery                          这个不用说了吧
	  6. JsFormat                       js格式化
	  7. Package Control             在线安装插件
	  8. Tag                              html格式化
	  9. Toggle Css Format          单行多行切换
	  10. Winless-build                  less编译
###解决Sublime Text 2与zencoding的Tab补全冲突：

1. 复制Key Bindings - Default

		{ "keys": ["ctrl+space"], "command": "auto_complete" },
		{ "keys": ["ctrl+space"], "command": "replace_completion_with_auto_complete", "context":
		  [
		      { "key": "last_command", "operator": "equal", "operand": "insert_best_completion" },
		      { "key": "auto_complete_visible", "operator": "equal", "operand": false },
		      { "key": "setting.tab_completion", "operator": "equal", "operand": true }
		  ]
		}

粘贴到Key Bindings - User（最后一个花括号后面不要加逗号，保存会出错）
把ctrl+space改为alt+space。

2. 在Settings - User中加入：
	
	"auto_complete": false

说明：默认不自动提示，Tab键盘用作zencoding展开，需要提示按下alt+space。

###让Sublime Text2支持浏览器中预览：

1. 点击菜单Tools -> New Plugin...，在创建好的py文件输入下列内
  		
  		import sublime, sublime_plugin
		import webbrowser

		url_map = {
		  '/Users/jerry/Sites/test/' : 'http://test/',
		}

		class OpenBrowserCommand(sublime_plugin.TextCommand):
		  def run(self,edit):
		      window = sublime.active_window()
		      window.run_command('save')
		      url = self.view.file_name()
		      for path, domain in url_map.items():
		          if url.startswith(path):
		              url = url.replace(path, domain).replace('\\', '\/')
		              break

		      webbrowser.open_new(url)

  将文件保存到Packages/User目录（Packages可通过菜单里的Browser Packages...打开），文件名随意，如open_browser.py。插件部分完工了。

2. 接下来，为刚才的插件分配快捷键。
点菜单Tools -> Command Palette...，或者shift+cmd+p，打开命令集，选择“key Bindings - User”，打开个人快捷键配置，输入下列内容：
	
		[{ "keys": ["ctrl+shift+b"], "command": "open_browser" }]

*PS：如果要指定用什么浏览器预览，也可以将最后一行代码改成这样：*
	
	webbrowser.get('safari').open_new(url)

###sublime text 2 插件CSScomb给css属性进行排序：

CSScomb运行需要php环境，本机安装php-study或者php-now一键安装包即可，需要设置环境变量才能用，在系统变量Path中加上php程序目录即可。
下面是截图，原先做的笔记，找不到地址了，原创作者如果觉得侵权跟我说下哈，我删掉，呵呵~~
![](/media/files/2014/11/27/path1.jpeg)
![](/media/files/2014/11/27/wphp.jpeg)

###sublime text 2 支持winless编译并着色使用zencoding：

1.安装LESS着色插件——LESS(less着色只针对less文件，如果使用zencoding按第三步设置的话，less文件被当做css文件，着色也就按css，less无效，less文件和css文件大致相似)
2.集成winless，此集成winless在f7运行后，会把当前less文件所在的目录下的对所有less文件加入，新加后需打开刷新下，且目录文件夹名字不能为中文，否则无效。
下面这张是截图，原地址找不到了，我已经打包传到百度网盘，作者如果看到觉得侵权跟我说下哈，我删掉，呵呵~~
![](/media/files/2014/11/27/winless.jpeg)