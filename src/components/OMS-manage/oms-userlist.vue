<template>
  <el-col>
    <div class="ul-container">
      <div class="my-table">
        <el-row :gutter="40" class="formCont">
          <el-col :span="3" :push="17">
            <el-button type="primary" @click="adduser()">添加信息</el-button>

          </el-col>
          <el-col :span="3" :push="20">
            <el-button type="primary" @click="getim()">获取聊天信息</el-button>
          </el-col>
        </el-row>
        <el-row class="tableCont mainContdiv" :span="16">
          <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="LabelName" label="账户" width="180"></el-table-column>
            <el-table-column prop="UserCount" label=" 昵称" width="110"></el-table-column>
            <el-table-column label="详情信息"" style=" text-align: center;">
              <el-table-column prop="OverallRatingThreshold" label="余额"></el-table-column>
              <el-table-column prop="AppCollectionRatingThreshold" label="包数"></el-table-column>
              <el-table-column prop="AppDownloadRatingThreshold" label="延迟"></el-table-column>
              <el-table-column prop="VideoCollectionRatingThreshold" label="金额"></el-table-column>
              <el-table-column prop="VideoPlayRatingThreshold" label='备注'></el-table-column>
              <el-table-column prop="VideoPlaytimeRatingThreshold" label="群"></el-table-column>
              <el-table-column label="IM输入框" width="250">
                <template slot-scope="scope">
                  <el-input v-model="scope.value" placeholder="im输入框"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="VideoPlaytimeRatingThreshold" label="开关"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button size="primary" @click="changepwd(scope)">编辑</el-button>
                <el-button size="danger" @click="deletetLabel(scope,scope.$index)"
                  :disabled=" scope.row.Id == 3 || scope.row.Id == 2 ||scope.row.Id == 4 || scope.row.Id == 5 || scope.row.Id == 6? true:false">
                  删除标签</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage3" :page-size="Totalpages" layout="prev, pager, next, jumper"
            v-if="lengthpage" :total="total"></el-pagination>
        </div>
        <el-dialog title="" :visible.sync="dialogVisible" width="30%">
          <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true'>
            <el-tab-pane label="最近会话" name="first">
              <el-row :gutter="20">
                <div v-for="(item, index) in friends" class="friends" :key="index">
                  <el-col :span="3">
                    <div>
                      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <p>{{item.account}}</p>
                  </el-col>
                </div>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="通讯录" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="个人中心" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </el-dialog>
      </div>
    </div>
  </el-col>
</template>

<script>
  require("../../assets/js/init.js");
  require("../../assets/sdk/NIM_Web_SDK_v6.1.0");
  import threerotation from "../../assets/js/init";
  export default {
    name: "",
    data() {
      return {
        friends: [],
        tableData: [],
        tablelist: "",
        dialogVisible: false,

        pagedatalist: "",
        currentPage3: 1, //初始化显示页
        showpage: 1,
        Totalpages: 7, //总页数
        pageshow: 7, //没页显示数量
        total: 0,
        pagelist: 0,
        thispage: 0,
        datalist: "",
        lengthpage: 1,
        seract: 1,
        pagedatashow: "",
        loading: false,
        activeName: "first",
        nims: ''
      };
    },
    created() {
      this.getlist();
      var that = this;
      setTimeout(() => {
        that.friends = threerotation.nim.datainfo.friends
        that.nims = threerotation.nim;
        that.nims.updateMyInfo({
          nick: 'newNick1111',
          avatar: 'http://newAvatar',
          sign: 'newSign111',
          gender: 'male',
          email: 'new@email.com',
          birth: '1900-01-01',
          tel: '13458685625',
          custom: '{type: "newCustom", value: "new"}',
          done: that.updateMyInfoDone
        });
      }, 3000);
    },
    watch: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      updateMyInfoDone(error, user) {
        console.log('更新我的名片' + (!error ? '成功' : '失败'));
        console.log(error);
        console.log(user);
      },
      page() {

      },
      handlelink(value) {

      },
      deletetLabel(scope, index) {

      },
      add0(m) {
        return m < 10 ? "0" + m : m;
      },
      format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return (
          y +
          "-" +
          this.add0(m) +
          "-" +
          this.add0(d) +
          " " +
          this.add0(h) +
          ":" +
          this.add0(mm) +
          ":" +
          this.add0(s)
        );
      },
      getlist() {

      },
      getim() {
        var that = this;
        var nim = SDK.NIM.getInstance({
          appKey: '2a00dda2f09ab6f7590dfb0e0b07b932',
          account: 'textuser',
          token: 'zyh503',
          onsessions: that.onSessions,
          onupdatesession: that.onUpdateSession
        })
      },
      onSessions(sessions) {
        console.log('收到会话列表', sessions);
        data.sessions = nim.mergeSessions(data.sessions, sessions);
        this.updateSessionsUI();
      },
      onUpdateSession(session) {
        console.log('会话更新了', session);
        data.sessions = nim.mergeSessions(data.sessions, session);
        this.updateSessionsUI();
      },
      updateSessionsUI() {
        // 刷新界面
      },
      getChatroomAddressDone(error, obj) {
        console.log('获取聊天室地址' + (!error ? '成功' : '失败'), error, obj);
      },
      onChatroomConnect(obj) {
        // 该处chatroom为全局生成的实例
        window.account = chatroom.account
      },
      adduser() {
        // this.$router.push("/opma-dduser");
        this.dialogVisible = true
      },
      uppwd() {
        this.dialogVisible = false;
      },
      changepwd(value) {
        this.dialogVisible = true;
        this.msgform = value.row;
      },
      changeinfo(value) {

      },
      resetForm() {
        this.form.nameid = "";
        this.tableData = this.tablelist;
      },
      handleSizeChange(val) {
        //// console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
      }
    }
  };
</script>
<style scope>
  .container {
    padding: 3%;
    min-height: 600px;
    height: 100%;
  }

  .omptable {
    min-height: 750px;
    background: #ffffff;

    height: 100%;
  }

  .tableCont .el-table {
    min-height: 550px;
  }

  .formCont {
    padding: 1% 4%;
  }

  .tableCont {
    padding: 0 5%;
  }

  .changetag .el-input {
    width: 65%;
    margin-right: 7%;
  }

  #app .block {
    text-align: center;
    margin-top: 30px;
  }

  #app .changetag .el-input {
    width: 55%;
    margin-right: 3%;
  }

  .friends {
    cursor: pointer;
  }

  .friends p {
    height: 48px !important;
    line-height: 48px;
  }
</style>