/*
 * @Description: 入口文件
 * @Author: superman
 * @Date: 2022-03-14 13:58:09
 * @LastEditors: superman
 * @LastEditTime: 2022-04-09 15:50:19
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

// 引入所有的接口
import * as API from "@/api";

// 引入 ElementUI 的 MessageBox
import { MessageBox, Message } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// 引入 lazyload
import VueLazyload from 'vue-lazyload';
import defaultPic from "@/assets/defaultPic.jpg"; // [图片] 和 [JSON] 都是默认导出的，可以直接导入使用
Vue.use(VueLazyload, {
    loading: defaultPic // 懒加载默认图片
});

new Vue({
    render: h => h(App),

    // 配置全局事件总线 $bus & 全局 API 接口 $API
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },

    router, // 注册路由
    store // 注册 store
}).$mount('#app')