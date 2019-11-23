## Git => mydev 
###OMS 
    
        CMS, USER, APPSTORE 
        Online:{
            : url   http://oms.skyworthxr.com    
            ：host+port   http://39.108.251.29:8090 
            https://console.skyworthxr.com
        }
        mydev:{
            : run   dev => 127.0.0.1:8080   
            : user  admin 12345678  、 admin1 13246578  、admin4 12346578  
            ：host+port   http://47.112.135.8:8090
        }
        test:{
            : url   http://video-cms-test.skyworthxr.com  
            : user  admin 12345678  、 admin1 13246578  、admin4 12346578  
            ：host+port   http://47.112.135.8:8090
        }
    
###OPM 
    Online:{
            : url   http://server_opm.skyworthxr.com   
            : user   
            ：host+port  http://server_opm.skyworthxr.com   
        }


###OSS   

    Access key Id :LTAI7Miw7OVfdYQW
    Access key Secret：Ly8A4DUA03FVfPbXeOJMsRXQdPODci
    Security secret：649424
  
###GIT:  

    branch:
        master
        mydev

    （1）新建一个dev
    （2）切换到dev进行开发
    （3）在dev添加文件并且提交文件
    （4）在dev分支中rebase
            git rebase
    （5）切换到master分支
    （6）将dev分支合并到master分支
            git merge dev
    （7）推送master到服务端
    （8）继续切换到dev进行开发

    git init    =====  建仓库， 初始化Git仓库
    git add 说明.txt  =====     把文件（这里指“说明.txt")纳入暂存区(还没有真正纳入版本控制，需要再一步确认)
    git status =======查看暂存区状态
    git commit  -m '...'  提交纳入仓库（要写原因所以要加 -m）====git commit  -m  "说明内容
    注意：第一次提交需要先提交姓名和邮箱，否则会报错
    git log  ===== 查看提交日志

    git  checkout  - -  ====删除文件还原：

    git reset  -- hard     =====版本号码（至少写五位)       回到历史版本号版本

    git reflog    =======   回到删除的未来版本（过去将来时）

###Github url:

        WebCskyVrZyh    :   git@github.com:zengyuhan503/WebCskyVrZyh.git
        CCSFrontEnd     ：  git@github.com:skyworthvr/CCSFrontEnd.git
        VRCMSFrontEnd   ：  git@github.com:skyworthvr/VRCMSFrontEnd.git
        CloudVRFrontEnd ：  git@github.com:skyworthvr/CloudVRFrontEnd.git

##  v1.1.0 
    第二期需求总测试：
    视频管理——栏目管理  ：视频标签添加，标签筛选，视频影音筛选，视频错误信息显示
    应用商店——应用管理：应用上线下线，应用置顶，应用编辑，应用上传
    应用商店——类别管理：类别名称添加，类别置顶，类别编辑，类别禁用

    应用商店：四国语言

    北美版


    