/*
 * @Description: 配置路由
 * @Author: superman
 * @Date: 2022-03-14 16:26:10
 * @LastEditors: superman
 * @LastEditTime: 2022-03-21 01:03:45
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件，该指令需要在 VueRouter 创建前调用
Vue.use(VueRouter)

// 引入路由组件
import Home from '../pages/Home'

// 设置路由规则
const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { // 设置路由元信息，控制 Footer 组件的显示
        show: true
    }
}, {
    path: '/search/:keyword?', // 设置动态路由，接收参数
    name: 'Search',
    component: () => import('../pages/Search'), // 懒加载
    meta: {
        show: true
    }
}, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login'),
    meta: {
        show: false
    }
}, {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register'),
    meta: {
        show: false
    }
}, {
    path: '*',
    redirect: '/home' // 重定向
}];


// 保存原 push 方法
const originPush = VueRouter.prototype.push;
// 重写 push 方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve, reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


// 创建 VueRouter 实例
const router = new VueRouter({
    routes
})

export default router