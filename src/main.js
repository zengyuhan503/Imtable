// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueParticles from 'vue-particles';
import VueCropper from 'vue-cropper';
import './assets/stateIcon/iconfont.css';
Vue.use(VueCropper);
Vue.use(VueParticles);
axios.defaults.baseURL = process.env.API_ROOT;
axios.interceptors.request.use(config => {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.common.Authorization = token;
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
axios.interceptors.response.use(
    response => {
        if (response.data.Result == 301) {
            localStorage.removeItem('userInfo');
            Vue.prototype.$message.error('登陆信息过期或失效，请重新登陆！');
            router.push('/');
        }
        return response;
    },
    err => {
        var statusCode = err.response.status;
        switch (statusCode) {
            case 400:
                element.Message.error('请求错误');
                break;
            case 401:
                element.Message.error('未授权，请登录');
                // router.push('/login');
                break;
            case 403:
                element.Message.error('拒绝访问');
                break;

            case 404:
                element.Message.error(`请求地址出错，请重试`);
                break;

            case 408:
                element.Message.error('请求超时');
                break;

            case 500:
                element.Message.error('服务器内部错误');
                break;

            case 501:
                element.Message.error('服务未实现');
                break;

            case 502:
                element.Message.error('网关错误');
                // router.push('/login');
                break;

            case 503:
                element.Message.error('服务不可用');
                break;

            case 504:
                element.Message.error('网关超时,');
                break;

            case 505:
                err.Message = 'HTTP版本不受支持';
                break;

            default:
        }
        return Promise.reject(err);
    }
);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(element);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});