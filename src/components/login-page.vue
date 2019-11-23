<template>
  <div class="login-page">
    <vue-particles style="background-color:#1f62b0;" color="#FFFFFF" :particleOpacity="0.7" :particlesNumber="50"
      shapeType="circle" :particleSize="4" linesColor="#1f62b0" :linesWidth="0" :lineLinked="false" :lineOpacity="0.4"
      :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <el-form ref="mForm" :model="formData" :rules="formRules" class="formStyle">
      <div style="width: 100%;text-align: center;margin-bottom: 2rem;font-size: 2rem;color: #1f62b0">SKYWORTH</div>
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="captcha" v-if="true">
        <el-input v-model="formData.captcha" placeholder="验证码"></el-input>
        <img
          :src="captchaData"
          @click="flushCaptcha"
          style="width: 5rem;height: 100%;position: absolute;right: 0;top:0;cursor: pointer"
        >
      </el-form-item>-->
      <el-form-item>
        <el-button style="width:100%" @click="submitForm('mForm')" :loading="isValidating">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login-page",
    props: ["getlist"],
    data() {
      return {
        formRules: [],
        formData: {},
        captchaData: "",
        isValidating: false,
        aptchaId: "",
        API_ROOT: ""
      };
    },

    created() {
      console.log(process.env.API_ROOT);
      this.API_ROOT = process.env.API_ROOT;
      this.init();
    },
    methods: {
      getCookie(name) {
        console.log( document.cookie)
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      },
      init() {
        var a = this.getCookie('admin');
        
        this.formRules = {
          name: [
            { required: true, message: "用户名不能为空", trigger: "blur", min: 1 }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 1, message: "密码不能为空", trigger: "blur" }
          ]
        };
        this.formData = {
          name: "",
          password: "",
          captcha: ""
        };
      },
      fetchData() {
        this.flushCaptcha();
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.isValidating = true;
            this.validatePass();
          } else {
            // console.log("error submit!!");
            return false;
          }
        });
      },
      setCookie: function (name, value) {
        var days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
      },
      validatePass() {
        if (this.formData.name === '') {
          this.errorMsg = '帐号不能为空';
          return;
        } else if (this.formData.password === '') {
          this.errorMsg = '密码不能为空';
          return;
        } else if (this.formData.password.length < 6) {
          this.errorMsg = '密码至少需要6位';
          return;
        }
        this.setCookie(this.formData.name, this.formData.password)
      },
      flushCaptcha() {

      }
    }
  };
</script>

<style scoped>
  #particles-js {
    position: fixed;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .login-page {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .formStyle {
    position: absolute;
    background-color: white;
    padding: 2rem 3rem;
    border-radius: 10px;
    width: 15rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  }

  .appPool {
    width: 20rem;
    height: 15rem;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    cursor: pointer;
    font-size: 3rem;
    color: gray;
  }

  .appPool:hover {
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.4);
    color: #3a8ee6;
  }
</style>