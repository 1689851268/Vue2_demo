/*
 * @Description: 入口文件
 * @Author: superman
 * @Date: 2022-03-14 13:58:09
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 10:45:55
 */

import Vue from 'vue'
import App from './App.vue'
import router from '@/router' // 引入路由
import store from '@/store' // 引入 store

Vue.config.productionTip = false


// 注册全局组件 TypeNav
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);

// 注册全局组件 Carousel
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);

// 注册全局组件 Pagination
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination);


// 引入 mockServe.js ( mock 数据 )
import '@/mock/mockServe';

// 引入 swiper 样式
import "swiper/css/swiper.css";

new Vue({
    render: h => h(App),

    // 配置全局事件总线 $bus
    beforeCreate() {
        Vue.prototype.$bus = this;
    },

    router, // 注册路由
    store // 注册 store
}).$mount('#app')