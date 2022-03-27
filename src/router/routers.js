/*
 * @Description: 路由的配置信息
 * @Author: superman
 * @Date: 2022-03-25 21:56:57
 * @LastEditors: superman
 * @LastEditTime: 2022-03-28 01:13:04
 */

// 引入路由组件
import Home from '../pages/Home'

export default [{
    path: '/home', // 首页
    name: 'Home',
    component: Home,
    meta: { show: true } // 设置路由元信息，控制 Footer 组件的显示
}, {
    path: '/search/:keyword?', // 搜索页 - 设置动态路由，接收参数
    name: 'Search',
    component: () => import('../pages/Search'), // 懒加载
    meta: { show: true }
}, {
    path: '/login', // 登陆
    name: 'Login',
    component: () => import('../pages/Login'),
    meta: { show: false }
}, {
    path: '/register', // 注册
    name: 'Register',
    component: () => import('../pages/Register'),
    meta: { show: false }
}, {
    path: "/detail/:skuId", // 商品详情页
    name: "Detail",
    component: () => import('../pages/Detail'),
    meta: { show: true }
}, {
    path: "/addcartsuccess", // 加入购物车
    name: "AddCartSuccess",
    component: () => import('../pages/AddCartSuccess'),
    meta: { show: true }
}, {
    path: "/shopcart", // 购物车
    name: "ShopCart",
    component: () => import('../pages/ShopCart'),
    meta: { show: true }
}, {
    path: '*',
    redirect: '/home' // 重定向
}]