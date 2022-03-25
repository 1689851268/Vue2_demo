/*
 * @Description: 路由的配置信息
 * @Author: superman
 * @Date: 2022-03-25 21:56:57
 * @LastEditors: superman
 * @LastEditTime: 2022-03-25 21:58:23
 */

// 引入路由组件
import Home from '../pages/Home'

export default [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { show: false } // 设置路由元信息，控制 Footer 组件的显示
}, {
    path: '/search/:keyword?', // 设置动态路由，接收参数
    name: 'Search',
    component: () => import('../pages/Search'), // 懒加载
    meta: { show: false }
}, {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login'),
    meta: { show: false }
}, {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register'),
    meta: { show: false }
}, {
    path: "/detail/:skuId",
    name: "Detail",
    component: () => import('../pages/Detail'),
    meta: { show: false }
}, {
    path: '*',
    redirect: '/home' // 重定向
}]