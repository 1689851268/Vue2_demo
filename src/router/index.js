/*
 * @Description: 配置路由
 * @Author: superman
 * @Date: 2022-03-14 16:26:10
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 19:36:38
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers' // 引入路由规则
import store from '@/store'

// 使用插件，该指令需要在 VueRouter 实例创建之前调用
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


/**
 * @description: 全局路由前置守卫
 * @param { to-即将进入的路由对象; from-正要离开的路由对象; next-放行函数 }
 * @return { null }
 */
router.beforeEach((to, from, next) => {
    let name = store.state.user.userInfo.name; // 用户名
    let token = store.state.user.token; // token

    if (token) { /* ---------- 1. 已登录 ---------- */
        if (to.path == "/login") { // 1.1 去 login 页
            next("/home");
        } else { // 1.2 去其他页
            if (name) { // 1.2.1 有 [用户名]
                next()
            } else { // 1.2.2 没有 [用户名] （因为只有 Home 组件挂载时获取了用户数据，其他组件都没有获取）
                store.dispatch("user/userInfo").then(() => {
                    next();
                }).catch(() => { // 获取数据失败 （ token 失效 ）
                    store.dispatch("user/userLogout"); // 将用户数据清除干净
                    next('/login');
                });
            }
        }
    } else { /* ---------- 2. 未登录 ---------- */
        next();
    }
});


export default router