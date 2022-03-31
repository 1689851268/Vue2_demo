/*
 * @Description: 主 store 仓库
 * @Author: superman
 * @Date: 2022-03-17 23:25:33
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 19:45:00
 */

import Vue from 'vue';
import Vuex from 'vuex';

// 使用 Vuex 插件
Vue.use(Vuex);

// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import user from './user';
import trade from './trade';

// 对外暴露 Store 实例
export default new Vuex.Store({
    // 实现模块式存储
    modules: {
        home, search, detail,
        shopCart, user, trade
    }
});