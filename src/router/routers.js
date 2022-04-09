/*
 * @Description: 路由的配置信息
 * @Author: superman
 * @Date: 2022-03-25 21:56:57
 * @LastEditors: superman
 * @LastEditTime: 2022-04-09 15:19:59
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
    path: "/trade", // 结算页面
    name: "Trade",
    component: () => import('../pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
        if (from.name == "ShopCart") {
            next();
        } else {
            next(false);
        }
    }
}, {
    path: "/pay", // 支付页面
    name: "Pay",
    component: () => import('../pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
        from.name == "Trade" ? next() : next(false);
    }
}, {
    path: "/paysuccess", // 支付成功页面
    name: "PaySuccess",
    component: () => import('../pages/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
        from.name == "Pay" ? next() : next(false);
    }
}, {
    path: "/center", // 个人中心页面
    component: () => import('../pages/Center'),
    meta: { show: true },
    // 设置默认子路由后，当前路由不能设置 name 属性
    children: [{
        path: '', // 子组件的 path 设置为空字符串，表示默认显示该组件
        name: "MyOrder",
        component: () => import("../pages/Center/MyOrder"),
        meta: { show: true },
    }, {
        path: 'grouporder',
        name: "GroupOrder",
        component: () => import("../pages/Center/GroupOrder"),
        meta: { show: true },
    }]
}, {
    path: '*',
    redirect: '/home' // 重定向
}]