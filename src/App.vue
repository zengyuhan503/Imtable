<template>
  <div id="app">
    <el-header style="background-color: #23262e;height:61px;">
      <el-row :span="3">
        <el-col class="logcontMain" :span="3">
          <el-col class="grid-content bg-purple-dark logcont">O M S</el-col>
        </el-col>
        <el-col :span="7" :push="9">
          <div class="setGetAppPoolList" style="color:#fff;;" v-show="platformIdshou">
            <el-form ref="form" label-width="180px">
              <el-form-item label=" 当前平台：">
                <el-select v-model="appvalue" placeholder="请选择" @change="selectChange">
                  <el-option v-for="item in GetAppPoolList" :key="item.Id" :label="item.AppPoolName" :value="item.Id">
                    {{item.AppPoolName}}</el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="4" :push="8">
          <div class="setGetAppPoolList" style="color:#fff;" v-show="platformIdshou">
            <el-form ref="form" label-width="80px">
              <el-form-item label="语言：">
                <el-select placeholder="请选择" v-model="language">
                  <el-option value="中国">中国</el-option>
                  <el-option value="英国">英国</el-option>
                  <el-option value="日本">日本</el-option>
                  <el-option value="韩国">韩国</el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="4" :push="8">
          <div class="grid-content heaimg bg-purple-light">
            <!-- <el-col :span="4" :push="2" style="color:#FFFFFF;font-size:10px;line-height:69px">曾钰涵</el-col> -->
            <el-col :span="3" :push="3">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img src="../static/image/headimg.png" style="width:70%" alt />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu :default-active="routerpath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse"
          @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">用户列表</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" class="mainCont">
        <el-scrollbar style="height:100%">
          <router-view :platformId="platformId" :platformNA="platformNA" :getlist="getlist" :debounce="debounce">
          </router-view>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        navtypesrc: "../static/image/navleft.png",
        activeIndex: 1,
        showpage: 0,
        routerpath: "/app-manage",
        GetAppPoolList: "",
        appvalue: "",
        platformId: "1",
        platformAppPoolName: "1",
        platformIdshou: false,
        language: "",
        platformNA: false
      };
    },
   
    created() {
      this.getlist();
      if (this.$route.name == "omsuserinfo") {
        var urls = "/";
      } else {
        var urls = this.$route.path;
      }
      this.routerpath = urls;
      if (
        this.$route.name == "appmanage" ||
        this.$route.name == "categorymanage" ||
        this.$route.name == "recommendmanage"
      ) {
        this.platformIdshou = true;
      } else {
        this.platformIdshou = false;
      }
    },
    watch: {
      $route(to, from) {
        // this.getlist();
        //监听路由是否变化
        this.platformshou(to);
      }
    },
    methods: {
      selectChange(value, label) {
        this.platformId = this.appvalue;
        if (this.platformId == this.platformAppPoolName) {
          this.platformNA = true;
        } else {
          this.platformNA = false;
        }
      },
      platformshou(routeStying) {
        if (
          routeStying.name == "appmanage" ||
          routeStying.name == "categorymanage" ||
          routeStying.name == "recommendmanage" ||
          routeStying.name == "platformmanage"
        ) {
          this.platformIdshou = true;
        } else {
          this.platformIdshou = false;
        }

      },
      getlist() {

      },
      handleOpen(key, keyPath) { },
      handleOpennav() {
        if (this.isCollapse == true) {
          this.isCollapse = false;
          this.navtypesrc = "../static/image/navleft.png";
        } else {
          this.isCollapse = true;
          this.navtypesrc = "../static/image/navleftopen.png";
        }
      },
      handleClose(key, keyPath) { },
      logout() {
        localStorage.removeItem("userInfo");
        this.$router.push("/login");

      },
      handleCommand(command) {
        localStorage.removeItem("userInfo");
        this.$router.push("/login");

      },
      handleSelect(key, keyPath) {
        this.$router.push(key);
      },
      debounce(fn) {
        console.log(fn);
        let canRun = true; // 先保留一个标记
        return function () {
          if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
          canRun = false;
          //立即设置为true;
          setTimeout(() => {
            console.log(this);
            // 将外部传入的函数的执行放在setTimeout中
            fn.apply(this, arguments);
            canRun = true;
          }, 0);
        };
      }
    }
  };
</script>
<style>
  body,
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body,
  html,
  div,
  h3,
  h1,
  h2,
  p {
    margin: 0;
    padding: 0;
  }

  .setGetAppPoolList .el-form-item__label {
    color: #fff;
  }

  /* .setGetAppPoolList{
  padding-top: 12px;
} */

  .el-table .cell,
  .el-table th div {
    overflow: initial !important;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  #app .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 100%;
    min-height: 400px;
  }

  body,
  #app .el-header {
    margin: 0;
    padding: 0;
  }

  .ul-container {
    margin-bottom: 50px;
  }

  #app .logcont {
    background: #23262e;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    width: 100%;
    color: #009688;
    font-size: 27px;
  }

  #app .mainCont {
    background: #dddddd;
    min-height: 500px;
  }

  .my-table {
    margin-top: 2%;
    width: 100%;
    height: 80%;
    color: #606266;
    background-color: white;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    position: relative;
    padding: 15px;
  }

  .ul-container {
    width: 100%;
    height: 100%;
    padding: 2% 5%;
    box-sizing: border-box;
  }

  .mainContdiv>div {
    background: #fff;
  }

  #app .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 500px;
    width: 100%;
  }

  #app .leftslide {
    height: 60px;
    line-height: 60px;
  }

  #app .leftslide img {
    margin-left: 20px;
    margin-top: 15px;
    width: 32px;
    height: 32px;
  }

  #app .el-menu--collapse {
    min-height: 500px;
  }

  #app .el-submenu .el-menu-item {
    min-width: auto;
  }

  #app .el-row {
    height: 100%;
  }

  #app .el-row>div {
    height: 100%;
  }

  #app .el-row .mainCont1 {
    height: auto;
  }

  #app .heaimg {
    line-height: 60px;
    text-align: center;
  }

  #app .heaimg img {
    vertical-align: middle;
  }
</style>