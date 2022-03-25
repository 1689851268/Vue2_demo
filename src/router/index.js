/*
 * @Description: 配置路由
 * @Author: superman
 * @Date: 2022-03-14 16:26:10
 * @LastEditors: superman
 * @LastEditTime: 2022-03-25 22:38:44
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers' // 引入路由规则

// 使用插件，该指令需要在 VueRouter 创建前调用
Vue.use(VueRouter)

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
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // { y: 0 } 表示滚动条在最上方
        return { y: 0 }
    }
});

export default router