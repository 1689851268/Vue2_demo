/*
 * @Description: search store
 * @Author: superman
 * @Date: 2022-03-17 23:25:33
 * @LastEditors: superman
 * @LastEditTime: 2022-03-20 13:16:08
 */
import {
    reqGetSearchInfo
} from "@/api";

// Store 存储数据的仓库
const state = {
    searchList: {}
};

// Mutations 修改 State 的地方
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};

// Actions 书写业务逻辑，可以处理异步操作
const actions = {
    async getSearchList(context, params) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            context.commit("GETSEARCHLIST", result.data);
        }
    }
};

// Getters 计算属性，用于处理 Store 数据，让组件更方便地获取数据
const getters = {
    // state 作为第 1 参数传入 （ state 为当前仓库的 state，不是大仓库的 state ）
    goodsList(state) {
        // 网络较慢时，searchList 可能还没请求到数据，此时 searchList.goodsList 为 undefined
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};

// 对外暴露 Store 实例
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};