/*
 * @Description: home store
 * @Author: superman
 * @Date: 2022-03-17 23:25:33
 * @LastEditors: superman
 * @LastEditTime: 2022-03-19 16:26:33
 */

import {
    reqCategoryList,
    reqGetBannerList,
    reqFloorList
} from "@/api"; // 引入 api 接口函数

// Store 存储数据的仓库
const state = {
    categoryList: [], // 三级标题
    bannerList: [], // 轮播图
    floorList: [] // 楼层数据
};

// Mutations 修改 State 的地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

// Actions 书写业务逻辑，可以处理异步操作
const actions = {
    async categoryList(context) {
        // 调用 api 里面的接口函数，向服务器发请求，获取服务器数据
        let result = await reqCategoryList();
        if (result.code == 200) {
            context.commit("CATEGORYLIST", result.data);
        }
    },
    async getBannerList(context) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            context.commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList(context) {
        let result = await reqFloorList();
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data);
        }
    }
};

// Getters 计算属性，用于处理 Store 数据，让组件更方便地获取数据
const getters = {};

// 对外暴露 Store 实例
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};