---
title: Weblogic远程调试（linux）
layout: post
guid: urn:uuid:3ef3450f-8cf3-410b-a55b-c512c9af8b2a
tags:
  - weblogic
  - debug
---


##第一步
修改weblogic根目录下user_projects\domains\域名\bin\startWebLogic.sh文件； 
找到以下脚本位置：

	${JAVA_HOME}/bin/java ${JAVA_VM} -version
	
在该脚本后面添加如下内容：

	JAVA_DEBUG="-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,address=4000,server=y,suspend=n"
	export JAVA_DEBUG
 
*注：address=4000远程启动调试端口，可以自行修改。dt_socket这个一定要小写，否则将无法启动weblogic。*
 
##第二步
还是上述文件，在第一步的添加文字的后面，有如下文字：

	if [ "${WLS_REDIRECT_LOG}" = "" ] ; then
	 echo "Starting WLS with line:"
	 echo "${JAVA_HOME}/bin/java ${JAVA_VM} ${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy  ${PROXY_SETTINGS} ${SERVER_CLASS}"
	 ${JAVA_HOME}/bin/java ${JAVA_VM} ${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy ${PROXY_SETTINGS} ${SERVER_CLASS}
	else
	 echo "Redirecting output from WLS window to ${WLS_REDIRECT_LOG}"
	 ${JAVA_HOME}/bin/java ${JAVA_VM} ${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy ${PROXY_SETTINGS} ${SERVER_CLASS}  >"${WLS_REDIRECT_LOG}" 2>&1 
	fi 
 
现在要做的是把：${JAVA_DEBUG}变量加入的启动参数中，如下：

	if [ "${WLS_REDIRECT_LOG}" = "" ] ; then
	 echo "Starting WLS with line:"
	 echo "${JAVA_HOME}/bin/java ${JAVA_VM} ${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy  ${PROXY_SETTINGS} ${SERVER_CLASS}"
	 ${JAVA_HOME}/bin/java ${JAVA_VM} ${JAVA_DEBUG}${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy ${PROXY_SETTINGS} ${SERVER_CLASS}
	else
	 echo "Redirecting output from WLS window to ${WLS_REDIRECT_LOG}"
	 ${JAVA_HOME}/bin/java ${JAVA_VM} ${JAVA_DEBUG} ${MEM_ARGS} ${JAVA_OPTIONS} -Dweblogic.Name=${SERVER_NAME} -Djava.security.policy=${WL_HOME}/server/lib/weblogic.policy ${PROXY_SETTINGS} ${SERVER_CLASS}  >"${WLS_REDIRECT_LOG}" 2>&1 
	fi

*新增的地上如上红色标注部分。*
 
##第三步
打开eclipse，然后再打开Debug Configurations，选择“Remote Java Application”，右键—>new创建一个Debug应用。

![](/media/files/2015/02/12/13958.png)