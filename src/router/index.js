/* jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import loginPage from '@/components/login-page';
import omsuserlist from '@/components/OMS-manage/oms-userlist';
Vue.use(Router);
const router = new Router({
    routes: [{
        path: '/',
        name: 'omsuserlist',
        component: omsuserlist
    },
    {
        path: '/login',
        name: 'loginPage',
        component: loginPage
    },
    // oms userlist
    {
        path: '/oms-userlist',
        name: 'omsuserlist',
        component: omsuserlist
    },
    ]
});


export default router;