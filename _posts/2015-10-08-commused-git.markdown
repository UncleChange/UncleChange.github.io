---
title: github常用命令
layout: post
guid: urn:uuid:3ef3410k-8cf3-410b-a55r-c512c9af8b2a2
tags:
  - github
---
*我们说说几个基本Github命令的使用。*


##git clone
*用于克隆代码到本地。*     

           git clone url —— 克隆url对应的项目到本地。
           git clone url folderName ——将url对应的项目克隆岛folderName文件夹

##git pull 

 Github支持协作代码开发管理,会经常遇到需要更新别人的代码或者在不同的电脑上更新自己的代码。那么使用git pull命令即可更新代码。git pull 可以接受很多中参数，详见常见具体的用法为：

       git pull—— 直接从远程主分支更新代码 , git pull 相当于git pull origin master

       git pull forkName branchName —— 从forkName对应的url更新branchName分支。

##git remote

*用于管理远程仓库。*


git remote —— 显示已经添加的远程仓库名称列表,当从远程地址上clone了一个项目时，会默认添加一个origin名字的仓库，对应clone时的url。等同于git remote show

    git remote show name —— 显示具体名字对应的仓库的信息。具体如下：      
	
		[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

	    * remote origin  
	      Fetch URL: https://github.com/gavincook/test.git  
	      Push  URL: https://github.com/gavincook/test.git  
	      HEAD branch: master  
	      Remote branch:  
	        master tracked  
	      Local branch configured for 'git pull':  
	        master merges with remote master  
	      Local ref configured for 'git push':  
	        master pushes to master (up to date)  


   git remote add name url —— 添加远程仓库。如：
	
	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    git remote add antstudio git@github.com:AntStudio/test.git  


   git remote rm name——  删除远程仓库在本地的映射。 如：

	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    git remote rm antstudio  


## git fetch
*用于更新代码*


和git pull 功能类似，但是有一些区别。git pull 更新完代码后会自动合并到当前分支，而git fetch不会合并。常见用法如下：

      git fetch origin master ——— 将分支代码更新到origin/master分支上
      git fetch forkName remoteBranchName:branchName ——— 将分支代码更新到branchName分支上

## git merge
*处理分支的合并。*

       git merge master —— 将主分支合并到当前分支。如果没有任何冲突则使用此命令即可。 

这里说下有冲突的情况，现在在两个分支都对同一个文件进行修改，在同一个文件中，如master分支添加“master commit”, test分支添加“test commit”. 然后将两个分支合并。在test分支合并主分支：git merge master.我们会看到如下的情况：

	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    Auto-merging test.txt  
    CONFLICT (content): Merge conflict in test.txt  
    Automatic merge failed; fix conflicts and then commit the result.  

	也就是说两个分支有冲突，那么我们可以按照以下步骤进行冲突的解决：

###首先把改动恢复到merge之前，因为目前的状态是：

       
	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    Unmerged paths:  
      (use "git add <file>..." to mark resolution)  
      
          both modified:      test.txt  

我们先添加改动到暂存区域，git add .,然后用git reset head -- .最后使用git checkout -- .取消改动。到这里，test就已经恢复到merge之前的状态

### 生成test分支相对于master的补丁

	git format-patch master

   使用这个命令后我们得到“0001-.test-commit.patch”，在项目的根目录下，
   我们将这个文件剪切到其他目录，比如D:/

### 切回出分支,git chekcout master。 
然后进行补丁修正，首先进行git am D:\0001-.test-commit.patch打补丁，如果没有冲突则此补丁修正成功，如果有冲突就会得到形如下面的结果：
	
	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片
    E:\workspace\github\test [master]> git am D:\0001-.test-commit.patch  
    Applying: .test commit  
     rror: patch failed: test.txt:1  
    error: test.txt: patch does not apply  
    Patch failed at 0001 .test commit  
    
    e:/workspace/github/test/.git/rebase-apply/patch 

                   esolved this problem, run "git am --resolved".  
    If you prefer to skip this patch, run "git am --skip" instead.  
    To restore the original branch and stop patching, run "git am --abort".  

	接着使用git apply --reject D:\0001-.test-commit.patch生成rej文件，来辅助我们解决冲突：

我们可以得到如下结果：

	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    E:\workspace\github\test [master]> git apply --reject D:\0001-.test-commit.patch  
      
    Checking patch test.txt...  
    error: while searching for:  
    Github test!  
    Hello Gavin.  
    error: patch failed: test.txt:1  
    Applying patch test.txt with 1 reject...  
    Rejected hunk #1.  
    E:\workspace\github\test [master +1 ~0 -0 !]>  


此时我们会发现在冲突文件同级目录下生成了一个rej文件，我们打开这个rej文件，可以看到：

	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    diff a/test.txt b/test.txt  (rejected hunks)  
    @@ -1,2 +1,3 @@  
     Github test!  
    -Hello Gavin.  
    \ No newline at end of file  
    +Hello Gavin.  
    +Test commit!  
    \ No newline at end of file  


即说明在Hello Gavin的下一行添加了一个Test commit的文本，而我们主分支呢，也在Hello Gavin的下一行添加了一行文本，"master test!". 我们可以直接将"Test commit!" 添加到test.txt即可，比如我们这里就添加到"master test!"的下一行,然后保存。（实际解决冲突的时候需要根据具体的情况来处理）

###提交补丁的改动
现在我们已经解决了冲突的代码部分，接着我们应该提交这个改动。首先使用 git rm -f .\test.txt.rej来删除rej文件，只需要提交改动的代码文件。

     
	[plain]  view plain copy 在CODE上查看代码片 派生到我的代码片

    git add .  
      
    git am --resolved  


	这样就完成了一个有冲突的补丁的修正，如果有多个补丁可以重复此步骤进行处理。
##git branch

    用于本地分支的管理
    git branch —— 查看当前仓库的所有本地分支
    git branch branchName —— 创建名字为branchName的分支
    git branch -D branchName—— 删除名字为branchName的分支
      
##git checkout
*git checkout用于分支的切换，*如：

     git checkout test —— 如果test分支存在，则切换到test分支
     git checkout -b test —— 用于test分支不存在的情况，会先创建test分支再切换到test分支。
     相当于 git branch test , git checkout test两条命令



这里主要介绍了一些常用的命令，git的命令还有很多，每一个命令的用法也有很多。 