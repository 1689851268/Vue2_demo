/*
 * @Description: 商品详情页的数据
 * @Author: superman
 * @Date: 2022-03-25 22:53:53
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 00:48:09
 */

import { reGoodsInfo } from "@/api";

const state = {
    goodInfo: {}
};

const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

const actions = {
    async getGoodsInfo(context, skuId) {
        let res = await reGoodsInfo(skuId);
        if (res.code == 200) {
            context.commit("GETGOODSINFO", res.data);
        }
    }
};

const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
        // 一开始 数据尚未返回时，goodInfo 是空对象，categoryView 为 undefined
        // 所以要设置 {} 默认值，否则会报错
        // 因为后面需要获取 categoryView[category${i}Name] 属性值，undefined[category${i}Name]，你说报不报错嘛
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}